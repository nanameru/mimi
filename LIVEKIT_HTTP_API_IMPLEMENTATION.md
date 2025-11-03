# LiveKit Agents HTTP API実装方法 調査レポート

## 調査日時
2025年1月5日

## 背景
LiveKit Agentsでは、現在WebSocketを使用してストリーミングTTSを実装しているが、Fish AudioのHTTP APIに切り替えてエモーションタグをサポートしたい。

## 重要な発見

### 1. LiveKit AgentsのTTS実装

#### 1.1 `stream()`と`synthesize()`の違い
- **`stream()`**: `tts.SynthesizeStream`を返す。LLMからのテキストストリームをリアルタイムで音声に変換
- **`synthesize()`**: `tts.ChunkedStream`を返す。完全なテキストを受け取ってから音声を合成

#### 1.2 現在の実装
```typescript
// custom-fish-tts.ts
super(sampleRate, numChannels, {
  streaming: true,  // ストリーミング対応を宣言
});

stream(): tts.SynthesizeStream {
  return new FishAudioSynthesizeStream(this);
}

synthesize(text: string): tts.ChunkedStream {
  return new FishAudioChunkedStream(text, this);
}
```

**重要な点**:
- LiveKit Agentsは`stream()`を優先的に使用する
- `streaming: true`を設定すると、`stream()`が呼ばれる
- `streaming: false`に設定すると、`synthesize()`が呼ばれる可能性がある

### 2. Fish Audio HTTP APIの実装

#### 2.1 HTTP APIの実装方法
**ファイル**: `node_modules/fish-audio-sdk/dist/session.js`

```javascript
async *tts(request, additionalHeaders = {}) {
    const requestPayload = request.toJSON();
    const response = await this.client.post('/v1/tts', requestPayload, {
        responseType: 'stream',
        headers: {
            'Content-Type': 'application/json',
            ...additionalHeaders
        }
    });
    for await (const chunk of response.data) {
        yield Buffer.from(chunk);
    }
}
```

**重要な点**:
- HTTP APIでも`responseType: 'stream'`を使用してストリーミングレスポンスを受信できる
- チャンクごとに音声データを受信できる
- エモーションタグがテキスト内に含まれていれば、HTTP APIで処理される可能性がある

#### 2.2 HTTP APIとWebSocket APIの違い
- **HTTP API**: リクエストごとに新しい接続を作成。エモーションタグがサポートされている可能性
- **WebSocket API**: 接続を維持してストリーミング。エモーションタグがサポートされていない

### 3. LiveKit AgentsでHTTP APIを使用する実装方法

#### 3.1 実装アプローチ

**方法1: `streaming: false`に設定して`synthesize()`を使用**
```typescript
// ストリーミングを無効化
super(sampleRate, numChannels, {
  streaming: false,  // ストリーミング無効
});

// synthesize()でHTTP APIを使用
async run() {
  const session = new Session(this.apiKey);
  const request = new TTSRequest(this.text, {
    referenceId: this.voiceId,
    format: 'pcm',
    sampleRate: this.sampleRate,
  });
  
  const audioChunks: Buffer[] = [];
  for await (const chunk of session.tts(request)) {
    audioChunks.push(chunk);
  }
  // 音声データを処理
}
```

**方法2: `stream()`内でHTTP APIを使用（疑似ストリーミング）**
```typescript
// streaming: trueのまま、HTTP APIを使用
async run() {
  const session = new Session(this.apiKey);
  
  // テキストをバッファリング
  let fullText = '';
  for await (const text of this.input) {
    fullText += text;
  }
  
  // HTTP APIで音声を生成（ストリーミングレスポンス）
  const request = new TTSRequest(fullText, {
    referenceId: this.voiceId,
    format: 'pcm',
    sampleRate: this.sampleRate,
  });
  
  // HTTP APIはストリーミングレスポンスを返すので、チャンクごとに処理
  for await (const chunk of session.tts(request)) {
    // LiveKit AudioFrameに変換して送信
    this.queue.put(audio);
  }
}
```

#### 3.2 推奨される実装方法

**推奨: 方法2（疑似ストリーミング）**
- `streaming: true`を維持できる
- HTTP APIのストリーミングレスポンスを活用できる
- テキストをバッファリングしてからHTTP APIに送信
- レスポンスはチャンクごとに受信してLiveKitに送信

**注意点**:
- LLMからのテキストストリームを完全に受信してからHTTP APIに送信する必要がある
- これにより、ストリーミングのメリット（低レイテンシー）が失われる可能性がある
- ただし、エモーションタグが正しく処理される可能性が高い

### 4. 実装の詳細

#### 4.1 必要な変更点

1. **WebSocketSessionからSessionへの切り替え**
```typescript
// 変更前
import { WebSocketSession, TTSRequest } from 'fish-audio-sdk';
this.wsSession = new WebSocketSession(this.apiKey);

// 変更後
import { Session, TTSRequest } from 'fish-audio-sdk';
this.httpSession = new Session(this.apiKey);
```

2. **stream()メソッドの実装変更**
```typescript
async run() {
  // テキストストリームを完全に受信
  const textBuffer: string[] = [];
  for await (const text of this.input) {
    if (text === FishAudioSynthesizeStream.FLUSH_SENTINEL) {
      break;
    }
    textBuffer.push(text);
  }
  
  const fullText = textBuffer.join('');
  
  // HTTP APIで音声生成
  const request = new TTSRequest(fullText, {
    referenceId: this.ttsInstance.voiceId,
    format: 'pcm',
    sampleRate: this.ttsInstance.sampleRate,
    normalize: true,
  });
  
  // HTTP APIはストリーミングレスポンスを返す
  let segmentId = 0;
  for await (const audioChunk of this.ttsInstance.httpSession.tts(request)) {
    // LiveKit AudioFrameに変換
    const pcmData = new Int16Array(
      audioChunk.buffer,
      audioChunk.byteOffset,
      audioChunk.length / 2,
    );
    const audioFrame = new AudioFrame(
      pcmData,
      this.ttsInstance.sampleRate,
      this.ttsInstance.numChannels,
      samplesPerChannel,
    );
    
    this.queue.put({
      requestId: '',
      segmentId: `segment-${segmentId++}`,
      frame: audioFrame,
      final: false,
    });
  }
}
```

#### 4.2 ストリーミングの処理方法

**LLMからのテキストストリームの処理**:
- LiveKit AgentsはLLMからのテキストストリームを`this.input`から受信
- `FLUSH_SENTINEL`が送られてきたら、テキストの受信が完了
- 受信したテキストを結合してHTTP APIに送信

**HTTP APIからの音声ストリームの処理**:
- HTTP APIは`responseType: 'stream'`を使用してストリーミングレスポンスを返す
- チャンクごとに音声データを受信
- 各チャンクをLiveKit AudioFrameに変換して`queue.put()`で送信

### 5. 課題と解決策

#### 5.1 レイテンシーの問題
- **課題**: HTTP APIはテキストを完全に受信してから音声生成を開始するため、レイテンシーが増加
- **解決策**: 
  - 短いテキストチャンクごとにHTTP APIを呼び出す（ただし、エモーションタグの処理に影響する可能性）
  - エモーションタグの優先度を検討

#### 5.2 エモーションタグの動作確認
- **課題**: HTTP APIでもエモーションタグが正しく処理されるか不明
- **解決策**: 
  - まずHTTP APIで動作確認
  - 動作しない場合は、Fish Audioのサポートに問い合わせ

### 6. 実装手順

1. **HTTP Sessionの追加**
   - `WebSocketSession`に加えて`Session`も保持
   - または、`WebSocketSession`を`Session`に置き換え

2. **stream()メソッドの変更**
   - テキストストリームを完全に受信
   - HTTP APIで音声生成
   - ストリーミングレスポンスをチャンクごとに処理

3. **エラーハンドリング**
   - HTTP APIのエラーハンドリングを追加
   - フォールバック処理を実装（必要に応じて）

4. **テスト**
   - エモーションタグが正しく処理されるか確認
   - レイテンシーの影響を測定

### 7. 参考資料

- LiveKit Agents TTS: https://docs.livekit.io/agents/build/tts/
- Fish Audio HTTP API: https://docs.fish.audio/api-reference/introduction
- Fish Audio SDK: https://www.npmjs.com/package/fish-audio-sdk

## 結論

LiveKit AgentsでHTTP APIを使用する実装は可能です。`stream()`メソッド内でHTTP APIを使用し、ストリーミングレスポンスをチャンクごとに処理することで、エモーションタグのサポートを実現できる可能性があります。ただし、レイテンシーの増加と、HTTP APIでのエモーションタグの動作確認が必要です。

