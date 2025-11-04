'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ArtifactPreviewCardProps = {
  artifactType: 'text' | 'code' | 'sheet' | 'slide';
  title: string;
  preview: string;
  timestamp: number;
  streamId?: string;
  progress?: { current: number; total: number };
  onClick: () => void;
};

const ICONS = {
  text: '📄',
  code: '💻',
  sheet: '📊',
  slide: '🎬',
};

const TYPE_GRADIENTS = {
  text: 'bg-gradient-to-br from-blue-50 to-blue-100',
  code: 'bg-gradient-to-br from-purple-50 to-purple-100',
  sheet: 'bg-gradient-to-br from-green-50 to-green-100',
  slide: 'bg-gradient-to-br from-pink-50 to-pink-100',
};

const PROGRESS_COLORS = {
  text: 'bg-blue-500',
  code: 'bg-purple-500',
  sheet: 'bg-green-500',
  slide: 'bg-pink-500',
};

export function ArtifactPreviewCard({
  artifactType,
  title,
  preview,
  progress,
  onClick,
}: ArtifactPreviewCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-2xl p-5 shadow-md transition-all',
        'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
        'flex flex-col gap-3 text-left relative overflow-hidden',
        TYPE_GRADIENTS[artifactType]
      )}
    >
      {/* ヘッダー（アイコン + タイトル + 矢印） */}
      <div className="flex items-start gap-3">
        {/* アイコン */}
        <div className="flex-shrink-0 text-4xl">
          {ICONS[artifactType]}
        </div>

        {/* タイトルとサブタイトル */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-base mb-1 truncate">
            {title}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-1">
            {preview}
          </p>
        </div>

        {/* 矢印アイコン */}
        <div className="flex-shrink-0 text-gray-500 text-2xl">
          →
        </div>
      </div>

      {/* 進捗バー（スライドなど） */}
      {progress && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">進捗</span>
            <span className="text-gray-600 font-semibold">
              {progress.current}/{progress.total}
            </span>
          </div>
          <div className="bg-white/60 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div 
              className={cn(
                'h-full transition-all duration-500 ease-out rounded-full',
                PROGRESS_COLORS[artifactType]
              )}
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </button>
  );
}

