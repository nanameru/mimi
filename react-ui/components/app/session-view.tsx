'use client';

import React, { useState, useEffect } from 'react';
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
  const { artifact, setArtifact, isVisible, setIsVisible, setUserClosed, notifications, artifactMap } = useArtifactChannel();
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth ? windowWidth < 768 : false;
  
  // アーティファクトが表示されているかどうか（isVisibleも考慮）
  const hasArtifact = artifact && isVisible && !(artifact.kind === 'loading' && !artifact.message);

  // 通常モードでチャットが開いている状態でアーティファクトが生成された場合、
  // アーティファクトモードでもチャットを開いた状態にする
  useEffect(() => {
    if (hasArtifact && chatOpen) {
      setArtifactChatOpen(true);
    }
  }, [hasArtifact]); // chatOpenを依存配列から削除（初回のみ同期）

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
      {hasArtifact && (
        <ArtifactContainer 
          artifactChatOpen={artifactChatOpen} 
          onChatToggle={() => setArtifactChatOpen(!artifactChatOpen)}
          messageCount={messages.length}
        />
      )}

      {/* チャット開閉ボタン（通常モード時のみ表示） */}
      {!isMobile && !hasArtifact && (
        <motion.button
          onClick={() => handleChatOpenChange(!chatOpen)}
          className="fixed top-8 right-8 z-[9999] flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-4 h-4 text-gray-600" />
          {messages.length > 0 && (
            <motion.span
              className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {messages.length}
            </motion.span>
          )}
        </motion.button>
      )}

      {/* Chat Transcript - 統合サイドバー（通常モードとアーティファクトモード共通） */}
      {!isMobile && ((!hasArtifact && chatOpen) || (hasArtifact && artifactChatOpen)) && (
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
            {/* チャットメッセージエリア - ScrollAreaを使用（通常モードの方式） */}
            <ScrollArea className="flex-1 relative">
              <Fade top className="absolute inset-x-4 top-0 h-40 z-10" />
              <div className="px-4 pt-40 pb-4">
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
                                console.log('[SessionView] Preview card clicked (unified sidebar), showing artifact');
                                
                                // streamIdがある場合、artifactMapから対応するアーティファクトを取得
                                if (notification.streamId && artifactMap.has(notification.streamId)) {
                                  const storedArtifact = artifactMap.get(notification.streamId);
                                  console.log('[SessionView] Found artifact in map:', storedArtifact);
                                  setArtifact(storedArtifact!);
                                } else {
                                  console.log('[SessionView] No artifact found in map for streamId:', notification.streamId);
                                }
                                
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
            </ScrollArea>
            
            {/* チャット入力欄 - 通常モードの方式（下部固定、border-tで区切り） */}
            <div className="px-4 pb-4 pt-2 border-t border-gray-200">
              <AgentControlBar
                controls={controls}
                onChatOpenChange={handleChatOpenChange}
                showLive2D={showLive2D}
                onLive2DToggle={setShowLive2D}
                className="bg-transparent border-gray-200 shadow-none"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(229, 231, 235, 1)',
                  boxShadow: 'none',
                }}
              />
            </div>
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
      <MediaTiles chatOpen={chatOpen} showLive2D={showLive2D} hasArtifact={hasArtifact} />

      {/* Bottom */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-0 z-[9999] md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-4" />
        )}
      </MotionBottom>
    </section>
  );
};
