/**
 * アーティファクトの型定義（フロントエンド）
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

export type SingleSlide = {
  id: string;          // 'slide-1', 'slide-2', ...
  title: string;       // スライドのタイトル
  content: string;     // 各スライドのHTML（960×540px固定 - 16:9横長）
  order: number;       // 表示順序
};

export type SlideArtifact = ArtifactData & {
  kind: 'slide';
  content: string;     // 全スライドを結合したHTML（後方互換性のため残す）
  slides?: SingleSlide[]; // 個別スライドの配列
  currentSlideIndex?: number; // 現在表示中のスライド
  totalSlides?: number; // 総スライド数
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
  streamId?: string;
  progress?: { current: number; total: number }; // 進捗情報（スライドなど）
};

