/**
 * アーティファクトを受信するカスタムフック
 */

'use client';

import { useEffect, useState } from 'react';
import { useDataChannel } from '@livekit/components-react';
import type { ArtifactData } from '@/components/artifacts/types';

export function useArtifactChannel() {
  const [artifact, setArtifact] = useState<ArtifactData | null>(null);

  // LiveKit Data Channelから 'artifact' トピックを受信
  useDataChannel('artifact', (payload) => {
    try {
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(payload.payload);
      const data = JSON.parse(jsonString) as ArtifactData;

      console.log('[useArtifactChannel] Received:', data);

      // アーティファクトを更新
      setArtifact(data);

      // 一定時間後に自動でクリア（loading以外）
      if (data.kind !== 'loading' && data.message === '') {
        setTimeout(() => {
          setArtifact(null);
        }, 10000); // 10秒後にクリア
      }
    } catch (error) {
      console.error('[useArtifactChannel] Failed to parse:', error);
    }
  });

  return artifact;
}

