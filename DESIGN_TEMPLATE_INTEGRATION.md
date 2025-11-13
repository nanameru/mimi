# デザインテンプレート統合 - 実装完了

## 📐 概要

Tech Startup Slidesのデザインテンプレートを、Mastraのスライド生成エージェントに統合しました。
これにより、AIがプロフェッショナルなデザインテンプレートを参考にしてスライドを生成できるようになりました。

## ✅ 実装内容

### 1. プロンプト関数の拡張 (`src/mastra/prompts.ts`)

```typescript
export const createSingleSlidePrompt = (designTemplate?: string) => `
  // ... 既存のプロンプト ...
  
  ${designTemplate ? `
  📐 DESIGN REFERENCE TEMPLATE:
  Below is a professional slide template that you MUST use as design inspiration.
  
  REFERENCE TEMPLATE:
  ${designTemplate}
  
  ⚠️ IMPORTANT: Use this template as a strong reference for:
  - Color palette and gradients (Tech Startup colors: #058DC7, #50B432, #ED561B, #24CBE5)
  - Typography hierarchy (Syne for titles, Albert Sans for body text)
  - Spacing and padding patterns
  - Layout structures and component positioning
  - Overall visual style and aesthetic
  ` : ''}
  
  // ... 残りのプロンプト ...
`;

// 後方互換性のため、デフォルトエクスポートも維持
export const singleSlidePrompt = createSingleSlidePrompt();
```

### 2. ツール実装の更新 (`src/mastra/tools/create-document-tool.ts`)

```typescript
// 1. インポートに createSingleSlidePrompt を追加
import { 
  // ... 既存のインポート ...
  createSingleSlidePrompt 
} from '../prompts.js';

// 2. デザインテンプレートの読み込み処理を追加
// ステップ2: デザインテンプレートを読み込み
console.log(`[Create Document Tool] 📐 Loading design template... (ID: ${toolExecutionId})`);
let designTemplate: string | undefined;
try {
  const templatePath = path.join(
    process.cwd(), 
    'example-powerpoint', 
    'tech-startup-slides', 
    'tech-startup-slides.html'
  );
  designTemplate = await fs.promises.readFile(templatePath, 'utf-8');
  console.log(`[Create Document Tool] ✅ Design template loaded: ${designTemplate.length} chars`);
} catch (error) {
  console.warn(`[Create Document Tool] ⚠️ Design template not found, using default`);
  designTemplate = undefined;
}

// 3. スライド生成時にテンプレートを使用
// デザインテンプレートを参照したプロンプトを使用
const systemPrompt = designTemplate 
  ? createSingleSlidePrompt(designTemplate)
  : singleSlidePrompt;

const slideResponse = await streamText({
  model: openai('gpt-4o-mini'),
  system: systemPrompt,
  prompt: slidePromptText,
});
```

## 🎨 参照されるデザイン要素

AIが参照するTech Startupテンプレートのデザイン要素：

### カラーパレット
- **Primary Cyan**: `#058DC7`
- **Success Green**: `#50B432`
- **Accent Orange**: `#ED561B`
- **Light Cyan**: `#24CBE5`
- **Light Green**: `#64E572`
- **Yellow**: `#EDEF00`

### タイポグラフィ
- **タイトル**: Syne (bold, 52-120px)
- **本文**: Albert Sans (regular, 12-16px)
- **セクション番号**: Syne (bold, 120px)

### レイアウトパターン
- 960px × 540px (16:9)
- Company name + divider at bottom
- Gradient backgrounds
- 2-column layouts
- Section number overlays

## 🚀 使用方法

### 通常のスライド生成
```typescript
// エージェントに「スライドを作成して」と指示するだけ
// 自動的にtech-startup-slides.htmlを参照してデザインを生成
```

### 動作フロー
1. ユーザーが「スライドを作成」とリクエスト
2. `create-document` ツールが呼び出される
3. **自動的に** `tech-startup-slides.html` を読み込み
4. テンプレートをプロンプトに含めてLLMに送信
5. LLMがテンプレートのデザインを参考にスライドを生成
6. 生成されたスライドがリアルタイムでストリーミング表示

## 📊 期待される効果

### Before（テンプレートなし）
- 一般的なデザイン
- 色選択が不統一
- レイアウトが基本的

### After（テンプレートあり）
- ✅ Tech Startupテーマの統一された配色
- ✅ プロフェッショナルなタイポグラフィ
- ✅ 洗練されたレイアウト構造
- ✅ グラデーションやビジュアル要素の活用

## 🔧 トラブルシューティング

### テンプレートが見つからない場合
- エラーではなく警告として処理
- デフォルトのプロンプトにフォールバック
- スライド生成は継続される

```
⚠️ Design template not found, using default
```

### テンプレートファイルの場所
```
/Users/kimurataiyou/agent-starter-node-1/
└── example-powerpoint/
    └── tech-startup-slides/
        └── tech-startup-slides.html  ← このファイル
```

## 📝 今後の拡張可能性

### 複数テンプレートのサポート
```typescript
// 将来的な拡張例
const templates = {
  'tech-startup': 'example-powerpoint/tech-startup-slides/tech-startup-slides.html',
  'minimal': 'templates/minimal-slides.html',
  'creative': 'templates/creative-slides.html',
};

// ユーザーがテーマを選択
const template = templates[userSelectedTheme];
```

### RAGによる動的テンプレート選択
```typescript
// コンテンツに基づいて最適なテンプレートを選択
const bestTemplate = await selectTemplateByContent(userPrompt);
const systemPrompt = createSingleSlidePrompt(bestTemplate);
```

## ✨ まとめ

この実装により、Mastraのスライド生成エージェントは：
- 🎨 プロフェッショナルなデザインテンプレートを参照
- 🤖 AIが自動的にデザイン要素を学習・適用
- 📐 一貫性のあるブランディングを維持
- ⚡ リアルタイムで美しいスライドを生成

**すべてのスライド生成で、自動的にTech Startupテンプレートのデザインが適用されます！**

