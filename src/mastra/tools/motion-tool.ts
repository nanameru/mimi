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
  
利用可能なモーション:
- モーショングループ:
  * "Idle": 待機モーション（常にループ再生される）
    - haru_g_idle.motion3.json（標準アイドル）
    - haru_g_m15.motion3.json（アイドルバリエーション）
  * "TapBody": 体をタップした時のモーション（反応・驚き・喜びなど）
    - haru_g_m26.motion3.json（会話モーション）
    - haru_g_m06.motion3.json（情報提供モーション）
    - haru_g_m20.motion3.json（通常モーション）
    - haru_g_m09.motion3.json（情報モーション）

- 個別モーションファイル（play_fileアクションで直接指定可能）:
  * haru_g_m01.motion3.json 〜 haru_g_m26.motion3.json（全26種類）
  * haru_g_idle.motion3.json（アイドル専用）
  
- 表情（Haruモデル）:
  * "F01": 通常の表情
  * "F02": 笑顔
  * "F03": 考え中の表情
  * "F04": 表情4
  * "F05": 表情5
  * "F06": 表情6
  * "F07": 表情7
  * "F08": 表情8
  
優先度:
- 1-2: 低優先度（他のモーションに割り込まれやすい）
- 3: 通常優先度（デフォルト）
- 4-5: 高優先度（他のモーションを中断する）

モーション選択のガイドライン:
- 肯定的な応答: "TapBody"グループ（喜び・笑顔のモーション、優先度: 4-5）
- 質問や確認: "TapBody"グループ（首を傾げる・考え込むモーション、優先度: 3-4）
- 謝罪やフォロー: "TapBody"グループ（お辞儀・申し訳なさそうなモーション、優先度: 4-5）
- 待機中: "Idle"グループ（自然な待機姿勢、優先度: 1-2）
- 感情表現: 表情を変更（happy→F02, sad→F03など）
- 特定のモーション: play_fileアクションで直接ファイル名を指定（例: "haru_g_m01"）`,
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

