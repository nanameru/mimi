/**
 * アーティファクトの型定義（バックエンド）
 */

export type ArtifactKind = 'weather' | 'text' | 'code' | 'sheet' | 'slide' | 'loading';

export type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
};

export type ArtifactData = {
  type: 'artifact';
  kind: ArtifactKind;
  data?: any;
  content?: string;
  message?: string;
  timestamp: number;
};

export type WeatherArtifact = ArtifactData & {
  kind: 'weather';
  data: WeatherData;
};

export type TextArtifact = ArtifactData & {
  kind: 'text';
  content: string;
};

export type CodeArtifact = ArtifactData & {
  kind: 'code';
  content: string;
};

export type SheetArtifact = ArtifactData & {
  kind: 'sheet';
  content: string;
};

export type SlideArtifact = ArtifactData & {
  kind: 'slide';
  content: string;
};

export type LoadingArtifact = ArtifactData & {
  kind: 'loading';
  message: string;
};

/**
 * アーティファクト通知（プレビュー用）
 */
export type ArtifactNotification = {
  type: 'artifact-notification';
  artifactType: 'text' | 'code' | 'sheet' | 'slide';
  title: string;
  preview: string;
  timestamp: number;
  streamId?: string; // アーティファクトとの紐付け用
};

