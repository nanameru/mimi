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
import { codePrompt, sheetPrompt, textPrompt, updateDocumentPrompt } from '../prompts.js';

/**
 * ドキュメント更新ツール
 * 既存のドキュメントを更新します
 */
export const updateDocumentTool = createTool({
  id: 'update-document',
  description:
    'Update an existing document (text, code, or spreadsheet) based on user request. The updated document will be displayed in real-time as it is generated.',
  inputSchema: z.object({
    type: z.enum(['text', 'code', 'sheet']).describe('Type of document to update'),
    currentContent: z.string().describe('Current content of the document'),
    updatePrompt: z.string().describe('User request describing how to update the document'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    content: z.string().describe('The updated content'),
  }),
  execute: async ({ context, runtimeContext }: any) => {
    const { type, currentContent, updatePrompt } = context;
    const room = runtimeContext?.room;

    if (!room) {
      console.error('[Update Document Tool] No room context available');
      return {
        success: false,
        content: '',
      };
    }

    console.log(`[Update Document Tool] Updating ${type} document with prompt: "${updatePrompt}"`);

    // ローディング状態を送信
    await sendLoadingArtifact(room, `Updating ${type} document...`);

    try {
      let draftContent = '';

      if (type === 'text') {
        // テキストドキュメントの更新（ストリーミング）
        const { fullStream } = streamText({
          model: openai('gpt-4o-mini'),
          system: updateDocumentPrompt(currentContent, 'text'),
          prompt: updatePrompt,
          providerOptions: {
            openai: {
              prediction: {
                type: 'content',
                content: currentContent,
              },
            },
          },
        });

        for await (const delta of fullStream) {
          if (delta.type === 'text-delta') {
            draftContent += delta.text;

            // ストリーミングでフロントエンドに送信
            await sendTextArtifact(room, draftContent, true);
          }
        }
      } else if (type === 'code') {
        // コードドキュメントの更新（ストリーミング）
        const { fullStream } = streamObject({
          model: openai('gpt-4o-mini'),
          system: updateDocumentPrompt(currentContent, 'code'),
          prompt: updatePrompt,
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
              // ストリーミングでフロントエンドに送信
              await sendCodeArtifact(room, draftContent, true);
            }
          }
        }
      } else if (type === 'sheet') {
        // スプレッドシートドキュメントの更新（ストリーミング）
        const { fullStream } = streamObject({
          model: openai('gpt-4o-mini'),
          system: updateDocumentPrompt(currentContent, 'sheet'),
          prompt: updatePrompt,
          schema: z.object({
            csv: z.string(),
          }),
        });

        for await (const delta of fullStream) {
          if (delta.type === 'object') {
            const { object } = delta;
            const { csv } = object;

            if (csv) {
              draftContent = csv;
              // ストリーミングでフロントエンドに送信
              await sendSheetArtifact(room, draftContent, true);
            }
          }
        }

        // スプレッドシートの場合は最後にもう一度送信
        if (draftContent) {
          await sendSheetArtifact(room, draftContent, false);
        }
      }

      console.log(`[Update Document Tool] Successfully updated ${type} document (${draftContent.length} chars)`);

      return {
        success: true,
        content: draftContent,
      };
    } catch (error) {
      console.error('[Update Document Tool] Error:', error);
      return {
        success: false,
        content: '',
      };
    }
  },
});

