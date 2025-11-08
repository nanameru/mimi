import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PaperPlaneRightIcon, SpinnerIcon } from '@phosphor-icons/react/dist/ssr';
import { MonitorArrowUpIcon, VideoCameraIcon } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'sonner';

const MOTION_PROPS = {
  variants: {
    hidden: {
      height: 0,
      opacity: 0,
      marginBottom: 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
      marginBottom: 12,
    },
  },
  initial: 'hidden',
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

interface ChatInputProps {
  chatOpen: boolean;
  isAgentAvailable?: boolean;
  onSend?: (message: string) => void;
  showAITuber?: boolean;
  onToggleAITuber?: () => void;
}

export function ChatInput({
  chatOpen,
  isAgentAvailable = false,
  onSend = async () => {},
  showAITuber = false,
  onToggleAITuber,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSending(true);
      await onSend(message);
      setMessage('');
      inputRef.current?.blur();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const startScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' } as any,
        audio: false,
      });

      setScreenStream(mediaStream);
      setIsScreenSharing(true);
      toast.success('画面共有を開始しました');

      mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare();
      });
    } catch (error) {
      console.error('画面共有エラー:', error);
      toast.error('画面共有を開始できませんでした');
    }
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
      toast.info('画面共有を停止しました');
    }
  };

  const toggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  const isDisabled = isSending || !isAgentAvailable || message.trim().length === 0;

  useEffect(() => {
    if (chatOpen && isAgentAvailable) return;
    // when not disabled refocus on input
    inputRef.current?.focus();
  }, [chatOpen, isAgentAvailable]);

  return (
    <motion.div
      inert={!chatOpen}
      {...MOTION_PROPS}
      animate={chatOpen ? 'visible' : 'hidden'}
      className="flex w-full items-start overflow-hidden"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="mb-3 flex grow items-end gap-2 text-sm"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        <div
          className="relative flex flex-1 items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300"
          style={{
            background: isFocused
              ? 'rgba(255, 255, 255, 0.6)'
              : 'rgba(255, 255, 255, 0.4)',
            borderColor: isFocused
              ? 'rgba(59, 130, 246, 0.25)'
              : 'rgba(255, 255, 255, 0.3)',
            boxShadow: isFocused
              ? '0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(59, 130, 246, 0.08)'
              : '0 5px 15px -3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <input
            autoFocus
            ref={inputRef}
            type="text"
            value={message}
            disabled={!chatOpen}
            placeholder="なんでも聞いてみて。"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 placeholder:text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />

          {/* コントロールボタン群 */}
          <div className="flex items-center gap-2">
            {/* AITuber切り替えボタン */}
            {onToggleAITuber && (
              <motion.button
                type="button"
                onClick={onToggleAITuber}
                className="flex items-center justify-center w-9 h-9 rounded-xl backdrop-blur-sm transition-all"
                style={{
                  background: showAITuber
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(255, 255, 255, 0.5)',
                  border: showAITuber
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.5)',
                }}
                whileHover={{
                  scale: 1.1,
                  background: showAITuber
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(255, 255, 255, 0.7)',
                }}
                whileTap={{ scale: 0.9 }}
                title="AITuber"
              >
                <VideoCameraIcon
                  className={`w-4 h-4 ${showAITuber ? 'text-blue-600' : 'text-gray-500'}`}
                  weight="bold"
                />
              </motion.button>
            )}

            {/* 画面共有ボタン */}
            <motion.button
              type="button"
              onClick={toggleScreenShare}
              className="flex items-center justify-center w-9 h-9 rounded-xl backdrop-blur-sm transition-all relative"
              style={{
                background: isScreenSharing
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(255, 255, 255, 0.5)',
                border: isScreenSharing
                  ? '1px solid rgba(239, 68, 68, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.5)',
              }}
              whileHover={{
                scale: 1.1,
                background: isScreenSharing
                  ? 'rgba(239, 68, 68, 0.15)'
                  : 'rgba(255, 255, 255, 0.7)',
              }}
              whileTap={{ scale: 0.9 }}
              title={isScreenSharing ? '画面共有を停止' : '画面共有'}
            >
              <MonitorArrowUpIcon
                className={`w-4 h-4 ${isScreenSharing ? 'text-red-600' : 'text-gray-500'}`}
                weight="bold"
              />

              {/* 共有中インジケーター */}
              {isScreenSharing && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              )}
            </motion.button>
          </div>
        </div>
        <motion.button
          type="submit"
          disabled={isDisabled}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all flex-shrink-0"
          style={{
            background: !isDisabled
              ? 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))'
              : 'rgba(255, 255, 255, 0.5)',
            border: !isDisabled ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: !isDisabled
              ? '0 4px 12px -2px rgba(59, 130, 246, 0.3)'
              : 'none',
            cursor: !isDisabled ? 'pointer' : 'not-allowed',
          }}
          whileHover={
            !isDisabled
              ? {
                  scale: 1.1,
                }
              : {}
          }
          whileTap={!isDisabled ? { scale: 0.9 } : {}}
          animate={{
            opacity: !isDisabled ? 1 : 0.4,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 400 }}
          title={isSending ? 'Sending...' : 'Send'}
        >
          {isSending ? (
            <SpinnerIcon className="w-5 h-5 animate-spin text-white" weight="bold" />
          ) : (
            <PaperPlaneRightIcon className="w-5 h-5 text-white" weight="bold" />
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
