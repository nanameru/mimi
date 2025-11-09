'use client';

import { type HTMLAttributes, useCallback, useState } from 'react';
import { Track } from 'livekit-client';
import { useChat, useRemoteParticipants } from '@livekit/components-react';
import { ChatTextIcon, PhoneDisconnectIcon } from '@phosphor-icons/react/dist/ssr';
import { useSession } from '@/components/app/session-provider';
import { TrackToggle } from '@/components/livekit/agent-control-bar/track-toggle';
import { Button } from '@/components/livekit/button';
import { Toggle } from '@/components/livekit/toggle';
import { cn } from '@/lib/utils';
import { ChatInput } from './chat-input';
import { UseInputControlsProps, useInputControls } from './hooks/use-input-controls';
import { usePublishPermissions } from './hooks/use-publish-permissions';
import { TrackSelector } from './track-selector';
import { AddMCPServerDialog } from '@/components/app/add-mcp-server-dialog';
import { ManageMCPServersDialog } from '@/components/app/manage-mcp-servers-dialog';

export interface ControlBarControls {
  leave?: boolean;
  camera?: boolean;
  microphone?: boolean;
  screenShare?: boolean;
  chat?: boolean;
  live2d?: boolean;
}

export interface AgentControlBarProps extends UseInputControlsProps {
  controls?: ControlBarControls;
  onDisconnect?: () => void;
  onChatOpenChange?: (open: boolean) => void;
  onDeviceError?: (error: { source: Track.Source; error: Error }) => void;
  showLive2D?: boolean;
  onLive2DToggle?: (show: boolean) => void;
}

/**
 * A control bar specifically designed for voice assistant interfaces
 */
export function AgentControlBar({
  controls,
  saveUserChoices = true,
  className,
  onDisconnect,
  onDeviceError,
  onChatOpenChange,
  showLive2D = false,
  onLive2DToggle,
  style,
  ...props
}: AgentControlBarProps & HTMLAttributes<HTMLDivElement>) {
  const { send } = useChat();
  const participants = useRemoteParticipants();
  const [chatOpen, setChatOpen] = useState(false);
  const publishPermissions = usePublishPermissions();
  const { isSessionActive, endSession } = useSession();

  const {
    micTrackRef,
    cameraToggle,
    microphoneToggle,
    screenShareToggle,
    handleAudioDeviceChange,
    handleVideoDeviceChange,
    handleMicrophoneDeviceSelectError,
    handleCameraDeviceSelectError,
  } = useInputControls({ onDeviceError, saveUserChoices });

  const handleSendMessage = async (message: string) => {
    await send(message);
  };

  const handleToggleTranscript = useCallback(
    (open: boolean) => {
      setChatOpen(open);
      onChatOpenChange?.(open);
    },
    [onChatOpenChange, setChatOpen]
  );

  const handleDisconnect = useCallback(async () => {
    endSession();
    onDisconnect?.();
  }, [endSession, onDisconnect]);

  const visibleControls = {
    leave: controls?.leave ?? true,
    microphone: controls?.microphone ?? publishPermissions.microphone,
    screenShare: controls?.screenShare ?? publishPermissions.screenShare,
    camera: controls?.camera ?? publishPermissions.camera,
    chat: controls?.chat ?? publishPermissions.data,
    live2d: controls?.live2d ?? true,
  };

  const isAgentAvailable = participants.some((p) => p.isAgent);

  return (
    <div
      aria-label="Voice assistant controls"
      className={cn(
        'flex flex-col rounded-2xl backdrop-blur-xl p-3 border transition-all duration-300',
        className
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        ...style,
      }}
      {...props}
    >
      {/* Chat Input */}
      {visibleControls.chat && (
        <ChatInput chatOpen={chatOpen} isAgentAvailable={isAgentAvailable} onSend={handleSendMessage} />
      )}

      <div className="flex gap-1">
        <div className="flex grow gap-1">
          {/* Toggle Microphone - コメントアウト */}
          {/* {visibleControls.microphone && (
            <TrackSelector
              kind="audioinput"
              aria-label="Toggle microphone"
              source={Track.Source.Microphone}
              pressed={microphoneToggle.enabled}
              disabled={microphoneToggle.pending}
              audioTrackRef={micTrackRef}
              onPressedChange={microphoneToggle.toggle}
              onMediaDeviceError={handleMicrophoneDeviceSelectError}
              onActiveDeviceChange={handleAudioDeviceChange}
            />
          )} */}

          {/* Toggle Camera - コメントアウト */}
          {/* {visibleControls.camera && (
            <TrackSelector
              kind="videoinput"
              aria-label="Toggle camera"
              source={Track.Source.Camera}
              pressed={cameraToggle.enabled}
              pending={cameraToggle.pending}
              disabled={cameraToggle.pending}
              onPressedChange={cameraToggle.toggle}
              onMediaDeviceError={handleCameraDeviceSelectError}
              onActiveDeviceChange={handleVideoDeviceChange}
            />
          )} */}

          {/* Toggle Screen Share */}
          {visibleControls.screenShare && (
            <TrackToggle
              size="icon"
              variant="secondary"
              aria-label="Toggle screen share"
              source={Track.Source.ScreenShare}
              pressed={screenShareToggle.enabled}
              disabled={screenShareToggle.pending}
              onPressedChange={screenShareToggle.toggle}
            />
          )}

          {/* Toggle Transcript */}
          {visibleControls.chat && (
            <Toggle
              size="icon"
              variant="secondary"
              aria-label="Toggle transcript"
              pressed={chatOpen}
              onPressedChange={handleToggleTranscript}
              title={chatOpen ? 'Hide chat transcript' : 'Show chat transcript'}
            >
              <ChatTextIcon weight="bold" />
            </Toggle>
          )}

          {/* Toggle Live2D */}
          {visibleControls.live2d && (
            <Toggle
              size="icon"
              variant="secondary"
              aria-label="Toggle Live2D character"
              pressed={showLive2D}
              onPressedChange={(pressed) => {
                console.log('[AgentControlBar] Live2D toggle clicked, new state:', pressed);
                onLive2DToggle?.(pressed);
              }}
              title={showLive2D ? 'Hide Live2D character' : 'Show Live2D character'}
              className={cn(!showLive2D && 'opacity-50')}
            >
              <span className="text-lg">👤</span>
            </Toggle>
          )}

          {/* MCP Server Management - コメントアウト */}
          {/* <div className="flex gap-1 border-l border-gray-200 pl-1">
            <AddMCPServerDialog />
            <ManageMCPServersDialog />
          </div> */}
        </div>

        {/* Disconnect - コメントアウト */}
        {/* {visibleControls.leave && (
          <Button
            variant="destructive"
            onClick={handleDisconnect}
            disabled={!isSessionActive}
            className="font-mono bg-black text-white border-black hover:bg-gray-800 focus:bg-gray-800"
          >
            <PhoneDisconnectIcon weight="bold" />
            <span className="hidden md:inline">END CALL</span>
            <span className="inline md:hidden">END</span>
          </Button>
        )} */}
      </div>
    </div>
  );
}
