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

export function ArtifactPreviewCard({
  artifactType,
  title,
  preview,
  progress,
  onClick,
}: ArtifactPreviewCardProps) {
  const isStreaming = progress && progress.current < progress.total;

  return (
    <div className="relative w-full cursor-pointer" onClick={onClick}>
      {/* Hitbox Layer - フルスクリーンアイコン */}
      <div
        className="absolute top-0 left-0 z-10 size-full rounded-2xl"
        role="presentation"
      >
        <div className="flex w-full items-center justify-end p-4">
          <div className="absolute top-[13px] right-[9px] rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path
                d="M2 2L6 2L6 3L3 3L3 6L2 6L2 2Z"
                fill="currentColor"
              />
              <path
                d="M10 2L14 2L14 6L13 6L13 3L10 3L10 2Z"
                fill="currentColor"
              />
              <path
                d="M14 10L14 14L10 14L10 13L13 13L13 10L14 10Z"
                fill="currentColor"
              />
              <path
                d="M6 14L2 14L2 10L3 10L3 13L6 13L6 14Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ヘッダー */}
      <div className="flex flex-row items-start justify-between gap-2 rounded-t-2xl border border-b-0 p-4 sm:items-center dark:border-zinc-700 dark:bg-muted bg-white">
        <div className="flex flex-row items-start gap-3 sm:items-center">
          <div className="text-muted-foreground">
            {isStreaming ? (
              <div className="animate-spin">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 12V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                  <path
                    d="M14 8H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d="M4 8H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </div>
            ) : (
              <span className="text-xl">{ICONS[artifactType]}</span>
            )}
          </div>
          <div className="-translate-y-1 font-medium sm:translate-y-0 text-gray-900 dark:text-white">
            {title}
          </div>
        </div>
        <div className="w-8" />
      </div>

      {/* コンテンツプレビュー */}
      <div className="h-[257px] overflow-hidden rounded-b-2xl border border-t-0 dark:border-zinc-700 dark:bg-muted bg-muted p-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-[14]">
          {preview}
        </div>
        
        {/* 進捗バー */}
        {progress && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">進捗</span>
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                {progress.current}/{progress.total}
              </span>
            </div>
            <div className="bg-gray-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

