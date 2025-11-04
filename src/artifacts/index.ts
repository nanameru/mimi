/**
 * アーティファクト送信ヘルパー関数
 */

import type { Room } from 'livekit-server-sdk';
import type { ArtifactData, WeatherArtifact, LoadingArtifact } from './types';

/**
 * アーティファクトデータをLiveKit Data Channelで送信
 */
export async function sendArtifact(
  room: Room,
  artifactData: ArtifactData
): Promise<void> {
  try {
    const dataPacket = JSON.stringify(artifactData);
    const encoder = new TextEncoder();
    const uint8Data = encoder.encode(dataPacket);

    await room.localParticipant?.publishData(uint8Data, {
      reliable: true,
      topic: 'artifact',
    });

    console.log(`[Artifact] Sent ${artifactData.kind} artifact:`, artifactData);
  } catch (error) {
    console.error('[Artifact] Failed to send:', error);
  }
}

/**
 * 天気アーティファクトを送信
 */
export async function sendWeatherArtifact(
  room: Room,
  artifact: Omit<WeatherArtifact, 'type' | 'timestamp'>
): Promise<void> {
  await sendArtifact(room, {
    type: 'artifact',
    timestamp: Date.now(),
    ...artifact,
  });
}

/**
 * ローディングアーティファクトを送信
 */
export async function sendLoadingArtifact(
  room: Room,
  message: string
): Promise<void> {
  const artifact: LoadingArtifact = {
    type: 'artifact',
    kind: 'loading',
    message,
    timestamp: Date.now(),
  };

  await sendArtifact(room, artifact);
}

/**
 * アーティファクトをクリア（非表示）
 */
export async function clearArtifact(room: Room): Promise<void> {
  const artifact: ArtifactData = {
    type: 'artifact',
    kind: 'loading',
    message: '',
    timestamp: Date.now(),
  };

  await sendArtifact(room, artifact);
}

