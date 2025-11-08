'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * MCPサーバーの設定型定義
 */
export interface MCPServerConfig {
  id: string;
  name: string;
  type: 'http' | 'stdio';
  url?: string;
  headers?: Record<string, string>;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  enabled: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'mcp-servers';

/**
 * MCPサーバー設定を管理するカスタムフック
 */
export function useMCPServers() {
  const [servers, setServers] = useState<MCPServerConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorageから設定を読み込む
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as MCPServerConfig[];
        setServers(parsed);
      }
    } catch (error) {
      console.error('[useMCPServers] Failed to load servers:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // LocalStorageに設定を保存
  const saveServers = useCallback((newServers: MCPServerConfig[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newServers));
      setServers(newServers);
    } catch (error) {
      console.error('[useMCPServers] Failed to save servers:', error);
    }
  }, []);

  // サーバーを追加
  const addServer = useCallback(
    (config: Omit<MCPServerConfig, 'id' | 'createdAt'>) => {
      const newServer: MCPServerConfig = {
        ...config,
        id: `mcp-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        createdAt: Date.now(),
      };
      saveServers([...servers, newServer]);
      return newServer;
    },
    [servers, saveServers]
  );

  // サーバーを更新
  const updateServer = useCallback(
    (id: string, updates: Partial<MCPServerConfig>) => {
      const newServers = servers.map((server) =>
        server.id === id ? { ...server, ...updates } : server
      );
      saveServers(newServers);
    },
    [servers, saveServers]
  );

  // サーバーを削除
  const removeServer = useCallback(
    (id: string) => {
      const newServers = servers.filter((server) => server.id !== id);
      saveServers(newServers);
    },
    [servers, saveServers]
  );

  // サーバーを有効化/無効化
  const toggleServer = useCallback(
    (id: string) => {
      const newServers = servers.map((server) =>
        server.id === id ? { ...server, enabled: !server.enabled } : server
      );
      saveServers(newServers);
    },
    [servers, saveServers]
  );

  return {
    servers,
    isLoading,
    addServer,
    updateServer,
    removeServer,
    toggleServer,
  };
}


