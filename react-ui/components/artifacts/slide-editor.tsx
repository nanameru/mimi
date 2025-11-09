/**
 * スライドエディター（音声AIエージェント作成風デザイン）
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

type SlideEditorProps = {
  content: string;
};

interface ParsedSlide {
  id: number;
  html: string;
}

export function SlideEditor({ content }: SlideEditorProps) {
  const [slides, setSlides] = useState<ParsedSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [containerWidths, setContainerWidths] = useState<number[]>([]);

  // HTMLコンテンツからスライドを解析
  useEffect(() => {
    if (!content) return;

    // マークダウンコードブロック削除
    let cleanedContent = content;
    const htmlBlockMatch = cleanedContent.match(/```html\s*([\s\S]*?)```/);
    if (htmlBlockMatch) {
      cleanedContent = htmlBlockMatch[1].trim();
    }
    cleanedContent = cleanedContent.replace(/```html/g, '').replace(/```/g, '').trim();

    // スライドを分割（.slide クラスで分割）
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanedContent, 'text/html');
    const slideElements = doc.querySelectorAll('.slide');

    if (slideElements.length > 0) {
      const parsedSlides: ParsedSlide[] = Array.from(slideElements).map((slideEl, index) => ({
        id: index + 1,
        html: slideEl.outerHTML,
      }));
      setSlides(parsedSlides);
      
      // 新しいスライドが追加された場合、最後のスライドに移動
      if (parsedSlides.length > slides.length) {
        setCurrentSlideIndex(parsedSlides.length - 1);
      }
    } else {
      // スライドクラスがない場合、全体を1つのスライドとして扱う
      setSlides([{ id: 1, html: cleanedContent }]);
    }
  }, [content]);

  // IntersectionObserverで現在のスライドを検出
  useEffect(() => {
    const observers = slideRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setCurrentSlideIndex(index);
            }
          });
        },
        {
          threshold: [0, 0.5, 1],
          rootMargin: '-20% 0px -20% 0px',
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [slides.length]);

  // 各スライドコンテナの幅を監視
  useEffect(() => {
    const observers: ResizeObserver[] = [];
    
    containerRefs.current.forEach((container, index) => {
      if (!container) return;
      
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          setContainerWidths((prev) => {
            const updated = [...prev];
            updated[index] = width;
            return updated;
          });
        }
      });
      
      observer.observe(container);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [slides.length]);

  // 各iframeにスライドコンテンツを表示
  useEffect(() => {
    slides.forEach((slide, index) => {
      const iframe = iframeRefs.current[index];
      if (!iframe) return;
      
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;
      
      const fullHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden;
      width: 960px;
      height: 540px;
    }
  </style>
</head>
<body>
  ${slide.html}
</body>
</html>
      `;
      
      doc.open();
      doc.write(fullHTML);
      doc.close();
    });
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#f7f7f8]">
        <div className="text-gray-400">スライドを読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex flex-col">
      {/* メインスライドエリア */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-12 relative pb-24">
        {/* スライド表示 - 縦スクロール */}
        <div 
          className="relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory px-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent',
          }}
        >
          <div className="flex flex-col items-center gap-8 py-8">
            {slides.map((slide, index) => {
              // スケール計算（960pxを基準）
              const containerWidth = containerWidths[index] || 960;
              const scale = Math.min(containerWidth / 960, 1); // 最大1倍（拡大しない）
              
              return (
                <motion.div
                  key={slide.id}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                    containerRefs.current[index] = el;
                  }}
                  className="relative w-full rounded-2xl overflow-visible snap-center snap-always flex-shrink-0"
                  style={{
                    aspectRatio: '16 / 9',
                    maxWidth: '1200px',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: currentSlideIndex === index ? 1 : 0.6,
                    y: 0,
                  }}
                  transition={{ 
                    delay: index * 0.05,
                    opacity: { duration: 0.3 }
                  }}
                >
                  {/* スライド本体 */}
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden bg-white"
                    style={{
                      boxShadow: currentSlideIndex === index 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {/* iframe スケーリングラッパー */}
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '960px',
                          height: '540px',
                          transform: `scale(${scale})`,
                          transformOrigin: 'center center',
                        }}
                      >
                        <iframe
                          ref={(el) => {
                            iframeRefs.current[index] = el;
                          }}
                          title={`Slide ${index + 1}`}
                          className="border-0"
                          style={{
                            width: '960px',
                            height: '540px',
                          }}
                          sandbox="allow-same-origin allow-scripts"
                        />
                      </div>
                    </div>
                    
                    {/* グラデーションオーバーレイ */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
                      }}
                    />
                    
                    {/* スライド番号インジケーター */}
                    <motion.div 
                      className="absolute bottom-8 right-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentSlideIndex === index ? 1 : 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-gray-900 text-sm tracking-wide">
                        {index + 1} / {slides.length}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
