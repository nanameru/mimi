/**
 * PPTX エクスポート API エンドポイント
 * HTMLスライドをPowerPoint形式に変換してダウンロード
 */

import type { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';

/**
 * POST /api/export-pptx
 * HTMLコンテンツを受け取り、PPTXファイルを返す
 */
export async function exportPptx(req: Request, res: Response): Promise<void> {
  let tmpDir: string | null = null;
  let htmlPath: string | null = null;
  
  try {
    const { html, filename = 'slides.pptx' } = req.body;
    
    if (!html || typeof html !== 'string') {
      res.status(400).json({ error: 'HTML content is required' });
      return;
    }
    
    console.log('[Export PPTX] 📝 Starting PPTX export...');
    console.log(`[Export PPTX] HTML length: ${html.length} chars`);
    
    // 一時ディレクトリを作成
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pptx-export-'));
    htmlPath = path.join(tmpDir, 'slides.html');
    
    // HTMLファイルを保存
    await fs.writeFile(htmlPath, html, 'utf-8');
    console.log(`[Export PPTX] 💾 HTML saved to: ${htmlPath}`);
    
    // html2pptxで変換
    console.log('[Export PPTX] 🎬 Converting to PPTX...');
    
    // html2pptxを動的にインポート
    const html2pptx = await import('html2pptx').then(m => m.default || m);
    
    // HTMLをPPTXに変換
    const pptxBuffer = await html2pptx(htmlPath);
    
    console.log(`[Export PPTX] ✅ PPTX generated (${pptxBuffer.length} bytes)`);
    
    // レスポンスヘッダー設定
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pptxBuffer.length);
    
    // ファイル送信
    res.send(pptxBuffer);
    
  } catch (error) {
    console.error('[Export PPTX] ❌ Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PPTX',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    // クリーンアップ: 一時ファイルを削除
    if (tmpDir) {
      try {
        await fs.rm(tmpDir, { recursive: true, force: true });
        console.log(`[Export PPTX] 🗑️ Cleaned up temporary directory: ${tmpDir}`);
      } catch (cleanupError) {
        console.warn('[Export PPTX] ⚠️ Failed to cleanup:', cleanupError);
      }
    }
  }
}

