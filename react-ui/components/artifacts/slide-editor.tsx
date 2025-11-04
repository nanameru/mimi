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
        doc.open();
        doc.write(content);
        doc.close();
      }
    }
  }, [content]);

  // スライドのアスペクト比を維持しながらスケーリング
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const slideWidth = 960; // スライドの幅（16:9 の場合）
        const newScale = Math.min(containerWidth / slideWidth, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center overflow-auto bg-[#f7f7f8] p-8">
      <div
        className="shadow-lg"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '960px',
          height: '540px',
        }}
      >
        <iframe
          ref={iframeRef}
          title="Slide Preview"
          className="h-full w-full border-0"
          sandbox="allow-same-origin"
          style={{
            width: '960px',
            height: '540px',
            background: 'white',
          }}
        />
      </div>
    </div>
  );
}

