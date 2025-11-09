/**
 * スライドエディター（音声AIエージェント作成風デザイン）
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [direction, setDirection] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // iframeに現在のスライドを表示
  useEffect(() => {
    if (iframeRef.current && slides[currentSlideIndex]) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
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
    }
    .slide {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
        }
  </style>
</head>
<body>
  ${slides[currentSlideIndex].html}
</body>
</html>
        `;
        
        doc.open();
        doc.write(fullHTML);
        doc.close();
      }
    }
  }, [currentSlideIndex, slides]);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(currentSlideIndex - 1);
      }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
  };

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
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -1000 : 1000, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="aspect-[16/9] max-w-full max-h-full w-auto h-auto rounded-3xl shadow-2xl overflow-hidden bg-white"
      >
        <iframe
          ref={iframeRef}
                title={`Slide ${currentSlideIndex + 1}`}
                className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts"
              />
              
              {/* グラデーションオーバーレイ */}
              <div
                className="absolute inset-0 pointer-events-none"
          style={{
                  background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ナビゲーション - 常に表示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-50">
          {/* 前へボタン */}
          <motion.button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={cn(
              "w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center transition-colors",
              currentSlideIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white cursor-pointer"
            )}
            whileHover={{ scale: currentSlideIndex === 0 ? 1 : 1.1 }}
            whileTap={{ scale: currentSlideIndex === 0 ? 1 : 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>

          {/* ページインジケーター */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: index === currentSlideIndex ? 32 : 8,
                    height: 8,
                    backgroundColor: index === currentSlideIndex 
                      ? 'rgb(59, 130, 246)' 
                      : 'rgb(209, 213, 219)',
                  }}
                  transition={{ type: 'spring', damping: 20 }}
                />
              </motion.button>
            ))}
          </div>

          {/* 次へボタン */}
          <motion.button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className={cn(
              "w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center transition-colors",
              currentSlideIndex === slides.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white cursor-pointer"
            )}
            whileHover={{ scale: currentSlideIndex === slides.length - 1 ? 1 : 1.1 }}
            whileTap={{ scale: currentSlideIndex === slides.length - 1 ? 1 : 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>
      </div>
    </div>
  );
}
