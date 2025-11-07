import { motion, AnimatePresence } from 'motion/react';

interface VoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  waveform: number[];
  size?: 'large' | 'small';
}

export function VoiceOrb({ 
  isListening, 
  isSpeaking, 
  audioLevel, 
  waveform, 
  size = 'large',
}: VoiceOrbProps) {
  const dimensions = size === 'large' ? { orb: 320, outer: 380, aura: 500 } : { orb: 80, outer: 95, aura: 125 };
  const showEffects = size === 'large';

  return (
    <motion.div
      className="relative flex items-center justify-center"
    >
      {/* 外側のオーラ効果 */}
      {showEffects && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: dimensions.aura,
            height: dimensions.aura,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: isListening || isSpeaking ? [1, 1.15, 1] : 1,
            opacity: isListening || isSpeaking ? [0.4, 0.7, 0.4] : 0.2
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* ガラス効果のリング */}
      {showEffects && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: dimensions.outer,
            height: dimensions.outer,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* 音声波形リング - AIが話す時に動く */}
      <AnimatePresence>
        {isSpeaking && showEffects && (
          <motion.div
            className="absolute"
            style={{
              width: 360,
              height: 360,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 360 360"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {waveform.map((level, i) => {
                const angle = (i / waveform.length) * 360;
                const radius = 180;
                const waveHeight = 20 + (level * 40);
                
                return (
                  <motion.circle
                    key={i}
                    cx="180"
                    cy="180"
                    r={radius}
                    fill="none"
                    stroke="url(#waveGradient)"
                    strokeWidth={waveHeight}
                    strokeDasharray={`${2 * Math.PI * radius / waveform.length} ${2 * Math.PI * radius}`}
                    strokeDashoffset={-i * (2 * Math.PI * radius / waveform.length)}
                    animate={{
                      strokeWidth: 20 + (level * 40),
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: 0,
                    }}
                  />
                );
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* メインの円 */}
      <motion.div
        className="rounded-full relative overflow-hidden shadow-2xl"
        style={{
          width: dimensions.orb,
          height: dimensions.orb,
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(147, 197, 253, 0.4) 50%, rgba(59, 130, 246, 0.8) 100%)',
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(255, 255, 255, 0.5)',
        }}
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isSpeaking ? Infinity : 0,
        }}
      >
        {/* 内部の流動的なグラデーション */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)',
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* ブルーのモーフィング効果 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.6) 0%, transparent 60%)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* グラスモーフィズムハイライト */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
          }}
        />

        {/* リスニング時のパルス */}
        <AnimatePresence>
          {isListening && showEffects && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                  }}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{
                    scale: [1, 1.4, 1.8],
                    opacity: [0.5, 0.2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 外側の粒子効果 */}
      {(isListening || isSpeaking) && showEffects && (
        <div className="absolute" style={{ width: 384, height: 384 }}>
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-400/60"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, x, 0],
                  y: [0, y, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

