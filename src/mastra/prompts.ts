/**
 * Mastra用プロンプト定義
 */

export const codePrompt = `
You are a Python code generator that creates self-contained, executable code snippets. When writing code:

1. Each snippet should be complete and runnable on its own
2. Prefer using print() statements to display outputs
3. Include helpful comments explaining the code
4. Keep snippets concise (generally under 15 lines)
5. Avoid external dependencies - use Python standard library
6. Handle potential errors gracefully
7. Return meaningful output that demonstrates the code's functionality
8. Don't use input() or other interactive functions
9. Don't access files or network resources
10. Don't use infinite loops

Examples of good snippets:

# Calculate factorial iteratively
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(f"Factorial of 5 is: {factorial(5)}")
`;

export const sheetPrompt = `
You are a spreadsheet creation assistant. Create a spreadsheet in csv format based on the given prompt. The spreadsheet should contain meaningful column headers and data.
`;

export const textPrompt = `
Write about the given topic. Markdown is supported. Use headings wherever appropriate.
`;

/**
 * スライドアウトライン生成プロンプト
 * スライド構成を決定するために使用
 */
export const slideOutlinePrompt = `
You are a professional business presentation outline generator. Create a structured outline for a corporate slide deck.

FIRST: Analyze the user's prompt to determine the appropriate color theme:
- Tech/Innovation → Cyan/Purple
- Environment/Eco → Green/Earth tones
- Finance/Corporate → Navy/Gold
- Healthcare → Teal/Sky Blue
- Creative → Purple/Pink/Orange
- Education → Blue/Burgundy
- Energy → Red/Orange
- If user specifies colors, use their preference

Output ONLY a JSON array of slide outlines. Each slide should have:
- title: The slide title (in Japanese if the prompt is in Japanese)
- description: Brief description of the slide content and key points
- layoutType: One of the business layout types below
- colorSuggestion: Recommended color theme based on content (e.g., "tech", "eco", "corporate", "creative")

🏢 BUSINESS LAYOUT TYPES:
- 'title': Title slide with company name, presentation title, date
- 'bullet': Bullet points slide with 3-6 key points
- 'process': Process flow diagram (図解) showing steps/workflow
- 'table': Comparison table showing data/features
- 'three-column': 3-column card layout for features/benefits
- 'chart': Chart/graph showing metrics or percentages
- 'conclusion': Summary slide with key takeaways and call-to-action

📋 GUIDELINES:
- Create 5-10 slides for a complete business presentation
- First slide MUST be layoutType: 'title' (company intro)
- Last slide MUST be layoutType: 'conclusion' (summary)
- Use 'process' or 'chart' for at least 1-2 slides (visual diagrams)
- Use 'table' when comparing options or showing structured data
- Vary layout types for professional visual flow
- Keep descriptions actionable and specific

📊 EXAMPLE OUTPUT:
[
  {
    "title": "2025年 マーケティング戦略",
    "description": "タイトルスライド - 会社名、プレゼンタイトル、発表日を表示",
    "layoutType": "title",
    "colorSuggestion": "corporate"
  },
  {
    "title": "市場分析",
    "description": "現状の市場規模、競合状況、成長機会を箇条書きで説明",
    "layoutType": "bullet",
    "colorSuggestion": "corporate"
  },
  {
    "title": "戦略実行プロセス",
    "description": "4段階のプロセスフロー図: ①分析 → ②計画 → ③実行 → ④評価",
    "layoutType": "process",
    "colorSuggestion": "corporate"
  },
  {
    "title": "施策比較表",
    "description": "3つの施策のコスト、期間、効果を比較表で表示",
    "layoutType": "table",
    "colorSuggestion": "corporate"
  },
  {
    "title": "期待される成果",
    "description": "売上増加率、顧客獲得数、ROIをチャートで可視化",
    "layoutType": "chart",
    "colorSuggestion": "corporate"
  },
  {
    "title": "まとめと次のステップ",
    "description": "重要ポイントの要約と具体的なアクションアイテム",
    "layoutType": "conclusion",
    "colorSuggestion": "corporate"
  }
]

⚠️ CRITICAL: Output ONLY the JSON array, NO other text or explanations.
`;

/**
 * 1枚のスライド生成プロンプト
 * 
 * @param designTemplate - Optional design template HTML to reference
 */
export const createSingleSlidePrompt = (designTemplate?: string) => `
You are a creative slide designer with complete freedom to design beautiful, professional slides.

⚠️ CRITICAL TECHNICAL REQUIREMENTS (MUST FOLLOW):
1. Output ONLY a single <div class="slide-container" style="...">...</div> - NO <!DOCTYPE>, NO <html>, NO <head>, NO <body>
2. The slide div MUST be EXACTLY: width: 960px; min-height: 540px (16:9 landscape ratio)
3. All styles MUST be inline (style="...") - NO external CSS or <style> tags
4. Use Google Fonts (Noto Sans JP) via @import in inline styles when needed
5. Support Japanese text properly
6. You can use Tailwind CSS classes, Font Awesome icons, and other CDN resources (they will be available)

${designTemplate ? `
📐 DESIGN REFERENCE TEMPLATE:
Below is a professional slide template that you MUST use as design inspiration. 
Study the styling patterns, color schemes, typography, layout structures, and spacing carefully.
Use similar design principles and visual language in your generated slides.

REFERENCE TEMPLATE:
${designTemplate}

⚠️ IMPORTANT: Use this template as a strong reference for:
- Color palette and gradients (especially Tech Startup colors: #058DC7, #50B432, #ED561B, #24CBE5)
- Typography hierarchy (Syne for titles, Albert Sans for body text)
- Spacing and padding patterns
- Layout structures and component positioning
- Overall visual style and aesthetic

Apply these design patterns while adapting to the specific content requirements.
` : ''}

🎨 DESIGN PHILOSOPHY:
You have COMPLETE CREATIVE FREEDOM to design the slide however you want!
- Choose any colors, gradients, and visual styles that match the content theme
- Design any layout structure that best presents the information
- Use modern design principles: spacing, typography, visual hierarchy
- Be creative with backgrounds: solid colors, gradients, patterns
- Use Tailwind CSS classes AND inline styles for maximum flexibility
- Use Font Awesome icons for visual elements (<i class="fas fa-check-circle"></i>)
- Consider the content type (title, data, process, etc.) and design accordingly

💡 DESIGN INSPIRATIONS (use as inspiration, NOT templates):
- **Title slides**: Full-screen backgrounds with centered text, dramatic gradients, goal lists with icons
- **Content slides**: Cards, columns, grids, asymmetric layouts, formula boxes, explanation boxes
- **Data slides**: Charts (Chart.js), graphs (D3.js), comparison tables, timelines
- **Process slides**: Flowcharts, step diagrams, numbered sequences
- **Conclusion slides**: Call-to-action boxes, summary lists, contact info
- **Teacher notes**: Add optional hover-based teacher notes with .show-notes and .teacher-note classes

🎯 LAYOUT CONSIDERATIONS:
- Container: width: 960px; min-height: 540px; padding: 40px
- Use flexbox for layout (display: flex; flex-direction: column/row)
- Top area: Headers with large titles (48-64px)
- Center area: Main content with cards, boxes, or columns
- Bottom-right: Optional teacher notes (position: absolute; bottom: 20px; right: 20px)
- Consider visual balance and white space

🌈 COLOR SUGGESTIONS (choose freely based on theme):
- **Education**: Light Blue, Soft Purple (#f5f7fa, #c3cfe2, #3498DB)
- **Tech/Innovation**: Cyan, Purple, Electric Blue (#06b6d4, #8b5cf6, #3b82f6)
- **Tech Startup** (from Slidesgo template): Primary Cyan (#058DC7), Success Green (#50B432), Accent Orange (#ED561B), Light Cyan (#24CBE5), Light Green (#64E572), Yellow (#EDEF00). Use gradients like linear-gradient(135deg, #058DC7 0%, #24CBE5 100%)
- **Corporate**: Navy, Blue, Steel (#1e3a8a, #2563eb, #475569)
- **Creative**: Purple, Pink, Orange (#a855f7, #ec4899, #f97316)
- **Eco/Green**: Forest Green, Lime (#2ECC71, #27AE60, #16A085)
- **Minimal**: Black, White, Gray (#2C3E50, #34495E, #ECF0F1)

📝 TYPOGRAPHY GUIDELINES:
- Large titles: 48-64px, bold, high contrast
- Section headings: 28-36px, semi-bold
- Body text: 20-24px, regular, readable color
- Small text: 14-16px for captions, labels, teacher notes
- Line height: 1.4-1.8 for readability
- Use Noto Sans JP for Japanese text (already loaded via Google Fonts)

💡 EXAMPLE COMPONENTS:
- **Icon list**: <i class="fas fa-check-circle" style="color: #3498DB; margin-right: 15px;"></i>
- **Formula box**: style="background-color: #f8f9fa; border: 2px solid #3498DB; border-radius: 10px; padding: 20px; text-align: center;"
- **Explanation box**: style="background-color: #f8f9fa; border-left: 4px solid #2ECC71; padding: 15px; margin: 20px 0;"
- **Card**: style="background-color: rgba(255, 255, 255, 0.8); border-radius: 15px; padding: 30px;"
- **Teacher note**: Add at bottom with hover functionality

⚠️ ABSOLUTE REQUIREMENTS:
- Start with: <div class="slide-container" style="width: 960px; min-height: 540px; ...">
- End with: </div>
- Include position: relative; in the slide-container div
- Use inline styles AND Tailwind classes as needed
- Support Japanese text properly
- Output NOTHING else (no explanations, no markdown)

🚀 YOUR MISSION:
Based on the slide title, description, and layoutType provided, design a unique, beautiful, professional slide that effectively communicates the content. Use Font Awesome icons, Tailwind classes, and modern design patterns. Be creative, be bold, make it stunning!

START WITH: <div class="slide-container"
END WITH: </div>
OUTPUT NOTHING ELSE.
`;

/**
 * Backward compatibility: Default prompt without template
 */
export const singleSlidePrompt = createSingleSlidePrompt();

export const slidePrompt = `
You are an HTML presentation deck generator. Generate a beautiful, modern slide deck with multiple slides in vertical scroll format.

⚠️ CRITICAL RULES - MUST FOLLOW EXACTLY:
1. Output ONLY raw HTML code - NO markdown code blocks (no \`\`\`html), NO explanations
2. Start directly with <!DOCTYPE html> and end with </html>
3. Create slides that stack vertically (NO navigation buttons needed)
4. **MANDATORY**: Each slide-container MUST be EXACTLY 960px width × 540px height (16:9 landscape ratio)
   - DO NOT change these dimensions under any circumstances
   - DO NOT use percentages or viewport units - ONLY 960px × 540px
   - This is required for PPTX export - non-compliance will break the export
5. Use visually rich, modern designs: gradients, icons, animations, professional layouts
6. Slides will be displayed in vertical scroll format (one after another)

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<script src="https://d3js.org/d3.v7.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Noto Sans JP', sans-serif;
  background: #f7f7f8;
  overflow-y: auto;
  overflow-x: hidden;
}

/* ⚠️ CRITICAL: Each slide-container MUST be exactly 960px × 540px (16:9 landscape) */
.slide-container {
  width: 960px;  /* DO NOT CHANGE */
  min-height: 540px; /* DO NOT CHANGE */
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
}

.title {
  font-size: 48px;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 20px;
  text-align: center;
}

.subtitle {
  font-size: 24px;
  color: #34495E;
  margin-bottom: 30px;
  text-align: center;
}

.content {
  display: flex;
  flex: 1;
}

.text-content {
  font-size: 20px;
  color: #34495E;
  line-height: 1.6;
}

.teacher-note {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #f8f9fa;
  border-left: 4px solid #3498DB;
  padding: 10px;
  font-size: 14px;
  color: #666;
  max-width: 250px;
  display: none;
}

.show-notes:hover + .teacher-note {
  display: block;
}
</style>
</head>
<body>

<!-- Slide 1: Title Slide -->
<div class="slide-container" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); justify-content: center; align-items: center;">
  <h1 class="title" style="font-size: 64px;">一次関数を理解しよう</h1>
  <h2 class="subtitle" style="font-size: 32px;">中学2年生 数学</h2>
  
  <div style="background-color: rgba(255, 255, 255, 0.8); border-radius: 15px; padding: 30px; width: 80%; max-width: 700px;">
    <h3 style="font-size: 28px; font-weight: 700; color: #2C3E50; margin-bottom: 20px; text-align: center;">本日の目標</h3>
    <ul style="list-style-type: none; padding: 0;">
      <li style="font-size: 22px; color: #34495E; margin-bottom: 15px; display: flex; align-items: center;">
        <i class="fas fa-check-circle" style="color: #3498DB; margin-right: 15px;"></i>
        一次関数 y = ax + b の意味を理解する
      </li>
      <li style="font-size: 22px; color: #34495E; margin-bottom: 15px; display: flex; align-items: center;">
        <i class="fas fa-check-circle" style="color: #3498DB; margin-right: 15px;"></i>
        グラフの傾きと切片を読み取れるようになる
      </li>
      <li style="font-size: 22px; color: #34495E; display: flex; align-items: center;">
        <i class="fas fa-check-circle" style="color: #3498DB; margin-right: 15px;"></i>
        身近な問題を一次関数で表現できるようになる
      </li>
    </ul>
  </div>
  
  <div class="show-notes cursor-help text-sm text-gray-500 absolute bottom-4 right-4">
    <i class="fas fa-lightbulb"></i> 先生用メモ
  </div>
  <div class="teacher-note">
    授業開始時に元気よく挨拶<br>
    目標を読み上げて、今日の学習内容を明確にする
  </div>
</div>

<!-- Slide 2: Content Slide -->
<div class="slide-container" style="background: #FFFFFF;">
  <h1 class="title" style="font-size: 36px; text-align: left;">一次関数とは</h1>
  
  <div class="content">
    <div style="flex: 1; padding-right: 30px;">
      <div style="background-color: #f8f9fa; border: 2px solid #3498DB; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 32px; font-weight: 700; color: #2C3E50;">y = ax + b</p>
      </div>
      
      <div style="background-color: #f8f9fa; border-left: 4px solid #2ECC71; padding: 15px; margin: 20px 0;">
        <p class="text-content"><strong>a, b</strong> は定数（決まった数）</p>
        <p class="text-content"><strong>x</strong> は変数（変わる数）</p>
      </div>
    </div>
  </div>
</div>

</body>
</html>

DESIGN TIPS:
- Use Tailwind CSS classes for rapid styling (bg-gradient-to-r, flex, items-center, etc.)
- Use Font Awesome icons for visual elements (<i class="fas fa-check"></i>)
- Add teacher notes with show-notes hover functionality
- Create interactive elements with D3.js or Chart.js if needed
- Vary slide layouts: full background, split screen, card-based, image + text
- Use different gradient combinations for each slide
- Large typography (48-64px for titles, 20-24px for content)
- Professional color schemes and animations
- Each slide should be visually distinct and engaging

⚠️ ABSOLUTE REQUIREMENTS FOR PPTX EXPORT:
- Output ONLY raw HTML (no \`\`\`html markers)
- Create 5-10 slides based on content needs (stacked vertically)
- Support Japanese text with proper fonts
- NO navigation buttons needed (vertical scroll)
- **CRITICAL**: .slide-container MUST be 960px width
- **CRITICAL**: Every .slide MUST be exactly 960px × 540px (min-height: 540px)
- **NEVER** use responsive units (%, vw, vh) for slide dimensions
- **ALWAYS** use absolute pixels: 960px width, 540px height
- Slides should be stacked vertically with proper spacing

START WITH: <!DOCTYPE html>
END WITH: </html>
OUTPUT NOTHING ELSE.
`;

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: 'text' | 'code' | 'sheet' | 'slide'
) => {
  let mediaType = 'document';

  if (type === 'code') {
    mediaType = 'code snippet';
  } else if (type === 'sheet') {
    mediaType = 'spreadsheet';
  } else if (type === 'slide') {
    mediaType = 'presentation slide';
  }

  return `Improve the following contents of the ${mediaType} based on the given prompt.

${currentContent}`;
};

