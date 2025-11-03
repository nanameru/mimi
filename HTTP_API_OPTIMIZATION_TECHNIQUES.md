# HTTP APIレイテンシー改善技術 調査レポート

## 調査日時
2025年1月5日

## 現在の実装状況

### Fish Audio SDKのHTTPクライアント実装
**ファイル**: `node_modules/fish-audio-sdk/dist/session.js`

```javascript
class Session {
    constructor(apiKey, baseUrl = 'https://api.fish.audio') {
        // Keep-Alive接続を有効化（既に実装済み）
        this.httpAgent = new http.Agent({ keepAlive: true });
        this.httpsAgent = new https.Agent({ keepAlive: true });
        
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
            timeout: 0,
            httpAgent: this.httpAgent,
            httpsAgent: this.httpsAgent
        });
    }
}
```

**既に実装されている最適化**:
- ✅ Keep-Alive接続（接続の再利用）
- ✅ 接続プーリング（httpAgent/httpsAgent）

## HTTP APIレイテンシー改善技術

### 1. HTTP/2の導入（最も効果的）

#### 1.1 HTTP/2のメリット
- **多重化**: 複数のリクエストを同時に処理可能
- **ヘッダ圧縮**: リクエストヘッダのサイズを削減
- **サーバープッシュ**: サーバーが事前にリソースを送信可能
- **レイテンシー削減**: HTTP/1.1より最大50%のレイテンシー削減が期待できる

#### 1.2 実装方法
```typescript
import http2 from 'http2';
import axios from 'axios';

// HTTP/2対応のクライアントを作成
const http2Agent = new http2.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSessions: 10,
  maxFreeSessions: 2,
});

// axiosでHTTP/2を使用
const client = axios.create({
  baseURL: 'https://api.fish.audio',
  httpAgent: http2Agent,
  httpsAgent: http2Agent,
});
```

**注意点**:
- Fish Audio APIがHTTP/2をサポートしている必要がある
- Node.jsの`http2`モジュールを使用
- axiosはHTTP/2を直接サポートしていないため、`http2`モジュールを使用する必要がある

### 2. 接続プーリングの最適化

#### 2.1 現在の設定
```javascript
this.httpAgent = new http.Agent({ keepAlive: true });
this.httpsAgent = new https.Agent({ keepAlive: true });
```

#### 2.2 最適化された設定
```javascript
this.httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,        // Keep-Alive接続の維持時間（30秒）
  maxSockets: 50,                // 最大接続数
  maxFreeSockets: 10,           // アイドル接続の最大数
  timeout: 60000,               // 接続タイムアウト
  scheduling: 'fifo'            // スケジューリング方式
});

this.httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 60000,
  scheduling: 'fifo'
});
```

**効果**: 接続の再利用により、接続確立のオーバーヘッドを削減（約50-100ms削減）

### 3. プリコネクト（Preconnect）の活用

#### 3.1 コンセプト
- 最初のリクエストの前に、接続を確立
- 接続確立の時間を事前に処理

#### 3.2 実装方法
```typescript
class FishAudioTTS {
  private httpSession: Session;
  private preconnectPromise: Promise<void> | null = null;
  
  constructor(options: FishAudioTTSOptions = {}) {
    this.httpSession = new Session(this.apiKey);
    
    // プリコネクトを実行
    this.preconnect();
  }
  
  private async preconnect() {
    // ダミーリクエストで接続を確立
    try {
      const dummyRequest = new TTSRequest('test', {
        format: 'pcm',
        sampleRate: 44100,
      });
      
      // 接続を確立（ダミーリクエストを送信）
      this.preconnectPromise = (async () => {
        for await (const _ of this.httpSession.tts(dummyRequest)) {
          // 接続が確立されたら終了
          break;
        }
      })();
    } catch (error) {
      // エラーは無視（接続確立の試行）
    }
  }
  
  async stream() {
    // プリコネクトが完了するまで待機
    if (this.preconnectPromise) {
      await this.preconnectPromise;
    }
    
    // 通常の処理を実行
  }
}
```

**効果**: 接続確立の時間を事前に処理（約100-200ms削減）

### 4. 並行処理とリクエストのバッチング

#### 4.1 コンセプト
- 複数のHTTPリクエストを並行して送信
- テキストを複数のチャンクに分割して並行処理

#### 4.2 実装方法
```typescript
async run() {
  const textBuffer: string[] = [];
  for await (const text of this.input) {
    textBuffer.push(text);
  }
  
  const fullText = textBuffer.join('');
  
  // テキストを文単位で分割
  const sentences = fullText.split(/([。！？\n])/).filter(s => s.trim());
  
  // 各文を並行処理
  const audioPromises = sentences.map(async (sentence) => {
    const request = new TTSRequest(sentence, {
      referenceId: this.voiceId,
      format: 'pcm',
      sampleRate: this.sampleRate,
    });
    
    return this.httpSession.tts(request);
  });
  
  // すべてのリクエストを並行実行
  for (const audioStream of audioPromises) {
    for await (const chunk of audioStream) {
      // LiveKit AudioFrameに変換して送信
      this.queue.put(audio);
    }
  }
}
```

**効果**: 複数のリクエストを並行処理することで、全体のレイテンシーを削減（約20-30%削減の可能性）

### 5. CDNやエッジコンピューティングの活用

#### 5.1 コンセプト
- Fish Audio APIの前にCDNやエッジコンピューティングを配置
- ユーザーに近いエッジサーバーから応答

#### 5.2 実装方法
```typescript
// エッジサーバーを使用（例）
const baseUrl = 'https://edge-cdn.fish.audio';  // エッジサーバーのURL

const session = new Session(apiKey, baseUrl);
```

**効果**: ネットワークレイテンシーの削減（約50-200ms削減）

**注意点**:
- Fish AudioがCDNやエッジコンピューティングを提供している必要がある
- 現在は提供されていない可能性が高い

### 6. リクエストの最適化

#### 6.1 リクエストボディの圧縮
```typescript
// リクエストヘッダに圧縮を追加
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Encoding': 'gzip',  // リクエストボディを圧縮
  },
  httpAgent: this.httpAgent,
  httpsAgent: this.httpsAgent,
});
```

**効果**: リクエストサイズの削減（約10-20%削減）

#### 6.2 タイムアウトの最適化
```typescript
const client = axios.create({
  baseURL: baseUrl,
  timeout: 30000,  // 30秒（現在は0 = 無制限）
  httpAgent: this.httpAgent,
  httpsAgent: this.httpsAgent,
});
```

**効果**: タイムアウトによる待機時間の削減

### 7. HTTP/3（QUIC）の導入

#### 7.1 HTTP/3のメリット
- **QUICプロトコル**: UDPベースで接続確立が高速
- **マルチプレクシング**: 複数のストリームを同時に処理
- **レイテンシー削減**: HTTP/2よりさらに低レイテンシー

#### 7.2 実装方法
```typescript
import { Http3Session } from 'node:http3';

// HTTP/3セッションを作成
const session = new Http3Session({
  hostname: 'api.fish.audio',
  port: 443,
});
```

**注意点**:
- Fish Audio APIがHTTP/3をサポートしている必要がある
- Node.jsの`http3`モジュールを使用（実験的）

### 8. キャッシュの活用

#### 8.1 音声キャッシュ
- 同じテキストの音声をキャッシュ
- 2回目以降のリクエストでキャッシュから取得

#### 8.2 実装方法
```typescript
class FishAudioTTS {
  private audioCache: Map<string, Buffer> = new Map();
  
  async synthesize(text: string) {
    // キャッシュキーを生成
    const cacheKey = `${text}-${this.voiceId}-${this.sampleRate}`;
    
    // キャッシュを確認
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }
    
    // HTTP APIで音声生成
    const audioBuffer = await this.httpSession.tts(request);
    
    // キャッシュに保存
    this.audioCache.set(cacheKey, audioBuffer);
    
    return audioBuffer;
  }
}
```

**効果**: 2回目以降のリクエストでレイテンシーを大幅に削減（約99%削減）

## 推奨される改善策（優先順位順）

### 1. 接続プーリングの最適化（簡単・効果的）
- **効果**: 約50-100ms削減
- **実装難易度**: 低
- **推奨度**: ⭐⭐⭐⭐⭐

### 2. HTTP/2の導入（効果的）
- **効果**: 約20-30%のレイテンシー削減が期待できる
- **実装難易度**: 中
- **推奨度**: ⭐⭐⭐⭐
- **注意**: Fish Audio APIがHTTP/2をサポートしている必要がある

### 3. プリコネクトの活用（効果的）
- **効果**: 約100-200ms削減
- **実装難易度**: 中
- **推奨度**: ⭐⭐⭐⭐

### 4. 並行処理とリクエストのバッチング（効果的）
- **効果**: 約20-30%削減の可能性
- **実装難易度**: 高
- **推奨度**: ⭐⭐⭐
- **注意**: エモーションタグの処理に影響する可能性

### 5. キャッシュの活用（効果的）
- **効果**: 2回目以降で約99%削減
- **実装難易度**: 中
- **推奨度**: ⭐⭐⭐⭐
- **注意**: メモリ使用量の増加

## 実装の優先順位

### 短期的な改善（即座に実装可能）
1. **接続プーリングの最適化**: maxSockets, maxFreeSocketsの調整
2. **プリコネクトの活用**: 最初のリクエスト前に接続を確立

### 中期的な改善（調査が必要）
1. **HTTP/2の導入**: Fish Audio APIのサポート状況を確認
2. **キャッシュの活用**: メモリ使用量を考慮して実装

### 長期的な改善（要検討）
1. **HTTP/3の導入**: Fish Audio APIのサポート状況を確認
2. **CDN/エッジコンピューティング**: Fish Audioが提供しているか確認

## 結論

HTTP APIでも以下の技術により、レイテンシーを改善できます：

1. **接続プーリングの最適化**: 約50-100ms削減
2. **HTTP/2の導入**: 約20-30%のレイテンシー削減
3. **プリコネクトの活用**: 約100-200ms削減
4. **並行処理**: 約20-30%削減の可能性
5. **キャッシュ**: 2回目以降で約99%削減

これらの技術を組み合わせることで、HTTP APIでもWebSocket APIに近いレイテンシーを実現できる可能性があります。

