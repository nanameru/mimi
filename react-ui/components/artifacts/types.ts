/**
 * アーティファクトの型定義（フロントエンド）
 */

export type ArtifactKind = 'weather' | 'code' | 'text' | 'loading';

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
  message?: string;
  timestamp: number;
};

export type WeatherArtifact = ArtifactData & {
  kind: 'weather';
  data: WeatherData;
};

export type LoadingArtifact = ArtifactData & {
  kind: 'loading';
  message: string;
};

