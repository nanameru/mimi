import {
  type JobContext,
  type JobProcess,
  WorkerOptions,
  cli,
  defineAgent,
  llm,
  metrics,
  voice,
} from '@livekit/agents';
import * as livekit from '@livekit/agents-plugin-livekit';
import * as openai from '@livekit/agents-plugin-openai';
import * as silero from '@livekit/agents-plugin-silero';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';
import { z } from 'zod';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import * as fs from 'fs';
import * as path from 'path';
import { FishAudioTTS } from './custom-fish-tts.js';
import { mastra } from './mastra/index.js';

dotenv.config({ path: '.env.local' });

/**
 * 実行済みタスクの履歴を記録する型定義
 */
interface ExecutedTask {
  timestamp: number;
  userMessage: string;
  toolName: string;
  toolArgs: any;
  result: string;
}

/**
 * セッション全体で共有される実行済みタスクの履歴
 * key: roomName, value: タスク履歴の配列
 */
const executedTasksHistory = new Map<string, ExecutedTask[]>();

/**
 * タスクエージェントを呼び出してツールを実行（天気、ドキュメント作成など）
 * Mastra の taskAgent が会話履歴を分析して、タスク実行が必要かどうかを判断する
 */
async function handleTaskAgent(
  conversationHistory: any[],
  room: any,
): Promise<void> {
  console.log(`[Task Agent] Starting task execution...`);
  
  try {
    const taskAgent = mastra.getAgent('taskAgent');
    const roomName = room.name || 'default';

    // 会話履歴からユーザーの最後のメッセージを取得
    const lastUserMessage = conversationHistory
      .filter((item: any) => item.role === 'user')
      .slice(-1)[0];

    if (!lastUserMessage) {
      console.log('[Task Agent] No user message found in history, skipping task execution');
      return;
    }

    const userContent = typeof lastUserMessage.content === 'string'
      ? lastUserMessage.content
      : Array.isArray(lastUserMessage.content)
        ? lastUserMessage.content.map((c: any) => typeof c === 'string' ? c : c.text || '').join('')
        : String(lastUserMessage.content || '');

    console.log(`[Task Agent] User message: "${userContent}"`);

    // 実行済みタスクの履歴を取得
    const roomTaskHistory = executedTasksHistory.get(roomName) || [];
    console.log(`[Task Agent] Found ${roomTaskHistory.length} previously executed tasks`);

    // タスクエージェントに会話履歴を渡す（最後の数件のみ）
    const recentHistory = conversationHistory.slice(-10); // 最後の10件に増やす
    
    const messages = recentHistory.map((item: any) => {
      const content = typeof item.content === 'string'
        ? item.content
        : Array.isArray(item.content)
          ? item.content.map((c: any) => typeof c === 'string' ? c : c.text || '').join('')
          : String(item.content || '');
      
      return {
        role: item.role === 'user' ? 'user' : 'assistant',
        content,
      };
    }) as Array<{ role: 'user' | 'assistant'; content: string }>;

    // 実行済みタスクの履歴をシステムメッセージとして追加
    if (roomTaskHistory.length > 0) {
      const taskHistoryText = roomTaskHistory
        .map((task, idx) => {
          const date = new Date(task.timestamp).toLocaleString('ja-JP');
          return `${idx + 1}. [${date}] ユーザー: "${task.userMessage}" → ツール: ${task.toolName} → 結果: ${task.result}`;
        })
        .join('\n');

      messages.unshift({
        role: 'user',
        content: `【重要】以下は既に実行済みのタスクです。同じタスクを再度実行しないでください：\n${taskHistoryText}`,
      });
      
      console.log(`[Task Agent] Added task history context:\n${taskHistoryText}`);
    }

    // タスクエージェントを実行
    console.log(`[Task Agent] Calling taskAgent.generate() with ${messages.length} messages`);
    console.log(`[Task Agent] Messages:`, JSON.stringify(messages, null, 2));
    
    const response = await taskAgent.generate(
      messages as any, // Mastra の型定義に合わせるため
      {
        // runtimeContextにroomを渡すことで、toolがアーティファクトを送信できる
        runtimeContext: {
          room,
        } as any, // RuntimeContext に room を追加するため
      }
    );

    const responseText = response.text || '';
    console.log(`[Task Agent] Response: "${responseText}"`);
    
    // ツールが実行されたかどうかを確認
    if ((response as any).toolCalls && (response as any).toolCalls.length > 0) {
      const toolCalls = (response as any).toolCalls;
      console.log(`[Task Agent] Tool calls executed:`, toolCalls);
      
      // 実行されたタスクを履歴に記録
      if (!executedTasksHistory.has(roomName)) {
        executedTasksHistory.set(roomName, []);
      }
      
      const history = executedTasksHistory.get(roomName)!;
      
      for (const toolCall of toolCalls) {
        const executedTask: ExecutedTask = {
          timestamp: Date.now(),
          userMessage: userContent,
          toolName: toolCall.toolName || 'unknown',
          toolArgs: toolCall.args || {},
          result: responseText || 'completed',
        };
        
        history.push(executedTask);
        console.log(`[Task Agent] Recorded executed task: ${executedTask.toolName} for message: "${userContent}"`);
      }
      
      // 履歴が長くなりすぎないように制限（最新20件まで）
      if (history.length > 20) {
        history.splice(0, history.length - 20);
        console.log(`[Task Agent] Trimmed task history to 20 most recent tasks`);
      }
    } else {
      console.log(`[Task Agent] No tool calls executed`);
    }
    
    // レスポンス全体をログに出力（デバッグ用）
    console.log(`[Task Agent] Full response object:`, JSON.stringify(response, null, 2));
    
    // レスポンスは返さない（非同期で実行するため）
  } catch (error) {
    console.error(`[Task Agent] Error:`, error);
    // エラーが発生しても処理を続行する（非同期実行のため）
  }
}

/**
 * モーションエージェントを呼び出してモーションを実行
 * motion-agentはコメントアウト済み
 */
/*
async function handleMotionAgent(
  transcript: string,
  room: any, // JobContext.room の型
): Promise<void> {
  const startTime = Date.now();
  console.log(`[Motion Agent] Starting motion agent at ${new Date().toISOString()}`);
  
  try {
    const motionAgent = mastra.getAgent('motionAgent');

    // モーションエージェントに会話テキストを渡す
    const responseStartTime = Date.now();
    const response = await motionAgent.generate([
      {
        role: 'user',
        content: `以下の会話内容から、適切なLive2Dモーションを選択して実行してください: ${transcript}`,
      },
    ]);
    const responseEndTime = Date.now();
    console.log(`[Motion Agent] LLM response received in ${responseEndTime - responseStartTime}ms`);

    // ツール実行結果を確認
    // response.toolResults の構造を確認
    console.log('[Motion Agent] Response:', {
      hasToolResults: !!response.toolResults,
      toolResultsLength: response.toolResults?.length || 0,
      toolResults: response.toolResults,
      timestamp: new Date().toISOString(),
    });

    if (response.toolResults && response.toolResults.length > 0) {
      // toolResultsは配列で、各要素はツール実行結果を含む
      for (const toolResult of response.toolResults) {
        // toolResultの構造を確認（型によって異なる可能性がある）
        const result = toolResult as any;
        
        // デバッグ用: 構造を詳細にログ出力
        console.log('[Motion Agent] ToolResult structure:', {
          hasPayload: !!result.payload,
          payloadType: typeof result.payload,
          payloadKeys: result.payload ? Object.keys(result.payload) : [],
          payload: result.payload,
        });
        
        // payloadの中にデータがある場合（Mastraの標準構造）
        if (result.payload) {
          const payload = result.payload;
          
          // payloadが直接successとmotion_dataを持つ場合
          if (payload.success && payload.motion_data) {
            const motionData = payload.motion_data;
            const sendStartTime = Date.now();
            await sendMotionToFrontend(room, motionData);
            const sendEndTime = Date.now();
            console.log(`[Motion Agent] Motion sent (from payload) in ${sendEndTime - sendStartTime}ms:`, motionData);
            continue;
          }
          
          // payload.resultがsuccessとmotion_dataを持つ場合
          if (payload.result?.success && payload.result?.motion_data) {
            const motionData = payload.result.motion_data;
            const sendStartTime = Date.now();
            await sendMotionToFrontend(room, motionData);
            const sendEndTime = Date.now();
            console.log(`[Motion Agent] Motion sent (from payload.result) in ${sendEndTime - sendStartTime}ms:`, motionData);
            continue;
          }
          
          // payloadに直接motion_dataがある場合
          if (payload.motion_data) {
            const motionData = payload.motion_data;
            const sendStartTime = Date.now();
            await sendMotionToFrontend(room, motionData);
            const sendEndTime = Date.now();
            console.log(`[Motion Agent] Motion sent (direct payload.motion_data) in ${sendEndTime - sendStartTime}ms:`, motionData);
            continue;
          }
        }
        
        // resultが直接successとmotion_dataを持つ場合
        if (result.success && result.motion_data) {
          const motionData = result.motion_data;
          const sendStartTime = Date.now();
          await sendMotionToFrontend(room, motionData);
          const sendEndTime = Date.now();
          console.log(`[Motion Agent] Motion sent (direct) in ${sendEndTime - sendStartTime}ms:`, motionData);
          continue;
        }
        
        // result.resultがsuccessとmotion_dataを持つ場合
        if (result.result?.success && result.result?.motion_data) {
          const motionData = result.result.motion_data;
          const sendStartTime = Date.now();
          await sendMotionToFrontend(room, motionData);
          const sendEndTime = Date.now();
          console.log(`[Motion Agent] Motion sent (from result.result) in ${sendEndTime - sendStartTime}ms:`, motionData);
          continue;
        }
        
        // その他の構造を試す
        if (result.motion_data) {
          const motionData = result.motion_data;
          const sendStartTime = Date.now();
          await sendMotionToFrontend(room, motionData);
          const sendEndTime = Date.now();
          console.log(`[Motion Agent] Motion sent (fallback) in ${sendEndTime - sendStartTime}ms:`, motionData);
        }
      }
    } else {
      console.log('[Motion Agent] No tool results found');
    }
    
    const endTime = Date.now();
    console.log(`[Motion Agent] Total processing time: ${endTime - startTime}ms`);
  } catch (error) {
    const endTime = Date.now();
    console.error(`[Motion Agent] Failed to execute after ${endTime - startTime}ms:`, error);
  }
}
*/

/**
 * Motion-Tag マッピングテーブル
 * 意味的なタグ名をLive2Dモーションファイル名に変換
 */
const MOTION_TAG_MAP: Record<string, string> = {
  // 感情・反応系
  smile: 'haru_g_m02',
  happy: 'haru_g_m26',
  surprised: 'haru_g_m05',
  react: 'haru_g_m11',
  sad: 'haru_g_m07',
  worry: 'haru_g_m12',
  
  // 行動系
  think: 'haru_g_m03',
  explain: 'haru_g_m06',
  confirm: 'haru_g_m09',
  apologize: 'haru_g_m04',
  sorry: 'haru_g_m08',
  
  // 会話系
  talk: 'haru_g_m20', // デフォルト
  chat: 'haru_g_m10',
  speak: 'haru_g_m13',
  discuss: 'haru_g_m14',
  respond: 'haru_g_m16',
  reply: 'haru_g_m17',
  answer: 'haru_g_m18',
  interact: 'haru_g_m19',
  express: 'haru_g_m21',
  gesture: 'haru_g_m22',
  communicate: 'haru_g_m23',
  engage: 'haru_g_m24',
  converse: 'haru_g_m25',
  
  // 待機系
  idle: 'haru_g_idle',
};

/**
 * Expression-Tag マッピングテーブル
 * 意味的なタグ名を表情IDに変換
 */
const EXPRESSION_TAG_MAP: Record<string, string> = {
  neutral: 'F01',
  smile: 'F02',
  thinking: 'F03',
  curious: 'F04',
  confused: 'F05',
  serious: 'F06',
  gentle: 'F07',
  playful: 'F08',
};

/**
 * LLMの応答テキストからmotion-tagを検出して実行（高速化版）
 */
async function handleMotionTags(
  content: string,
  room: any, // JobContext.room の型
): Promise<void> {
  try {
    // モーションタグを検出: <smile>, <happy>, <think> など
    const motionRegex = /<([a-z]+)>/g;
    const motionMatches = Array.from(content.matchAll(motionRegex));
    
    // 優先度タグを検出: <priority:5> など
    const priorityMatch = content.match(/<priority:([1-5])>/);
    const priority = priorityMatch ? parseInt(priorityMatch[1]!, 10) : 5;
    
    // 表情タグを検出: <smile>, <thinking> など（モーションタグと重複する可能性がある）
    // ただし、表情タグはモーションタグとは別に処理する
    const expressionRegex = /<(smile|thinking|neutral|curious|confused|serious|gentle|playful)>/g;
    const expressionMatches = Array.from(content.matchAll(expressionRegex));
    
    let motionExecuted = false;
    let expressionExecuted = false;
    
    // 最初のモーションタグを実行
    if (motionMatches.length > 0) {
      const firstMotionTag = motionMatches[0]![1]!;
      const motionFile = MOTION_TAG_MAP[firstMotionTag];
      
      if (motionFile) {
        const motionData = {
          type: 'live2d_motion',
          action: 'play_file',
          motion_file: motionFile,
          priority: priority,
        };
        
        // 即座に実行（awaitしない、ブロックしない）
        sendMotionToFrontend(room, motionData).catch((error) => {
          console.error('[Motion Tag] Failed to send motion:', error);
        });
        motionExecuted = true;
        console.log(`[Motion Tag] Motion executed (async): ${firstMotionTag} → ${motionFile} (priority: ${priority})`);
      } else {
        console.warn(`[Motion Tag] Unknown motion tag: ${firstMotionTag}`);
      }
    }
    
    // 最初の表情タグを実行（モーションタグとは別に処理）
    if (expressionMatches.length > 0) {
      const firstExpressionTag = expressionMatches[0]![1]!;
      const expressionId = EXPRESSION_TAG_MAP[firstExpressionTag];
      
      if (expressionId) {
        // モーションと表情が同じタグ名（例: <smile>）の場合、表情としても処理
        // ただし、既にモーションとして実行された場合は表情も実行
        if (firstExpressionTag === 'smile' && !motionExecuted) {
          // smileはモーションとして既に実行されている可能性があるので、表情だけ実行
          const expressionData = {
            type: 'live2d_motion',
            action: 'expression',
            name: expressionId,
          };
          
          // 即座に実行（awaitしない、ブロックしない）
          sendMotionToFrontend(room, expressionData).catch((error) => {
            console.error('[Motion Tag] Failed to send expression:', error);
          });
          expressionExecuted = true;
          console.log(`[Motion Tag] Expression executed (async): ${firstExpressionTag} → ${expressionId}`);
        } else if (firstExpressionTag !== 'smile') {
          // smile以外の表情タグは通常通り実行
          const expressionData = {
            type: 'live2d_motion',
            action: 'expression',
            name: expressionId,
          };
          
          // 即座に実行（awaitしない、ブロックしない）
          sendMotionToFrontend(room, expressionData).catch((error) => {
            console.error('[Motion Tag] Failed to send expression:', error);
          });
          expressionExecuted = true;
          console.log(`[Motion Tag] Expression executed (async): ${firstExpressionTag} → ${expressionId}`);
        }
      } else {
        console.warn(`[Motion Tag] Unknown expression tag: ${firstExpressionTag}`);
      }
    }
    
    // デフォルト: モーションタグがない場合、デフォルトのモーションと表情を実行
    if (!motionExecuted && !expressionExecuted) {
      // デフォルトは実行しない（motion-agentに任せる）
      console.log('[Motion Tag] No motion tags found, skipping default motion');
    }
  } catch (error) {
    console.error('[Motion Tag] Failed to execute motion tags:', error);
  }
}

/**
 * LiveKitのData Channel経由でフロントエンドにモーションデータを送信
 */
async function sendMotionToFrontend(
  room: any, // JobContext.room の型
  motionData: any,
): Promise<void> {
  try {
    // Data Channel経由でメッセージを送信
    const message = JSON.stringify(motionData);
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    // ローカルパブリケーションを取得してデータを送信
    const localParticipant = room.localParticipant;
    if (localParticipant) {
      await localParticipant.publishData(data, {
        reliable: true,
        destinationIdentities: [], // 空配列で全員に送信
      });

      console.log('[Motion Agent] Data sent to frontend:', motionData);
    }
  } catch (error) {
    console.error('[Motion Agent] Failed to send data:', error);
  }
}

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
</rules>

<motion_tags>
<requirement>
必須: すべての応答に、適切なLive2Dモーションタグを必ず使用してください。モーションタグがない場合は、motion-agentが別途実行されますが、タグがある場合は即座に実行されるため、より良いタイミングでモーションが実行されます。
重要: モーションタグは応答の先頭に配置してください。各文の前に配置することも可能です。
</requirement>

<available_motion_tags>
感情・反応系: <smile>, <happy>, <surprised>, <react>, <sad>, <worry>
行動系: <think>, <explain>, <confirm>, <apologize>, <sorry>
会話系: <talk>, <chat>, <speak>, <discuss>, <respond>, <reply>, <answer>, <interact>, <express>, <gesture>, <communicate>, <engage>, <converse>
待機系: <idle>
</available_motion_tags>

<available_expression_tags>
表情タグ: <neutral>, <smile>, <thinking>, <curious>, <confused>, <serious>, <gentle>, <playful>
注意: <smile>はモーションタグと表情タグの両方として機能します。
</available_expression_tags>

<priority_tags>
優先度タグ（オプション）: <priority:1>（低優先度）〜 <priority:5>（最高優先度、デフォルト）
</priority_tags>

<guidelines>
<by_context>
喜び/肯定/笑顔: <smile> または <happy> + <smile>（表情）+ <priority:5>
質問/確認/考え込む: <think> または <explain> または <confirm> + <thinking>（表情）+ <priority:3-4>
驚き: <surprised> または <react> + <thinking>（表情）+ <priority:5>
謝罪/フォロー: <apologize> または <sorry> + <thinking>（表情）+ <priority:4-5>
悲しみ/困った/心配: <sad> または <worry> + <thinking>（表情）+ <priority:4>
通常の会話: <talk> または <chat> または <happy> + <smile>（表情）+ <priority:3-4>
デフォルト: <talk> + <smile>（表情）+ <priority:3>
</by_context>
</guidelines>

<examples>
<correct>
✅ 正しい: (excited) <happy> <smile> <priority:5> こんにちは！
✅ 正しい: (curious) <think> <thinking> 何か質問があるの？
✅ 正しい: (surprised) <react> <priority:5> 本当ですか！
✅ 正しい: (regretful) <apologize> <thinking> 申し訳ありません。
</correct>
</examples>

<rules>
<mandatory>
必須: すべての応答に、適切なモーションタグを少なくとも1つ配置してください。
モーションタグは応答の先頭または各文の前に配置してください。
</mandatory>
<placement>
モーションタグは emotion-tag の後に配置してください。
例: (excited) <happy> <smile> こんにちは！
モーションタグと表情タグを同時に使用できます。
優先度タグはオプションですが、重要なモーションには <priority:5> を使用してください。
</placement>
</rules>`,

      // ツールは Mastra のタスクエージェント経由で実行されるため、ここではツールを定義しない
      // LLMの応答完了後に、ConversationItemAdded イベントでタスク実行が必要かどうかを判断し、
      // 必要なら Mastra の taskAgent が実行される
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

    // LLMの出力を監視してタイムスタンプを記録 + motion-tagを検出して実行（高速化版）
    session.on(voice.AgentSessionEventTypes.ConversationItemAdded, async (ev) => {
      // アシスタントの応答時：モーション処理のみ
      if (ev.item.role === 'assistant') {
        const llmOutputTime = Date.now();
        const content = ev.item.content;
        
        // contentが文字列でない場合（配列やオブジェクトの場合）を処理
        let contentString: string;
        if (typeof content === 'string') {
          contentString = content;
        } else if (Array.isArray(content)) {
          // 配列の場合は、すべてのテキスト要素を結合
          contentString = content
            .map((item: any) => {
              if (typeof item === 'string') {
                return item;
              } else if (item && typeof item.text === 'string') {
                return item.text;
              }
              return '';
            })
            .join('');
        } else if (content && typeof content === 'object' && 'text' in content) {
          // オブジェクトの場合はtextプロパティを取得
          contentString = String((content as any).text || '');
        } else {
          // その他の場合は文字列に変換を試みる
          contentString = String(content || '');
        }
        
        console.log(`[LLM Output] Message: "${contentString}" at ${new Date(llmOutputTime).toISOString()}`);
        
        // メッセージを保存して、モーション実行時間との比較に使用
        (globalThis as any).lastLLMOutput = {
          message: contentString,
          timestamp: llmOutputTime,
        };
        
        // motion-tagを検出して実行（完全非同期、ブロックしない）
        // 部分的なテキストからでもタグを検出（早期実行）
        const partialContent = contentString.substring(0, 30); // 最初の30文字をチェック
        const earlyMotionMatch = partialContent.match(/<([a-z]+)>/);
        
        if (earlyMotionMatch) {
          const earlyTag = earlyMotionMatch[1]!;
          const motionFile = MOTION_TAG_MAP[earlyTag];
          if (motionFile) {
            console.log(`[Motion Tag] Early detection: ${earlyTag} → ${motionFile}`);
            // 即座に実行（awaitしない、ブロックしない）
            const motionData = {
              type: 'live2d_motion',
              action: 'play_file',
              motion_file: motionFile,
              priority: 5,
            };
            sendMotionToFrontend(ctx.room, motionData).catch((error) => {
              console.error('[Motion Tag] Failed to send early motion:', error);
            });
          }
        }
        
        // 完全なテキストでもタグを検出（表情など追加情報用）
        handleMotionTags(contentString, ctx.room).then(() => {
          const motionTagEndTime = Date.now();
          console.log(`[Motion Tag] Completed in ${motionTagEndTime - llmOutputTime}ms`);
        }).catch((error) => {
          const motionTagEndTime = Date.now();
          console.error(`[Motion Tag] Error after ${motionTagEndTime - llmOutputTime}ms:`, error);
        });
      }
      
      // ユーザーのメッセージ時：タスクエージェントを実行
      if (ev.item.role === 'user') {
        const taskStartTime = Date.now();
        
        // 会話履歴を取得して Mastra の taskAgent を実行
        // taskAgent 自身が会話履歴を分析して、タスク実行が必要かどうかを判断する
        const conversationHistory = session.history?.items || [];
        
        console.log(`[Task Agent] ★★★ Executing taskAgent to analyze user message... ★★★`);
        console.log(`[Task Agent] Conversation history length: ${conversationHistory.length}`);
        
        // 非同期でタスクエージェントを実行（ブロックしない）
        handleTaskAgent(conversationHistory, ctx.room).then(() => {
          const taskEndTime = Date.now();
          console.log(`[Task Agent] ★★★ Completed in ${taskEndTime - taskStartTime}ms ★★★`);
        }).catch((error) => {
          const taskEndTime = Date.now();
          console.error(`[Task Agent] ★★★ Error after ${taskEndTime - taskStartTime}ms ★★★:`, error);
        });
      }
    });

    // STT完了時にモーションエージェントを呼び出す
    session.on(voice.AgentSessionEventTypes.UserInputTranscribed, async (ev) => {
      // デバッグ: 全てのtranscriptionイベントをログに出力
      console.log(`[Motion Agent] Transcription event received:`, {
        transcript: ev.transcript,
        isFinal: ev.isFinal,
        timestamp: new Date().toISOString(),
      });

      // 最終確定されたテキストのみを処理
      if (!ev.isFinal) {
        console.log(`[Motion Agent] Skipping non-final transcription: "${ev.transcript}"`);
        return;
      }

      const transcript = ev.transcript;
      console.log(`[Motion Agent] STT completed (final): "${transcript}" at ${new Date().toISOString()}`);

      // モーションエージェントを呼び出す（非同期で実行、ブロックしない）
      // motion-agentはコメントアウト済み
      // const motionStartTime = Date.now();
      // handleMotionAgent(transcript, ctx.room).then(() => {
      //   const motionEndTime = Date.now();
      //   console.log(`[Motion Agent] Completed in ${motionEndTime - motionStartTime}ms`);
      // }).catch((error) => {
      //   const motionEndTime = Date.now();
      //   console.error(`[Motion Agent] Error after ${motionEndTime - motionStartTime}ms:`, error);
      // });
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
