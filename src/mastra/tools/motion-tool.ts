import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Live2Dモーション実行ツール
 * 
 * 会話の文脈に基づいて適切なLive2Dモーションを実行します。
 * 将来的にLiveKitのData Channel経由でフロントエンドに送信されます。
 */
export const motionTool = createTool({
  id: 'motion-tool',
  description: `Live2Dキャラクターのモーションを実行します。
  
**重要**: モーショングループ（"TapBody"など）ではなく、**必ずaction: 'play_file'を使用して具体的なモーションファイル名を指定してください**。

利用可能なモーションファイル（必ずこれらから選択）:
- haru_g_m01.motion3.json 〜 haru_g_m26.motion3.json（全26種類の会話・反応系モーション）
- haru_g_idle.motion3.json（アイドル専用、待機中）

よく使うモーションファイル:
- haru_g_m26.motion3.json - 会話モーション（よく使う）
- haru_g_m20.motion3.json - 通常モーション（よく使う）
- haru_g_m06.motion3.json - 情報提供・考え込むモーション（よく使う）
- haru_g_m09.motion3.json - 情報・確認モーション（よく使う）
- haru_g_m02.motion3.json - 喜び・笑顔のモーション
- haru_g_m05.motion3.json - 驚きのモーション
- haru_g_m11.motion3.json - 驚き・反応のモーション
- haru_g_m04.motion3.json - 謝罪・お辞儀のモーション
- haru_g_m08.motion3.json - フォロー・申し訳なさそうなモーション
- haru_g_m07.motion3.json - 悲しみ・困ったモーション
- haru_g_m12.motion3.json - 心配・困ったモーション
  
表情（Haruモデル）:
- "F01": 通常の表情
- "F02": 笑顔
- "F03": 考え中の表情
- "F04": 表情4
- "F05": 表情5
- "F06": 表情6
- "F07": 表情7
- "F08": 表情8
  
優先度:
- 1-2: 低優先度（他のモーションに割り込まれやすい）
- 3: 通常優先度（デフォルト）
- 4-5: 高優先度（他のモーションを中断する）

モーション選択のガイドライン:
- 肯定的な応答・喜び: haru_g_m26.motion3.json または haru_g_m20.motion3.json（優先度: 4-5）+ 表情F02
- 質問や確認・考え込む: haru_g_m06.motion3.json または haru_g_m09.motion3.json（優先度: 3-4）+ 表情F03
- 驚き: haru_g_m05.motion3.json または haru_g_m11.motion3.json（優先度: 5）+ 表情F03
- 謝罪: haru_g_m04.motion3.json または haru_g_m08.motion3.json（優先度: 4-5）+ 表情F03
- 悲しみ・困った: haru_g_m07.motion3.json または haru_g_m12.motion3.json（優先度: 4）+ 表情F03

**実行方法**: 必ずaction: 'play_file'を使用し、motion_fileパラメータに具体的なファイル名（例: "haru_g_m26.motion3.json"または"haru_g_m26"）を指定してください。`,
  inputSchema: z.object({
    action: z.enum(['play', 'play_file', 'expression']).describe('実行するアクションの種類'),
    motion: z.string().optional().describe('モーショングループ名（例: "Idle", "TapBody"）。actionが"play"の場合に必須'),
    motion_file: z.string().optional().describe('モーションファイル名（例: "haru_g_m01"）。actionが"play_file"の場合に必須'),
    priority: z.number().min(1).max(5).optional().default(3).describe('モーションの優先度（1-5、デフォルト: 3）'),
    expression_name: z.string().optional().describe('表情名（例: "exp_01", "F01", "F02"）。actionが"expression"の場合に必須'),
  }),
  outputSchema: z.object({
    success: z.boolean().describe('モーション実行が成功したかどうか'),
    message: z.string().describe('実行結果のメッセージ'),
    motion_data: z.object({
      type: z.string(),
      action: z.string(),
      motion: z.string().optional(),
      motion_file: z.string().optional(),
      priority: z.number().optional(),
      name: z.string().optional(),
    }).optional().describe('送信されたモーションデータ（将来のLiveKit統合用）'),
  }),
  execute: async ({ context }) => {
    const { action, motion, motion_file, priority = 3, expression_name } = context;

    // バリデーション
    if (action === 'play' && !motion) {
      return {
        success: false,
        message: 'モーショングループ名が指定されていません',
      };
    }

    if (action === 'play_file' && !motion_file) {
      return {
        success: false,
        message: 'モーションファイル名が指定されていません',
      };
    }

    if (action === 'expression' && !expression_name) {
      return {
        success: false,
        message: '表情名が指定されていません',
      };
    }

    // モーションデータを構築（将来のLiveKit Data Channel統合用）
    const motionData: any = {
      type: 'live2d_motion',
      action,
    };

    if (action === 'play') {
      motionData.motion = motion;
      motionData.priority = priority;
    } else if (action === 'play_file') {
      motionData.motion_file = motion_file;
      motionData.priority = priority;
    } else if (action === 'expression') {
      motionData.name = expression_name;
    }

    // 現時点では、将来的にLiveKitのData Channel経由で送信されることを想定
    // 実際の実行は後で統合する際に実装
    console.log('[MotionTool] Motion execution request:', motionData);

    return {
      success: true,
      message: `モーション実行リクエストを生成しました: ${action}${motion ? ` (${motion})` : ''}${motion_file ? ` (${motion_file})` : ''}${expression_name ? ` (${expression_name})` : ''}`,
      motion_data: motionData,
    };
  },
});

