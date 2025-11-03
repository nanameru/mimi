# HTTP API切り替え時のレイテンシー改善策 調査レポート

## 調査日時
2025年1月5日

## 改善策の検討

### 1. ハイブリッドアプローチ（WebSocket + HTTP API）

#### 1.1 基本コンセプト
- エモーションタグがないテキスト: WebSocket APIを使用（高速）
- エモーションタグがあるテキスト: HTTP APIを使用（エモーションタグ対応）

#### 1.2 実装方法
```typescript
async run() {
  // テキストをバッファリング
  const textBuffer: string[] = [];
  for await (const text of this.input) {
    textBuffer.push(text);
  }
  
  const fullText = textBuffer.join('');
  
  // エモーションタグの検出
  const hasEmotionTags = /\([a-z\s]+\)/i.test(fullText);
  
  if (hasEmotionTags) {
    // HTTP APIを使用（エモーションタグ対応）
    const session = new Session(this.apiKey);
    const request = new TTSRequest(fullText, {
      referenceId: this.voiceId,
      format: 'pcm',
      sampleRate: this.sampleRate,
    });
    
    for await (const chunk of session.tts(request)) {
      // LiveKit AudioFrameに変換して送信
    }
  } else {
    // WebSocket APIを使用（高速）
    // 既存の実装をそのまま使用
  }
}
```

#### 1.3 メリット・デメリット
**メリット**:
- エモーションタグがある場合のみHTTP APIを使用
- エモーションタグがない場合はWebSocket APIの高速性を維持
- 柔軟な対応が可能

**デメリット**:
- エモーションタグがある場合のレイテンシーは依然として高い
- 実装が複雑になる

### 2. チャンクごとのHTTP API呼び出し（エモーションタグを保持）

#### 2.1 基本コンセプト
- テキストを文単位で分割
- 各文にエモーションタグが含まれているか確認
- エモーションタグを含む文は完全な文としてHTTP APIに送信
- エモーションタグを含まない文はWebSocket APIに送信

#### 2.2 実装方法
```typescript
async run() {
  const textBuffer: string[] = [];
  for await (const text of this.input) {
    textBuffer.push(text);
  }
  
  const fullText = textBuffer.join('');
  
  // 文単位で分割（句点や改行で分割）
  const sentences = fullText.split(/([。！？\n])/).filter(s => s.trim());
  
  // 各文を処理
  for (const sentence of sentences) {
    const hasEmotionTags = /^\([a-z\s]+\)/.test(sentence.trim());
    
    if (hasEmotionTags) {
      // HTTP APIで処理（エモーションタグ対応）
      const session = new Session(this.apiKey);
      const request = new TTSRequest(sentence, {
        referenceId: this.voiceId,
        format: 'pcm',
        sampleRate: this.sampleRate,
      });
      
      for await (const chunk of session.tts(request)) {
        // LiveKit AudioFrameに変換して送信
      }
    } else {
      // WebSocket APIで処理（高速）
      // 既存の実装を使用
    }
  }
}
```

#### 2.3 メリット・デメリット
**メリット**:
- エモーションタグを含む文のみHTTP APIを使用
- エモーションタグを含まない文はWebSocket APIで高速処理
- レイテンシーの改善が期待できる

**デメリット**:
- 文の分割が複雑になる可能性
- エモーションタグが複数の文にまたがる場合の処理が困難

### 3. エモーションタグの事前処理と置き換え

#### 3.1 基本コンセプト
- エモーションタグを検出して、別の方法で送信
- HTTP APIの`prosody`フィールドを活用（speed, volume）
- または、エモーションタグを削除して通常のテキストとして送信

#### 3.2 実装方法
```typescript
// エモーションタグを検出して削除
function removeEmotionTags(text: string): string {
  return text.replace(/\([a-z\s]+\)/gi, '').trim();
}

// エモーションタグを抽出
function extractEmotionTags(text: string): string[] {
  const matches = text.match(/\([a-z\s]+\)/gi);
  return matches || [];
}

async run() {
  const textBuffer: string[] = [];
  for await (const text of this.input) {
    textBuffer.push(text);
  }
  
  const fullText = textBuffer.join('');
  
  // エモーションタグを抽出
  const emotionTags = extractEmotionTags(fullText);
  const cleanText = removeEmotionTags(fullText);
  
  // エモーションタグがある場合は、HTTP APIを使用
  if (emotionTags.length > 0) {
    // HTTP APIで処理（エモーションタグなしのテキスト）
    // ただし、エモーションタグの効果は失われる
  } else {
    // WebSocket APIで処理（高速）
  }
}
```

#### 3.3 メリット・デメリット
**メリット**:
- WebSocket APIの高速性を維持
- 実装が簡単

**デメリット**:
- エモーションタグの効果が失われる（意味がない）

### 4. 並行処理とプリフェッチ

#### 4.1 基本コンセプト
- LLMがテキストを生成しながら、並行してHTTP APIを呼び出す準備
- テキストの一部が確定したら、HTTP APIを呼び出す
- エモーションタグを含む文が確定したら、すぐにHTTP APIを呼び出す

#### 4.2 実装方法
```typescript
async run() {
  const httpSession = new Session(this.apiKey);
  const pendingRequests: Promise<void>[] = [];
  
  let currentSentence = '';
  
  for await (const text of this.input) {
    currentSentence += text;
    
    // 文の終わりを検出（句点、改行など）
    if (/[。！？\n]/.test(text)) {
      const sentence = currentSentence.trim();
      currentSentence = '';
      
      // エモーションタグがある場合は、HTTP APIを並行呼び出し
      if (/\([a-z\s]+\)/i.test(sentence)) {
        const requestPromise = this.processWithHttpAPI(sentence, httpSession);
        pendingRequests.push(requestPromise);
      } else {
        // WebSocket APIで処理（高速）
      }
    }
  }
  
  // すべてのリクエストが完了するまで待機
  await Promise.all(pendingRequests);
}
```

#### 4.3 メリット・デメリット
**メリット**:
- テキストが確定したらすぐにHTTP APIを呼び出せる
- 並行処理でレイテンシーを改善

**デメリット**:
- 実装が複雑
- エモーションタグが複数の文にまたがる場合の処理が困難

### 5. 他のTTSサービスやフレームワークの検討

#### 5.1 Koemotion（rinna株式会社）
- **特徴**: ストリーミング再生に対応、平均80文字のテキストに対し0.2秒以内で音声再生
- **エモーションタグ**: サポート状況不明
- **URL**: https://rinna.co.jp/news/2024/06/20240624.html

#### 5.2 Pipecat
- **特徴**: 音声およびマルチモーダル対話型エージェントを構築するためのオープンソースフレームワーク
- **エモーションタグ**: サポート状況不明
- **URL**: https://zenn.dev/kun432/scraps/d05a6d0ffa92d3

#### 5.3 Dubverse TTS API
- **特徴**: 約400msのレイテンシーで高品質な音声を生成
- **エモーションタグ**: サポート状況不明
- **URL**: https://dubverse.ai/ja/api/

### 6. 推奨される改善策

#### 6.1 最優先: ハイブリッドアプローチ（方法1）
- エモーションタグがない場合はWebSocket APIを使用（高速）
- エモーションタグがある場合のみHTTP APIを使用
- 実装が比較的簡単で、効果が期待できる

#### 6.2 次点: チャンクごとのHTTP API呼び出し（方法2）
- 文単位で処理することで、レイテンシーを改善
- エモーションタグを含む文のみHTTP APIを使用
- 実装が複雑になるが、効果が大きい

#### 6.3 調査が必要: 他のTTSサービス
- KoemotionやDubverseなどの低レイテンシーTTSサービスを調査
- エモーションタグのサポート状況を確認
- 可能であれば、これらのサービスに切り替え

## 結論

### 最も効果的な改善策
**ハイブリッドアプローチ**を推奨します：
1. エモーションタグがないテキスト: WebSocket APIを使用（現在の高速性を維持）
2. エモーションタグがあるテキスト: HTTP APIを使用（エモーションタグ対応）

これにより、エモーションタグがない場合は現在のレイテンシー（約5-6秒）を維持し、エモーションタグがある場合のみレイテンシーが増加（約8-12秒）します。

### さらなる改善の可能性
- チャンクごとのHTTP API呼び出しで、レイテンシーをさらに改善できる可能性
- 他のTTSサービスを調査して、エモーションタグと低レイテンシーの両立を実現

