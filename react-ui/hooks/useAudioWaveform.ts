/**
 * 実際の音声トラックから波形データを取得するフック
 * LiveKitの音声トラックをWeb Audio APIで解析し、VoiceOrb用の波形データを生成
 */

import { useEffect, useRef, useState } from 'react';
import type { TrackReference } from '@livekit/components-react';

export function useAudioWaveform(
  audioTrack: TrackReference | undefined,
  barCount = 32
): number[] {
  const [waveform, setWaveform] = useState<number[]>(new Array(barCount).fill(0));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    // 音声トラックがない場合は0にリセット
    if (!audioTrack?.publication?.track) {
      setWaveform(new Array(barCount).fill(0));
      
      // クリーンアップ
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      
      return;
    }

    const track = audioTrack.publication.track;
    const mediaStreamTrack = track.mediaStreamTrack;
    
    if (!mediaStreamTrack) {
      setWaveform(new Array(barCount).fill(0));
      return;
    }

    const mediaStream = new MediaStream([mediaStreamTrack]);

    try {
      // AudioContextを作成（既存のものがあれば再利用）
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContext({ sampleRate: 48000 });
      }
      
      const audioContext = audioContextRef.current;

      // AnalyserNodeを作成
      if (!analyserRef.current) {
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;
      }
      
      const analyser = analyserRef.current;

      // MediaStreamSourceを作成して接続
      if (!sourceNodeRef.current) {
        const sourceNode = audioContext.createMediaStreamSource(mediaStream);
        sourceNode.connect(analyser);
        sourceNodeRef.current = sourceNode;
      }

      // 波形データを取得するバッファ
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);

      const updateWaveform = () => {
        if (!analyser) {
          animationFrameRef.current = null;
          return;
        }

        // 音声の時間領域データを取得（-1.0 ~ 1.0 の範囲）
        analyser.getFloatTimeDomainData(dataArray);

        // barCount個の波形データに変換
        const step = Math.floor(bufferLength / barCount);
        const newWaveform: number[] = [];

        for (let i = 0; i < barCount; i++) {
          const start = i * step;
          const end = Math.min(start + step, bufferLength);
          
          // 指定範囲の音量（RMS: Root Mean Square）を計算
          let sum = 0;
          for (let j = start; j < end; j++) {
            const value = dataArray[j];
            sum += value * value; // 二乗和
          }
          const rms = Math.sqrt(sum / (end - start));
          
          // 0-1の範囲に正規化（感度を調整）
          const normalized = Math.min(rms * 3, 1);
          newWaveform.push(normalized);
        }

        setWaveform(newWaveform);

        // 次のフレームで再実行
        animationFrameRef.current = requestAnimationFrame(updateWaveform);
      };

      // アニメーション開始
      if (!animationFrameRef.current) {
        updateWaveform();
      }
    } catch (error) {
      console.error('[useAudioWaveform] Failed to setup audio analysis:', error);
      setWaveform(new Array(barCount).fill(0));
    }

    // クリーンアップ
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.disconnect();
        } catch (e) {
          // Already disconnected
        }
        sourceNodeRef.current = null;
      }
      // AudioContextは他のコンポーネントで使用される可能性があるため、
      // ここでは閉じない（unmount時に閉じる）
    };
  }, [audioTrack, barCount]);

  return waveform;
}

