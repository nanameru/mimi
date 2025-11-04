/**
 * アーティファクト送信ヘルパー関数
 */

import type { Room } from 'livekit-server-sdk';
import type {
  ArtifactData,
  WeatherArtifact,
  TextArtifact,
  CodeArtifact,
  SheetArtifact,
  LoadingArtifact,
} from './types';

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
 * テキストアーティファクトを送信（ストリーミング対応）
 * delta（差分）を送信する場合は、既存のcontentに追加される
 */
export async function sendTextArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false
): Promise<void> {
  const artifact: TextArtifact = {
    type: 'artifact',
    kind: 'text',
    content,
    timestamp: Date.now(),
  };

  await sendArtifact(room, artifact);
}

/**
 * コードアーティファクトを送信（ストリーミング対応）
 */
export async function sendCodeArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false
): Promise<void> {
  const artifact: CodeArtifact = {
    type: 'artifact',
    kind: 'code',
    content,
    timestamp: Date.now(),
  };

  await sendArtifact(room, artifact);
}

/**
 * スプレッドシートアーティファクトを送信（ストリーミング対応）
 */
export async function sendSheetArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false
): Promise<void> {
  const artifact: SheetArtifact = {
    type: 'artifact',
    kind: 'sheet',
    content,
    timestamp: Date.now(),
  };

  await sendArtifact(room, artifact);
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

