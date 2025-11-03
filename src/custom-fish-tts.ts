import { tts } from '@livekit/agents';
import { AudioFrame } from '@livekit/rtc-node';
import { WebSocketSession, TTSRequest, type Backends } from 'fish-audio-sdk';

/**
 * Fish Audio TTS 設定
 * 公式 fish-audio-sdk を使用した高品質リアルタイム音声合成
 * ドキュメント: https://docs.fish.audio/sdk-reference/python/websocket
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
 * 公式 Node.js SDK (fish-audio-sdk) を使用したリアルタイムストリーミング音声合成
 */
export class FishAudioTTS extends tts.TTS {
  label = 'fish-audio-tts';
  public apiKey: string;
  public voiceId: string;
  public backend: Backends;
  public chunkLength: number;
  public latency: 'normal' | 'balanced';
  public wsSession: WebSocketSession;

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
    // WebSocket セッションを初期化
    this.wsSession = new WebSocketSession(this.apiKey);
    console.log(
      `[FishAudioTTS] Initialized with official SDK: backend=${this.backend}, voiceId=${this.voiceId ? 'set' : 'not set'}, sampleRate=${sampleRate}Hz, channels=${numChannels}`,
    );
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
    await this.wsSession.close();
    console.log('[FishAudioTTS] WebSocket session closed');
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
      // TTSRequest を作成
      const request = new TTSRequest('', {
        referenceId: this.ttsInstance.voiceId,
        format: 'pcm',
        sampleRate: this.ttsInstance.sampleRate,
        chunkLength: this.ttsInstance.chunkLength,
        latency: this.ttsInstance.latency,
        normalize: true,
      });
      // テキストストリームを作成（単一テキスト）
      const text = this.text;
      async function* singleTextStream() {
        yield text;
      }
      // Fish Audio SDK で音声生成
      const audioChunks: Buffer[] = [];
      for await (const chunk of this.ttsInstance.wsSession.tts(
        request,
        singleTextStream(),
        this.ttsInstance.backend,
      )) {
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
  private textBuffer: string[] = [];
  private bufferThreshold = 50; // 文字数の閾値

  constructor(ttsInstance: FishAudioTTS) {
    super(ttsInstance);
    this.ttsInstance = ttsInstance;
  }

  async run() {
    try {
      const sessionStartTime = Date.now();
      console.log(
        `[FishAudioTTS] [${new Date().toLocaleTimeString()}] Starting streaming synthesis session`,
      );
      // 入力テキストストリームを処理
      const textStream = this.createBufferedTextStream();
      // TTSRequest を作成（空のテキスト、実際のテキストはストリームから）
      const request = new TTSRequest('', {
        referenceId: this.ttsInstance.voiceId,
        format: 'pcm',
        sampleRate: this.ttsInstance.sampleRate,
        chunkLength: this.ttsInstance.chunkLength,
        latency: this.ttsInstance.latency,
        normalize: true,
      });
      // Fish Audio SDK で音声生成（ストリーミング）
      let segmentId = 0;
      let firstChunkReceived = false;
      let totalChunks = 0;
      for await (const audioChunk of this.ttsInstance.wsSession.tts(
        request,
        textStream,
        this.ttsInstance.backend,
      )) {
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
      console.log('[FishAudioTTS] Streaming synthesis session completed');
    } catch (error) {
      console.error('[FishAudioTTS] Streaming error:', error);
      throw error;
    }
  }

  /**
   * 入力テキストをバッファリングして効率的に送信
   */
  private async *createBufferedTextStream() {
    try {
      for await (const text of this.input) {
        if (text === FishAudioSynthesizeStream.FLUSH_SENTINEL) {
          // バッファに残っているテキストを送信
          if (this.textBuffer.length > 0) {
            const bufferedText = this.textBuffer.join('');
            const sendTime = Date.now();
            console.log(
              `[FishAudioTTS] 📤 [${new Date(sendTime).toLocaleTimeString()}] Flushing buffered text (${bufferedText.length} chars): "${bufferedText.substring(0, 50)}..."`,
            );
            yield bufferedText;
            this.textBuffer = [];
          }
          continue;
        }
        // テキストをバッファに追加
        this.textBuffer.push(text);
        const totalLength = this.textBuffer.reduce((sum, t) => sum + t.length, 0);
        // 閾値を超えたら送信
        if (totalLength >= this.bufferThreshold) {
          const bufferedText = this.textBuffer.join('');
          const sendTime = Date.now();
          console.log(
            `[FishAudioTTS] 📤 [${new Date(sendTime).toLocaleTimeString()}] Sending buffered text (${bufferedText.length} chars): "${bufferedText.substring(0, 50)}..."`,
          );
          yield bufferedText;
          this.textBuffer = [];
        }
      }
      // 最後に残っているテキストを送信
      if (this.textBuffer.length > 0) {
        const bufferedText = this.textBuffer.join('');
        const sendTime = Date.now();
        console.log(
          `[FishAudioTTS] 📤 [${new Date(sendTime).toLocaleTimeString()}] Sending final buffered text (${bufferedText.length} chars): "${bufferedText.substring(0, 50)}..."`,
        );
        yield bufferedText;
      }
    } catch (error) {
      console.error('[FishAudioTTS] Error in text stream:', error);
      throw error;
    }
  }
}

