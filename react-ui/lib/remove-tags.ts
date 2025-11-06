/**
 * メッセージからエモーションタグとモーションタグを除去する
 * 
 * 除去するタグ:
 * - エモーションタグ: (happy), (excited), (calm), など
 * - モーションタグ: <smile>, <talk>, <happy>, など
 * - 優先度タグ: <priority:5>, など
 * - 表情タグ: <thinking>, <neutral>, など
 * 
 * @param message - 元のメッセージ
 * @returns タグを除去したメッセージ
 */
export function removeEmotionAndMotionTags(message: string): string {
  return message
    // エモーションタグを除去: (happy), (excited), (in a hurry tone), など
    .replace(/\([a-z\s]+\)/gi, '')
    // モーションタグを除去: <smile>, <talk>, <happy>, など
    .replace(/<[a-z]+>/gi, '')
    // 優先度タグを除去: <priority:5>, など
    .replace(/<priority:\d+>/gi, '')
    // 複数の連続する空白を1つにまとめる
    .replace(/\s+/g, ' ')
    // 先頭と末尾の空白を除去
    .trim();
}

