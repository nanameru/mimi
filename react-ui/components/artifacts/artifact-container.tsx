/**
 * アーティファクトメインコンテナ
 * 画面右側に配置され、様々な種類のアーティファクトを表示
 */

'use client';

import { AnimatePresence, motion } from 'motion/react';
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

export function ArtifactContainer() {
  const artifact = useArtifactChannel();

  // アーティファクトがない、または空のローディング状態なら何も表示しない
  if (!artifact || (artifact.kind === 'loading' && !artifact.message)) {
    return null;
  }

  // コンテンツの種類に応じてストリーミング状態を判定
  const isStreaming = artifact.content !== undefined && artifact.content.length > 0;

  return (
    <div className="fixed right-4 top-20 z-30 pointer-events-none w-[420px] max-h-[calc(100vh-5rem)] overflow-y-auto">
      {/* アーティファクトコンテンツ */}
      <div className="pointer-events-auto">
        <AnimatePresence mode="wait">
          {artifact.kind === 'weather' && (
            <WeatherCard
              key="weather"
              weather={(artifact as WeatherArtifact).data}
            />
          )}

          {artifact.kind === 'text' && (
            <motion.div
              key="text"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-background dark:bg-muted border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg"
            >
              <div className="h-full max-w-full overflow-y-scroll bg-background dark:bg-muted">
                <TextEditor
                  content={(artifact as TextArtifact).content || ''}
                  status={isStreaming ? 'streaming' : 'idle'}
                />
              </div>
            </motion.div>
          )}

          {artifact.kind === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-background dark:bg-muted border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg"
            >
              <div className="h-full max-w-full overflow-y-scroll bg-background dark:bg-muted">
                <CodeEditor
                  content={(artifact as CodeArtifact).content || ''}
                  status={isStreaming ? 'streaming' : 'idle'}
                />
              </div>
            </motion.div>
          )}

          {artifact.kind === 'sheet' && (
            <motion.div
              key="sheet"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-background dark:bg-muted border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg"
              style={{ height: '600px' }}
            >
              <div className="h-full max-w-full overflow-y-scroll bg-background dark:bg-muted">
                <SheetEditor
                  content={(artifact as SheetArtifact).content || ''}
                  status={isStreaming ? 'streaming' : 'idle'}
                />
              </div>
            </motion.div>
          )}

          {artifact.kind === 'loading' && (
            <div
              key="loading"
              className="w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center"
            >
              <div className="mb-4">
                <div className="inline-block w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
              <p className="text-white text-lg">
                {(artifact as LoadingArtifact).message || '読み込み中...'}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

