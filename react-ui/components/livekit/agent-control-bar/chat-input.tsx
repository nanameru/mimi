import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PaperPlaneRightIcon, SpinnerIcon } from '@phosphor-icons/react/dist/ssr';

interface ChatInputProps {
  chatOpen: boolean;
  isAgentAvailable?: boolean;
  onSend?: (message: string) => void;
}

export function ChatInput({
  chatOpen,
  isAgentAvailable = false,
  onSend = async () => {},
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

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

  useEffect(() => {
    // Auto focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        <div
          className="relative flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300"
          style={{
            background: isFocused ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)',
            borderColor: isFocused ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.3)',
            boxShadow: isFocused
              ? '0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(59, 130, 246, 0.08)'
              : '0 5px 15px -3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="メッセージを入力..."
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 placeholder:text-sm min-w-[300px] max-w-[500px]"
          />

          {/* 送信ボタン */}
          <motion.button
            type="submit"
            disabled={isSending || !message.trim()}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{
              background: message.trim()
                ? 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))'
                : 'rgba(255, 255, 255, 0.5)',
              border: message.trim() ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: message.trim() ? '0 4px 12px -2px rgba(59, 130, 246, 0.3)' : 'none',
              cursor: message.trim() ? 'pointer' : 'not-allowed',
            }}
            whileHover={
              message.trim()
                ? {
                    scale: 1.1,
                  }
                : {}
            }
            whileTap={message.trim() ? { scale: 0.9 } : {}}
            animate={{
              opacity: message.trim() ? 1 : 0.4,
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 400 }}
          >
            {isSending ? (
              <SpinnerIcon className="w-4 h-4 animate-spin text-white" weight="bold" />
            ) : (
              <PaperPlaneRightIcon
                className={`w-4 h-4 ${message.trim() ? 'text-white' : 'text-gray-400'}`}
                weight="bold"
              />
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
