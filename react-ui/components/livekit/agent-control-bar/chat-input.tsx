import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PaperPlaneRightIcon, SpinnerIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/livekit/button';

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
      className="flex w-full items-start overflow-hidden border-b border-gray-100 mb-3"
    >
      <form onSubmit={handleSubmit} className="flex grow items-end gap-2 text-sm">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-sm">
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
        <Button
          size="icon"
          type="submit"
          disabled={isDisabled}
          variant={isDisabled ? 'secondary' : 'primary'}
          title={isSending ? 'Sending...' : 'Send'}
          className="flex-shrink-0 bg-black text-white border-black hover:bg-gray-800 focus:bg-gray-800"
        >
          {isSending ? (
            <SpinnerIcon className="animate-spin" weight="bold" />
          ) : (
            <PaperPlaneRightIcon weight="bold" />
          )}
        </Button>
      </form>
    </motion.div>
  );
}
