
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';

import { taskAgent } from './agents/task-agent';
import { weatherAgent } from './agents/weather-agent';
// import { motionAgent } from './agents/motion-agent';

export const mastra = new Mastra({
  agents: { 
    taskAgent,      // メインのタスクエージェント
    weatherAgent,   // 天気専用エージェント（互換性のため残す）
    // motionAgent をコメントアウト
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
