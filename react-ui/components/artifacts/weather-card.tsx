/**
 * 天気カードコンポーネント
 */

'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { WeatherData } from './types';

type WeatherCardProps = {
  weather: WeatherData;
  onClose?: () => void;
};

export function WeatherCard({ weather, onClose }: WeatherCardProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="relative w-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl"
      >
        {/* 閉じるボタン */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            type="button"
          >
            <span className="text-white text-xl">×</span>
          </button>
        )}

        {/* 場所 */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-1">
            {weather.location}
          </h2>
          <p className="text-white/60 text-sm">現在の天気</p>
        </div>

        {/* メイン情報 */}
        <div className="flex items-center justify-between mb-8">
          {/* アイコンと気温 */}
          <div className="flex items-center gap-4">
            <div className="text-8xl">{weather.icon}</div>
            <div>
              <p className="text-6xl font-bold text-white">
                {weather.temperature}°
              </p>
              <p className="text-xl text-white/80 mt-2">
                {weather.condition}
              </p>
            </div>
          </div>
        </div>

        {/* 追加情報 */}
        {(weather.humidity !== undefined || weather.windSpeed !== undefined) && (
          <div className="flex gap-4 pt-6 border-t border-white/20">
            {weather.humidity !== undefined && (
              <div className="flex-1 bg-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">湿度</p>
                <p className="text-2xl font-bold text-white">
                  {weather.humidity}%
                </p>
              </div>
            )}
            {weather.windSpeed !== undefined && (
              <div className="flex-1 bg-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">風速</p>
                <p className="text-2xl font-bold text-white">
                  {weather.windSpeed} m/s
                </p>
              </div>
            )}
          </div>
        )}

        {/* アニメーション背景 */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-pulse" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

