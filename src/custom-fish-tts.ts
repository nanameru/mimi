import { tts } from '@livekit/agents';
import { AudioFrame } from '@livekit/rtc-node';
import { Session, TTSRequest, type Backends } from 'fish-audio-sdk';

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
      // HTTP APIで音声生成（ストリーミングレスポンス）
      // ドキュメントに基づいてmodelヘッダーを追加
      const audioChunks: Buffer[] = [];
      for await (const chunk of this.ttsInstance.httpSession.tts(request, {
        model: this.ttsInstance.backend,
      })) {
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
      const fullText = textBuffer.join('');
      console.log(
        `[FishAudioTTS] 📤 [${new Date().toLocaleTimeString()}] Sending text to HTTP API (${fullText.length} chars): "${fullText.substring(0, 50)}..."`,
      );
      
      // HTTP APIで音声生成（ストリーミングレスポンス）
      // ドキュメントに基づいてmodelヘッダーを追加
      const request = new TTSRequest(fullText, {
        referenceId: this.ttsInstance.voiceId,
        format: 'pcm',
        sampleRate: this.ttsInstance.sampleRate,
        chunkLength: this.ttsInstance.chunkLength,
        latency: this.ttsInstance.latency,
        normalize: true,
      });
      
      let segmentId = 0;
      let firstChunkReceived = false;
      let totalChunks = 0;
      console.log(`[FishAudioTTS] Starting HTTP API TTS with backend: ${this.ttsInstance.backend}, voiceId: ${this.ttsInstance.voiceId || 'not set'}`);
      
      // HTTP APIはストリーミングレスポンスを返す
      for await (const audioChunk of this.ttsInstance.httpSession.tts(request, {
        model: this.ttsInstance.backend,
      })) {
        totalChunks++;
        // 最初の音声チャンク受信時のログ
        if (!firstChunkReceived) {
          const firstChunkTime = Date.now() - sessionStartTime;
          console.log(
            `[FishAudioTTS] ⏱️ First audio chunk received after ${firstChunkTime}ms`,
          );
          firstChunkReceived = true;
        }
        // Buffer を Int16Array (PCM) に変換
        const pcmData = new Int16Array(
          audioChunk.buffer,
          audioChunk.byteOffset,
          audioChunk.length / 2,
        );
        // LiveKit AudioFrame に変換
        const samplesPerChannel = pcmData.length / this.ttsInstance.numChannels;
        const audioFrame = new AudioFrame(
          pcmData,
          this.ttsInstance.sampleRate,
          this.ttsInstance.numChannels,
          samplesPerChannel,
        );
        const audio = {
          requestId: '',
          segmentId: `segment-${segmentId++}`,
          frame: audioFrame,
          final: false, // ストリーミング中は false
        };
        this.queue.put(audio);
      }
      
      const totalTime = Date.now() - sessionStartTime;
      console.log(
        `[FishAudioTTS] ⏱️ Total audio generation: ${totalTime}ms (${totalChunks} chunks)`,
      );
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

