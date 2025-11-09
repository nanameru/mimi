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
  const [containerSizes, setContainerSizes] = useState<{ width: number; height: number }[]>([]);

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

  // 各スライドコンテナのサイズを監視
  useEffect(() => {
    const observers: ResizeObserver[] = [];
    
    containerRefs.current.forEach((container, index) => {
      if (!container) return;
      
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;
          setContainerSizes((prev) => {
            const updated = [...prev];
            updated[index] = { width, height };
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
    <div className="h-full w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex flex-row">
      {/* メインスライドエリア */}
      <div className="flex-1 flex relative">
        {/* スライド表示 - 縦スクロール */}
        <div 
          className="relative w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent',
          }}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            {slides.map((slide, index) => {
              // スケール計算（960x540を基準に、コンテナいっぱいに表示）
              const containerSize = containerSizes[index] || { width: 960, height: 540 };
              const scaleX = containerSize.width / 960;
              const scaleY = containerSize.height / 540;
              const scale = Math.max(scaleX, scaleY); // 画面いっぱいに表示するため、大きい方を採用
              
              return (
                <motion.div
                  key={slide.id}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                    containerRefs.current[index] = el;
                  }}
                  className="relative w-full overflow-visible snap-center snap-always flex-shrink-0"
                  style={{
                    aspectRatio: '16 / 9',
                    scrollSnapStop: 'always',
                  }}
                >
                  {/* スライド本体 */}
                  <div
                    className="relative w-full h-full overflow-hidden bg-white"
                  >
                    {/* iframe スケーリングラッパー */}
                    <div
                      className="w-full h-full"
                      style={{
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '960px',
                          height: '540px',
                          transform: `scale(${scale})`,
                          transformOrigin: 'top left',
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 右側：スライド履歴サムネイルリスト */}
      <div className="w-60 h-full overflow-y-auto bg-white/50 backdrop-blur-sm border-l border-gray-200 p-3">
        <div className="flex flex-col gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                const slideElement = slideRefs.current[index];
                if (slideElement) {
                  slideElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`relative w-full rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentSlideIndex === index
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              style={{ aspectRatio: '16 / 9' }}
            >
              {/* サムネイル背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
              
              {/* スライド番号 */}
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700">
                {index + 1}
              </div>
              
              {/* アクティブインジケーター */}
              {currentSlideIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
