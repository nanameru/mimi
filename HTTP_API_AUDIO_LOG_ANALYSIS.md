# HTTP API音声ガビガビ問題 コンソールログ詳細分析

## 調査日時
2025年1月5日

## コンソールログからの重要な発見

### 1. HTTP APIレスポンスヘッダー
```
TTS Response Content-Type: audio/pcm
```
- ✅ HTTP APIは`audio/pcm`形式で返している
- ✅ `format: "pcm"`のリクエストが正しく処理されている

### 2. 最初のチャンクの先頭バイト分析

```
[FishAudioTTS] 🔍 First chunk preview (hex): fdfffdfffefffdff0000000000000000ffff0000ffffffffffff000000000000
[FishAudioTTS] 🔍 First chunk preview (decimal): 253, 255, 253, 255, 254, 255, 253, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0
[FishAudioTTS] 🔍 First chunk length: 813 bytes
[FishAudioTTS] ✓ First bytes suggest PCM format (FDFFFDFF)
```

**重要な発見**:
- 先頭バイト: `fdff` (リトルエンディアンで解釈すると `-3` = 0xFFFD)
- 2番目のバイトペア: `fdff` (`-3`)
- 3番目のバイトペア: `feff` (`-2`)
- 4番目のバイトペア: `fdff` (`-3`)

**問題点**:
- 先頭から連続して小さな負の値（-3, -3, -2, -3）が続いている
- その後、大量のゼロ（`0000000000000000`）が続いている
- これは正常な音声データとは異なるパターンです

### 3. 考えられる原因

#### 3.1 エンディアンの問題
- **現在の実装**: `new Int16Array(audioChunk.buffer, audioChunk.byteOffset, audioChunk.length / 2)`
- **問題**: `Int16Array`はデフォルトでリトルエンディアンとして解釈しますが、HTTP APIがビッグエンディアンで返している可能性があります

#### 3.2 データの変換方法の問題
- **現在の実装**: `audioChunk.buffer`を直接`Int16Array`に変換
- **問題**: `Buffer`の`byteOffset`が考慮されていない可能性があります

#### 3.3 サンプルレートの不一致
- **設定**: `sampleRate: 44100`
- **問題**: HTTP APIが返す音声のサンプルレートが実際には異なる可能性があります

#### 3.4 データの前処理が必要
- **問題**: HTTP APIが返すPCMデータに何らかの前処理（オフセット、スケーリングなど）が必要な可能性があります

### 4. 追加のログで確認すべきポイント

次回実行時に、以下の詳細なログが出力されます：

1. **最初の10サンプルの値**: 実際のPCMデータの値を確認
2. **リトルエンディアンとビッグエンディアン**: どちらで解釈するのが正しいか
3. **サンプルの範囲**: データがクリッピングされていないか
4. **ゼロクロッシング**: 正常な音声データなら適度なゼロクロッシングがあるはず

### 5. 推奨される修正方法

#### 5.1 エンディアンの確認と修正
```typescript
// リトルエンディアンとビッグエンディアンの両方を試す
const pcmDataLE = new Int16Array(audioChunk.buffer, audioChunk.byteOffset, audioChunk.length / 2);
// またはビッグエンディアンで手動変換
const pcmDataBE = Buffer.from(audioChunk).swap16();
```

#### 5.2 Bufferの扱いを修正
```typescript
// BufferをコピーしてからInt16Arrayに変換
const bufferCopy = Buffer.from(audioChunk);
const pcmData = new Int16Array(bufferCopy.buffer, bufferCopy.byteOffset, bufferCopy.length / 2);
```

### 6. 次のステップ

1. 追加したログを確認して、実際のPCMサンプル値を確認
2. エンディアンの問題を特定
3. 必要に応じて、データの変換方法を修正

