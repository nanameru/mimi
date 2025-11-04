'use client';

import { useState } from 'react';
import { PlusIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/livekit/dialog';
import { Button } from '@/components/livekit/button';
import { Input } from '@/components/livekit/input';
import { Label } from '@/components/livekit/label';
import { useMCPServers } from '@/hooks/use-mcp-servers';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  url: string;
  headers: Array<{ key: string; value: string }>;
}

export function AddMCPServerDialog() {
  const { addServer } = useMCPServers();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    url: '',
    headers: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ヘッダーをオブジェクトに変換
    const headers: Record<string, string> = {};
    formData.headers.forEach((header) => {
      if (header.key && header.value) {
        headers[header.key] = header.value;
      }
    });

    // MCPサーバーを追加
    addServer({
      name: formData.name,
      type: 'http',
      url: formData.url,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      enabled: true,
    });

    // フォームをリセット
    setFormData({
      name: '',
      url: '',
      headers: [],
    });
    setOpen(false);
  };

  const addHeader = () => {
    setFormData((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '' }],
    }));
  };

  const removeHeader = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index),
    }));
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      headers: prev.headers.map((header, i) =>
        i === index ? { ...header, [field]: value } : header
      ),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Add MCP Server"
          title="Add MCP Server"
          className="flex items-center gap-2"
        >
          <PlusIcon weight="bold" className="text-base" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add MCP Server</DialogTitle>
          <DialogDescription>
            Add a remote MCP (Model Context Protocol) server to extend your agent's capabilities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* サーバー名 */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Server Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="My MCP Server"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">
              Server URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://api.example.com/mcp"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500">
              Full HTTP/HTTPS URL of the MCP server endpoint
            </p>
          </div>

          {/* ヘッダー */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Headers (Optional)</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addHeader}
                className="h-8 px-2 text-xs"
              >
                <PlusIcon className="mr-1" />
                Add Header
              </Button>
            </div>
            {formData.headers.length > 0 && (
              <div className="space-y-2 rounded-lg border border-gray-200 p-3">
                {formData.headers.map((header, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Header Name (e.g., Authorization)"
                      value={header.key}
                      onChange={(e) => updateHeader(index, 'key', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Header Value (e.g., Bearer token)"
                      value={header.value}
                      onChange={(e) => updateHeader(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHeader(index)}
                      className="shrink-0"
                    >
                      <XIcon />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500">
              Add custom headers for authentication or configuration
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setFormData({ name: '', url: '', headers: [] });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.name || !formData.url}
              className="bg-black text-white hover:bg-gray-800"
            >
              Add Server
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

