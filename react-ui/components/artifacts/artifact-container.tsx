/**
 * アーティファクトメインコンテナ
 * 画面右側に配置され、様々な種類のアーティファクトを表示
 */

'use client';

import { AnimatePresence } from 'motion/react';
import { useArtifactChannel } from '@/hooks/use-artifact-channel';
import { WeatherCard } from './weather-card';
import type { WeatherArtifact, LoadingArtifact } from './types';

export function ArtifactContainer() {
  const artifact = useArtifactChannel();

  // アーティファクトがない、または空のローディング状態なら何も表示しない
  if (!artifact || (artifact.kind === 'loading' && !artifact.message)) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-30 pointer-events-none">
      {/* アーティファクトコンテンツ */}
      <div className="pointer-events-auto">
        <AnimatePresence mode="wait">
          {artifact.kind === 'weather' && (
            <WeatherCard
              key="weather"
              weather={(artifact as WeatherArtifact).data}
            />
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

