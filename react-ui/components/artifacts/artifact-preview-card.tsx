'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ArtifactPreviewCardProps = {
  artifactType: 'text' | 'code' | 'sheet' | 'slide';
  title: string;
  preview: string;
  timestamp: number;
  streamId?: string;
  onClick: () => void;
};

const ICONS = {
  text: '📄',
  code: '💻',
  sheet: '📊',
  slide: '🎬',
};

const TYPE_COLORS = {
  text: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
  code: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50',
  sheet: 'border-green-200 hover:border-green-300 hover:bg-green-50',
  slide: 'border-pink-200 hover:border-pink-300 hover:bg-pink-50',
};

export function ArtifactPreviewCard({
  artifactType,
  title,
  preview,
  onClick,
}: ArtifactPreviewCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-lg border-2 bg-white p-4 shadow-sm transition-all',
        'hover:shadow-md active:scale-[0.98]',
        'flex items-start gap-3 text-left',
        TYPE_COLORS[artifactType]
      )}
    >
      {/* アイコン */}
      <div className="flex-shrink-0 text-3xl">
        {ICONS[artifactType]}
      </div>

      {/* コンテンツ */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
          {title}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-2">
          {preview}
        </p>
      </div>

      {/* 矢印アイコン */}
      <div className="flex-shrink-0 text-gray-400 text-xl">
        →
      </div>
    </button>
  );
}

