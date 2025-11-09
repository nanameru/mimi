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
  // streamIdとアーティファクトのマッピング（通知クリック時にアーティファクトを復元するため）
  const [artifactMap, setArtifactMap] = useState<Map<string, ArtifactData>>(new Map());

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
          streamId: notification.streamId,
        });
        
        // 同じstreamIdの通知を更新、なければ追加
        setNotifications((prev) => {
          // streamIdが同じ通知を探す
          const existingIndex = notification.streamId 
            ? prev.findIndex(n => n.streamId === notification.streamId)
            : -1;
          
          if (existingIndex !== -1) {
            // 既存の通知を更新
            console.log(`[useArtifactChannel] 🔄 Updating existing notification with streamId: ${notification.streamId}`);
            const updated = [...prev];
            updated[existingIndex] = notification;
            return updated;
          } else {
            // 新しい通知を追加（最大10件まで保持）
            console.log(`[useArtifactChannel] ➕ Adding new notification with streamId: ${notification.streamId}`);
            return [...prev, notification].slice(-10);
          }
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
        streamId: artifactData.streamId,
      });

      // artifactMapに保存（streamIdがある場合）
      if (artifactData.streamId) {
        setArtifactMap((prev) => {
          const updated = new Map(prev);
          updated.set(artifactData.streamId!, artifactData);
          console.log(`[useArtifactChannel] 💾 Saved artifact to map with streamId: ${artifactData.streamId}`);
          return updated;
        });
      }

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

  return { artifact, setArtifact, isVisible, setIsVisible, setUserClosed, notifications, artifactMap };
}

// 後方互換性のため、直接artifactを返す関数も提供
export function useArtifactChannelValue() {
  const { artifact } = useArtifactChannel();
  return artifact;
}

