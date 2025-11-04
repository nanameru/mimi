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
} from '../../artifacts/index.js';
import { codePrompt, sheetPrompt, textPrompt, slidePrompt } from '../prompts.js';

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
        console.log(`[Create Document Tool] 🎬 Generating SLIDE document... (ID: ${toolExecutionId})`);
        // スライドドキュメントの生成（ストリーミング）
        // maxTokensで生成量を制限（1つのスライドHTMLは通常2000トークン以下）
        const { fullStream } = streamText({
          model: openai('gpt-4o-mini'),
          system: slidePrompt,
          prompt,
          maxTokens: 2000, // 1つのスライドHTMLに制限
        });

        let chunkCount = 0;
        let stopReason: string | null = null;
        
        for await (const delta of fullStream) {
          if (delta.type === 'text-delta') {
            draftContent += delta.text;
            chunkCount++;

            // </html>が出現したら完了とみなす（1つのスライドが完成）
            if (draftContent.includes('</html>')) {
              console.log(`[Create Document Tool] 🎯 Detected </html>, stopping stream (ID: ${toolExecutionId})`);
              stopReason = 'complete_html';
              break;
            }

            // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
            await sendSlideArtifact(room, draftContent, true, streamId);
            
            if (chunkCount % 10 === 0) {
              console.log(`[Create Document Tool] 📡 Streamed ${chunkCount} chunks, ${draftContent.length} chars (ID: ${toolExecutionId})`);
            }
          }
        }
        console.log(`[Create Document Tool] ✅ SLIDE streaming completed: ${chunkCount} chunks, ${draftContent.length} chars, reason: ${stopReason || 'natural'} (ID: ${toolExecutionId})`);
      }

      console.log(`[Create Document Tool] 🎉 Successfully created ${type} document (${draftContent.length} chars) (ID: ${toolExecutionId})`);

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

