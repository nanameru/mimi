import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { streamText, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import {
  sendTextArtifact,
  sendCodeArtifact,
  sendSheetArtifact,
  sendSlideArtifact,
  sendLoadingArtifact,
  sendArtifactNotification,
} from '../../artifacts/index.js';
import { codePrompt, sheetPrompt, textPrompt, slidePrompt, slideOutlinePrompt, singleSlidePrompt } from '../prompts.js';
import type { SingleSlide } from '../../artifacts/types.js';

/**
 * ドキュメント作成ツール
 * テキスト、コード、スプレッドシートのドキュメントを生成します
 */
export const createDocumentTool = createTool({
  id: 'create-document',
  description:
    'Create a document (text, code, spreadsheet, or slide) based on user request. The document will be displayed in real-time as it is generated.',
  inputSchema: z.object({
    type: z.enum(['text', 'code', 'sheet', 'slide']).describe('Type of document to create'),
    prompt: z.string().describe('User request or description of what to create'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    content: z.string().describe('The generated content'),
  }),
  execute: async ({ context, runtimeContext }: any) => {
    const { type, prompt } = context;
    const room = runtimeContext?.room;
    const toolExecutionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

    console.log(`[Create Document Tool] 🚀 Tool execution started (ID: ${toolExecutionId})`);
    console.log(`[Create Document Tool] Type: ${type}`);
    console.log(`[Create Document Tool] Prompt: "${prompt.substring(0, 100)}..."`);
    console.log(`[Create Document Tool] Timestamp: ${new Date().toISOString()}`);

    if (!room) {
      console.error(`[Create Document Tool] ❌ No room context available (ID: ${toolExecutionId})`);
      return {
        success: false,
        content: '',
      };
    }

    // ストリーミング用の一意なID（このツール実行中は同じIDを使用）
    const streamId = `create-${type}-${Date.now()}`;
    console.log(`[Create Document Tool] 📡 Stream ID: ${streamId} (ID: ${toolExecutionId})`);

    // ローディング状態を送信
    console.log(`[Create Document Tool] ⏳ Sending loading state... (ID: ${toolExecutionId})`);
    await sendLoadingArtifact(room, `Creating ${type} document...`);
    
    // プレビュー通知を送信（開始時）
    const typeEmoji = { text: '📄', code: '💻', sheet: '📊', slide: '🎬' };
    await sendArtifactNotification(
      room,
      type,
      `${typeEmoji[type]} Creating ${type}...`,
      prompt,
      streamId
    );

    try {
      let draftContent = '';

      if (type === 'text') {
        console.log(`[Create Document Tool] 📝 Generating TEXT document... (ID: ${toolExecutionId})`);
        // テキストドキュメントの生成（ストリーミング）
        const { fullStream } = streamText({
          model: openai('gpt-4o-mini'),
          system: textPrompt,
          prompt,
        });

        let chunkCount = 0;
        for await (const delta of fullStream) {
          if (delta.type === 'text-delta') {
            draftContent += delta.text;
            chunkCount++;

            // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
            await sendTextArtifact(room, draftContent, true, streamId);
            
            if (chunkCount % 10 === 0) {
              console.log(`[Create Document Tool] 📡 Streamed ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
            }
          }
        }
        console.log(`[Create Document Tool] ✅ TEXT streaming completed: ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
      } else if (type === 'code') {
        console.log(`[Create Document Tool] 💻 Generating CODE document... (ID: ${toolExecutionId})`);
        // コードドキュメントの生成（ストリーミング）
        const { fullStream } = streamObject({
          model: openai('gpt-4o-mini'),
          system: codePrompt,
          prompt,
          schema: z.object({
            code: z.string(),
          }),
        });

        let chunkCount = 0;
        for await (const delta of fullStream) {
          if (delta.type === 'object') {
            const { object } = delta;
            const { code } = object;

            if (code) {
              draftContent = code;
              chunkCount++;
              // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
              await sendCodeArtifact(room, draftContent, true, streamId);
              
              if (chunkCount % 10 === 0) {
                console.log(`[Create Document Tool] 📡 Streamed ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
              }
            }
          }
        }
        console.log(`[Create Document Tool] ✅ CODE streaming completed: ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
      } else if (type === 'sheet') {
        console.log(`[Create Document Tool] 📊 Generating SPREADSHEET document... (ID: ${toolExecutionId})`);
        // スプレッドシートドキュメントの生成（ストリーミング）
        const { fullStream } = streamObject({
          model: openai('gpt-4o-mini'),
          system: sheetPrompt,
          prompt,
          schema: z.object({
            csv: z.string().describe('CSV data'),
          }),
        });

        let chunkCount = 0;
        for await (const delta of fullStream) {
          if (delta.type === 'object') {
            const { object } = delta;
            const { csv } = object;

            if (csv) {
              draftContent = csv;
              chunkCount++;
              // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
              await sendSheetArtifact(room, draftContent, true, streamId);
              
              if (chunkCount % 10 === 0) {
                console.log(`[Create Document Tool] 📡 Streamed ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
              }
            }
          }
        }

        // スプレッドシートの場合は最後にもう一度送信（完了を通知）
        if (draftContent) {
          console.log(`[Create Document Tool] 📡 Sending final sheet artifact (ID: ${toolExecutionId})`);
          await sendSheetArtifact(room, draftContent, false, streamId);
        }
        console.log(`[Create Document Tool] ✅ SHEET streaming completed: ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
      } else if (type === 'slide') {
        console.log(`[Create Document Tool] 🎬 Generating SLIDE deck... (ID: ${toolExecutionId})`);
        
        // ステップ1: アウトライン生成
        console.log(`[Create Document Tool] 📋 Step 1: Generating outline... (ID: ${toolExecutionId})`);
        await sendLoadingArtifact(room, 'スライドの構成を考えています...');
        
        const outlineResponse = await streamText({
          model: openai('gpt-4o-mini'),
          system: slideOutlinePrompt,
          prompt,
          maxTokens: 2000,
        });
        
        let outlineText = '';
        for await (const delta of outlineResponse.fullStream) {
          if (delta.type === 'text-delta') {
            outlineText += delta.text;
          }
        }
        
        // JSONをパース（マークダウンコードブロックを除去）
        let cleanedOutline = outlineText.trim();
        cleanedOutline = cleanedOutline.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        let outline: Array<{ title: string; description: string; layoutType: string; colorSuggestion?: string }> = [];
        try {
          outline = JSON.parse(cleanedOutline);
          console.log(`[Create Document Tool] ✅ Outline parsed: ${outline.length} slides (ID: ${toolExecutionId})`);
        } catch (error) {
          console.error(`[Create Document Tool] ❌ Failed to parse outline JSON (ID: ${toolExecutionId}):`, error);
          console.error(`[Create Document Tool] Outline text:`, cleanedOutline);
          // フォールバック: デフォルトの構成を使用
          outline = [
            { title: 'タイトル', description: 'タイトルスライド', layoutType: 'title', colorSuggestion: 'corporate' },
            { title: '内容', description: 'メインコンテンツ', layoutType: 'content', colorSuggestion: 'corporate' },
            { title: 'まとめ', description: '結論', layoutType: 'conclusion', colorSuggestion: 'corporate' },
          ];
        }
        
        // ステップ2: 各スライドを1枚ずつ生成
        const slides: SingleSlide[] = [];
        const slideHTMLs: string[] = [];
        
        for (let i = 0; i < outline.length; i++) {
          const slideOutline = outline[i]!;
          const slideNumber = i + 1;
          
          console.log(`[Create Document Tool] 🎨 Step 2.${slideNumber}: Generating slide "${slideOutline.title}" (ID: ${toolExecutionId})`);
          await sendLoadingArtifact(room, `スライド ${slideNumber}/${outline.length} を生成中: ${slideOutline.title}`);
          
          // 1枚のスライドを生成
          const colorTheme = slideOutline.colorSuggestion || 'corporate';
          const slidePromptText = `
Slide ${slideNumber} of ${outline.length}

Title: ${slideOutline.title}
Description: ${slideOutline.description}
Layout Type: ${slideOutline.layoutType}
Color Theme: ${colorTheme}

IMPORTANT: Use the "${colorTheme}" color theme from the COLOR THEMES list in your system prompt.
Replace ALL template colors (blue, navy, etc.) with appropriate colors from the ${colorTheme} theme.

Generate a single slide div with inline styles.
`;
          
          const slideResponse = await streamText({
            model: openai('gpt-4o-mini'),
            system: singleSlidePrompt,
            prompt: slidePromptText,
            maxTokens: 1500,
          });
          
          let slideHTML = '';
          let chunkCount = 0;
          
          for await (const delta of slideResponse.fullStream) {
            if (delta.type === 'text-delta') {
              slideHTML += delta.text;
              chunkCount++;
              
              // 100チャンクごとに途中経過を送信（頻度を減らしてタイムアウトを回避）
              if (chunkCount % 100 === 0) {
                try {
                  // 生成中のスライドも含めて一時的なHTMLを作成
                  const tempSlideHTML = slideHTML.replace(/```html\s*/g, '').replace(/```\s*/g, '').trim();
                  const tempSlideHTMLs = [...slideHTMLs, tempSlideHTML];
                  const partialHTML = buildSlideHTML(tempSlideHTMLs, slideNumber, outline.length);
                  
                  console.log(`[Create Document Tool] 📡 Streaming slide ${slideNumber}, chunk ${chunkCount} (${slideHTML.length} chars) (ID: ${toolExecutionId})`);
                  await sendSlideArtifact(room, partialHTML, true, streamId, slides, slideNumber - 1, outline.length);
                } catch (error) {
                  // 送信エラーは無視して続行（最終版で送信されるため）
                  console.warn(`[Create Document Tool] ⚠️ Failed to stream chunk ${chunkCount}, continuing... (ID: ${toolExecutionId})`);
                }
              }
            }
          }
          
          // マークダウンコードブロックを除去（最終版）
          slideHTML = slideHTML.replace(/```html\s*/g, '').replace(/```\s*/g, '').trim();
          
          // スライドオブジェクトを作成
          const slide: SingleSlide = {
            id: `slide-${slideNumber}`,
            title: slideOutline.title,
            content: slideHTML,
            order: slideNumber,
          };
          
          slides.push(slide);
          slideHTMLs.push(slideHTML);
          
          console.log(`[Create Document Tool] ✅ Slide ${slideNumber} generated (${chunkCount} chunks, ${slideHTML.length} chars) (ID: ${toolExecutionId})`);
          
          // 完成版を送信（最終チャンク）
          const partialHTML = buildSlideHTML(slideHTMLs, slideNumber, outline.length);
          await sendSlideArtifact(room, partialHTML, true, streamId, slides, slideNumber - 1, outline.length);
          
          // プレビュー通知を送信（進捗付き）
          await sendArtifactNotification(
            room,
            'slide',
            `🎬 スライド生成中 (${slideNumber}/${outline.length})`,
            slideOutline.title,
            streamId,
            { current: slideNumber, total: outline.length }
          );
        }
        
        // ステップ3: 全スライドを結合して完全なHTMLドキュメントを作成
        console.log(`[Create Document Tool] 🔨 Step 3: Building final HTML document... (ID: ${toolExecutionId})`);
        draftContent = buildSlideHTML(slideHTMLs, slideHTMLs.length, slideHTMLs.length);
        
        // 最終版を送信
        await sendSlideArtifact(room, draftContent, false, streamId, slides, 0, slides.length);
        
        console.log(`[Create Document Tool] ✅ SLIDE deck completed: ${slides.length} slides (ID: ${toolExecutionId})`);
      }

      console.log(`[Create Document Tool] 🎉 Successfully created ${type} document (${draftContent.length} chars) (ID: ${toolExecutionId})`);

      // プレビュー通知を送信（完了時）
      await sendArtifactNotification(
        room,
        type,
        `${typeEmoji[type]} ${type.charAt(0).toUpperCase() + type.slice(1)} Ready`,
        draftContent,
        streamId
      );

      return {
        success: true,
        content: draftContent,
      };
    } catch (error) {
      console.error(`[Create Document Tool] ❌ Error (ID: ${toolExecutionId}):`, error);
      if (error instanceof Error) {
        console.error(`[Create Document Tool] ❌ Stack trace (ID: ${toolExecutionId}):`, error.stack);
      }
      return {
        success: false,
        content: '',
      };
    }
  },
});

/**
 * 個別のスライドHTMLを結合して完全なHTMLドキュメントを作成（縦スクロール対応）
 */
function buildSlideHTML(slideHTMLs: string[], currentCount: number, totalCount: number): string {
  // スライドHTML断片を縦に並べて結合（activeクラスは不要）
  const slidesHTML = slideHTMLs.map((slideHTML, index) => {
    // 各スライドにマージンを追加して縦に並べる
    const slideNumberTag = `<div class="slide-number">${index + 1} / ${totalCount}</div>`;
    return `${slideHTML}${slideNumberTag}`;
  }).join('\n\n');
  
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Arial', 'Helvetica', 'Noto Sans JP', sans-serif;
  background: #f7f7f8;
  overflow-y: auto;
  overflow-x: hidden;
}
.slide-container {
  width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.slide {
  width: 960px;
  min-height: 540px;
  position: relative;
  margin-bottom: 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.slide-number {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 100;
}
</style>
</head>
<body>
<div class="slide-container">

${slidesHTML}

</div>
</body>
</html>`;
}

