# HTTP API音声ガビガビ問題 コンソールログ分析レポート

## 調査日時
2025年1月5日

## コンソールログからの発見

### 1. HTTP APIリクエストの確認

```
TTS Request: {
  "text": "(happy) こんにちは！今日はどんなことをお話ししましょうか？お力になれることがあれば教えてください！",
  "chunk_length": 100,
  "format": "pcm",
  "mp3_bitrate": 128,
  "sample_rate": 44100,
  "references": [],
  "reference_id": "8d361d12552248389cbd10c003972026",
  "normalize": true,
  "latency": "balanced"
}
TTS Headers: {
  "model": "speech-1.5"
}
```

**重要な点**:
- ✅ `format: "pcm"`が指定されている
- ✅ `sample_rate: 44100`が指定されている
- ✅ `normalize: true`が設定されている

### 2. 音声データの受信

```
[FishAudioTTS] ⏱️ First audio chunk received after 2105ms
[FishAudioTTS] ⏱️ Total audio generation: 3637ms (583 chunks)
```

**重要な点**:
- ✅ 583チャンクの音声データが受信されている
- ✅ 最初のチャンクが約2秒で受信されている

### 3. 問題点

**HTTP APIのレスポンスヘッダーがログに出力されていない**
- `Content-Type`が`audio/pcm`か`audio/mpeg`かなどが不明
- 実際に返されるデータ形式が確認できない

**PCMデータの変換方法が確認できない**
- 現在の実装では`audioChunk.length / 2`でInt16Arrayを作成しているが、実際のデータ形式が不明

## 考えられる原因

### 1. HTTP APIがMP3形式で返している可能性

**根拠**:
- Fish Audio APIのドキュメントによると、デフォルトの`format`は`mp3`です
- `format: "pcm"`を指定しても、HTTP APIがMP3形式で返している可能性があります
- MP3データをPCMとして扱うと、音声がガビガビになります

### 2. PCMデータのエンディアンが間違っている可能性

**根拠**:
- 現在の実装では、リトルエンディアンとして扱っていますが、ビッグエンディアンで返されている可能性があります
- エンディアンが間違っていると、音声がガビガビになります

### 3. サンプルレートやチャンネル数が間違っている可能性

**根拠**:
- HTTP APIが返す音声のサンプルレートが設定（44100Hz）と異なる可能性があります
- HTTP APIが返す音声がステレオ（2チャンネル）で、モノラル（1チャンネル）として扱っている可能性があります

## 推奨される調査方法

### 1. HTTP APIのレスポンスヘッダーを確認
```typescript
// session.jsのtts()メソッドに追加
console.log('Response Content-Type:', response.headers['content-type']);
console.log('Response headers:', JSON.stringify(response.headers, null, 2));
```

### 2. 実際に返されるデータの先頭バイトを確認
```typescript
// custom-fish-tts.tsのrun()メソッドに追加
let firstChunk = true;
for await (const audioChunk of this.ttsInstance.httpSession.tts(request, {
  model: this.ttsInstance.backend,
})) {
  if (firstChunk) {
    console.log('First chunk bytes:', audioChunk.slice(0, 16).toString('hex'));
    console.log('First chunk length:', audioChunk.length);
    firstChunk = false;
  }
  // ...
}
```

### 3. PCMデータの形式を確認
- MP3の場合は先頭バイトが`FF FB`または`FF F3`など
- PCMの場合は先頭バイトが音声データそのもの

## 次のステップ

1. HTTP APIのレスポンスヘッダーを確認するログを追加
2. 実際に返されるデータの先頭バイトを確認するログを追加
3. データ形式に応じて適切な処理を実装する

