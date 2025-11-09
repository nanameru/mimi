/**
 * アーティファクトメインコンテナ
 * ai-chatbot-5と同じUI構造で表示
 */

'use client';

import { formatDistance } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { useWindowSize } from 'usehooks-ts';
import { MessageSquare, X } from 'lucide-react';
import { useArtifactChannel } from '@/hooks/use-artifact-channel';
import { WeatherCard } from './weather-card';
import { TextEditor } from './text-editor';
import { CodeEditor } from './code-editor';
import { SheetEditor } from './sheet-editor';
import { SlideEditor } from './slide-editor';
import type {
  WeatherArtifact,
  TextArtifact,
  CodeArtifact,
  SheetArtifact,
  SlideArtifact,
  LoadingArtifact,
} from './types';
import { Button } from '@/components/livekit/button';
import { ExportButton } from './export-button';

type ArtifactContainerProps = {
  artifactChatOpen: boolean;
};

export function ArtifactContainer({ artifactChatOpen }: ArtifactContainerProps) {
  const { artifact, setArtifact, isVisible, setIsVisible, setUserClosed } = useArtifactChannel();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;

  // アーティファクトがない、または空のローディング状態の場合は何も表示しない
  if (!artifact || (artifact.kind === 'loading' && !artifact.message)) {
    return null;
  }

  // コンテンツの種類に応じてストリーミング状態を判定
  const isStreaming = artifact.content !== undefined && artifact.content.length > 0;

  // アーティファクトのタイトルを生成（ドキュメントの場合）
  const getArtifactTitle = () => {
    if (artifact.kind === 'text') return 'Text Document';
    if (artifact.kind === 'code') return 'Code Document';
    if (artifact.kind === 'sheet') return 'Spreadsheet';
    if (artifact.kind === 'slide') return 'Presentation Slide';
    if (artifact.kind === 'weather') return 'Weather';
    return 'Loading...';
  };

  const artifactTitle = getArtifactTitle();
  const artifactTimestamp = artifact.timestamp ? new Date(artifact.timestamp) : new Date();

  return (
    <AnimatePresence>
      {artifact && isVisible && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 z-50 flex h-dvh w-dvw flex-row bg-transparent"
          data-testid="artifact"
          exit={{ opacity: 0, transition: { delay: 0.4 } }}
          initial={{ opacity: 1 }}
        >
          {/* 背景オーバーレイ */}
          {!isMobile && (
            <motion.div
              animate={{ width: windowWidth, right: 0 }}
              className="fixed h-dvh bg-[#f7f7f8]"
              exit={{
                width: windowWidth,
                right: 0,
              }}
              initial={{
                width: windowWidth,
                right: 0,
              }}
            />
          )}

          {/* 右側のチャットパネル（400px幅）はsession-viewで管理 */}

          {/* 左側のアーティファクトパネル */}
          <motion.div
            animate={
              isMobile
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    height: windowHeight,
                    width: windowWidth ? windowWidth : 'calc(100dvw)',
                    borderRadius: 0,
                    transition: {
                      delay: 0,
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      duration: 0.8,
                    },
                  }
                : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    height: windowHeight,
                    // チャットが開いている場合は 400px 分減らす、閉じている場合は全画面
                    width: windowWidth 
                      ? (artifactChatOpen ? windowWidth - 400 : windowWidth)
                      : (artifactChatOpen ? 'calc(100dvw - 400px)' : '100dvw'),
                    borderRadius: 0,
                    transition: {
                      delay: 0,
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      duration: 0.8,
                    },
                  }
            }
            className="fixed flex h-dvh flex-col overflow-y-scroll border-gray-200 bg-white md:border-r dark:border-gray-200 z-[60] shadow-lg"
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                delay: 0.1,
                type: 'spring',
                stiffness: 600,
                damping: 30,
              },
            }}
            initial={
              isMobile
                ? {
                    opacity: 1,
                    x: windowWidth ? -windowWidth : 0,
                    y: 0,
                    height: 400,
                    width: 400,
                    borderRadius: 50,
                  }
                : {
                    opacity: 1,
                    x: windowWidth ? -windowWidth : 0,
                    y: 0,
                    height: 400,
                    width: 400,
                    borderRadius: 50,
                  }
            }
          >
          {/* ヘッダー */}
          <div className="flex flex-row items-start justify-between p-2">
            <div className="flex flex-row items-start gap-4">
              {/* 左側は空 */}
            </div>
            
            {/* 右上のコントロール */}
            <div className="flex items-center gap-3">
              {/* チャットボタン - TODO: メッセージ数をpropsで受け取る */}
              <motion.button
                onClick={() => {
                  // チャット開閉はsession-viewで管理
                  console.log('[ArtifactContainer] Chat button clicked');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-4 h-4 text-gray-600" />
                {0 > 0 && (
                  <motion.span
                    className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {0}
                  </motion.span>
                )}
              </motion.button>
              
              {/* スライドカウント */}
              {artifact.kind === 'slide' && (artifact as SlideArtifact).totalSlides && (
                <div className="text-gray-600">
                  {((artifact as SlideArtifact).currentSlideIndex || 0) + 1} / {(artifact as SlideArtifact).totalSlides}
                </div>
              )}
              
              {/* 閉じるボタン */}
              <motion.button
                onClick={() => {
                  console.log('[ArtifactContainer] Close button clicked');
                  // アーティファクトを完全に閉じる
                  setIsVisible(false);
                  setUserClosed(true);
                  setArtifact(null);
                }}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
            
            {/* エクスポートボタン（スライドの場合のみ表示） - コメントアウト */}
            {/* {artifact.kind === 'slide' && (
              <ExportButton 
                htmlContent={(artifact as SlideArtifact).content} 
                disabled={!artifact.content || isStreaming}
              />
            )} */}
          </div>

          {/* コンテンツエリア */}
          <div className="h-full max-w-full items-center overflow-y-scroll bg-white">
            <AnimatePresence mode="wait">
              {artifact.kind === 'weather' && (
                <div className="p-4">
                  <WeatherCard weather={(artifact as WeatherArtifact).data} />
                </div>
              )}

              {artifact.kind === 'text' && (
                <TextEditor
                  content={(artifact as TextArtifact).content || ''}
                  status={isStreaming ? 'streaming' : 'idle'}
                />
              )}

              {artifact.kind === 'code' && (
                <CodeEditor
                  content={(artifact as CodeArtifact).content || ''}
                  status={isStreaming ? 'streaming' : 'idle'}
                />
              )}

              {artifact.kind === 'sheet' && (
                <div style={{ height: 'calc(100vh - 80px)' }}>
                  <SheetEditor
                    content={(artifact as SheetArtifact).content || ''}
                    status={isStreaming ? 'streaming' : 'idle'}
                  />
                </div>
              )}

              {artifact.kind === 'slide' && (
                <div style={{ height: 'calc(100vh - 80px)' }}>
                  <SlideEditor
                    content={(artifact as SlideArtifact).content || ''}
                  />
                </div>
              )}

              {artifact.kind === 'loading' && (
                <div className="flex h-full flex-col items-center justify-center p-8">
                  <div className="mb-4">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-300" />
                  </div>
                  <p className="text-lg">
                    {(artifact as LoadingArtifact).message || '読み込み中...'}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
