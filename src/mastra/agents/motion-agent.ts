import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { motionTool } from '../tools/motion-tool';

/**
 * モーションエージェント
 * 
 * 会話の文脈から適切なLive2Dモーションを判断し、実行します。
 * STTで変換されたテキストと会話履歴を分析して、最適なモーションを選択します。
 */
export const motionAgent = new Agent({
  name: 'Motion Agent',
  instructions: `会話内容から適切なモーションと表情を選択し、motionToolのみを実行してください。テキスト生成は不要です。ツール実行のみを行ってください。

## 利用可能なモーション一覧

- haru_g_m01.motion3.json - 会話モーション1（基本会話）
- haru_g_m02.motion3.json - 会話モーション2（喜び・笑顔）
- haru_g_m03.motion3.json - 会話モーション3（考え込む）
- haru_g_m04.motion3.json - 会話モーション4（謝罪・お辞儀）
- haru_g_m05.motion3.json - 会話モーション5（驚き）
- haru_g_m06.motion3.json - 情報提供モーション（情報を伝える）
- haru_g_m07.motion3.json - 会話モーション7（悲しみ・困った）
- haru_g_m08.motion3.json - 会話モーション8（フォロー・申し訳なさそう）
- haru_g_m09.motion3.json - 情報モーション（情報・確認）
- haru_g_m10.motion3.json - 会話モーション10（自然な会話）
- haru_g_m11.motion3.json - 会話モーション11（驚き・反応）
- haru_g_m12.motion3.json - 会話モーション12（心配・困った）
- haru_g_m13.motion3.json - 会話モーション13（会話中）
- haru_g_m14.motion3.json - 会話モーション14（会話中）
- haru_g_m15.motion3.json - アイドルバリエーション（待機）
- haru_g_m16.motion3.json - 会話モーション16（会話中）
- haru_g_m17.motion3.json - 会話モーション17（会話中）
- haru_g_m18.motion3.json - 会話モーション18（会話中）
- haru_g_m19.motion3.json - 会話モーション19（会話中）
- haru_g_m20.motion3.json - 通常モーション（標準的な会話・よく使う）
- haru_g_m21.motion3.json - 会話モーション21（会話中）
- haru_g_m22.motion3.json - 会話モーション22（会話中）
- haru_g_m23.motion3.json - 会話モーション23（会話中）
- haru_g_m24.motion3.json - 会話モーション24（会話中）
- haru_g_m25.motion3.json - 会話モーション25（会話中）
- haru_g_m26.motion3.json - 会話モーション26（会話・喜び・よく使う）
- haru_g_idle.motion3.json - 標準アイドル（待機中）

## 表情一覧

- F01 - 通常の表情
- F02 - 笑顔
- F03 - 考え中の表情
- F04 - 表情4
- F05 - 表情5
- F06 - 表情6
- F07 - 表情7
- F08 - 表情8

## 選択基準

- 喜び/肯定/笑顔: haru_g_m02.motion3.json または haru_g_m26.motion3.json + F02
- 質問/確認/考え込む: haru_g_m06.motion3.json または haru_g_m09.motion3.json + F03
- 驚き: haru_g_m05.motion3.json または haru_g_m11.motion3.json + F03
- 謝罪/フォロー: haru_g_m04.motion3.json または haru_g_m08.motion3.json + F03
- 悲しみ/困った/心配: haru_g_m07.motion3.json または haru_g_m12.motion3.json + F03
- 通常の会話: haru_g_m20.motion3.json または haru_g_m26.motion3.json + F02
- その他: haru_g_m20.motion3.json + F02（デフォルト）

必ずmotionToolを2回実行: 1回目=モーション（action: 'play_file', priority: 5）、2回目=表情（action: 'expression'）`,
  model: openai('gpt-5-mini'),
  tools: { motionTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});

