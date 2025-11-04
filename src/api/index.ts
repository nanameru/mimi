/**
 * API サーバー
 * PPTX エクスポートなどのAPIエンドポイントを提供
 */

import express from 'express';
import { exportPptx } from './export-pptx.js';

const app = express();

// ボディパーサー設定（大きなHTMLを受信可能にする）
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORSを有効化（フロントエンドからのリクエストを許可）
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// APIルート
app.post('/api/export-pptx', exportPptx);

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

const PORT = process.env.API_PORT || 3001;

export function startApiServer(): void {
  app.listen(PORT, () => {
    console.log(`[API Server] 🚀 Listening on port ${PORT}`);
    console.log(`[API Server] Health check: http://localhost:${PORT}/api/health`);
  });
}

