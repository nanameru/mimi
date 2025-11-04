/**
 * アーティファクトを受信するカスタムフック
 */

'use client';

import { useEffect, useState } from 'react';
import { useDataChannel } from '@livekit/components-react';
import type { ArtifactData, ArtifactNotification } from '@/components/artifacts/types';

export function useArtifactChannel() {
  const [artifact, setArtifact] = useState<ArtifactData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [userClosed, setUserClosed] = useState(false);
  const [notifications, setNotifications] = useState<ArtifactNotification[]>([]);

  // LiveKit Data Channelから 'artifact' トピックを受信
  useDataChannel('artifact', (payload) => {
    const receiveId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    try {
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(payload.payload);
      const data = JSON.parse(jsonString);

      // 通知かアーティファクトかを判定
      if (data.type === 'artifact-notification') {
        const notification = data as ArtifactNotification;
        console.log(`[useArtifactChannel] 🔔 Received notification (ID: ${receiveId}):`, {
          artifactType: notification.artifactType,
          title: notification.title,
        });
        
        // 通知を追加（最大10件まで保持）
        setNotifications((prev) => {
          const newNotifications = [...prev, notification].slice(-10);
          return newNotifications;
        });
        return;
      }

      // アーティファクトデータとして処理
      const artifactData = data as ArtifactData;

      console.log(`[useArtifactChannel] 📥 Received artifact (ID: ${receiveId}):`, {
        kind: artifactData.kind,
        timestamp: artifactData.timestamp,
        contentLength: artifactData.content?.length || 0,
        message: artifactData.message,
      });

      // ストリーミング対応: contentが含まれている場合、既存のcontentに追加または置き換え
      if (artifactData.content !== undefined) {
        setArtifact((prev) => {
          // 新しいkindまたは新しいtimestampの場合、完全に置き換え
          const isNewArtifact = !prev || prev.kind !== artifactData.kind || prev.timestamp !== artifactData.timestamp;
          if (isNewArtifact) {
            console.log(`[useArtifactChannel] 🆕 New artifact detected, kind: ${artifactData.kind} (ID: ${receiveId})`);
            // ユーザーが閉じた場合は再表示しない
            if (!userClosed) {
              console.log(`[useArtifactChannel] ✅ Showing new artifact (ID: ${receiveId})`);
              setIsVisible(true);
              setUserClosed(false);
            } else {
              console.log(`[useArtifactChannel] ⚠️ User closed, not showing (ID: ${receiveId})`);
            }
            return artifactData;
          }

          // 同じkindで、contentがストリーミングで送られてくる場合
          // ユーザーが閉じた場合は更新しない
          if (userClosed) {
            console.log(`[useArtifactChannel] ⏭️ User closed, skipping update (ID: ${receiveId})`);
            return prev;
          }

          if (prev.content && artifactData.content) {
            // 既存のcontentよりも新しいcontentが短い場合、これは完全な置き換え（新規生成）
            if (artifactData.content.length < prev.content.length) {
              console.log(`[useArtifactChannel] 🔄 Content length decreased, replacing (${prev.content.length} -> ${artifactData.content.length}) (ID: ${receiveId})`);
              return artifactData;
            }
            // 既存のcontentに追加（ストリーミング）
            // バックエンドから完全なcontentが送られてくるので、単純に置き換え
            console.log(`[useArtifactChannel] 📡 Streaming update (${prev.content.length} -> ${artifactData.content.length}) (ID: ${receiveId})`);
            return artifactData;
          }

          console.log(`[useArtifactChannel] 🔄 Updating artifact (ID: ${receiveId})`);
          return artifactData;
        });
      } else {
        // contentがない場合（weather、loadingなど）、そのまま置き換え
        setArtifact((prev) => {
          const isNewArtifact = !prev || prev.kind !== artifactData.kind || prev.timestamp !== artifactData.timestamp;
          if (isNewArtifact) {
            console.log(`[useArtifactChannel] 🆕 New artifact (no content) detected, kind: ${artifactData.kind} (ID: ${receiveId})`);
            // ユーザーが閉じた場合は再表示しない
            if (!userClosed) {
              console.log(`[useArtifactChannel] ✅ Showing new artifact (ID: ${receiveId})`);
              setIsVisible(true);
              setUserClosed(false);
            } else {
              console.log(`[useArtifactChannel] ⚠️ User closed, not showing (ID: ${receiveId})`);
            }
          }
          return artifactData;
        });
      }

      // 一定時間後に自動でクリア（loading以外）
      if (artifactData.kind !== 'loading' && artifactData.message === '') {
        console.log(`[useArtifactChannel] ⏱️ Setting auto-clear timeout (10s) (ID: ${receiveId})`);
        setTimeout(() => {
          setArtifact(null);
          console.log(`[useArtifactChannel] 🗑️ Auto-cleared artifact (ID: ${receiveId})`);
        }, 10000); // 10秒後にクリア
      }
    } catch (error) {
      console.error(`[useArtifactChannel] ❌ Failed to parse (ID: ${receiveId}):`, error);
    }
  });

  return { artifact, setArtifact, isVisible, setIsVisible, setUserClosed, notifications };
}

// 後方互換性のため、直接artifactを返す関数も提供
export function useArtifactChannelValue() {
  const { artifact } = useArtifactChannel();
  return artifact;
}

