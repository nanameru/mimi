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
  const previousSlideCountRef = useRef<number>(0);

  // コンテンツをiframeに注入（スクロール位置の賢い管理付き）
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
        
        // 更新前の状態を保存
        const previousScrollY = doc.documentElement?.scrollTop || 0;
        const previousSlideCount = previousSlideCountRef.current;
        
        // コンテンツを更新
        doc.open();
        doc.write(cleanedContent);
        doc.close();
        
        // 更新後の状態を取得
        const slides = doc.querySelectorAll('.slide');
        const newSlideCount = slides.length;
        
        console.log(`[SlideEditor] Slides: ${previousSlideCount} → ${newSlideCount}, ScrollY: ${previousScrollY}`);
        
        // スライドが増えた場合は最新スライドまでスムーズにスクロール
        if (newSlideCount > previousSlideCount && newSlideCount > 0) {
          // 最後のスライドの位置を計算（各スライドは540px高さ）
          const lastSlide = slides[newSlideCount - 1] as HTMLElement;
          if (lastSlide) {
            const slideTop = lastSlide.offsetTop;
            console.log(`[SlideEditor] 📜 New slide added, scrolling to slide ${newSlideCount} at ${slideTop}px`);
            
            // スムーズスクロール
            doc.documentElement?.scrollTo({
              top: slideTop,
              behavior: 'smooth',
            });
          }
        } else if (previousSlideCount > 0) {
          // スライドが増えていない場合は元の位置を復元
          console.log(`[SlideEditor] 📍 Restoring scroll position to ${previousScrollY}px`);
          doc.documentElement.scrollTop = previousScrollY;
        }
        
        // 現在のスライド数を保存
        previousSlideCountRef.current = newSlideCount;
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

