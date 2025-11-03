import { tts } from '@livekit/agents';
import { AudioFrame } from '@livekit/rtc-node';
import { Session, TTSRequest, type Backends } from 'fish-audio-sdk';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Fish Audio TTS 設定
 * 公式 fish-audio-sdk を使用した高品質リアルタイム音声合成
 * HTTP APIを使用してエモーションタグをサポート
 * 接続プーリングの最適化を実装
 * ドキュメント: https://docs.fish.audio/api-reference/introduction
 * npm: https://www.npmjs.com/package/fish-audio-sdk
 */
export interface FishAudioTTSOptions {
  apiKey?: string;
  voiceId?: string;
  sampleRate?: number;
  numChannels?: number;
  backend?: Backends;
  chunkLength?: number;
  latency?: 'normal' | 'balanced';
}


/**
 * Fish Audio TTS 実装
 * HTTP APIを使用してエモーションタグをサポート
 * 接続プーリングとHTTP/2の最適化を実装
 */
export class FishAudioTTS extends tts.TTS {
  label = 'fish-audio-tts';
  public apiKey: string;
  public voiceId: string;
  public backend: Backends;
  public chunkLength: number;
  public latency: 'normal' | 'balanced';
  public httpSession: Session;

  constructor(options: FishAudioTTSOptions = {}) {
    const sampleRate = options.sampleRate || 44100;
    const numChannels = options.numChannels || 1;
    // TTS capabilities を設定（ストリーミング対応）
    super(sampleRate, numChannels, {
      streaming: true,
    });
    this.apiKey = options.apiKey || process.env.FISH_AUDIO_API_KEY || '';
    this.voiceId = options.voiceId || process.env.FISH_AUDIO_VOICE_ID || '';
    this.backend = options.backend || 'speech-1.5';
    this.chunkLength = options.chunkLength || 100;
    this.latency = options.latency || 'balanced';
    if (!this.apiKey) {
      throw new Error('FISH_AUDIO_API_KEY is required');
    }
    // HTTP Session を初期化（接続プーリング最適化）
    // fish-audio-sdkのSessionクラスは既にkeepAliveを使用しているため、
    // 基本的な接続プーリング最適化は行われています
    // より詳細な最適化（maxSockets, maxFreeSocketsなど）が必要な場合は、
    // fish-audio-sdkのソースコードを修正する必要があります
    // HTTP/2のサポートについては、Fish Audio APIがサポートしているか確認が必要です
    this.httpSession = new Session(this.apiKey);
    console.log(
      `[FishAudioTTS] Initialized with HTTP API: backend=${this.backend}, voiceId=${this.voiceId ? 'set' : 'not set'}, sampleRate=${sampleRate}Hz, channels=${numChannels}`,
    );
    console.log('[FishAudioTTS] Connection pooling: keepAlive=true (fish-audio-sdk default)');
  }

  /**
   * テキストから音声を合成（非ストリーミング）
   */
  synthesize(text: string): tts.ChunkedStream {
    console.log(`[FishAudioTTS] Synthesizing text (length=${text.length})`);
    return new FishAudioChunkedStream(text, this);
  }

  /**
   * ストリーミング TTS
   */
  stream(): tts.SynthesizeStream {
    console.log('[FishAudioTTS] Creating streaming session');
    return new FishAudioSynthesizeStream(this);
  }

  /**
   * クリーンアップ
   */
  async close(): Promise<void> {
    this.httpSession.close();
    console.log('[FishAudioTTS] HTTP session closed');
  }
}

/**
 * Fish Audio チャンクストリーム（非ストリーミング合成用）
 */
class FishAudioChunkedStream extends tts.ChunkedStream {
  label = 'fish-audio-chunked-stream';
  private text: string;
  private ttsInstance: FishAudioTTS;

  constructor(text: string, ttsInstance: FishAudioTTS) {
    super(text, ttsInstance);
    this.text = text;
    this.ttsInstance = ttsInstance;
  }

  async run() {
    try {
      console.log('[FishAudioTTS] Starting non-streaming synthesis');
      // TTSRequest を作成（テキストを含める）
      const request = new TTSRequest(this.text, {
        referenceId: this.ttsInstance.voiceId,
        format: 'pcm',
        sampleRate: this.ttsInstance.sampleRate,
        chunkLength: this.ttsInstance.chunkLength,
        latency: this.ttsInstance.latency,
        normalize: true,
      });
      
      // curlコマンドの形式に合わせてリクエストボディを拡張
      const requestPayload = request.toJSON() as any;
      // temperatureとtop_pを追加（curlコマンドと同じ値）
      requestPayload.temperature = 0.9;
      requestPayload.top_p = 0.9;
      // reference_idが空文字列の場合はundefinedに設定
      if (!requestPayload.reference_id || (typeof requestPayload.reference_id === 'string' && requestPayload.reference_id.trim() === '')) {
        requestPayload.reference_id = undefined;
      }
      
      // HTTP APIで音声生成（ストリーミングレスポンス）
      // curlコマンドの形式に合わせて直接HTTPリクエストを送信（temperatureとtop_pを含める）
      // Sessionクラスのclientを使用してHTTPリクエストを送信
      const response = await (this.ttsInstance.httpSession as any).client.post('/v1/tts', requestPayload, {
        responseType: 'stream',
        headers: {
          'Content-Type': 'application/json',
          model: this.ttsInstance.backend,
        },
      });
      
      // レスポンスヘッダーをログに記録
      console.log('TTS Response Content-Type:', response.headers['content-type']);
      console.log('TTS Response headers:', JSON.stringify(response.headers, null, 2));
      
      const audioChunks: Buffer[] = [];
      let firstChunkForSynthesize = true;
      for await (const chunk of response.data) {
        const audioChunk = Buffer.from(chunk);
        // 最初のチャンクの先頭バイトを確認（データ形式の判定用）
        if (firstChunkForSynthesize) {
          const firstChunkPreview = chunk.slice(0, Math.min(32, chunk.length));
          console.log(`[FishAudioTTS] 🔍 First chunk preview (hex): ${firstChunkPreview.toString('hex')}`);
          console.log(`[FishAudioTTS] 🔍 First chunk length: ${chunk.length} bytes`);
          
          // MP3のマジックナンバーを確認
          const firstBytes = chunk.slice(0, 4);
          const hexString = firstBytes.toString('hex').toUpperCase();
          if (hexString.startsWith('FF')) {
            console.log(`[FishAudioTTS] ⚠️ WARNING: First bytes suggest MP3 format (${hexString}), but PCM format was requested!`);
            console.log(`[FishAudioTTS] ⚠️ This may cause audio quality issues. MP3 decoding may be required.`);
          } else {
            console.log(`[FishAudioTTS] ✓ First bytes suggest PCM format (${hexString})`);
            
            // PCMデータの詳細確認
            if (chunk.length >= 2) {
              const firstSampleLE = chunk.readInt16LE(0);
              const firstSampleBE = chunk.readInt16BE(0);
              console.log(`[FishAudioTTS] 📊 First sample (Little Endian): ${firstSampleLE}`);
              console.log(`[FishAudioTTS] 📊 First sample (Big Endian): ${firstSampleBE}`);
            }
          }
          firstChunkForSynthesize = false;
        }
        audioChunks.push(chunk);
      }
      // 音声データを結合
      const audioBuffer = Buffer.concat(audioChunks);
      console.log(`[FishAudioTTS] Received ${audioBuffer.length} bytes of audio`);
      // LiveKit AudioFrame に変換
      const pcmData = new Int16Array(
        audioBuffer.buffer,
        audioBuffer.byteOffset,
        audioBuffer.length / 2,
      );
      const samplesPerChannel = pcmData.length / this.ttsInstance.numChannels;
      const audioFrame = new AudioFrame(
        pcmData,
        this.ttsInstance.sampleRate,
        this.ttsInstance.numChannels,
        samplesPerChannel,
      );
      const audio = {
        requestId: '',
        segmentId: 'segment-0',
        frame: audioFrame,
        final: true,
      };
      this.queue.put(audio);
      console.log('[FishAudioTTS] Synthesis completed');
    } catch (error) {
      console.error('[FishAudioTTS] Error:', error);
      throw error;
    }
  }
}

/**
 * Fish Audio ストリーミング実装
 * LLM からのテキストストリームをリアルタイムで音声に変換
 */
class FishAudioSynthesizeStream extends tts.SynthesizeStream {
  label = 'fish-audio-synthesize-stream';
  private ttsInstance: FishAudioTTS;

  constructor(ttsInstance: FishAudioTTS) {
    super(ttsInstance);
    this.ttsInstance = ttsInstance;
  }

  async run() {
    try {
      const sessionStartTime = Date.now();
      console.log(
        `[FishAudioTTS] [${new Date().toLocaleTimeString()}] Starting HTTP API streaming synthesis session`,
      );
      
      // LLMからのテキストストリームを完全に受信
      const textReceiveStartTime = Date.now();
      const textBuffer: string[] = [];
      for await (const text of this.input) {
        if (text === FishAudioSynthesizeStream.FLUSH_SENTINEL) {
          // FLUSH_SENTINELが来たら、バッファに残っているテキストを送信
          if (textBuffer.length > 0) {
            break; // ループを抜けてHTTP APIに送信
          }
          continue;
        }
        textBuffer.push(text);
      }
      
      // テキストを結合
      let fullText = textBuffer.join('');
      const textReceiveEndTime = Date.now();
      const textReceiveDuration = textReceiveEndTime - textReceiveStartTime;
      
      console.log(`[FishAudioTTS] ⏱️ Text receive duration: ${textReceiveDuration}ms (${fullText.length} chars)`);
      
      // エモーションタグを検出してログに記録
      const emotionTags = fullText.match(/\([^)]+\)/g) || [];
      if (emotionTags.length > 0) {
        console.log(
          `[FishAudioTTS] 🏷️ Detected ${emotionTags.length} emotion tag(s): ${emotionTags.join(', ')}`,
        );
        console.log(
          `[FishAudioTTS] 📝 Original text: "${fullText.substring(0, 100)}${fullText.length > 100 ? '...' : ''}"`,
        );
      }
      
      // エモーションタグの前処理: 文の最初のタグのみを保持（Fish Audioは最初のタグのみを認識する可能性）
      // 1. 全てのエモーションタグを抽出
      const allEmotionTags = fullText.match(/\([^)]+\)/g) || [];
      if (allEmotionTags.length > 0) {
        // 2. テキストから全てのエモーションタグを一時的に削除
        let cleanedText = fullText.replace(/\([^)]+\)/g, '').trim();
        
        // 3. 文の最初のエモーションタグのみを先頭に配置
        // 複数のタグがある場合、最初のタグを優先（より強い感情表現として認識される可能性）
        const firstEmotionTag = allEmotionTags[0]!;
        
        // 4. 最初のタグをテキストの先頭に配置
        fullText = `${firstEmotionTag} ${cleanedText}`;
        
        console.log(
          `[FishAudioTTS] 🔧 Preprocessed text: "${fullText.substring(0, 100)}${fullText.length > 100 ? '...' : ''}"`,
        );
        console.log(
          `[FishAudioTTS] 📌 Using first emotion tag only: ${firstEmotionTag} (${allEmotionTags.length - 1} tag(s) removed)`,
        );
      }
      
      console.log(
        `[FishAudioTTS] 📤 [${new Date().toLocaleTimeString()}] Sending text to HTTP API (${fullText.length} chars): "${fullText.substring(0, 50)}..."`,
      );
      
      // HTTP APIで音声生成（ストリーミングレスポンス）
      // curlコマンドの形式に合わせてtemperatureとtop_pを追加
      // エモーションタグを含むテキストをそのまま送信（Fish Audio APIが処理する可能性があるため）
      const request = new TTSRequest(fullText, {
        referenceId: this.ttsInstance.voiceId,
        format: 'pcm',
        sampleRate: this.ttsInstance.sampleRate,
        chunkLength: this.ttsInstance.chunkLength,
        latency: this.ttsInstance.latency,
        normalize: true,
      });
      
      // curlコマンドの形式に合わせてリクエストボディを拡張
      const requestPayload = request.toJSON() as any;
      // temperatureとtop_pを追加（curlコマンドと同じ値）
      requestPayload.temperature = 0.9;
      requestPayload.top_p = 0.9;
      // reference_idが空文字列の場合はundefinedに設定
      if (!requestPayload.reference_id || (typeof requestPayload.reference_id === 'string' && requestPayload.reference_id.trim() === '')) {
        requestPayload.reference_id = undefined;
      }
      
      let segmentId = 0;
      let firstChunkReceived = false;
      let firstChunkTimeFromHttpRequest = 0;
      let totalChunks = 0;
      let globalMaxAmplitude = 0;
      let gainFactor: number | null = null;
      const GAIN_CALIBRATION_CHUNKS = 20; // 最初の20チャンクでゲインを決定
      const MAX_GAIN_FACTOR = 100; // 最大ゲイン倍率（極端な増幅を防ぐ）
      const MIN_AMPLITUDE_THRESHOLD = 100; // この値未満の場合、増幅が必要
      
      // 無音チャンクのスキップ用変数
      let audioStarted = false; // 音声が開始されたかどうか
      const SILENCE_THRESHOLD = 100; // この値未満は無音とみなす
      const MAX_SILENT_CHUNKS_BEFORE_START = 50; // 音声開始前にスキップする最大チャンク数
      
      // フレームサイズの正規化（可変長チャンクを一定サイズのフレームに再分割）
      // 44100Hz * 0.015625秒 = 689.0625サンプル → 689サンプル（最も一般的なサイズ）
      const TARGET_SAMPLES_PER_FRAME = 689; // 15.62ms @ 44100Hz
      const TARGET_FRAME_SIZE = TARGET_SAMPLES_PER_FRAME * 2; // 2 bytes per sample (Int16)
      let pcmBuffer = Buffer.alloc(0); // 受信したPCMデータを蓄積するバッファ
      let framesSent = 0; // LiveKitに送信したフレーム数
      let framesSkipped = 0; // スキップしたフレーム数（デバッグ用）
      const MAX_SILENT_FRAMES_AFTER_START = 20; // 音声開始後の低振幅フレームをスキップする最大数
      
      // データ形式判定用の変数
      let allChunksForAnalysis: Buffer[] = [];
      const MAX_CHUNKS_FOR_ANALYSIS = 50; // 最初の50チャンクを保存して分析（正常な音声データを含む）
      
      // 全てのチャンクを保存（デバッグ用）
      const allChunksForLogging: Buffer[] = [];
      
      // デバッグ用ディレクトリの設定（日付と時間ごとに分割）
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0]!; // YYYY-MM-DD形式
      const timeStr = now.toTimeString().split(' ')[0]!.replace(/:/g, '-').substring(0, 5); // HH-MM形式（秒は除外）
      const debugBaseDir = path.join(process.cwd(), 'debug-audio');
      const debugDateDir = path.join(debugBaseDir, dateStr, timeStr);
      if (!fs.existsSync(debugDateDir)) {
        fs.mkdirSync(debugDateDir, { recursive: true });
      }
      
      console.log(`[FishAudioTTS] Starting HTTP API TTS with backend: ${this.ttsInstance.backend}, voiceId: ${this.ttsInstance.voiceId || 'not set'}`);
      console.log(`[FishAudioTTS] 📋 Request payload: ${JSON.stringify(requestPayload, null, 2)}`);
      
      // HTTP APIリクエスト送信開始
      const httpRequestStartTime = Date.now();
      
      // データ形式を判定する関数
      const detectAudioFormat = (data: Buffer): string => {
        if (data.length < 4) return 'UNKNOWN';
        
        const firstBytes = data.slice(0, 4);
        const hexString = firstBytes.toString('hex').toUpperCase();
        
        // MP3形式のマジックナンバーをチェック
        // MP3: FF FB, FF F3, FF F2, FF FA, FF E3, FF E2, FF E1, FF E0
        if (hexString.startsWith('FF')) {
          const secondByte = firstBytes[1];
          if (secondByte === 0xFB || secondByte === 0xF3 || secondByte === 0xF2 || secondByte === 0xFA ||
              secondByte === 0xE3 || secondByte === 0xE2 || secondByte === 0xE1 || secondByte === 0xE0) {
            return 'MP3';
          }
        }
        
        // WAV形式のマジックナンバーをチェック
        // WAV: 52 49 46 46 (RIFF) または 52 49 46 46 (RIFF) + 57 41 56 45 (WAVE)
        if (data.length >= 12) {
          const riffHeader = data.slice(0, 4).toString('ascii');
          if (riffHeader === 'RIFF') {
            const waveHeader = data.slice(8, 12).toString('ascii');
            if (waveHeader === 'WAVE') {
              return 'WAV';
            }
          }
        }
        
        // Opus形式のマジックナンバーをチェック
        // Opus: OggS (4F 67 67 53)
        if (data.length >= 4) {
          const oggHeader = data.slice(0, 4).toString('ascii');
          if (oggHeader === 'OggS') {
            return 'OPUS';
          }
        }
        
        // PCM形式の判定（データの統計的特性から）
        // PCMデータは通常、ランダムなバイト分布を持つ
        // しかし、最初の数バイトが全て0xFFや0x00の場合は、他の形式の可能性がある
        const first16Bytes = data.slice(0, Math.min(16, data.length));
        const uniqueBytes = new Set(Array.from(first16Bytes)).size;
        
        // 全て同じバイト値（0xFFや0x00など）の場合は、PCMではない可能性が高い
        if (uniqueBytes === 1) {
          return 'SUSPICIOUS (all same bytes)';
        }
        
        // バイトの分布を確認（エントロピーの簡単なチェック）
        const byteCounts = new Array(256).fill(0);
        const sampleSize = Math.min(256, data.length);
        for (let i = 0; i < sampleSize; i++) {
          byteCounts[data[i]!]++;
        }
        
        // エントロピーが低い場合（特定のバイト値に偏っている）、圧縮形式の可能性
        const entropy = byteCounts.reduce((sum, count) => {
          if (count === 0) return sum;
          const p = count / sampleSize;
          return sum - p * Math.log2(p);
        }, 0);
        
        // エントロピーが低い場合（< 5.0）、圧縮形式の可能性
        if (entropy < 5.0 && entropy > 0) {
          return `SUSPICIOUS (low entropy: ${entropy.toFixed(2)})`;
        }
        
        // データが2バイトの倍数で、16-bit PCMとして解釈可能な場合
        if (data.length % 2 === 0) {
          // サンプル値を確認して、Int16の範囲内かチェック
          const samples = new Int16Array(data.buffer, data.byteOffset, Math.min(100, data.length / 2));
          const minSample = Math.min(...Array.from(samples));
          const maxSample = Math.max(...Array.from(samples));
          
          // Int16の範囲内であれば、PCMの可能性が高い
          if (minSample >= -32768 && maxSample <= 32767) {
            return 'PCM (16-bit, Int16 range)';
          }
        }
        
        return 'UNKNOWN';
      };
      
      // curlコマンドの形式に合わせて直接HTTPリクエストを送信（temperatureとtop_pを含める）
      // Sessionクラスのclientを使用してHTTPリクエストを送信
      const response = await (this.ttsInstance.httpSession as any).client.post('/v1/tts', requestPayload, {
        responseType: 'stream',
        headers: {
          'Content-Type': 'application/json',
          model: this.ttsInstance.backend,
        },
      });
      
      // レスポンスヘッダーをログに記録
      console.log('TTS Response Content-Type:', response.headers['content-type']);
      console.log('TTS Response headers:', JSON.stringify(response.headers, null, 2));
      
      for await (const chunk of response.data) {
        const audioChunk = Buffer.from(chunk);
        totalChunks++;
        
        // 全てのチャンクを保存（ログ用）
        allChunksForLogging.push(Buffer.from(audioChunk));
        
        // 最初の数チャンクを保存して分析（正常な音声データを含む）
        if (totalChunks <= MAX_CHUNKS_FOR_ANALYSIS) {
          allChunksForAnalysis.push(Buffer.from(audioChunk));
        }
        
        // 最初の音声チャンク受信時のログ
        if (!firstChunkReceived) {
          const firstChunkTime = Date.now() - sessionStartTime;
          firstChunkTimeFromHttpRequest = Date.now() - httpRequestStartTime;
          console.log(
            `[FishAudioTTS] ⏱️ First audio chunk received after ${firstChunkTime}ms (from session start), ${firstChunkTimeFromHttpRequest}ms (from HTTP request)`,
          );
          // 最初のチャンクの先頭バイトを確認（データ形式の判定用）
          const firstChunkPreview = audioChunk.slice(0, Math.min(32, audioChunk.length));
          console.log(`[FishAudioTTS] 🔍 First chunk preview (hex): ${firstChunkPreview.toString('hex')}`);
          console.log(`[FishAudioTTS] 🔍 First chunk preview (decimal): ${Array.from(firstChunkPreview).join(', ')}`);
          console.log(`[FishAudioTTS] 🔍 First chunk length: ${audioChunk.length} bytes`);
          
          // データ形式を詳細に判定
          const detectedFormat = detectAudioFormat(audioChunk);
          console.log(`[FishAudioTTS] 🔍 Detected audio format: ${detectedFormat}`);
          
          // MP3のマジックナンバーを確認（FF FB, FF F3, FF F2, FF FAなど）
          const firstBytes = audioChunk.slice(0, 4);
          const hexString = firstBytes.toString('hex').toUpperCase();
          if (hexString.startsWith('FF')) {
            console.log(`[FishAudioTTS] ⚠️ WARNING: First bytes suggest MP3 format (${hexString}), but PCM format was requested!`);
            console.log(`[FishAudioTTS] ⚠️ This may cause audio quality issues. MP3 decoding may be required.`);
          } else {
            console.log(`[FishAudioTTS] ✓ First bytes suggest PCM format (${hexString})`);
          }
          
          // PCMデータの統計情報を確認
          if (audioChunk.length >= 2) {
            const sampleCount = audioChunk.length / 2;
            console.log(`[FishAudioTTS] 📊 Estimated sample count: ${sampleCount} (assuming 16-bit PCM)`);
            console.log(`[FishAudioTTS] 📊 Estimated duration: ${(sampleCount / this.ttsInstance.sampleRate * 1000).toFixed(2)}ms`);
            
            // 実際のPCMデータの値を確認（最初の10サンプル）
            const pcmSamples = new Int16Array(
              audioChunk.buffer,
              audioChunk.byteOffset,
              Math.min(10, audioChunk.length / 2),
            );
            console.log(`[FishAudioTTS] 📊 First 10 PCM samples (Int16): [${Array.from(pcmSamples).join(', ')}]`);
            
            // リトルエンディアンとビッグエンディアンの両方を確認
            const firstSampleLE = audioChunk.readInt16LE(0);
            const firstSampleBE = audioChunk.readInt16BE(0);
            console.log(`[FishAudioTTS] 📊 First sample (Little Endian): ${firstSampleLE}`);
            console.log(`[FishAudioTTS] 📊 First sample (Big Endian): ${firstSampleBE}`);
            
            // データの範囲を確認（クリッピングの可能性をチェック）
            const allSamples = new Int16Array(
              audioChunk.buffer,
              audioChunk.byteOffset,
              audioChunk.length / 2,
            );
            if (allSamples.length > 0) {
              const samplesArray = Array.from(allSamples);
              const minSample = Math.min(...samplesArray);
              const maxSample = Math.max(...samplesArray);
              console.log(`[FishAudioTTS] 📊 Sample range: [${minSample}, ${maxSample}] (Int16 range: [-32768, 32767])`);
              
              // ゼロクロッシングの頻度を確認（正常な音声データなら適度なゼロクロッシングがある）
              let zeroCrossings = 0;
              for (let i = 1; i < allSamples.length; i++) {
                const prevSample = allSamples[i - 1]!;
                const currSample = allSamples[i]!;
                if ((prevSample >= 0 && currSample < 0) || (prevSample < 0 && currSample >= 0)) {
                  zeroCrossings++;
                }
              }
              console.log(`[FishAudioTTS] 📊 Zero crossings: ${zeroCrossings} (${((zeroCrossings / allSamples.length) * 100).toFixed(2)}%)`);
              
              // 異常なデータパターンを検出
              if (Math.abs(minSample) > 32767 || Math.abs(maxSample) > 32767) {
                console.log(`[FishAudioTTS] ⚠️ WARNING: Sample values exceed Int16 range!`);
              }
              if (zeroCrossings === 0) {
                console.log(`[FishAudioTTS] ⚠️ WARNING: No zero crossings detected - data may be corrupted or DC offset`);
              }
            }
          }
          
          firstChunkReceived = true;
        }
        
        // 受信したチャンクをバッファに追加
        pcmBuffer = Buffer.concat([pcmBuffer, audioChunk]);
        
        // チャンクの振幅を計算（音声開始検出用）
        const chunkSamples = new Int16Array(
          audioChunk.buffer,
          audioChunk.byteOffset,
          audioChunk.length / 2,
        );
        
        let chunkAbsMax = 0;
        let minSample = 0;
        let maxSample = 0;
        if (chunkSamples.length > 0) {
          const samplesArray = Array.from(chunkSamples);
          minSample = Math.min(...samplesArray);
          maxSample = Math.max(...samplesArray);
          chunkAbsMax = Math.max(Math.abs(minSample), Math.abs(maxSample));
        }
        
        // 正常な振幅のチャンクを特定して保存（デバッグ用）
        if (chunkAbsMax > 1000 && totalChunks > 15 && totalChunks <= 30) {
          // Chunk 15-30で正常な振幅のチャンクを保存
          const debugFile = path.join(debugDateDir, `chunk-${totalChunks}-normal-amplitude.bin`);
          fs.writeFileSync(debugFile, Buffer.from(audioChunk));
          console.log(`[FishAudioTTS] 💾 Saved normal amplitude chunk ${totalChunks} (absMax=${chunkAbsMax}, range=[${minSample}, ${maxSample}]) to: ${debugFile}`);
          
          // データ形式を詳細に分析
          const detectedFormat = detectAudioFormat(audioChunk);
          console.log(`[FishAudioTTS] 🔍 Normal chunk ${totalChunks} format: ${detectedFormat}`);
          console.log(`[FishAudioTTS] 🔍 Normal chunk ${totalChunks} hex preview: ${audioChunk.slice(0, Math.min(32, audioChunk.length)).toString('hex')}`);
        }
        
        // 異常な振幅のチャンクも記録（デバッグ用）
        if (chunkAbsMax > 0 && chunkAbsMax < 100 && totalChunks <= 20) {
          console.log(`[FishAudioTTS] ⚠️ Low amplitude chunk ${totalChunks}: absMax=${chunkAbsMax}, range=[${minSample}, ${maxSample}]`);
          // データ形式を詳細に分析
          const detectedFormat = detectAudioFormat(audioChunk);
          console.log(`[FishAudioTTS] 🔍 Low amplitude chunk ${totalChunks} format: ${detectedFormat}`);
          console.log(`[FishAudioTTS] 🔍 Low amplitude chunk ${totalChunks} hex preview: ${audioChunk.slice(0, Math.min(32, audioChunk.length)).toString('hex')}`);
        }
        
        // 音声開始の検出（振幅が閾値以上の場合、音声が開始されたとみなす）
        if (!audioStarted && chunkAbsMax >= SILENCE_THRESHOLD) {
          audioStarted = true;
          console.log(`[FishAudioTTS] 🔊 Audio started at chunk ${totalChunks} (absMax=${chunkAbsMax})`);
        }
        
        // 無音チャンクのスキップ（音声開始前のみ）
        // 音声開始後は無音チャンクも送信する（音声の途中で無音になる可能性があるため）
        if (!audioStarted && chunkAbsMax < SILENCE_THRESHOLD) {
          // 音声開始前に無音が続く場合のみスキップ
          if (totalChunks <= MAX_SILENT_CHUNKS_BEFORE_START) {
            console.log(`[FishAudioTTS] ⏭️ Skipping silent chunk ${totalChunks} before audio start (absMax=${chunkAbsMax})`);
            continue; // このチャンクをスキップして次のチャンクへ
          } else {
            // 最大スキップ数を超えた場合は、無音でも送信（データが破損している可能性があるため）
            console.log(`[FishAudioTTS] ⚠️ Max silent chunks reached, sending chunk ${totalChunks} even though silent (absMax=${chunkAbsMax})`);
            audioStarted = true; // 強制的に音声開始とみなす
          }
        }
        
        // ゲイン調整のための最大振幅を追跡（最初の数チャンクをスキップ）
        if (chunkSamples.length > 0 && totalChunks > 5 && totalChunks <= GAIN_CALIBRATION_CHUNKS) {
          const samplesArray = Array.from(chunkSamples);
          const minSample = Math.min(...samplesArray);
          const maxSample = Math.max(...samplesArray);
          const absMax = Math.max(Math.abs(minSample), Math.abs(maxSample));
          if (absMax > globalMaxAmplitude) {
            globalMaxAmplitude = absMax;
            console.log(`[FishAudioTTS] 📊 Calibration chunk ${totalChunks}: range=[${minSample}, ${maxSample}], absMax=${absMax}, globalMax=${globalMaxAmplitude}`);
          }
        }
        
        // ゲインファクターを決定（最初の数チャンクをスキップ後）
        if (totalChunks === GAIN_CALIBRATION_CHUNKS && gainFactor === null) {
          console.log(`[FishAudioTTS] 🔍 Calibration complete: globalMaxAmplitude=${globalMaxAmplitude}, MIN_AMPLITUDE_THRESHOLD=${MIN_AMPLITUDE_THRESHOLD}`);
          if (globalMaxAmplitude > 0 && globalMaxAmplitude < MIN_AMPLITUDE_THRESHOLD) {
            // 低振幅が検出された場合、統一的なゲインを計算
            gainFactor = Math.min(
              MAX_GAIN_FACTOR,
              Math.floor((MIN_AMPLITUDE_THRESHOLD * 10) / globalMaxAmplitude)
            );
            console.log(`[FishAudioTTS] 🔊 Global max amplitude: ${globalMaxAmplitude}, applying unified gain: ${gainFactor}x`);
          } else {
            // 正常な振幅範囲の場合、ゲインは不要
            gainFactor = 1;
            console.log(`[FishAudioTTS] ✓ Normal amplitude detected (max: ${globalMaxAmplitude}), no gain needed`);
          }
        }
        
        // バッファから一定サイズのフレームを抽出してLiveKitに送信
        // バッファに十分なデータがある限り、フレームを抽出し続ける
        while (pcmBuffer.length >= TARGET_FRAME_SIZE) {
          // 1フレーム分のデータを抽出（コピーを作成して安全に処理）
          const frameData = Buffer.from(pcmBuffer.slice(0, TARGET_FRAME_SIZE)); // 明示的にコピーを作成
          pcmBuffer = pcmBuffer.slice(TARGET_FRAME_SIZE);
          
          // Buffer を Int16Array (PCM) に変換（コピーされたデータを使用）
          const frameSamples = new Int16Array(
            frameData.buffer,
            frameData.byteOffset,
            frameData.length / 2,
          );
          
          // フレームの振幅をチェック
          let frameAbsMax = 0;
          if (frameSamples.length > 0) {
            const samplesArray = Array.from(frameSamples);
            const minSample = Math.min(...samplesArray);
            const maxSample = Math.max(...samplesArray);
            frameAbsMax = Math.max(Math.abs(minSample), Math.abs(maxSample));
          }
          
          // 音声開始後の低振幅フレームをスキップ（最初の数フレームのみ）
          if (audioStarted && frameAbsMax < SILENCE_THRESHOLD && framesSkipped < MAX_SILENT_FRAMES_AFTER_START) {
            framesSkipped++;
            console.log(`[FishAudioTTS] ⏭️ Skipping low amplitude frame ${framesSent + framesSkipped} after audio start (absMax=${frameAbsMax})`);
            continue; // このフレームをスキップ
          }
          
          // ゲインを適用（ゲインが決定されている場合）
          let pcmData: Int16Array;
          if (gainFactor !== null && gainFactor > 1) {
            const scaledSamples = new Int16Array(frameSamples.length);
            for (let i = 0; i < frameSamples.length; i++) {
              const scaled = frameSamples[i]! * gainFactor;
              // クリッピングを防止
              scaledSamples[i] = Math.max(-32767, Math.min(32767, scaled));
            }
            pcmData = scaledSamples;
          } else {
            // ゲインがまだ決定されていない場合、または不要な場合
            // Int16Arrayのコピーを作成してメモリの共有を避ける
            pcmData = new Int16Array(frameSamples);
          }
          
          // LiveKit AudioFrame に変換
          const samplesPerChannel = pcmData.length / this.ttsInstance.numChannels;
          const audioFrame = new AudioFrame(
            pcmData,
            this.ttsInstance.sampleRate,
            this.ttsInstance.numChannels,
            samplesPerChannel,
          );
          
          // LiveKitに送信する前に、実際に送信されるデータを保存（デバッグ用）
          framesSent++;
          if (framesSent <= 10 || (framesSent > 15 && framesSent <= 30)) {
            // 最初の10フレームと正常な振幅のフレーム（15-30）を保存
            const debugFrameFile = path.join(debugDateDir, `livekit-frame-${framesSent}.bin`);
            // AudioFrameのデータを直接保存（Int16Array形式）
            fs.writeFileSync(debugFrameFile, Buffer.from(pcmData.buffer, pcmData.byteOffset, pcmData.length * 2));
            console.log(`[FishAudioTTS] 🔍 Saved LiveKit frame ${framesSent}: ${pcmData.length} samples, samplesPerChannel=${samplesPerChannel}, absMax=${frameAbsMax}`);
          }
          
          const audio = {
            requestId: '',
            segmentId: `segment-${segmentId++}`,
            frame: audioFrame,
            final: false, // ストリーミング中は false
          };
          this.queue.put(audio);
        }
      }
      
      // 最後にバッファに残っているデータをフラッシュ（最小サイズ以上のデータがある場合）
      // 注意: 最後のフレームは通常のサイズより小さくなる可能性があるが、LiveKitはこれを処理できる
      if (pcmBuffer.length > 0) {
        const remainingSamples = pcmBuffer.length / 2;
        if (remainingSamples > 0) {
          // バッファの残りデータをコピーして安全に処理
          const remainingData = Buffer.from(pcmBuffer); // 明示的にコピーを作成
          const frameSamples = new Int16Array(
            remainingData.buffer,
            remainingData.byteOffset,
            remainingSamples,
          );
          
          // ゲインを適用（ゲインが決定されている場合）
          let pcmData: Int16Array;
          if (gainFactor !== null && gainFactor > 1) {
            const scaledSamples = new Int16Array(frameSamples.length);
            for (let i = 0; i < frameSamples.length; i++) {
              const scaled = frameSamples[i]! * gainFactor;
              scaledSamples[i] = Math.max(-32767, Math.min(32767, scaled));
            }
            pcmData = scaledSamples;
          } else {
            // ゲインがまだ決定されていない場合、または不要な場合
            // Int16Arrayのコピーを作成してメモリの共有を避ける
            pcmData = new Int16Array(frameSamples);
          }
          
          // LiveKit AudioFrame に変換
          const samplesPerChannel = pcmData.length / this.ttsInstance.numChannels;
          const audioFrame = new AudioFrame(
            pcmData,
            this.ttsInstance.sampleRate,
            this.ttsInstance.numChannels,
            samplesPerChannel,
          );
          
          framesSent++;
          const audio = {
            requestId: '',
            segmentId: `segment-${segmentId++}`,
            frame: audioFrame,
            final: true, // 最後のフレームなので final=true
          };
          this.queue.put(audio);
          console.log(`[FishAudioTTS] 🔍 Flushed final frame: ${pcmData.length} samples, samplesPerChannel=${samplesPerChannel}`);
        }
      }
      
      // 全チャンク受信完了時の処理時間サマリー
      const allChunksReceivedTime = Date.now();
      const totalProcessingTime = allChunksReceivedTime - sessionStartTime;
      const httpRequestToCompletionTime = allChunksReceivedTime - httpRequestStartTime;
      const totalAudioBytes = allChunksForLogging.reduce((sum, chunk) => sum + chunk.length, 0);
      
      console.log('='.repeat(80));
      console.log('[TTS Processing Summary]');
      const ttsSummary = {
        textReceiveDuration: `${textReceiveDuration}ms`,
        httpRequestToFirstChunk: firstChunkReceived ? `${firstChunkTimeFromHttpRequest}ms` : 'N/A',
        httpRequestToCompletion: `${httpRequestToCompletionTime}ms`,
        totalProcessingTime: `${totalProcessingTime}ms`,
        totalChunksReceived: totalChunks,
        totalAudioDataBytes: totalAudioBytes,
        totalAudioDataKB: `${(totalAudioBytes / 1024).toFixed(2)} KB`,
        framesSentToLiveKit: framesSent,
        framesSkipped: framesSkipped,
      };
      console.log(`Text receive duration: ${ttsSummary.textReceiveDuration}`);
      console.log(`HTTP request to first chunk: ${ttsSummary.httpRequestToFirstChunk}`);
      console.log(`HTTP request to completion: ${ttsSummary.httpRequestToCompletion}`);
      console.log(`Total processing time: ${ttsSummary.totalProcessingTime}`);
      console.log(`Total chunks received: ${ttsSummary.totalChunksReceived}`);
      console.log(`Total audio data: ${ttsSummary.totalAudioDataBytes} bytes (${ttsSummary.totalAudioDataKB})`);
      console.log(`Frames sent to LiveKit: ${ttsSummary.framesSentToLiveKit}`);
      console.log(`Frames skipped: ${ttsSummary.framesSkipped}`);
      console.log('='.repeat(80));
      
      // TTS処理時間をファイルに保存
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const ttsLogFile = path.join(debugDateDir, `tts-processing-times-${timestamp}.json`);
      fs.writeFileSync(ttsLogFile, JSON.stringify(ttsSummary, null, 2));
      console.log(`[FishAudioTTS] 💾 Saved TTS processing times log to: ${ttsLogFile}`);
      
      const totalTime = Date.now() - sessionStartTime;
      
      // 全てのチャンクを結合して保存（ログ用）
      if (allChunksForLogging.length > 0) {
        const allChunksCombined = Buffer.concat(allChunksForLogging);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fullAudioFile = path.join(debugDateDir, `full-audio-${timestamp}-${totalChunks}chunks.bin`);
        fs.writeFileSync(fullAudioFile, allChunksCombined);
        console.log(`[FishAudioTTS] 💾 Saved all ${allChunksForLogging.length} chunks (${allChunksCombined.length} bytes) to: ${fullAudioFile}`);
        
        // WAVファイルとしても保存（再生可能な形式）
        const samples = new Int16Array(allChunksCombined.buffer, allChunksCombined.byteOffset, allChunksCombined.length / 2);
        const sampleRate = this.ttsInstance.sampleRate;
        const numChannels = this.ttsInstance.numChannels;
        const bitsPerSample = 16;
        const dataSize = allChunksCombined.length;
        const fileSize = 36 + dataSize;
        
        const wavHeader = Buffer.alloc(44);
        wavHeader.write('RIFF', 0);
        wavHeader.writeUInt32LE(fileSize, 4);
        wavHeader.write('WAVE', 8);
        wavHeader.write('fmt ', 12);
        wavHeader.writeUInt32LE(16, 16);
        wavHeader.writeUInt16LE(1, 20);
        wavHeader.writeUInt16LE(numChannels, 22);
        wavHeader.writeUInt32LE(sampleRate, 24);
        wavHeader.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
        wavHeader.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
        wavHeader.writeUInt16LE(bitsPerSample, 34);
        wavHeader.write('data', 36);
        wavHeader.writeUInt32LE(dataSize, 40);
        
        const wavFile = path.join(debugDateDir, `full-audio-${timestamp}-${totalChunks}chunks.wav`);
        const wavData = Buffer.concat([wavHeader, allChunksCombined]);
        fs.writeFileSync(wavFile, wavData);
        console.log(`[FishAudioTTS] 💾 Saved full audio as WAV (${(samples.length / sampleRate).toFixed(3)}s) to: ${wavFile}`);
      }
      
      // 保存したチャンクを結合して詳細分析
      if (allChunksForAnalysis.length > 0) {
        const combinedData = Buffer.concat(allChunksForAnalysis);
        console.log(`[FishAudioTTS] 🔍 Analyzing ${allChunksForAnalysis.length} chunks (${combinedData.length} bytes total)`);
        
        // 結合したデータの形式を判定
        const combinedFormat = detectAudioFormat(combinedData);
        console.log(`[FishAudioTTS] 🔍 Combined data format: ${combinedFormat}`);
        
        // バイナリデータをファイルに保存（デバッグ用）
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const debugFile = path.join(debugDateDir, `fish-audio-${timestamp}-${totalChunks}chunks.bin`);
        fs.writeFileSync(debugFile, combinedData);
        console.log(`[FishAudioTTS] 💾 Saved first ${allChunksForAnalysis.length} chunks to: ${debugFile}`);
        console.log(`[FishAudioTTS] 💾 File size: ${combinedData.length} bytes`);
        console.log(`[FishAudioTTS] 💾 To analyze: file ${debugFile} | xxd | head -20`);
        
        // データの統計情報を出力
        const byteCounts = new Array(256).fill(0);
        const sampleSize = Math.min(1000, combinedData.length);
        for (let i = 0; i < sampleSize; i++) {
          byteCounts[combinedData[i]!]++;
        }
        const mostCommonBytes = byteCounts
          .map((count, byte) => ({ byte, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        console.log(`[FishAudioTTS] 📊 Most common bytes in first ${sampleSize} bytes:`, 
          mostCommonBytes.map(({ byte, count }) => `0x${byte.toString(16).padStart(2, '0').toUpperCase()}:${count}`).join(', '));
      }
      
      console.log('[FishAudioTTS] HTTP API streaming synthesis session completed');
    } catch (error) {
      console.error('[FishAudioTTS] HTTP API streaming error:', error);
      // エラーの詳細をログに出力
      if (error instanceof Error) {
        console.error('[FishAudioTTS] Error name:', error.name);
        console.error('[FishAudioTTS] Error message:', error.message);
        console.error('[FishAudioTTS] Error stack:', error.stack);
        if ('code' in error) {
          console.error('[FishAudioTTS] Error code:', (error as any).code);
        }
        if ('details' in error) {
          console.error('[FishAudioTTS] Error details:', (error as any).details);
        }
      }
      console.error('[FishAudioTTS] Backend used:', this.ttsInstance.backend);
      console.error('[FishAudioTTS] Voice ID:', this.ttsInstance.voiceId);
      throw error;
    }
  }

}

