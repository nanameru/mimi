# Fish Audio vs LiveKit データ形式の期待値分析

## 調査日時
2025年1月5日

## 問題の整理

### Fish Audio HTTP APIが返しているもの

#### リクエスト
```typescript
const request = new TTSRequest(fullText, {
  referenceId: this.ttsInstance.voiceId,
  format: 'pcm',           // ← PCM形式を要求
  sampleRate: 44100,       // ← 44100Hzを要求
  chunkLength: 100,
  latency: 'balanced',
  normalize: true,         // ← 正規化を有効化
});
```

#### レスポンスヘッダー（ログから）
```
TTS Response Content-Type: audio/pcm
```
- ✅ HTTP APIは`audio/pcm`形式で返していると**宣言**している

#### 実際のデータ（ログから）

**ケース1: 正常なPCMデータ**
```
[FishAudioTTS] 🔍 First chunk preview (hex): fdfffdfffefffdff0000000000000000ffff0000ffffffffffff000000000000
[FishAudioTTS] 📊 First 10 PCM samples (Int16): [-3, -2, -2, -2, -1, 0, 0, -1, -1, -1]
[FishAudioTTS] 📊 Sample range: [-3, 0]
```
- 先頭バイト: `fdff` (リトルエンディアンで `-3` = 0xFFFD)
- サンプル範囲: `[-3, 0]` ← **異常に小さい**

**ケース2: MP3形式の可能性**
```
[FishAudioTTS] ⚠️ WARNING: First bytes suggest MP3 format (FFFFFFFF), but PCM format was requested!
[FishAudioTTS] 📊 First 10 PCM samples (Int16): [-1, -1, -1, -1, -1, -1, -1, 0, 0, 0]
[FishAudioTTS] 📊 Sample range: [-2, 0]
[FishAudioTTS] ✓ Normal amplitude detected (max: 32768)  ← これも異常（Int16の範囲外）
```
- 先頭バイト: `FFFFFFFF` ← MP3のマジックナンバーの可能性
- しかし`Content-Type: audio/pcm`が返されている

**ケース3: 後続チャンク（正常な範囲）**
```
[FishAudioTTS] ⚠️ Low amplitude detected (range: [-105, 71]). Applying gain: 312x
```
- サンプル範囲: `[-105, 71]` ← これも小さいが、最初よりは大きい

### LiveKit AudioFrameが期待しているもの

#### コンストラクタ
```typescript
const audioFrame = new AudioFrame(
  pcmData,                      // Int16Array形式のPCMデータ
  this.ttsInstance.sampleRate,  // 44100Hz
  this.ttsInstance.numChannels, // 1 (モノラル)
  samplesPerChannel,            // チャンネルあたりのサンプル数
);
```

#### 期待される形式
- **データ型**: `Int16Array` (16-bit signed integer)
- **エンディアン**: リトルエンディアン（Node.jsのデフォルト）
- **サンプルレート**: 44100Hz
- **チャンネル数**: 1 (モノラル)
- **サンプル範囲**: `[-32768, 32767]` (Int16の範囲)
- **正規化**: 未正規化の生PCMデータ（-32768 ～ 32767の範囲）

### 現在の変換処理

```typescript
// HTTP APIから受信したデータ
const audioChunk: Buffer = ...;  // fish-audio-sdkから返される

// Buffer を Int16Array (PCM) に変換
const allSamples = new Int16Array(
  audioChunk.buffer,           // ArrayBuffer
  audioChunk.byteOffset,        // バイトオフセット
  audioChunk.length / 2,       // 16bit = 2バイト = 1サンプル
);

// LiveKit AudioFrame に変換
const audioFrame = new AudioFrame(
  pcmData,                      // Int16Array
  this.ttsInstance.sampleRate,  // 44100Hz
  this.ttsInstance.numChannels, // 1
  samplesPerChannel,
);
```

## 問題の原因

### 1. データ形式の不一致

**問題**: HTTP APIが`Content-Type: audio/pcm`を返しているが、実際のデータがMP3形式の可能性がある

**根拠**:
- 先頭バイトが`FFFFFFFF`でMP3のマジックナンバーを示唆
- しかし`Content-Type: audio/pcm`が返されている

**考えられる原因**:
- Fish Audio APIのバグで、`format: 'pcm'`を指定してもMP3形式で返している
- または、`normalize: true`が原因でデータ形式が変わっている可能性

### 2. 振幅の異常な小ささ

**問題**: サンプル範囲が`[-3, 0]`と異常に小さい

**考えられる原因**:
- `normalize: true`が原因で、データが正規化（浮動小数点形式：-1.0 ～ 1.0）されているのに、`Int16Array`として解釈している
- または、8ビットPCMが16ビットとして解釈されている

**例**:
- 正規化されたデータ: `-0.0001` → `Int16Array`として解釈すると `-1` になる
- 8ビットPCM (`-3`) → `Int16Array`として解釈すると `-3` になる（これは正常）

### 3. エンディアンの問題

**問題**: `Int16Array`はリトルエンディアンとして解釈されるが、HTTP APIがビッグエンディアンで返している可能性

**根拠**:
- ログで`First sample (Little Endian): -3`と`First sample (Big Endian): -513`が確認されている
- リトルエンディアンが正しいと仮定すると、`-3`は正常な値

## 結論

### Fish Audioが返しているもの
1. **宣言**: `Content-Type: audio/pcm`（PCM形式）
2. **実際**: 
   - 場合によってはMP3形式の可能性（先頭バイトが`FFFFFFFF`）
   - または、正規化されたPCMデータ（振幅が異常に小さい）
   - または、8ビットPCMデータが16ビットとして解釈されている

### LiveKitが期待しているもの
1. **形式**: `Int16Array`形式の16-bit PCMデータ
2. **エンディアン**: リトルエンディアン
3. **サンプルレート**: 44100Hz
4. **チャンネル数**: 1 (モノラル)
5. **振幅範囲**: `[-32768, 32767]`（未正規化の生PCMデータ）

## 解決策の提案

### 1. データ形式の確認
- HTTP APIが実際に返しているデータ形式を確認する
- MP3形式の場合は、デコードが必要

### 2. 正規化の確認
- `normalize: true`が原因で、データが正規化されている可能性がある
- `normalize: false`に変更して確認

### 3. 振幅の確認
- サンプル範囲が異常に小さい場合は、スケーリングが必要
- ただし、現在の実装で自動増幅を追加しているが、まだ問題が残っている

