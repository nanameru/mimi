# PPTX エクスポート機能 セットアップガイド

## 概要
スライドアーティファクトをPowerPoint（.pptx）形式でエクスポートできる機能です。

## セットアップ手順

### 1. 依存関係のインストール

```bash
# 必要なパッケージをインストール
pnpm add html2pptx express @types/express

# または、パッケージを個別にインストール
pnpm add html2pptx
pnpm add express
pnpm add -D @types/express
```

### 2. 環境変数の設定（オプション）

`.env.local` ファイルに以下を追加（デフォルト値は3001）:

```env
# API サーバーのポート（デフォルト: 3001）
API_PORT=3001

# フロントエンド用のAPI URL（開発環境）
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. アプリケーションの起動

```bash
# 開発モード
pnpm dev

# 本番モード
pnpm build
pnpm start
```

### 4. 動作確認

1. アプリケーションを起動
2. 音声で「スライドを作成して」と指示
3. スライドが生成されたら、右上の「PPTX出力」ボタンをクリック
4. PPTXファイルが自動ダウンロードされます

## 技術詳細

### アーキテクチャ

```
┌─────────────────────────────────────┐
│     フロントエンド（React）          │
│  ┌──────────────────────────────┐  │
│  │ ExportButton                  │  │
│  │  ↓ POST /api/export-pptx     │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│   バックエンド（Express API）        │
│  ┌──────────────────────────────┐  │
│  │ /api/export-pptx             │  │
│  │  ├── HTML受信                │  │
│  │  ├── 一時ファイル作成        │  │
│  │  ├── html2pptx で変換        │  │
│  │  ├── PPTX返却                │  │
│  │  └── クリーンアップ          │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
                ↓
          PPTX ダウンロード
```

### 主要ファイル

- **バックエンド**
  - `src/api/index.ts` - APIサーバー
  - `src/api/export-pptx.ts` - PPTXエクスポートエンドポイント
  - `src/agent.ts` - エージェント + APIサーバー起動

- **フロントエンド**
  - `react-ui/components/artifacts/export-button.tsx` - エクスポートボタン
  - `react-ui/components/artifacts/artifact-container.tsx` - アーティファクトコンテナ（ボタン配置）

## トラブルシューティング

### エクスポートが失敗する

**エラー: "html2pptx is not installed"**
```bash
pnpm add html2pptx
```

**エラー: "Cannot find module 'express'"**
```bash
pnpm add express @types/express
```

### APIサーバーが起動しない

**ポート3001が既に使用されている場合**
```bash
# .env.local を編集
API_PORT=3002
```

### ダウンロードが開始されない

**ブラウザのコンソールをチェック**
```
F12 → Console タブ
[Export] のログを確認
```

**API URLが正しいか確認**
```bash
# ヘルスチェック
curl http://localhost:3001/api/health

# 期待される出力
{"status":"ok","timestamp":1234567890}
```

## 制限事項

- 現在はシンプルなHTML→PPTX変換のみサポート
- 複雑なCSSアニメーションや特殊なレイアウトは正しく変換されない場合があります
- 画像は外部URLまたはローカルパスが必要

## 今後の改善予定

- [ ] より詳細なスタイルサポート
- [ ] 画像の自動埋め込み
- [ ] カスタムテンプレート対応
- [ ] バッチエクスポート（複数スライド）

## サポート

問題が発生した場合は、コンソールログを確認してください：
- バックエンド: ターミナルの `[Export PPTX]` ログ
- フロントエンド: ブラウザコンソールの `[Export]` ログ

