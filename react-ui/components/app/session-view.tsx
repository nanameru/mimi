'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';
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
import { removeEmotionAndMotionTags } from '@/lib/remove-tags';

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
  const [artifactChatOpen, setArtifactChatOpen] = useState(false);
  const [showLive2D, setShowLive2D] = useState(false);
  const { artifact, setArtifact, isVisible, setIsVisible, setUserClosed, notifications } = useArtifactChannel();
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;
  
  // アーティファクトが表示されているかどうか（isVisibleも考慮）
  const hasArtifact = artifact && isVisible && !(artifact.kind === 'loading' && !artifact.message);

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
      {hasArtifact && <ArtifactContainer artifactChatOpen={artifactChatOpen} />}

      {/* チャット開閉ボタン（アーティファクト表示時のみ） */}
      {hasArtifact && !isMobile && (
        <motion.button
          onClick={() => setArtifactChatOpen(!artifactChatOpen)}
          className="fixed top-8 right-8 z-[70] w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center transition-colors hover:bg-white shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {artifactChatOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <MessageSquare className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
      )}

      {/* Chat Transcript - アーティファクト表示時は右側に400px幅で配置 */}
      {hasArtifact && !isMobile && artifactChatOpen && (
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
          className="fixed right-0 top-0 z-[60] h-dvh w-[400px] shrink-0 pointer-events-none"
          exit={{
            opacity: 0,
            x: 400,
            scale: 1,
            transition: { duration: 0.3 },
          }}
          initial={{ opacity: 0, x: 400, scale: 1 }}
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
                          <div key={id} className="animate-in fade-in slide-in-from-bottom-2 relative z-10">
                            {messageOrigin === 'local' ? (
                              // ユーザーメッセージ（右寄せ、黒背景）
                              <div className="flex justify-end">
                                <div className="inline-block px-5 py-3 bg-black text-white rounded-3xl max-w-[85%]">
                                  <p className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                                    {removeEmotionAndMotionTags(message)}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              // AIメッセージ（左寄せ、背景なし）
                              <div className="space-y-2">
                                <div className="text-gray-900">
                                  <p className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                                    {removeEmotionAndMotionTags(message)}
                                  </p>
                              </div>
                            </div>
                            )}
                          </div>
                        );
                      } else {
                        // 通知（プレビューカード）
                        const notification = item.data;
                        return (
                          <div key={notification.timestamp} className="animate-in fade-in slide-in-from-bottom-2 mr-auto max-w-[80%] relative z-50">
                            <ArtifactPreviewCard
                              artifactType={notification.artifactType}
                              title={notification.title}
                              preview={notification.preview}
                              timestamp={notification.timestamp}
                              streamId={notification.streamId}
                              progress={notification.progress}
                              onClick={() => {
                                console.log('[SessionView] Preview card clicked (artifact view), showing artifact');
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

      {/* Chat Transcript - 右側パネルとして表示 */}
      {!hasArtifact && (
        <motion.div
          className="fixed top-0 right-0 h-dvh bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-2xl z-50"
          initial={{ x: '100%' }}
          animate={{ x: chatOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{ width: isMobile ? '100%' : '400px' }}
        >
          <div className="flex flex-col h-full">
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">チャット履歴</h2>
              <button
                onClick={() => handleChatOpenChange(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* メッセージエリア */}
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="space-y-3">
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
                      <div key={id} className="animate-in fade-in slide-in-from-bottom-2 relative z-10">
                        {messageOrigin === 'local' ? (
                          // ユーザーメッセージ（右寄せ、黒背景）
                          <div className="flex justify-end">
                            <div className="inline-block px-5 py-3 bg-black text-white rounded-3xl max-w-[85%]">
                              <p className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                                {removeEmotionAndMotionTags(message)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          // AIメッセージ（左寄せ、背景なし）
                          <div className="space-y-2">
                            <div className="text-gray-900">
                              <p className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                                {removeEmotionAndMotionTags(message)}
                              </p>
                          </div>
                        </div>
                        )}
                      </div>
                    );
                  } else {
                    // 通知（プレビューカード）
                    const notification = item.data;
                    return (
                      <div key={notification.timestamp} className="animate-in fade-in slide-in-from-bottom-2 mr-auto max-w-[80%] relative z-50">
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
        </motion.div>
      )}

      {/* ステータスインジケーター（アーティファクトがない時のみ表示） */}
      {!hasArtifact && (
        <div className="absolute top-8 left-8 z-[9998]">
          <motion.div 
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: agentState === 'speaking' || agentState === 'listening'
                  ? ['rgb(34, 197, 94)', 'rgb(74, 222, 128)', 'rgb(34, 197, 94)']
                  : 'rgb(156, 163, 175)',
                boxShadow: agentState === 'speaking' || agentState === 'listening'
                  ? ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 8px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0.4)']
                  : 'none'
              }}
              transition={{
                duration: 2,
                repeat: (agentState === 'speaking' || agentState === 'listening') ? Infinity : 0,
              }}
            />
            <span className="text-gray-600 text-sm font-medium">
              {agentState === 'speaking' || agentState === 'listening' ? 'ACTIVE' : 'STANDBY'}
            </span>
          </motion.div>
      </div>
      )}

      {/* Media Tiles */}
      <MediaTiles chatOpen={chatOpen} showLive2D={showLive2D} />

      {/* Bottom */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-0 z-[9999] md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-4" />
        )}
        <div 
          className="relative z-[9999] mx-auto max-w-2xl pb-3 md:pb-12 transition-all duration-300 ease-out"
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
