/**
 * 音声データからRMS値を計算するユーティリティ関数
 * CubismNativeSamplesの実装を参考にしています
 */

/**
 * PCMデータ（Int16Array）からRMS値を計算
 * @param audioData PCMデータ（Int16Array）
 * @param numChannels チャンネル数
 * @returns RMS値（0.0〜1.0の範囲）
 */
export function calculateRMSFromPCM(
  audioData: Int16Array,
  numChannels: number
): number {
  if (audioData.length === 0) {
    return 0.0;
  }

  const samplesPerChannel = audioData.length / numChannels;
  if (samplesPerChannel === 0) {
    return 0.0;
  }

  // RMS値を計算
  let sumSquares = 0.0;
  for (let i = 0; i < audioData.length; i++) {
    // Int16 (-32768〜32767) を -1.0〜1.0 の範囲に正規化
    const normalizedSample = audioData[i]! / 32768.0;
    sumSquares += normalizedSample * normalizedSample;
  }

  // 全チャンネル・全サンプルの平均を計算
  const rms = Math.sqrt(sumSquares / audioData.length);

  // 値を0.0〜1.0の範囲にクランプ（通常、RMS値は0.0〜1.0の範囲になる）
  return Math.max(0.0, Math.min(1.0, rms));
}

/**
 * AudioBufferからRMS値を計算
 * @param audioBuffer AudioBuffer
 * @returns RMS値（0.0〜1.0の範囲）
 */
export function calculateRMSFromAudioBuffer(audioBuffer: AudioBuffer): number {
  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;

  if (length === 0) {
    return 0.0;
  }

  // 全チャンネルのデータを取得して統合
  const channelData = audioBuffer.getChannelData(0); // 最初のチャンネルを使用
  let sumSquares = 0.0;

  for (let i = 0; i < length; i++) {
    const sample = channelData[i]!;
    sumSquares += sample * sample;
  }

  // RMS値を計算
  const rms = Math.sqrt(sumSquares / length);

  // 値を0.0〜1.0の範囲にクランプ
  return Math.max(0.0, Math.min(1.0, rms));
}

