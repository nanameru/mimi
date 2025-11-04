/**
 * アーティファクトメインコンテナ
 * 画面中央に配置され、様々な種類のアーティファクトを表示
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
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      {/* 背景オーバーレイ（半透明） */}
      <AnimatePresence>
        {artifact && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" />
        )}
      </AnimatePresence>

      {/* アーティファクトコンテンツ */}
      <div className="relative z-50 pointer-events-auto">
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

