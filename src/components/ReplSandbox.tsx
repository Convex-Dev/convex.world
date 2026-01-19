'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Key, MoreVertical, Copy, RefreshCw } from 'lucide-react';
import CVMBalance from '@/components/CVMBalance';
import ImportKeyDialog from '@/components/ImportKeyDialog';
import NetworkSelector from '@/components/NetworkSelector';
import PublicKey from '@/components/PublicKey';
import { useConvex } from '@/contexts/ConvexContext';
import { useWalletOptional } from '@/contexts/WalletContext';
import { bytesToHex } from '@/lib/crypto';
import { type AccountInfo } from '@/lib/convex-api';

interface ReplLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  juice?: number;
}

export default function ReplSandbox() {
  const [history, setHistory] = useState<ReplLine[]>([
    { id: 0, type: 'system', content: ';; Convex REPL Sandbox v1.0' },
    { id: 1, type: 'system', content: ';; Connecting to convex.world...' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [totalJuice, setTotalJuice] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [mode, setMode] = useState<'query' | 'transact'>('query');
  const [accountDetails, setAccountDetails] = useState<AccountInfo | null>(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showImportKey, setShowImportKey] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const accountInfoPopoverRef = useRef<HTMLDivElement>(null);
  const { convex, setAddress, setPrivateKey, address, privateKey, peerUrl } = useConvex();
  const wallet = useWalletOptional();

  const norm = (hex: string) => (hex || '').replace(/^0x/i, '').toLowerCase();
  const hasMatchingKey =
    accountDetails?.publicKey &&
    wallet?.publicKeys.some((pk) => norm(pk) === norm(accountDetails.publicKey!));
  const isKeyConnected = !!privateKey;

  // Fetch account details when address or network (peerUrl) changes (debounced)
  useEffect(() => {
    const addr = address ?? '';
    if (!addr) {
      setAccountDetails(null);
      setAccountLoading(false);
      return;
    }
    setAccountLoading(true);
    const t = setTimeout(async () => {
      const info = await convex.getAccountInfo(addr);
      setAccountDetails(info);
      setAccountLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [address, convex, peerUrl]);

  const refreshAccount = useCallback(async () => {
    const addr = address ?? '';
    if (!addr) return;
    setAccountLoading(true);
    const info = await convex.getAccountInfo(addr);
    setAccountDetails(info);
    setAccountLoading(false);
  }, [address, convex]);

  // Click outside to close account info popover
  useEffect(() => {
    if (!showAccountInfo) return;
    const onMouseDown = (e: MouseEvent) => {
      if (accountInfoPopoverRef.current?.contains(e.target as Node)) return;
      const btn = (e.target as HTMLElement)?.closest?.('button[data-account-info-toggle]');
      if (btn) return;
      setShowAccountInfo(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [showAccountInfo]);

  // Connect to network on mount
  useEffect(() => {
    const connect = async () => {
      const status = await convex.getNetworkStatus();
      if (status) {
        setIsConnected(true);
        setHistory(prev => [
          ...prev,
          { id: prev.length, type: 'system', content: `;; Connected | Consensus: ${status.consensusPoint}` },
          { id: prev.length + 1, type: 'system', content: ';; Queries are FREE — type Convex Lisp to evaluate' },
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { id: prev.length, type: 'error', content: ';; Could not connect to network — using offline mode' },
        ]);
      }
    };
    connect();
  }, []);
  
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const execute = useCallback(
    async (source: string, mode: 'query' | 'transact') => {
      setIsExecuting(true);
      const result = mode === 'transact' ? await convex.transact(source) : await convex.query(source);
      setIsExecuting(false);

      if (result.errorCode || result.errorMessage) {
        return {
          content: result.errorMessage || result.errorCode || 'Unknown error',
          isError: true,
          juice: 0,
        };
      }

      let content: string;
      if (typeof result.result === 'string') {
        content = result.result;
      } else if (result.value === null || result.value === undefined) {
        content = 'nil';
      } else if (typeof result.value === 'object') {
        content = JSON.stringify(result.value, null, 2);
      } else {
        content = String(result.value);
      }

      const juice = typeof result.info?.juice === 'number' ? result.info.juice : Math.max(10, source.length * 2);
      return { content, isError: false, juice };
    },
    [convex]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isExecuting) return;
    
    const trimmed = input.trim();
    const newId = history.length;
    const inputLine: ReplLine = { id: newId, type: 'input', content: trimmed };
    
    setHistory(prev => [...prev, inputLine]);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput('');
    
    const { content, isError, juice } = await execute(trimmed, mode);
    
    const outputLine: ReplLine = { 
      id: newId + 1, 
      type: isError ? 'error' : 'output', 
      content,
      juice: isError ? undefined : juice
    };
    
    setHistory(prev => [...prev, outputLine]);
    
    if (!isError && juice) {
      setTotalJuice(prev => prev + juice);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Only handle keys when the command input is the target (has focus)
    if (e.target !== inputRef.current) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const el = inputRef.current;
      const atEnd = !el || el.selectionStart == null || el.selectionStart === input.length;
      if (atEnd) el?.form?.requestSubmit();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const clearHistory = () => {
    setHistory([
      { id: 0, type: 'output', content: ';; Session cleared' },
    ]);
    setTotalJuice(0);
  };

  const copyAddress = () => {
    if (accountDetails?.address) {
      navigator.clipboard.writeText(`#${accountDetails.address}`);
      setShowAccountInfo(false);
    }
  };

  const handleConnect = () => {
    if (isKeyConnected) {
      setPrivateKey(null);
      return;
    }
    if (hasMatchingKey && accountDetails?.publicKey && wallet) {
      const pk = wallet.publicKeys.find((p) => norm(p) === norm(accountDetails!.publicKey!));
      const seed = pk ? wallet.getSeed(pk) : undefined;
      if (seed) {
        setPrivateKey(bytesToHex(seed));
        return;
      }
    }
    if (accountDetails?.publicKey) {
      setShowImportKey(true);
    }
  };

  return (
    <div className="repl-sandbox">
      <div className="repl-header">
        <div className="repl-header-top">
          <div className="repl-title">
            <span className={`repl-indicator ${isConnected ? 'repl-connected' : 'repl-disconnected'}`} />
            <span>Convex REPL</span>
            {isExecuting && <span className="repl-executing">...</span>}
          </div>
          <div className="repl-stats">
            <NetworkSelector />
            <span className="repl-juice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              {totalJuice.toLocaleString()} juice
            </span>
            <button onClick={clearHistory} className="repl-clear" title="Clear session">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="repl-account-line">
          <div className="repl-address-field">
            <span className="repl-address-prefix">#</span>
            <input
              type="text"
              value={address ?? ''}
              onChange={(e) => setAddress(e.target.value.replace(/\D/g, '') || null)}
              placeholder="Address"
              className="repl-address-input"
              style={{ width: `${Math.min(22, Math.max(4, (address?.length ?? 0) + 1))}ch` }}
              autoComplete="off"
              spellCheck={false}
              aria-label="Address"
            />
          </div>
          <span className="repl-account-balance" title="Account balance (CVM)">
            {accountLoading && <span className="repl-account-loading">…</span>}
            {!accountLoading && accountDetails && <><CVMBalance value={accountDetails.balance} /> CVM</>}
            {!accountLoading && !accountDetails && <span className="repl-account-muted">—</span>}
          </span>
          <span className="repl-account-key" title="Public key">
            <PublicKey value={accountDetails?.publicKey} />
          </span>
          <button
            type="button"
            className={`repl-account-connect ${isKeyConnected ? 'repl-account-connect-active' : ''}`}
            onClick={handleConnect}
            disabled={!accountDetails?.publicKey}
            title={!accountDetails?.publicKey ? 'Account has no key' : isKeyConnected ? 'Disconnect key' : hasMatchingKey ? 'Use wallet key for Transact' : 'Import private key for Transact'}
          >
            <Key size={14} />
            {isKeyConnected ? 'Disconnect' : 'Connect'}
          </button>
          <button
            type="button"
            className="repl-account-refresh"
            onClick={refreshAccount}
            disabled={!address || accountLoading}
            title="Refresh account details"
            aria-label="Refresh account details"
          >
            <RefreshCw size={16} className={accountLoading ? 'repl-account-refresh-spin' : undefined} aria-hidden />
          </button>
          <div className="repl-account-info-wrap" ref={accountInfoPopoverRef}>
            <button
              type="button"
              className="repl-account-info-btn"
              data-account-info-toggle
              onClick={() => setShowAccountInfo((v) => !v)}
              title="Account info & options"
              disabled={!accountDetails}
            >
              <MoreVertical size={16} />
            </button>
            {showAccountInfo && accountDetails && (
              <div className="repl-account-info-popover">
                <div className="repl-account-info-grid">
                  <span className="repl-account-info-label">Address</span>
                  <code className="repl-account-info-value">#{accountDetails.address}</code>
                  <span className="repl-account-info-label">Balance</span>
                  <span className="repl-account-info-value"><CVMBalance value={accountDetails.balance} /> CVM</span>
                  <span className="repl-account-info-label">Memory</span>
                  <span className="repl-account-info-value">{accountDetails.memorySize.toLocaleString()} bytes</span>
                  <span className="repl-account-info-label">Sequence</span>
                  <span className="repl-account-info-value">{accountDetails.sequence}</span>
                  <span className="repl-account-info-label">Type</span>
                  <span className="repl-account-info-value">{accountDetails.type}</span>
                  {accountDetails.publicKey && (
                    <>
                      <span className="repl-account-info-label">Key</span>
                      <code className="repl-account-info-value repl-account-info-key">{accountDetails.publicKey}</code>
                    </>
                  )}
                </div>
                <div className="repl-account-info-actions">
                  <button type="button" className="repl-account-info-copy" onClick={copyAddress}>
                    <Copy size={14} />
                    Copy address
                  </button>
                  <button type="button" className="repl-account-info-refresh" onClick={refreshAccount} disabled={accountLoading} title="Refresh account details">
                    <RefreshCw size={14} />
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="repl-output" ref={outputRef}>
        {history.map((line) => (
          <div key={line.id} className={`repl-line repl-line-${line.type}`}>
            {line.type === 'input' && <span className="repl-prompt">λ&gt;</span>}
            {line.type === 'output' && line.juice !== undefined && (
              <span className="repl-prompt">=&gt;</span>
            )}
            {line.type === 'error' && <span className="repl-prompt">!!</span>}
            <span className="repl-content">{line.content}</span>
            {line.juice !== undefined && (
              <span className="repl-line-juice">[{line.juice} juice]</span>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="repl-input-form">
        <span className="repl-input-prompt">λ&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'query' ? 'Query (read-only)...' : 'Transact (requires account)...'}
          className="repl-input"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="repl-mode-selector" role="group" aria-label="Execution mode">
          <button
            type="button"
            className={`repl-mode-btn ${mode === 'query' ? 'repl-mode-btn-active' : ''}`}
            onClick={() => setMode('query')}
            title="Run a read-only operation. Cannot modify state, but zero fees"
          >
            Query
          </button>
          <button
            type="button"
            className={`repl-mode-btn ${mode === 'transact' ? 'repl-mode-btn-active' : ''}`}
            onClick={() => setMode('transact')}
            title="Execute a signed transaction. Requires an account with CVM and the correct private key."
          >
            Transact
          </button>
        </div>
      </form>
      
      <div className="repl-hints">
        {mode === 'query' ? (
          <>
            <span>Try: <code>(+ 1 2)</code></span>
            <span><code>*timestamp*</code></span>
            <span><code>(balance *address*)</code></span>
          </>
        ) : (
          <>
            <span>Transact requires a connected account and costs Juice</span>
          </>
        )}
      </div>

      <ImportKeyDialog
        isOpen={showImportKey}
        onClose={() => setShowImportKey(false)}
        accountPublicKey={accountDetails?.publicKey}
        onImport={(hex) => {
          setPrivateKey(hex);
          setShowImportKey(false);
        }}
      />
    </div>
  );
}
