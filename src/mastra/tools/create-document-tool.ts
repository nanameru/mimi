import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { streamText, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import {
  sendTextArtifact,
  sendCodeArtifact,
  sendSheetArtifact,
  sendLoadingArtifact,
} from '../../artifacts/index.js';
import { codePrompt, sheetPrompt, textPrompt } from '../prompts.js';

/**
 * ドキュメント作成ツール
 * テキスト、コード、スプレッドシートのドキュメントを生成します
 */
export const createDocumentTool = createTool({
  id: 'create-document',
  description:
    'Create a document (text, code, or spreadsheet) based on user request. The document will be displayed in real-time as it is generated.',
  inputSchema: z.object({
    type: z.enum(['text', 'code', 'sheet']).describe('Type of document to create'),
    prompt: z.string().describe('User request or description of what to create'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    content: z.string().describe('The generated content'),
  }),
  execute: async ({ context, runtimeContext }: any) => {
    const { type, prompt } = context;
    const room = runtimeContext?.room;

    if (!room) {
      console.error('[Create Document Tool] No room context available');
      return {
        success: false,
        content: '',
      };
    }

    console.log(`[Create Document Tool] Creating ${type} document with prompt: "${prompt}"`);

    // ストリーミング用の一意なID（このツール実行中は同じIDを使用）
    const streamId = `create-${type}-${Date.now()}`;

    // ローディング状態を送信
    await sendLoadingArtifact(room, `Creating ${type} document...`);

    try {
      let draftContent = '';

      if (type === 'text') {
        // テキストドキュメントの生成（ストリーミング）
        const { fullStream } = streamText({
          model: openai('gpt-4o-mini'),
          system: textPrompt,
          prompt,
        });

        for await (const delta of fullStream) {
          if (delta.type === 'text-delta') {
            draftContent += delta.text;

            // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
            await sendTextArtifact(room, draftContent, true, streamId);
          }
        }
      } else if (type === 'code') {
        // コードドキュメントの生成（ストリーミング）
        const { fullStream } = streamObject({
          model: openai('gpt-4o-mini'),
          system: codePrompt,
          prompt,
          schema: z.object({
            code: z.string(),
          }),
        });

        for await (const delta of fullStream) {
          if (delta.type === 'object') {
            const { object } = delta;
            const { code } = object;

            if (code) {
              draftContent = code;
              // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
              await sendCodeArtifact(room, draftContent, true, streamId);
            }
          }
        }
      } else if (type === 'sheet') {
        // スプレッドシートドキュメントの生成（ストリーミング）
        const { fullStream } = streamObject({
          model: openai('gpt-4o-mini'),
          system: sheetPrompt,
          prompt,
          schema: z.object({
            csv: z.string().describe('CSV data'),
          }),
        });

        for await (const delta of fullStream) {
          if (delta.type === 'object') {
            const { object } = delta;
            const { csv } = object;

            if (csv) {
              draftContent = csv;
              // ストリーミングでフロントエンドに送信（同じstreamIdを使用）
              await sendSheetArtifact(room, draftContent, true, streamId);
            }
          }
        }

        // スプレッドシートの場合は最後にもう一度送信（完了を通知）
        if (draftContent) {
          await sendSheetArtifact(room, draftContent, false, streamId);
        }
      }

      console.log(`[Create Document Tool] Successfully created ${type} document (${draftContent.length} chars)`);

      return {
        success: true,
        content: draftContent,
      };
    } catch (error) {
      console.error('[Create Document Tool] Error:', error);
      return {
        success: false,
        content: '',
      };
    }
  },
});

