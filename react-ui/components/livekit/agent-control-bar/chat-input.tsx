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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSending(true);
      await onSend(message);
      setMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex w-full items-start overflow-hidden mb-3"
    >
      <form onSubmit={handleSubmit} className="flex grow items-end gap-2 text-sm">
        <div 
          className="flex flex-1 items-center gap-2 rounded-2xl backdrop-blur-xl border transition-all duration-300 px-5 py-3"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.05)',
          }}
        >
          <input
            autoFocus
            ref={inputRef}
            type="text"
            value={message}
            placeholder="なんでも聞いてみて。"
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isDisabled}
          title={isSending ? 'Sending...' : 'Send'}
          className="flex items-center justify-center rounded-xl transition-all flex-shrink-0 backdrop-blur-xl size-9"
          style={{
            background: !isDisabled
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(37, 99, 235, 0.6))'
              : 'rgba(255, 255, 255, 0.3)',
            border: !isDisabled 
              ? '1px solid rgba(59, 130, 246, 0.3)' 
              : '1px solid rgba(255, 255, 255, 0.3)',
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
        >
          {isSending ? (
            <SpinnerIcon className="w-4 h-4 animate-spin text-white" weight="bold" />
          ) : (
            <PaperPlaneRightIcon 
              className={`w-4 h-4 ${!isDisabled ? 'text-white' : 'text-gray-400'}`} 
              weight="bold" 
            />
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
