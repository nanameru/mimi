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
  SlideArtifact,
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

// ストリーミング用のtimestampキャッシュ
let streamingTimestamps: Map<string, number> = new Map();

/**
 * テキストアーティファクトを送信（ストリーミング対応）
 * delta（差分）を送信する場合は、既存のcontentに追加される
 */
export async function sendTextArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false,
  streamId?: string
): Promise<void> {
  // ストリーミングの場合、同じstreamIdには同じtimestampを使用
  let timestamp: number;
  const cacheKey = streamId || 'text-default';
  
  console.log(`[sendTextArtifact] isDelta=${isDelta}, streamId=${streamId}, cacheKey=${cacheKey}`);
  
  if (isDelta && streamId) {
    // ストリーミング中の場合、既存のtimestampを使用または新規作成
    if (!streamingTimestamps.has(cacheKey)) {
      timestamp = Date.now();
      streamingTimestamps.set(cacheKey, timestamp);
      console.log(`[sendTextArtifact] NEW timestamp created: ${timestamp} for ${cacheKey}`);
    } else {
      timestamp = streamingTimestamps.get(cacheKey)!;
      console.log(`[sendTextArtifact] REUSING timestamp: ${timestamp} for ${cacheKey}`);
    }
  } else {
    // 完了または新規の場合、新しいtimestampを生成
    timestamp = Date.now();
    streamingTimestamps.delete(cacheKey);
    console.log(`[sendTextArtifact] FINAL timestamp: ${timestamp}, cleared cache for ${cacheKey}`);
  }

  const artifact: TextArtifact = {
    type: 'artifact',
    kind: 'text',
    content,
    timestamp,
  };

  await sendArtifact(room, artifact);
}

/**
 * コードアーティファクトを送信（ストリーミング対応）
 */
export async function sendCodeArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false,
  streamId?: string
): Promise<void> {
  // ストリーミングの場合、同じstreamIdには同じtimestampを使用
  let timestamp: number;
  const cacheKey = streamId || 'code-default';
  
  if (isDelta && streamId) {
    if (!streamingTimestamps.has(cacheKey)) {
      timestamp = Date.now();
      streamingTimestamps.set(cacheKey, timestamp);
    } else {
      timestamp = streamingTimestamps.get(cacheKey)!;
    }
  } else {
    timestamp = Date.now();
    streamingTimestamps.delete(cacheKey);
  }

  const artifact: CodeArtifact = {
    type: 'artifact',
    kind: 'code',
    content,
    timestamp,
  };

  await sendArtifact(room, artifact);
}

/**
 * スプレッドシートアーティファクトを送信（ストリーミング対応）
 */
export async function sendSheetArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false,
  streamId?: string
): Promise<void> {
  // ストリーミングの場合、同じstreamIdには同じtimestampを使用
  let timestamp: number;
  const cacheKey = streamId || 'sheet-default';
  
  if (isDelta && streamId) {
    if (!streamingTimestamps.has(cacheKey)) {
      timestamp = Date.now();
      streamingTimestamps.set(cacheKey, timestamp);
    } else {
      timestamp = streamingTimestamps.get(cacheKey)!;
    }
  } else {
    timestamp = Date.now();
    streamingTimestamps.delete(cacheKey);
  }

  const artifact: SheetArtifact = {
    type: 'artifact',
    kind: 'sheet',
    content,
    timestamp,
  };

  await sendArtifact(room, artifact);
}

/**
 * スライドアーティファクトを送信（ストリーミング対応）
 */
export async function sendSlideArtifact(
  room: Room,
  content: string,
  isDelta: boolean = false,
  streamId?: string
): Promise<void> {
  // ストリーミングの場合、同じstreamIdには同じtimestampを使用
  let timestamp: number;
  const cacheKey = streamId || 'slide-default';
  
  if (isDelta && streamId) {
    if (!streamingTimestamps.has(cacheKey)) {
      timestamp = Date.now();
      streamingTimestamps.set(cacheKey, timestamp);
    } else {
      timestamp = streamingTimestamps.get(cacheKey)!;
    }
  } else {
    timestamp = Date.now();
    streamingTimestamps.delete(cacheKey);
  }

  const artifact: SlideArtifact = {
    type: 'artifact',
    kind: 'slide',
    content,
    timestamp,
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

