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

  const isDisabled = isSending || message.trim().length === 0;

  useEffect(() => {
    // Auto focus on mount
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex w-full items-start overflow-visible mb-3"
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
            placeholder="なんでも聞いてみて。"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 placeholder:text-sm focus:outline-none"
          />
        </div>
        
        {/* 送信ボタン */}
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
