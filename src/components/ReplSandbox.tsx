'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { query as convexQuery, getNetworkStatus } from '@/lib/convex-api';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Connect to network on mount
  useEffect(() => {
    const connect = async () => {
      const status = await getNetworkStatus();
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

  const executeQuery = useCallback(async (source: string) => {
    setIsExecuting(true);
    const result = await convexQuery(source);
    setIsExecuting(false);
    
    if (result.errorCode || result.errorMessage) {
      return {
        content: result.errorMessage || result.errorCode || 'Unknown error',
        isError: true,
        juice: 0,
      };
    }
    
    // Format the result value
    let content: string;
    if (result.value === null || result.value === undefined) {
      content = 'nil';
    } else if (typeof result.value === 'object') {
      content = JSON.stringify(result.value, null, 2);
    } else {
      content = String(result.value);
    }
    
    // Estimate juice (queries don't actually cost juice, but we show an estimate)
    const estimatedJuice = Math.max(10, source.length * 2);
    
    return { content, isError: false, juice: estimatedJuice };
  }, []);

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
    
    // Execute on real network
    const { content, isError, juice } = await executeQuery(trimmed);
    
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  return (
    <div className="repl-sandbox">
      <div className="repl-header">
        <div className="repl-title">
          <span className={`repl-indicator ${isConnected ? 'repl-connected' : 'repl-disconnected'}`} />
          <span>Convex REPL</span>
          {isExecuting && <span className="repl-executing">...</span>}
        </div>
        <div className="repl-stats">
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
      
      <form onSubmit={handleSubmit} className="repl-input-form">
        <span className="repl-input-prompt">λ&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command here..."
          className="repl-input"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
      
      <div className="repl-hints">
        <span>Try: <code>(+ 1 2)</code></span>
        <span><code>(def x 42)</code></span>
        <span><code>(balance *address*)</code></span>
      </div>
    </div>
  );
}
