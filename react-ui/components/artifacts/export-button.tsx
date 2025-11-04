/**
 * PPTX エクスポートボタン
 * スライドHTMLをPowerPoint形式でダウンロード
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/livekit/button';

type ExportButtonProps = {
  htmlContent: string;
  disabled?: boolean;
};

export function ExportButton({ htmlContent, disabled = false }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    if (!htmlContent || isExporting) return;
    
    setIsExporting(true);
    
    try {
      console.log('[Export] 📤 Starting PPTX export...');
      console.log(`[Export] HTML length: ${htmlContent.length} chars`);
      
      // API にリクエスト送信
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/export-pptx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          filename: `slides-${Date.now()}.pptx`,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || 'Export failed');
      }
      
      // Blob としてダウンロード
      const blob = await response.blob();
      console.log(`[Export] 💾 Received PPTX file (${blob.size} bytes)`);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `slides-${Date.now()}.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('[Export] ✅ PPTX exported successfully');
    } catch (error) {
      console.error('[Export] ❌ Export failed:', error);
      alert(`エクスポートに失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting}
      variant="outline"
      className="flex items-center gap-2 px-3 py-2"
    >
      {isExporting ? (
        <>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-sm">変換中...</span>
        </>
      ) : (
        <>
          <svg 
            className="h-4 w-4" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          <span className="text-sm font-medium">PPTX出力</span>
        </>
      )}
    </Button>
  );
}

