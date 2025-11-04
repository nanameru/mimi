'use client';

import { useEffect, useRef } from 'react';
import type { AgentState } from '@livekit/components-react';
import { useVoiceAssistant } from '@livekit/components-react';
import { RemoteAudioTrack } from 'livekit-client';
import { useLive2DMotionControl } from '@/hooks/useLive2DMotionControl';
import { Live2DModelWrapper } from '@/lib/live2d/Live2DModelWrapper';
import { cn } from '@/lib/utils';

interface Live2DBackgroundProps {
  agentState: AgentState;
  className?: string;
}

/**
 * Live2Dキャラクターを背景レイヤーとして表示するコンポーネント
 */
export function Live2DBackground({ agentState, className }: Live2DBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<Live2DModelWrapper | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // AIエージェントからの音声トラックを取得
  const { audioTrack: agentAudioTrack } = useVoiceAssistant();

  // AIエージェントからのモーション制御を有効化
  useLive2DMotionControl(modelRef);

  // マウストラッキング機能（マウス位置に応じてキャラクターの顔と目が追従）
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!modelRef.current) return;

      // マウス座標を-1.0 ~ 1.0の範囲に正規化
      // X: 左端(-1.0) → 中央(0.0) → 右端(1.0)
      // Y: 上端(1.0) → 中央(0.0) → 下端(-1.0)
      const x = (e.clientX / window.innerWidth) * 2.0 - 1.0;
      const y = -((e.clientY / window.innerHeight) * 2.0 - 1.0);

      // モデルにマウス位置を設定
      modelRef.current.setMousePosition(x, y);
    };

    // グローバルにマウスイベントを登録（画面全体でトラッキング）
    window.addEventListener('mousemove', handleMouseMove);

    console.log('[Live2DBackground] Mouse tracking enabled');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('[Live2DBackground] Mouse tracking disabled');
    };
  }, []);

  // モデル初期化
  useEffect(() => {
    const initModel = async () => {
      if (!canvasRef.current) {
        console.warn('[Live2DBackground] Canvas ref is null');
        return;
      }

      try {
        console.log('[Live2DBackground] Initializing Live2D model...');

        const model = new Live2DModelWrapper();
        await model.loadModel('/live2d/models/Haru/Haru.model3.json');
        await model.startRendering(canvasRef.current);

        modelRef.current = model;
        console.log('[Live2DBackground] Live2D model initialized');
      } catch (error) {
        console.error('[Live2DBackground] Failed to initialize model:', error);
      }
    };

    initModel();

    // クリーンアップ
    return () => {
      if (modelRef.current) {
        console.log('[Live2DBackground] Cleaning up Live2D model');
        modelRef.current.destroy();
        modelRef.current = null;
      }
    };
  }, []);

  // 音声トラックからRMS値を計算してリップシンクを適用
  useEffect(() => {
    if (!agentAudioTrack?.publication.track || !modelRef.current) {
      return;
    }

    const remoteAudioTrack = agentAudioTrack.publication.track as RemoteAudioTrack;
    if (!remoteAudioTrack) {
      return;
    }

    // AudioContextとAnalyserNodeをセットアップ
    const setupAudioAnalysis = async () => {
      try {
        // AudioContextを作成（まだ存在しない場合）
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext({ sampleRate: 48000 });
        }

        const audioContext = audioContextRef.current;

        // 音声トラックのMediaStreamを取得
        const mediaStream = new MediaStream([remoteAudioTrack.mediaStreamTrack]);

        // MediaStreamAudioSourceNodeを作成
        const sourceNode = audioContext.createMediaStreamSource(mediaStream);

        // AnalyserNodeを作成
        if (!analyserRef.current) {
          analyserRef.current = audioContext.createAnalyser();
          analyserRef.current.fftSize = 2048;
          analyserRef.current.smoothingTimeConstant = 0.8;
        }

        const analyser = analyserRef.current;

        // ソースをアナライザーに接続
        sourceNode.connect(analyser);

        // RMS値を計算してリップシンクを更新
        const updateLipSync = () => {
          if (!analyser || !modelRef.current) {
            return;
          }

          // データ配列を取得
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Float32Array(bufferLength);
          analyser.getFloatTimeDomainData(dataArray);

          // RMS値を計算
          let sumSquares = 0.0;
          for (let i = 0; i < bufferLength; i++) {
            const sample = dataArray[i]!;
            sumSquares += sample * sample;
          }
          const rms = Math.sqrt(sumSquares / bufferLength);

          // RMS値を0.0〜1.0の範囲にマッピング（必要に応じてスケーリング）
          // 通常、音声のRMS値は0.0〜0.3程度なので、より視覚的に分かりやすくするためにスケーリング
          const scaledRMS = Math.min(1.0, rms * 3.0);

          // Live2DモデルにRMS値を設定
          modelRef.current.setLipSyncValue(scaledRMS);

          // 次のフレームで更新
          animationFrameRef.current = requestAnimationFrame(updateLipSync);
        };

        // リップシンク更新を開始
        updateLipSync();

        console.log('[Live2DBackground] Audio analysis setup complete');
      } catch (error) {
        console.error('[Live2DBackground] Failed to setup audio analysis:', error);
      }
    };

    setupAudioAnalysis();

    // クリーンアップ
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      analyserRef.current = null;
    };
  }, [agentAudioTrack]);

  // エージェント状態に応じた表情変更
  useEffect(() => {
    if (!modelRef.current) return;

    switch (agentState) {
      case 'listening':
        // F01: 通常の表情
        modelRef.current.setExpression('F01');
        break;
      case 'thinking':
        // F03: 考え中の表情
        modelRef.current.setExpression('F03');
        console.log('[Live2DBackground] Agent is thinking...');
        break;
      case 'speaking':
        // F02: 笑顔
        modelRef.current.setExpression('F02');
        console.log('[Live2DBackground] Agent is speaking!');
        break;
      default:
        break;
    }
  }, [agentState]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-10',
        'flex items-end justify-end',
        'pointer-events-none',
        className
      )}
    >
      {/* Live2Dキャラクターを画面右側下に配置（上半身のみ表示） */}
      <canvas
        ref={canvasRef}
        width={800}
        height={1200}
        className="max-h-[85vh] mr-2 mb-0"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
