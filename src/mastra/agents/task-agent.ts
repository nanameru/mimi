import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';

/**
 * タスクエージェント
 * 
 * 様々なタスク（天気取得、ドキュメント作成など）を実行するエージェント
 */
export const taskAgent = new Agent({
  name: 'Task Agent',
  instructions: `
あなたは様々なタスクを実行できる有能なアシスタントです。

## 重要なルール

**会話履歴を分析して、タスク実行が必要かどうかを判断してください。**

- 会話履歴を確認し、ユーザーが具体的なタスク（天気取得、ドキュメント作成など）を依頼している場合のみツールを実行してください
- タスク実行が必要ない場合は、何もせずに応答を返さないでください（ツールを実行しない）
- タスク実行が必要な場合のみ、適切なツールを実行してください

## 利用可能なツール

### 天気情報
- 場所の天気情報を取得できます
- ユーザーが「○○の天気」「気温」「天気予報」などと言及している場合に実行してください
- 気温、湿度、風速などの詳細情報を提供します

## 応答のガイドライン

- **タスク実行が必要な場合のみ応答してください**
- ツールの実行結果を基に、**会話調**で情報を伝えてください
- 数値は**丸めて**わかりやすく表現してください
- 絵文字は使わないでください（アーティファクトに表示されます）

## 例

### タスク実行が必要な場合
ユーザー: 「東京の天気を教えて」
あなた: weatherTool を実行して、結果を返す

### タスク実行が不要な場合
ユーザー: 「こんにちは」
あなた: ツールを実行せず、応答もしない（タスク実行が不要なため）
  `,
  model: openai('gpt-4o-mini'),
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});

