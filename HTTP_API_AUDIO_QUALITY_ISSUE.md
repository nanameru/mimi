# HTTP API音声ガビガビ問題 原因調査レポート

## 調査日時
2025年1月5日

## 問題の症状
- 音声がガビガビすぎて何も聞こえない
- HTTP APIに切り替えた後に発生

## 考えられる原因

### 1. HTTP APIが返す音声データの形式が異なる可能性

#### 1.1 現在の実装
```typescript
// custom-fish-tts.ts の実装
const request = new TTSRequest(fullText, {
  format: 'pcm',  // PCM形式を指定
  sampleRate: this.ttsInstance.sampleRate,
  // ...
});

// HTTP APIから受信したデータをPCMとして扱う
const pcmData = new Int16Array(
  audioChunk.buffer,
  audioChunk.byteOffset,
  audioChunk.length / 2,  // 16bit PCMとして扱う（2バイト = 1サンプル）
);
```

#### 1.2 問題点
- HTTP APIが実際にPCM形式で返しているか確認が必要
- HTTP APIのストリーミングレスポンスでは、MP3などの圧縮形式が返される可能性がある
- MP3データをPCMとして扱うと、音声がガビガビになる

### 2. エンディアンの問題

#### 2.1 現在の実装
```typescript
const pcmData = new Int16Array(
  audioChunk.buffer,
  audioChunk.byteOffset,
  audioChunk.length / 2,
);
```

#### 2.2 問題点
- HTTP APIが返すPCMデータのエンディアン（リトルエンディアン vs ビッグエンディアン）が正しく処理されていない可能性
- WebSocket APIとHTTP APIでエンディアンが異なる可能性

### 3. サンプルレートやチャンネル数の不一致

#### 3.1 現在の実装
```typescript
super(sampleRate, numChannels, {
  streaming: true,
});

// ...
const audioFrame = new AudioFrame(
  pcmData,
  this.ttsInstance.sampleRate,  // 44100Hz
  this.ttsInstance.numChannels, // 1 (モノラル)
  samplesPerChannel,
);
```

#### 3.2 問題点
- HTTP APIが返す音声のサンプルレートが設定（44100Hz）と異なる可能性
- HTTP APIが返す音声がステレオ（2チャンネル）で、モノラル（1チャンネル）として扱っている可能性

### 4. HTTP APIのデフォルトフォーマット

#### 4.1 ドキュメントの確認
- Fish Audio APIのドキュメントによると、デフォルトの`format`は`mp3`です
- 現在の実装では`format: 'pcm'`を指定していますが、HTTP APIが実際にPCM形式で返しているか確認が必要です

#### 4.2 問題点
- HTTP APIが`format: 'pcm'`を指定しても、実際にはMP3形式で返している可能性
- MP3データをPCMとして扱うと、音声がガビガビになる

### 5. WebSocket APIとHTTP APIの違い

#### 5.1 WebSocket APIの実装（以前の実装）
- WebSocket APIはバイナリデータを直接PCM形式で返す
- エンディアンやフォーマットの変換が不要

#### 5.2 HTTP APIの実装（現在の実装）
- HTTP APIはストリーミングレスポンスを返すが、実際のデータ形式が不明
- デコード処理が必要な可能性がある

## 確認すべきポイント

1. **HTTP APIが返すデータ形式の確認**
   - 実際にPCM形式で返されているか
   - MP3などの圧縮形式が返されているか

2. **PCMデータの変換方法の確認**
   - エンディアンが正しいか
   - サンプルレートやチャンネル数が正しいか

3. **HTTP APIのレスポンスヘッダーの確認**
   - Content-Typeがaudio/pcmか、audio/mpegかなど

4. **WebSocket APIとHTTP APIの実装の違い**
   - WebSocket APIではどのように処理していたか
   - HTTP APIではどのように処理するべきか

## 推奨される調査方法

1. **HTTP APIのレスポンスを確認**
   - レスポンスヘッダーのContent-Typeを確認
   - 実際に返されるデータの先頭バイトを確認（MP3の場合は`FF FB`など）

2. **PCMデータの変換方法を確認**
   - エンディアンの変換が必要か
   - サンプルレートやチャンネル数の変換が必要か

3. **WebSocket APIの実装を参考にする**
   - WebSocket APIではどのように処理していたか
   - HTTP APIでも同じ方法で処理できるか

## 次のステップ

1. HTTP APIが返すデータ形式を確認する
2. 必要に応じて、MP3デコーダーを追加する
3. PCMデータの変換方法を修正する

