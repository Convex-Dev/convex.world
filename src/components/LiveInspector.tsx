'use client';

import { useState, useCallback } from 'react';
import { Search, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { query as convexQuery, getBalance } from '@/lib/convex-api';

interface AccountData {
  address: string;
  cnsName: string | null;
  balance: number;
  memory: number;
  environment: string | null;
  error?: string;
}

export default function LiveInspector() {
  const [searchQuery, setSearchQuery] = useState('');
  const [account, setAccount] = useState<AccountData | null>(null);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const lookupAccount = useCallback(async (input: string): Promise<AccountData | null> => {
    const trimmed = input.trim();
    
    // Check if it's an address (starts with # or is a number)
    let address: string;
    let cnsName: string | null = null;
    
    if (trimmed.startsWith('#') || trimmed.startsWith('0x') || /^\d+$/.test(trimmed)) {
      // Direct address lookup
      address = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;
    } else {
      // CNS name lookup - try to resolve
      cnsName = trimmed;
      const cnsResult = await convexQuery(`(call *registry* (cns-resolve '${trimmed}))`);
      if (cnsResult.errorCode || !cnsResult.value) {
        // Try alternate CNS lookup format
        const altResult = await convexQuery(`(lookup *registry* '${trimmed})`);
        if (altResult.errorCode || !altResult.value) {
          return null;
        }
        address = String(altResult.value);
      } else {
        address = String(cnsResult.value);
      }
    }
    
    // Get balance
    const balanceResult = await convexQuery(`(balance ${address})`);
    const balance = typeof balanceResult.value === 'number' ? balanceResult.value : 0;
    
    // Get account info
    const infoResult = await convexQuery(`(account ${address})`);
    let memory = 0;
    let environment: string | null = null;
    
    if (infoResult.value && typeof infoResult.value === 'object') {
      const info = infoResult.value as Record<string, unknown>;
      memory = typeof info.memory === 'number' ? info.memory : 0;
      if (info.environment) {
        environment = JSON.stringify(info.environment, null, 2);
      }
    }
    
    return {
      address: String(address),
      cnsName,
      balance,
      memory,
      environment,
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    setSearchError(null);
    setAccount(null);
    
    try {
      const result = await lookupAccount(searchQuery);
      if (result) {
        setAccount(result);
        setIsSourceExpanded(false);
      } else {
        setSearchError('Account not found');
      }
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Lookup failed');
    } finally {
      setIsSearching(false);
    }
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="live-inspector">
      <div className="inspector-header">
        <h3>State Inspector</h3>
        <span className="inspector-badge">Read-only</span>
      </div>

      <form onSubmit={handleSearch} className="inspector-search">
        <Search size={16} className="inspector-search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Address (e.g., 9, 12) or account number"
          className="inspector-input"
        />
        <button type="submit" className="inspector-search-btn" disabled={isSearching}>
          {isSearching ? 'Looking...' : 'Lookup'}
        </button>
      </form>

      {searchError && (
        <div className="inspector-error">
          <p>{searchError}</p>
        </div>
      )}

      {account && (
        <div className="inspector-result">
          <div className="inspector-identity">
            <div className="inspector-address-row">
              <code className="inspector-address">#{account.address}</code>
              <button onClick={copyAddress} className="inspector-copy" title="Copy address">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            {account.cnsName && (
              <div className="inspector-cns">{account.cnsName}</div>
            )}
          </div>

          <div className="inspector-stats">
            <div className="inspector-stat">
              <span className="inspector-stat-label">Balance</span>
              <span className="inspector-stat-value">{formatNumber(account.balance)}</span>
            </div>
            <div className="inspector-stat">
              <span className="inspector-stat-label">Memory</span>
              <span className="inspector-stat-value">{formatNumber(account.memory)} bytes</span>
            </div>
          </div>

          {account.environment && (
            <div className="inspector-source">
              <button 
                onClick={() => setIsSourceExpanded(!isSourceExpanded)}
                className="inspector-source-toggle"
              >
                {isSourceExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span>Environment</span>
              </button>
              {isSourceExpanded && (
                <pre className="inspector-source-code">
                  <code>{account.environment}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {!account && !searchError && (
        <div className="inspector-empty">
          <p>Enter an account address to inspect state</p>
          <div className="inspector-examples">
            <span>Try:</span>
            <button onClick={() => setSearchQuery('9')}>Account #9</button>
            <button onClick={() => setSearchQuery('12')}>Account #12</button>
          </div>
        </div>
      )}
    </div>
  );
}
