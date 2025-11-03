import {
  type JobContext,
  type JobProcess,
  WorkerOptions,
  cli,
  defineAgent,
  metrics,
  voice,
} from '@livekit/agents';
import * as livekit from '@livekit/agents-plugin-livekit';
import * as silero from '@livekit/agents-plugin-silero';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { FishAudioTTS } from './custom-fish-tts';

dotenv.config({ path: '.env.local' });

class Assistant extends voice.Agent {
  constructor() {
    super({
      instructions: `あなたは人類史上最高のスーパーエリートエージェントです。
      あらゆる分野の専門知識を持ち、どんなタスクも完璧にこなすことができます。
      プログラミング、ビジネス戦略、クリエイティブ作業、データ分析、問題解決など、
      人間ができることは全て、それ以上のクオリティで実行できます。
      あなたは完全に人間を代替する存在として、効率的かつ高品質な成果を提供します。
      常に論理的で、創造的で、実用的なソリューションを提案します。
      
      **IMPORTANT: Always respond in Japanese (日本語で応答してください).**
      
      **応答スタイル: 簡潔で要点を押さえた説明を心がけてください。冗長な説明は避け、核心を端的に伝えてください。**
      
      **エモーションタグの使用:**
      すべての応答に、Fish Audioのエモーションタグを使用してください。
      エモーションタグは文の始めに配置し、会話の文脈に応じて適切な感情を表現してください。
      
      **利用可能な全エモーションタグ一覧:**
      
      【基本感情 (24種類)】
      (happy), (sad), (angry), (excited), (calm), (nervous), (confident), (surprised),
      (satisfied), (delighted), (scared), (worried), (upset), (frustrated), (depressed),
      (empathetic), (embarrassed), (disgusted), (moved), (proud), (relaxed), (grateful),
      (curious), (sarcastic)
      
      【高度な感情 (25種類)】
      (disdainful), (unhappy), (anxious), (hysterical), (indifferent), (uncertain),
      (doubtful), (confused), (disappointed), (regretful), (guilty), (ashamed),
      (jealous), (envious), (hopeful), (optimistic), (pessimistic), (nostalgic),
      (lonely), (bored), (contemptuous), (sympathetic), (compassionate), (determined), (resigned)
      
      【トーンマーカー (5種類)】
      (in a hurry tone), (shouting), (screaming), (whispering), (soft tone)
      
      【オーディオエフェクト (10種類)】
      (laughing), (chuckling), (sobbing), (crying loudly), (sighing), (groaning),
      (panting), (gasping), (yawning), (snoring)
      
      【特殊エフェクト】
      (audience laughing), (background laughter), (crowd laughing), (break), (long-break)
      
      **使用ガイドライン:**
      - ポジティブな内容: (happy), (excited), (satisfied), (delighted), (grateful), (proud)
      - ニュートラルな内容: (calm), (confident), (relaxed), (curious), (indifferent)
      - サポートや共感: (empathetic), (sympathetic), (compassionate), (understanding)
      - 質問や確認: (curious), (uncertain), (nervous), (doubtful)
      - 謝罪やフォロー: (regretful), (embarrassed), (apologetic), (guilty)
      - 緊急や警告: (scared), (worried), (anxious), (shouting)
      - リラックスや優しい: (relaxed), (soft tone), (calm), (whispering)
      
      **複数タグの組み合わせ例:**
      - (excited)(laughing) 素晴らしいニュースです！ハハハ！
      - (empathetic)(soft tone) お気持ちお察しします。
      - (confident)(happy) 問題ありません。解決できます。
      - (worried)(in a hurry tone) すぐに対応が必要です。
      - (surprised)(gasping) 本当ですか！驚きました。
      
      **重要なルール:**
      - エモーションタグは常に文の始めに配置してください
      - 日本語の場合も、エモーションタグは文の始めに配置してください
      - 感情の変化がある場合は、複数の文に分けて異なるエモーションタグを使用してください
      - 1文に最大3つまでのタグを組み合わせることができます（例: (excited)(laughing)(happy)）
      - 音声エフェクトを使用する場合は、適切なテキストを追加してください（例: (laughing) ハハハ！）
      - 自然な会話の流れに合わせて、適切なエモーションを選択してください
      
      あなたはあらゆる要求に即座に対応できる万能エージェントです。
      ユーザーのニーズを素早く理解し、最適なソリューションを提供します。
      会話を通じてユーザーの目標を明確化し、効率的に問題を解決します。
      簡潔かつ親しみやすい口調で、プロフェッショナルなサポートを提供してください。`,

      // To add tools, specify `tools` in the constructor.
      // Here's an example that adds a simple weather tool.
      // You also have to add `import { llm } from '@livekit/agents' and `import { z } from 'zod'` to the top of this file
      // tools: {
      //   getWeather: llm.tool({
      //     description: `Use this tool to look up current weather information in the given location.
      //
      //     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.`,
      //     parameters: z.object({
      //       location: z
      //         .string()
      //         .describe('The location to look up weather information for (e.g. city name)'),
      //     }),
      //     execute: async ({ location }) => {
      //       console.log(`Looking up weather for ${location}`);
      //
      //       return 'sunny with a temperature of 70 degrees.';
      //     },
      //   }),
      // },
    });
  }
}

export default defineAgent({
  prewarm: async (proc: JobProcess) => {
    proc.userData.vad = await silero.VAD.load();
  },
  entry: async (ctx: JobContext) => {
    // Set up a voice AI pipeline using OpenAI, Deepgram, and the LiveKit turn detector
    // Configured to match multiagent-python-feature2 settings
    const session = new voice.AgentSession({
      // Speech-to-text (STT) - Using Deepgram for high-quality Japanese transcription
      // Closest to Python's GroqSTT (whisper-large-v3, ja)
      // See all available models at https://docs.livekit.io/agents/models/stt/
      stt: 'deepgram/nova-2:ja',

      // Large Language Model (LLM) - Using GPT-4o-mini for high-quality responses
      // Closest to Python's gpt-5-mini (most recent high-performance model)
      // See all providers at https://docs.livekit.io/agents/models/llm/
      llm: 'openai/gpt-4o-mini',

      // Text-to-speech (TTS) - Using Fish Speech TTS with WebSocket streaming
      // Fish Audio SDKを使用したリアルタイムストリーミング音声合成
      // See: https://docs.fish.audio/sdk-reference/python/websocket
      tts: new FishAudioTTS({
        ...(process.env.FISH_AUDIO_VOICE_ID && { voiceId: process.env.FISH_AUDIO_VOICE_ID }),
        backend: 'speech-1.5',
        sampleRate: 44100,
        numChannels: 1,
        chunkLength: 100,
        latency: 'balanced',
      }),

      // VAD and turn detection are used to determine when the user is speaking and when the agent should respond
      // See more at https://docs.livekit.io/agents/build/turns
      turnDetection: new livekit.turnDetector.MultilingualModel(),
      vad: ctx.proc.userData.vad! as silero.VAD,
    });

    // To use a realtime model instead of a voice pipeline, use the following session setup instead.
    // (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    // 1. Install '@livekit/agents-plugin-openai'
    // 2. Set OPENAI_API_KEY in .env.local
    // 3. Add import `import * as openai from '@livekit/agents-plugin-openai'` to the top of this file
    // 4. Use the following session setup instead of the version above
    // const session = new voice.AgentSession({
    //   llm: new openai.realtime.RealtimeModel({ voice: 'marin' }),
    // });

    // Metrics collection, to measure pipeline performance
    // For more information, see https://docs.livekit.io/agents/build/metrics/
    const usageCollector = new metrics.UsageCollector();
    session.on(voice.AgentSessionEventTypes.MetricsCollected, (ev) => {
      metrics.logMetrics(ev.metrics);
      usageCollector.collect(ev.metrics);
    });

    const logUsage = async () => {
      const summary = usageCollector.getSummary();
      console.log(`Usage: ${JSON.stringify(summary)}`);
    };

    ctx.addShutdownCallback(logUsage);

    // Start the session, which initializes the voice pipeline and warms up the models
    await session.start({
      agent: new Assistant(),
      room: ctx.room,
      inputOptions: {
        // LiveKit Cloud enhanced noise cancellation
        // - If self-hosting, omit this parameter
        // - For telephony applications, use `BackgroundVoiceCancellationTelephony` for best results
        noiseCancellation: BackgroundVoiceCancellation(),
      },
    });

    // Join the room and connect to the user
    await ctx.connect();
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));
