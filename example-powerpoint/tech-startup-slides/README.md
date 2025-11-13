# Tech Startup Slides - HTML Recreation

このディレクトリには、Slidesgoの「Tech Startup」PowerPointテンプレートをHTMLで完全再現したファイルが含まれています。

## 📁 ファイル構成

```
tech-startup-slides/
├── tech-startup-slides.html   # メインHTMLファイル（11スライド）
├── design-reference.json       # デザイン参照データ（カラー、フォント等）
└── README.md                   # このファイル
```

## 🎨 デザイン仕様

### カラーパレット
- **Primary Cyan**: `#058DC7` - メインアクセントカラー
- **Success Green**: `#50B432` - セカンダリアクセント
- **Accent Orange**: `#ED561B` - 強調色
- **Light Cyan**: `#24CBE5` - グラデーション用
- **Yellow**: `#EDEF00` - ハイライト
- **Light Green**: `#64E572` - グラデーション用

### フォント
- **タイトル**: Syne (bold, 700)
- **本文**: Albert Sans (regular, 400 / bold, 700)
- **フォールバック**: Arial

### スライドサイズ
- **寸法**: 960px × 540px (16:9 landscape)
- **レイアウト**: 縦スクロール形式で複数スライドを表示

## 📋 含まれるスライド

1. **Title Slide** - "Tech Startup" メインタイトル
2. **Contents Template** - テンプレート使用説明（テーブル形式）
3. **Table of Contents** - 4セクションの目次
4. **Executive Summary** - ビジネス概要（画像エリア付き）
5. **Business Plan (01)** - セクションタイトル
6. **Mission and Vision** - 2カラムレイアウト
7. **Company Description (02)** - セクションタイトル
8. **About Us** - 2カラム本文
9. **Market Analysis (03)** - セクションタイトル
10. **Products or Services (04)** - セクションタイトル
11. **Thank You** - 最終スライド

## 🚀 使用方法

### ブラウザで表示
```bash
open tech-startup-slides.html
```

または、ブラウザで直接ファイルを開いてください。

### デザインカスタマイズ
`design-reference.json`を参照して、カラーやフォントをカスタマイズできます。

```json
{
  "colorScheme": {
    "primary": {
      "accent1": "#058DC7",
      "accent2": "#50B432",
      ...
    }
  }
}
```

## 📝 注意事項

- このHTMLは元のPowerPointテンプレートのデザインを忠実に再現していますが、すべての機能を完全に再現しているわけではありません
- フォントは外部CDNから読み込んでいます（Google Fonts, cdnfonts.com）
- 画像は元のPowerPointに含まれていた画像をグラデーションで代替しています

## 🔗 元のテンプレート

このHTMLは以下のPowerPointテンプレートを基に作成されました：
- **ファイル名**: Tech Startup by Slidesgo.pptx
- **提供元**: Slidesgo
- **スライド数**: 35枚（HTMLでは主要な11枚を再現）

## 📄 ライセンス

元のテンプレートはSlidesgoによって提供されています。
このHTML再現版は学習・参照目的で作成されたものです。

