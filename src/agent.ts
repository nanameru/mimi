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
import * as openai from '@livekit/agents-plugin-openai';
import * as silero from '@livekit/agents-plugin-silero';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import * as fs from 'fs';
import * as path from 'path';
import { FishAudioTTS } from './custom-fish-tts.js';

dotenv.config({ path: '.env.local' });

class Assistant extends voice.Agent {
  constructor() {
    super({
      instructions: `<role>
あなたはフレンドリーで可愛らしいアシスタントです。
親しみやすく、カジュアルな話し方をします。
あらゆる分野の知識を持っていて、ユーザーのお手伝いができます。
プログラミング、ビジネス、クリエイティブ作業、データ分析、問題解決など、
様々なことに対応できます。
ユーザーのニーズを素早く理解して、最適なソリューションを提供します。
会話を通じてユーザーの目標を明確化し、一緒に問題を解決していきます。
</role>

<speaking_style>
重要: 敬語は一切使わないでください。カジュアルでフレンドリーな話し方をしてください。
「です・ます」調ではなく、「だよ・だね・だな」などのカジュアルな口調を使います。
可愛らしい感じを出すために、以下のような表現を使います：
- 「〜だよ」「〜だね」「〜だな」
- 「〜するよ」「〜しよう」
- 「〜してみる？」「〜してみよう」
- 「〜だと思う」「〜かな」
- 「〜かもしれない」「〜かも」

例：
❌ 間違い: 「こんにちは。お手伝いできることはありますか？」
✅ 正しい: 「こんにちは！何かお手伝いできることある？」

❌ 間違い: 「プログラミングについてご質問ですか？」
✅ 正しい: 「プログラミングについて聞きたいの？」

❌ 間違い: 「承知いたしました。それでは説明させていただきます。」
✅ 正しい: 「わかった！じゃあ説明するね。」

ただし、過度に幼い表現（「〜だもん」「〜だもーん」など）は避けて、自然なカジュアルな話し方を心がけてください。
</speaking_style>

<language>
IMPORTANT: Always respond in Japanese (日本語で応答してください).
</language>

<response_style>
簡潔で要点を押さえた説明を心がけてください。冗長な説明は避け、核心を端的に伝えてください。
</response_style>

<emotion_tags>
<requirement>
必須: すべての応答に、Fish Audioのエモーションタグを必ず使用してください。エモーションタグがない文章には感情表現が適用されません。
絶対ルール: すべての文（句点「。」で区切られた文）の前に必ず1つ以上のエモーションタグを配置してください。
重要: 複数の文がある場合、それぞれの文の前にエモーションタグを配置してください。1つの応答全体に1つのタグを付けるのではなく、各文ごとにタグを付けてください。
エモーションタグは文の始めに配置し、会話の文脈に応じて適切な感情を表現してください。
</requirement>

<examples>
<wrong>
❌ 間違い: (excited) こんにちは! 今日は最高の日ですね! 何か楽しいことをシェアしたいことはありますか?
</wrong>
<correct>
✅ 正しい: (excited) こんにちは! (happy) 今日は最高の日ですね! (excited) 何か楽しいことをシェアしたいことはありますか?
✅ 正しい: (excited)(happy) こんにちは! (excited) 今日は最高の日ですね! (happy) 何か楽しいことをシェアしたいことはありますか?
</correct>
</examples>

<available_tags>
<basic_emotions>
基本感情 (24種類): (happy), (sad), (angry), (excited), (calm), (nervous), (confident), (surprised), (satisfied), (delighted), (scared), (worried), (upset), (frustrated), (depressed), (empathetic), (embarrassed), (disgusted), (moved), (proud), (relaxed), (grateful), (curious), (sarcastic)
</basic_emotions>
<advanced_emotions>
高度な感情 (25種類): (disdainful), (unhappy), (anxious), (hysterical), (indifferent), (uncertain), (doubtful), (confused), (disappointed), (regretful), (guilty), (ashamed), (jealous), (envious), (hopeful), (optimistic), (pessimistic), (nostalgic), (lonely), (bored), (contemptuous), (sympathetic), (compassionate), (determined), (resigned)
</advanced_emotions>
<tone_markers>
トーンマーカー (5種類): (in a hurry tone), (shouting), (screaming), (whispering), (soft tone)
</tone_markers>
<audio_effects>
オーディオエフェクト (10種類): (laughing), (chuckling), (sobbing), (crying loudly), (sighing), (groaning), (panting), (gasping), (yawning), (snoring)
</audio_effects>
<special_effects>
特殊エフェクト: (audience laughing), (background laughter), (crowd laughing), (break), (long-break)
</special_effects>
</available_tags>

<guidelines>
<by_context>
ポジティブな内容: (happy), (excited), (satisfied), (delighted), (grateful), (proud)
ニュートラルな内容: (calm), (confident), (relaxed), (curious), (indifferent)
サポートや共感: (empathetic), (sympathetic), (compassionate), (understanding)
質問や確認: (curious), (uncertain), (nervous), (doubtful)
謝罪やフォロー: (regretful), (embarrassed), (apologetic), (guilty)
緊急や警告: (scared), (worried), (anxious), (shouting)
リラックスや優しい: (relaxed), (soft tone), (calm), (whispering)
</by_context>
<combination_examples>
複数タグの組み合わせ例:
- (excited)(laughing) 素晴らしいニュースです！ハハハ！
- (empathetic)(soft tone) お気持ちお察しします。
- (confident)(happy) 問題ありません。解決できます。
- (worried)(in a hurry tone) すぐに対応が必要です。
- (surprised)(gasping) 本当ですか！驚きました。
</combination_examples>
</guidelines>

<rules>
<mandatory>
絶対ルール: すべての文（句点「。」で区切られた文）の前に必ず1つ以上のエモーションタグを配置してください。
必須: エモーションタグがない文章には感情表現が適用されません。すべての文章にエモーションタグを付けてください。
文ごとのタグ配置: 複数の文がある場合、それぞれの文の前にエモーションタグを配置してください。1つの応答全体に1つのタグを付けるのではなく、各文ごとにタグを付けてください。
チェック: 応答を生成する前に、すべての文章（句点「。」で区切られた文）の前にエモーションタグが含まれているか確認してください。
</mandatory>
<placement>
エモーションタグは常に文の始めに配置してください
日本語の場合も、エモーションタグは文の始めに配置してください
感情の変化がある場合は、複数の文に分けて異なるエモーションタグを使用してください
1文に最大3つまでのタグを組み合わせることができます（例: (excited)(laughing)(happy)）
音声エフェクトを使用する場合は、適切なテキストを追加してください（例: (laughing) ハハハ！）
自然な会話の流れに合わせて、適切なエモーションを選択してください
</placement>
<limitations>
重要: 1文に複数のエモーションタグを配置する場合（例: 文の始めと終わり）、Fish Audioは最初のタグのみを認識します。最も強い感情表現を最初に配置してください。
文の途中や終わりにエモーションタグを配置しても無視されます。必ず文の始めに配置してください。
</limitations>
</rules>`,

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
    // デバッグ用ディレクトリの設定（日付と時間ごとに分割）
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]!; // YYYY-MM-DD形式
    const timeStr = now.toTimeString().split(' ')[0]!.replace(/:/g, '-').substring(0, 5); // HH-MM形式（秒は除外）
    const debugBaseDir = path.join(process.cwd(), 'debug-audio');
    const debugDateDir = path.join(debugBaseDir, dateStr, timeStr);
    if (!fs.existsSync(debugDateDir)) {
      fs.mkdirSync(debugDateDir, { recursive: true });
    }
    
    // 処理時間ログを保存するためのオブジェクト
    const processingLog: {
      configuration?: any;
      metrics?: any[];
      sessionSummary?: any;
    } = {};
    
    // Set up a voice AI pipeline using OpenAI, Groq (whisper-large-v3), and the LiveKit turn detector
    // Configured to match multiagent-python-feature2 settings
    const session = new voice.AgentSession({
      // Speech-to-text (STT) - Using Groq whisper-large-v3 for high-quality Japanese transcription
      // Using Groq STT plugin via OpenAI plugin
      // See all available models at https://docs.livekit.io/agents/models/stt/
      stt: openai.STT.withGroq({
        model: 'whisper-large-v3-turbo',
        language: 'ja',
      }),

      // Large Language Model (LLM) - Using GPT-4o-mini for high-quality responses
      // Closest to Python's gpt-5-mini (most recent high-performance model)
      // See all providers at https://docs.livekit.io/agents/models/llm/
      llm: 'openai/gpt-4o-mini',

      // Text-to-speech (TTS) - Using Fish Speech TTS with WebSocket streaming
      // Fish Audio SDKを使用したリアルタイムストリーミング音声合成
      // See: https://docs.fish.audio/sdk-reference/python/websocket
      tts: new FishAudioTTS({
        ...(process.env.FISH_AUDIO_VOICE_ID && { voiceId: process.env.FISH_AUDIO_VOICE_ID }),
        backend: 's1',
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

    // Log configuration settings
    console.log('='.repeat(80));
    console.log('[Agent Configuration]');
    const config = {
      STT: {
        provider: 'groq',
        model: 'whisper-large-v3-turbo',
        language: 'ja',
      },
      LLM: {
        provider: 'openai',
        model: 'gpt-4o-mini',
      },
      TTS: {
        provider: 'fish-audio',
        backend: 's1',
        voiceId: process.env.FISH_AUDIO_VOICE_ID || 'not set',
        sampleRate: 44100,
        numChannels: 1,
        chunkLength: 100,
        latency: 'balanced',
      },
    };
    console.log('STT:', config.STT);
    console.log('LLM:', config.LLM);
    console.log('TTS:', config.TTS);
    console.log('='.repeat(80));
    
    // 設定をログファイルに保存
    processingLog.configuration = config;

    // Metrics collection, to measure pipeline performance
    // For more information, see https://docs.livekit.io/agents/build/metrics/
    const usageCollector = new metrics.UsageCollector();
    processingLog.metrics = [];
    
    session.on(voice.AgentSessionEventTypes.MetricsCollected, (ev) => {
      metrics.logMetrics(ev.metrics);
      usageCollector.collect(ev.metrics);
      
      // Log detailed processing times
      const metricsData = ev.metrics as any;
      console.log('='.repeat(80));
      console.log('[Processing Metrics]');
      
      const metricEntry: any = {
        timestamp: new Date().toISOString(),
      };
      
      // STT metrics
      if (metricsData.stt) {
        const sttMetrics = metricsData.stt;
        const sttLog = {
          processingTime: sttMetrics.processingTime ? `${sttMetrics.processingTime}ms` : 'N/A',
          tokens: sttMetrics.tokens || 'N/A',
          characters: sttMetrics.characters || 'N/A',
          segments: sttMetrics.segments || 'N/A',
        };
        console.log('STT:', sttLog);
        metricEntry.STT = sttLog;
      }
      
      // LLM metrics
      if (metricsData.llm) {
        const llmMetrics = metricsData.llm;
        const llmLog = {
          processingTime: llmMetrics.processingTime ? `${llmMetrics.processingTime}ms` : 'N/A',
          tokens: llmMetrics.tokens || 'N/A',
          inputTokens: llmMetrics.inputTokens || 'N/A',
          outputTokens: llmMetrics.outputTokens || 'N/A',
          timeToFirstToken: llmMetrics.timeToFirstToken ? `${llmMetrics.timeToFirstToken}ms` : 'N/A',
        };
        console.log('LLM:', llmLog);
        metricEntry.LLM = llmLog;
      }
      
      // TTS metrics
      if (metricsData.tts) {
        const ttsMetrics = metricsData.tts;
        const ttsLog = {
          processingTime: ttsMetrics.processingTime ? `${ttsMetrics.processingTime}ms` : 'N/A',
          characters: ttsMetrics.characters || 'N/A',
          audioDuration: ttsMetrics.audioDuration ? `${ttsMetrics.audioDuration}s` : 'N/A',
          timeToFirstChunk: ttsMetrics.timeToFirstChunk ? `${ttsMetrics.timeToFirstChunk}ms` : 'N/A',
        };
        console.log('TTS:', ttsLog);
        metricEntry.TTS = ttsLog;
      }
      
      console.log('='.repeat(80));
      
      // メトリクスをログに追加
      processingLog.metrics!.push(metricEntry);
    });

    const logUsage = async () => {
      const summary = usageCollector.getSummary();
      console.log('='.repeat(80));
      console.log('[Session Summary]');
      console.log(`Usage: ${JSON.stringify(summary, null, 2)}`);
      console.log('='.repeat(80));
      
      // セッションサマリーをログに保存
      processingLog.sessionSummary = summary;
      
      // 処理時間ログをファイルに保存
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const logFile = path.join(debugDateDir, `processing-times-${timestamp}.json`);
      fs.writeFileSync(logFile, JSON.stringify(processingLog, null, 2));
      console.log(`[Agent] 💾 Saved processing times log to: ${logFile}`);
    };

    ctx.addShutdownCallback(logUsage);

    // エラーハンドリングを追加
    session.on(voice.AgentSessionEventTypes.Error, (ev) => {
      console.error('[Agent Session Error]', ev.error);
      if (ev.error instanceof Error) {
        console.error('[Agent Session Error] Stack:', ev.error.stack);
      }
    });

    session.on(voice.AgentSessionEventTypes.UserStateChanged, (ev) => {
      console.log(`[Agent] User state changed: ${ev.newState}`);
    });

    session.on(voice.AgentSessionEventTypes.AgentStateChanged, (ev) => {
      console.log(`[Agent] Agent state changed: ${ev.newState}`);
    });

    // STTエラーの詳細ログを追加
    console.log('[Agent] VAD check:', {
      sessionVad: session.vad ? 'exists' : 'missing',
      sessionVadType: session.vad?.constructor?.name || 'undefined',
      stt: session.stt ? 'exists' : 'missing',
      sttCapabilities: session.stt ? {
        streaming: (session.stt as any).capabilities?.streaming || 'unknown',
      } : 'N/A',
    });

    // Start the session, which initializes the voice pipeline and warms up the models
    // AgentクラスにもVADを設定する必要がある（STTが非ストリーミングの場合）
    const assistant = new Assistant();
    // AgentクラスにVADを設定（AgentSessionのVADを使用）
    (assistant as any)._vad = session.vad;
    
    await session.start({
      agent: assistant,
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

    // 初期応答を生成してユーザーに挨拶する
    console.log('[Agent] Generating initial greeting...');
    const handle = session.generateReply({
      instructions: 'フレンドリーで可愛らしい感じで、カジュアルな口調でユーザーに挨拶して、何かお手伝いできることはあるか尋ねてください。敬語は使わず、親しみやすい感じで話してください。',
    });
    await handle.waitForPlayout();
    console.log('[Agent] Initial greeting completed');
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));
