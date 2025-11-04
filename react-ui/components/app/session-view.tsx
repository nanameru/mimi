'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { useVoiceAssistant } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { PreConnectMessage } from '@/components/app/preconnect-message';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { MediaTiles } from '@/components/livekit/media-tiles';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';
import { useArtifactChannel } from '@/hooks/use-artifact-channel';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../livekit/scroll-area/scroll-area';

// Live2DBackgroundをクライアントサイドのみで読み込む
const Live2DBackground = dynamic(
  () =>
    import('@/components/livekit/live2d-background').then((mod) => ({
      default: mod.Live2DBackground,
    })),
  { ssr: false }
);

// ArtifactContainerをクライアントサイドのみで読み込む
const ArtifactContainer = dynamic(
  () =>
    import('@/components/artifacts/artifact-container').then((mod) => ({
      default: mod.ArtifactContainer,
    })),
  { ssr: false }
);

const MotionBottom = motion.create('div');

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const BOTTOM_VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  },
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}
interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  const { state: agentState } = useVoiceAssistant();
  const messages = useChatMessages();
  const [chatOpen, setChatOpen] = useState(false);
  const [showLive2D, setShowLive2D] = useState(false);
  const artifact = useArtifactChannel();
  
  // アーティファクトが表示されているかどうか
  const hasArtifact = artifact && !(artifact.kind === 'loading' && !artifact.message);
  
  // アーティファクトの幅 + マージン（w-96 = 384px + right-4 = 16px + 余白 = 約420px）
  const artifactWidth = hasArtifact ? 420 : 0;

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
    live2d: true,
  };

  return (
    <section className="bg-background relative z-10 h-full w-full overflow-hidden" {...props}>
      {/* Live2D背景レイヤー */}
      {showLive2D && <Live2DBackground agentState={agentState} />}

      {/* アーティファクトコンテナ（中央配置） */}
      <ArtifactContainer />

      {/* Chat Transcript */}
      <div
        className={cn(
          'fixed inset-0 grid grid-cols-1 grid-rows-1 transition-all duration-300 ease-out',
          !chatOpen && 'pointer-events-none'
        )}
        style={{
          paddingRight: hasArtifact ? `${artifactWidth}px` : '0',
        }}
      >
        <Fade top className="absolute inset-x-4 top-0 h-40" />
        <ScrollArea className="px-4 pt-40 pb-[150px] md:px-6 md:pb-[180px]">
          <ChatTranscript
            hidden={!chatOpen}
            messages={messages}
            className="mx-auto max-w-2xl space-y-3 transition-all duration-300 ease-out"
          />
        </ScrollArea>
      </div>

      {/* Media Tiles */}
      <MediaTiles chatOpen={chatOpen} showLive2D={showLive2D} />

      {/* Bottom */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-0 z-50 md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-4" />
        )}
        <div 
          className="relative mx-auto max-w-2xl pb-3 md:pb-12 transition-all duration-300 ease-out"
          style={{
            marginRight: hasArtifact ? `${artifactWidth}px` : '0',
          }}
        >
          <AgentControlBar
            controls={controls}
            onChatOpenChange={setChatOpen}
            showLive2D={showLive2D}
            onLive2DToggle={setShowLive2D}
          />
        </div>
      </MotionBottom>
    </section>
  );
};
