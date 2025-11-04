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
import { ArtifactPreviewCard } from '@/components/artifacts/artifact-preview-card';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../livekit/scroll-area/scroll-area';
import { useWindowSize } from 'usehooks-ts';

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
        'from-[#f7f7f8] pointer-events-none h-4 bg-linear-to-b to-transparent',
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
  const { artifact, setArtifact, setIsVisible, setUserClosed, notifications } = useArtifactChannel();
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;
  
  // アーティファクトが表示されているかどうか
  const hasArtifact = artifact && !(artifact.kind === 'loading' && !artifact.message);

  // チャットボタンがクリックされた時のハンドラー
  const handleChatOpenChange = (open: boolean) => {
    setChatOpen(open);
    // アーティファクトが表示されている場合、チャットボタンを押したらアーティファクトも閉じる
    if (hasArtifact) {
      setArtifact(null);
    }
  };

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
    live2d: true,
  };

  return (
    <section className="bg-[#f7f7f8] relative z-10 h-full w-full overflow-hidden" {...props}>
      {/* Live2D背景レイヤー */}
      {showLive2D && <Live2DBackground agentState={agentState} />}

      {/* アーティファクトコンテナ（全画面レイアウト） */}
      {hasArtifact && <ArtifactContainer />}

      {/* Chat Transcript - アーティファクト表示時は左側に400px幅で配置 */}
      {hasArtifact && !isMobile && (
        <motion.div
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              delay: 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 30,
            },
          }}
          className="fixed left-0 top-0 z-[60] h-dvh w-[400px] shrink-0 pointer-events-none"
          exit={{
            opacity: 0,
            x: 0,
            scale: 1,
            transition: { duration: 0 },
          }}
          initial={{ opacity: 0, x: 10, scale: 1 }}
        >
          <div className="flex h-full flex-col pointer-events-auto">
            {/* チャットメッセージエリア */}
            <div className="relative flex-1 overflow-y-auto">
              <Fade top className="absolute inset-x-4 top-0 h-40 z-10" />
              <div className="h-full px-4 pt-40 pb-[150px]">
                <div className="space-y-3 max-w-2xl">
                  {/* メッセージと通知を統合してタイムスタンプ順に表示 */}
                  {(() => {
                    const locale = navigator?.language ?? 'en-US';
                    
                    // メッセージと通知を統合
                    const items: Array<{ type: 'message' | 'notification'; timestamp: number; data: any }> = [
                      ...messages.map(msg => ({ type: 'message' as const, timestamp: msg.timestamp, data: msg })),
                      ...notifications.map(notif => ({ type: 'notification' as const, timestamp: notif.timestamp, data: notif })),
                    ];
                    
                    // タイムスタンプ順にソート
                    items.sort((a, b) => a.timestamp - b.timestamp);
                    
                    return items.map((item) => {
                      if (item.type === 'message') {
                        const { id, timestamp, from, message, editTimestamp } = item.data;
                        const messageOrigin = from?.isLocal ? 'local' : 'remote';
                        const hasBeenEdited = !!editTimestamp;
                        
                        return (
                          <div key={id} className="animate-in fade-in slide-in-from-bottom-2">
                            <div className={cn(
                              "rounded-lg p-3 shadow-sm",
                              messageOrigin === 'local' 
                                ? "bg-[#343541] ml-auto max-w-[80%]"
                                : "bg-white border border-gray-200 mr-auto max-w-[80%]"
                            )}>
                              <div className={cn(
                                "text-sm",
                                messageOrigin === 'local' ? "text-white" : "text-gray-900"
                              )}>{message}</div>
                              <div className={cn(
                                "text-xs mt-1",
                                messageOrigin === 'local' ? "text-gray-300" : "text-gray-500"
                              )}>
                                {new Date(timestamp).toLocaleTimeString(locale, {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        // 通知（プレビューカード）
                        const notification = item.data;
                        return (
                          <div key={notification.timestamp} className="animate-in fade-in slide-in-from-bottom-2 mr-auto max-w-[80%]">
                            <ArtifactPreviewCard
                              artifactType={notification.artifactType}
                              title={notification.title}
                              preview={notification.preview}
                              timestamp={notification.timestamp}
                              streamId={notification.streamId}
                              progress={notification.progress}
                              onClick={() => {
                                console.log('[SessionView] Preview card clicked, showing artifact');
                                setIsVisible(true);
                                setUserClosed(false);
                              }}
                            />
                          </div>
                        );
                      }
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Transcript - アーティファクトがない場合の通常表示 */}
      {!hasArtifact && (
      <div
        className={cn(
            'fixed inset-0 grid grid-cols-1 grid-rows-1 transition-all duration-300 ease-out',
          !chatOpen && 'pointer-events-none'
        )}
      >
        <Fade top className="absolute inset-x-4 top-0 h-40" />
        <ScrollArea className="px-4 pt-40 pb-[150px] md:px-6 md:pb-[180px]">
            <div className={cn(
              "mx-auto max-w-2xl space-y-3 transition-all duration-300 ease-out",
              chatOpen ? "opacity-100" : "opacity-0"
            )}>
              {(() => {
                const locale = navigator?.language ?? 'en-US';
                
                // メッセージと通知を統合
                const items: Array<{ type: 'message' | 'notification'; timestamp: number; data: any }> = [
                  ...messages.map(msg => ({ type: 'message' as const, timestamp: msg.timestamp, data: msg })),
                  ...notifications.map(notif => ({ type: 'notification' as const, timestamp: notif.timestamp, data: notif })),
                ];
                
                // タイムスタンプ順にソート
                items.sort((a, b) => a.timestamp - b.timestamp);
                
                return items.map((item) => {
                  if (item.type === 'message') {
                    const { id, timestamp, from, message, editTimestamp } = item.data;
                    const messageOrigin = from?.isLocal ? 'local' : 'remote';
                    const hasBeenEdited = !!editTimestamp;
                    
                    return (
                      <div key={id} className="animate-in fade-in slide-in-from-bottom-2">
                        <div className={cn(
                          "rounded-lg p-3 shadow-sm",
                          messageOrigin === 'local' 
                            ? "bg-[#343541] ml-auto max-w-[80%]"
                            : "bg-white border border-gray-200 mr-auto max-w-[80%]"
                        )}>
                          <div className={cn(
                            "text-sm",
                            messageOrigin === 'local' ? "text-white" : "text-gray-900"
                          )}>{message}</div>
                          <div className={cn(
                            "text-xs mt-1",
                            messageOrigin === 'local' ? "text-gray-300" : "text-gray-500"
                          )}>
                            {new Date(timestamp).toLocaleTimeString(locale, {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    // 通知（プレビューカード）
                    const notification = item.data;
                    return (
                      <div key={notification.timestamp} className="animate-in fade-in slide-in-from-bottom-2 mr-auto max-w-[80%]">
                        <ArtifactPreviewCard
                          artifactType={notification.artifactType}
                          title={notification.title}
                          preview={notification.preview}
                          timestamp={notification.timestamp}
                          streamId={notification.streamId}
                          progress={notification.progress}
                          onClick={() => {
                            console.log('[SessionView] Preview card clicked (normal view), showing artifact');
                            setIsVisible(true);
                            setUserClosed(false);
                          }}
                        />
                      </div>
                    );
                  }
                });
              })()}
            </div>
        </ScrollArea>
      </div>
      )}

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
        >
          <AgentControlBar
            controls={controls}
            onChatOpenChange={handleChatOpenChange}
            showLive2D={showLive2D}
            onLive2DToggle={setShowLive2D}
          />
        </div>
      </MotionBottom>
    </section>
  );
};
