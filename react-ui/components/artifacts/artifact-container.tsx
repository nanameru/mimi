/**
 * アーティファクトメインコンテナ
 * ai-chatbot-5と同じUI構造で表示
 */

'use client';

import { formatDistance } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { useWindowSize } from 'usehooks-ts';
import { useArtifactChannel } from '@/hooks/use-artifact-channel';
import { WeatherCard } from './weather-card';
import { TextEditor } from './text-editor';
import { CodeEditor } from './code-editor';
import { SheetEditor } from './sheet-editor';
import type {
  WeatherArtifact,
  TextArtifact,
  CodeArtifact,
  SheetArtifact,
  LoadingArtifact,
} from './types';
import { Button } from '@/components/livekit/button';

export function ArtifactContainer() {
  const { artifact, setArtifact } = useArtifactChannel();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;

  // アーティファクトがない、または空のローディング状態なら何も表示しない
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
    if (artifact.kind === 'weather') return 'Weather';
    return 'Loading...';
  };

  const artifactTitle = getArtifactTitle();
  const artifactTimestamp = artifact.timestamp ? new Date(artifact.timestamp) : new Date();

  return (
    <AnimatePresence>
      {artifact && (
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
              className="fixed h-dvh bg-background"
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

          {/* 左側のチャットパネル（400px幅）はsession-viewで管理 */}

          {/* 右側のアーティファクトパネル */}
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
                    x: 400,
                    y: 0,
                    height: windowHeight,
                    width: windowWidth ? windowWidth - 400 : 'calc(100dvw-400px)',
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
            className="fixed flex h-dvh flex-col overflow-y-scroll border-zinc-200 bg-background md:border-l dark:border-zinc-700 dark:bg-muted"
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
                    x: windowWidth ? windowWidth : 0,
                    y: 0,
                    height: 400,
                    width: 400,
                    borderRadius: 50,
                  }
                : {
                    opacity: 1,
                    x: windowWidth ? windowWidth : 0,
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
              <Button
                className="h-fit p-2 dark:hover:bg-zinc-700"
                data-testid="artifact-close-button"
                onClick={() => {
                  setArtifact(null);
                }}
                variant="outline"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              <div className="flex flex-col">
                <div className="font-medium">{artifactTitle}</div>
                <div className="text-muted-foreground text-sm">
                  {`Updated ${formatDistance(artifactTimestamp, new Date(), {
                    addSuffix: true,
                  })}`}
                </div>
              </div>
            </div>
          </div>

          {/* コンテンツエリア */}
          <div className="h-full max-w-full items-center overflow-y-scroll bg-background dark:bg-muted">
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
