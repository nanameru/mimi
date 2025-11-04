/**
 * スライドエディター（HTMLプレビュー）
 */

'use client';

import { useEffect, useRef, useState } from 'react';

type SlideEditorProps = {
  content: string;
};

export function SlideEditor({ content }: SlideEditorProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // コンテンツをiframeに注入
  useEffect(() => {
    if (iframeRef.current && content) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        // マークダウンコードブロック (```html ... ```) を削除
        let cleanedContent = content;
        
        // 複数の```htmlブロックがある場合、最初のものだけを取得
        const htmlBlockMatch = cleanedContent.match(/```html\s*([\s\S]*?)```/);
        if (htmlBlockMatch) {
          cleanedContent = htmlBlockMatch[1].trim();
        }
        
        // まだ```が残っている場合は削除
        cleanedContent = cleanedContent.replace(/```html/g, '').replace(/```/g, '').trim();
        
        // HTMLとして有効かチェック（<!DOCTYPE または <html で始まる）
        if (!cleanedContent.startsWith('<!DOCTYPE') && !cleanedContent.startsWith('<html')) {
          console.warn('[SlideEditor] Content does not appear to be valid HTML:', cleanedContent.substring(0, 100));
        }
        
        doc.open();
        doc.write(cleanedContent);
        doc.close();
      }
    }
  }, [content]);

  // スライドのアスペクト比を維持しながらスケーリング（画面幅いっぱいに表示）
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const slideWidth = 960; // スライドの基準幅（16:9 の場合）
        // 画面いっぱいに表示するため、containerWidthを最大限使用
        const newScale = containerWidth / slideWidth;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full overflow-y-auto bg-[#f7f7f8]">
      <div
        className="w-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '960px',
        }}
      >
        <iframe
          ref={iframeRef}
          title="Slide Preview"
          className="w-full border-0"
          sandbox="allow-same-origin allow-scripts"
          style={{
            width: '960px',
            minHeight: '540px',
            background: 'white',
          }}
        />
      </div>
    </div>
  );
}

