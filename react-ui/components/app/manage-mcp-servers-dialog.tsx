'use client';

import { useState } from 'react';
import { GearIcon, TrashIcon, CheckIcon } from '@phosphor-icons/react/dist/ssr';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/livekit/dialog';
import { Button } from '@/components/livekit/button';
import { Toggle } from '@/components/livekit/toggle';
import { useMCPServers, type MCPServerConfig } from '@/hooks/use-mcp-servers';
import { cn } from '@/lib/utils';

export function ManageMCPServersDialog() {
  const { servers, removeServer, toggleServer, isLoading } = useMCPServers();
  const [open, setOpen] = useState(false);

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this MCP server?')) {
      removeServer(id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Manage MCP Servers"
          title="Manage MCP Servers"
          className={cn('relative', servers.length > 0 && 'after:absolute after:top-1 after:right-1 after:h-2 after:w-2 after:rounded-full after:bg-green-500')}
        >
          <GearIcon weight="bold" className="text-base" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>MCP Servers</DialogTitle>
          <DialogDescription>
            Manage your Model Context Protocol servers. Enable or disable servers to control which tools are available.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        ) : servers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-2 text-gray-400">
              <GearIcon size={48} weight="thin" />
            </div>
            <div className="text-sm text-gray-500">No MCP servers configured</div>
            <div className="text-xs text-gray-400 mt-1">
              Click the + button to add your first server
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {servers.map((server) => (
              <ServerCard
                key={server.id}
                server={server}
                onToggle={() => toggleServer(server.id)}
                onRemove={() => handleRemove(server.id)}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ServerCardProps {
  server: MCPServerConfig;
  onToggle: () => void;
  onRemove: () => void;
}

function ServerCard({ server, onToggle, onRemove }: ServerCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-4 transition-all',
        !server.enabled && 'opacity-50'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm truncate">{server.name}</h3>
            {server.enabled && (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                <CheckIcon size={12} weight="bold" />
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">{server.url}</p>
          
          {showDetails && server.headers && Object.keys(server.headers).length > 0 && (
            <div className="mt-2 text-xs">
              <div className="font-medium text-gray-700 mb-1">Headers:</div>
              <div className="space-y-0.5 bg-gray-50 p-2 rounded">
                {Object.entries(server.headers).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <span className="font-mono text-gray-600">{key}:</span>
                    <span className="font-mono text-gray-800 truncate">
                      {value.includes('Bearer') ? value.substring(0, 20) + '...' : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-blue-600 hover:text-blue-700 mt-1"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Toggle
            pressed={server.enabled}
            onPressedChange={onToggle}
            size="sm"
            aria-label={server.enabled ? 'Disable server' : 'Enable server'}
            title={server.enabled ? 'Disable server' : 'Enable server'}
          >
            {server.enabled ? 'ON' : 'OFF'}
          </Toggle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label="Remove server"
          >
            <TrashIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

