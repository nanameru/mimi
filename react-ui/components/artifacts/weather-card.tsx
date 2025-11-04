/**
 * 天気カードコンポーネント
 * ai-chatbot-5 のデザインを参考に実装
 */

'use client';

import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import type { WeatherData } from './types';

const SunIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="currentColor" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MoonIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" fill="currentColor" />
  </svg>
);

const CloudIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

type WeatherCardProps = {
  weather: WeatherData;
  onClose?: () => void;
};

// 天気状態からアイコンを決定
function getWeatherIcon(condition: string, isDay: boolean) {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('晴') || lowerCondition.includes('clear')) {
    return isDay ? <SunIcon size={48} /> : <MoonIcon size={48} />;
  }
  
  return <CloudIcon size={24} />;
}

// 時間帯を判定（簡易版：9時から18時までを昼とする）
function isDayTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 9 && hour < 18;
}

export function WeatherCard({ weather, onClose }: WeatherCardProps) {
  const isDay = isDayTime();
  const currentTime = new Date();

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
        className={`relative w-96 rounded-3xl p-6 shadow-lg overflow-hidden backdrop-blur-sm ${
          isDay
            ? 'bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600'
            : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'
        }`}
      >
        {/* 背景オーバーレイ */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        
        {/* 閉じるボタン */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            type="button"
          >
            <span className="text-white text-xl">×</span>
          </button>
        )}

        {/* コンテンツ */}
        <div className="relative z-10">
          {/* 場所と日時 */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/80 text-sm font-medium">
              {weather.location}
            </div>
            <div className="text-white/60 text-xs">
              {format(currentTime, 'MMM d, h:mm a')}
            </div>
          </div>

          {/* メイン情報 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`${isDay ? 'text-yellow-200' : 'text-blue-200'}`}>
                {getWeatherIcon(weather.condition, isDay)}
              </div>
              <div className="text-white text-5xl font-light">
                {Math.ceil(weather.temperature)}
                <span className="text-2xl text-white/80">°</span>
              </div>
            </div>

            {/* 追加情報（湿度・風速） */}
            {(weather.humidity !== undefined || weather.windSpeed !== undefined) && (
              <div className="text-right">
                {weather.humidity !== undefined && (
                  <div className="text-white/90 text-sm font-medium mb-1">
                    Humidity: {weather.humidity}%
                  </div>
                )}
                {weather.windSpeed !== undefined && (
                  <div className="text-white/70 text-sm">
                    Wind: {Math.ceil(weather.windSpeed)} m/s
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 天気状態 */}
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-white/80 text-sm mb-2 font-medium">
              Current Conditions
            </div>
            <div className="text-white/90 text-lg">
              {weather.condition}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

