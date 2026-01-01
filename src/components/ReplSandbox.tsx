'use client';

import { useState, useRef, useEffect } from 'react';

interface ReplLine {
  id: number;
  type: 'input' | 'output' | 'error';
  content: string;
  juice?: number;
}

const EXAMPLE_RESPONSES: Record<string, { result: string; juice: number }> = {
  '(+ 1 2)': { result: '3', juice: 12 },
  '(* 10 10)': { result: '100', juice: 14 },
  '(def x 42)': { result: '#42', juice: 156 },
  '(balance *address*)': { result: '1,000,000,000', juice: 89 },
  '(call *registry* (lookup "convex.world"))': { result: '#addr:0x7F3A...', juice: 234 },
  '(deploy \'(fn [x] (* x x)))': { result: '#addr:0x8B2C...', juice: 1847 },
  '(transfer 0x1234... 1000)': { result: '{:result :pending, :offer #ref:7291}', juice: 312 },
  '(query (get-state))': { result: '{:height 14892847, :participants 2847}', juice: 67 },
};

function evaluateExpression(expr: string): { result: string; juice: number; isError: boolean } {
  const trimmed = expr.trim();
  
  if (!trimmed) {
    return { result: '', juice: 0, isError: false };
  }
  
  // Check for exact matches first
  if (EXAMPLE_RESPONSES[trimmed]) {
    return { ...EXAMPLE_RESPONSES[trimmed], isError: false };
  }
  
  // Pattern matching for common expressions
  if (trimmed.startsWith('(+ ')) {
    const nums = trimmed.match(/\d+/g);
    if (nums) {
      const sum = nums.reduce((a, b) => a + parseInt(b), 0);
      return { result: String(sum), juice: 10 + nums.length * 2, isError: false };
    }
  }
  
  if (trimmed.startsWith('(* ')) {
    const nums = trimmed.match(/\d+/g);
    if (nums) {
      const product = nums.reduce((a, b) => a * parseInt(b), 1);
      return { result: String(product), juice: 12 + nums.length * 2, isError: false };
    }
  }
  
  if (trimmed.startsWith('(def ')) {
    const match = trimmed.match(/\(def\s+(\w+)\s+(.+)\)/);
    if (match) {
      return { result: `#${match[2]}`, juice: 150 + Math.floor(Math.random() * 50), isError: false };
    }
  }
  
  if (trimmed.startsWith('(fn ') || trimmed.startsWith('(defn ')) {
    return { result: '#<fn>', juice: 200 + Math.floor(Math.random() * 100), isError: false };
  }
  
  if (!trimmed.startsWith('(') || !trimmed.endsWith(')')) {
    return { result: 'SYNTAX: Expression must be wrapped in parentheses', juice: 0, isError: true };
  }
  
  // Default: simulate a successful but unknown operation
  return { 
    result: `nil`, 
    juice: 50 + Math.floor(Math.random() * 100), 
    isError: false 
  };
}

export default function ReplSandbox() {
  const [history, setHistory] = useState<ReplLine[]>([
    { id: 0, type: 'output', content: ';; Convex REPL Sandbox v0.1' },
    { id: 1, type: 'output', content: ';; Connected to testnet | Consensus height: 14,892,847' },
    { id: 2, type: 'output', content: ';; Type Convex Lisp expressions to evaluate' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [totalJuice, setTotalJuice] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newId = history.length;
    const inputLine: ReplLine = { id: newId, type: 'input', content: input };
    
    const { result, juice, isError } = evaluateExpression(input);
    const outputLine: ReplLine = { 
      id: newId + 1, 
      type: isError ? 'error' : 'output', 
      content: result,
      juice: isError ? undefined : juice
    };
    
    setHistory(prev => [...prev, inputLine, outputLine]);
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
    
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
          <span className="repl-indicator" />
          <span>Convex REPL</span>
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
          placeholder="(+ 1 2)"
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
