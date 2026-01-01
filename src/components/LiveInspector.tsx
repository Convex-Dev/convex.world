'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

interface AccountData {
  address: string;
  cnsName: string | null;
  balance: number;
  juice: number;
  memory: number;
  source: string;
}

const MOCK_ACCOUNTS: Record<string, AccountData> = {
  'convex.world': {
    address: '0x7F3A2B8C9D4E5F6A1B2C3D4E5F6A7B8C9D0E1F2A',
    cnsName: 'convex.world',
    balance: 1000000000,
    juice: 847234567,
    memory: 2048,
    source: `(def registry
  "Main CNS registry for convex.world"
  {:name "convex.world"
   :owner *address*
   :created 1704067200000})

(defn lookup [name]
  (get-in @registry [:entries name]))

(defn register [name addr]
  (when (trusted? *caller*)
    (set-in! registry [:entries name] addr)))`,
  },
  'convex.fungible': {
    address: '0x8B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C',
    cnsName: 'convex.fungible',
    balance: 500000000,
    juice: 234567890,
    memory: 4096,
    source: `(defn build-token [config]
  "Creates a new fungible token with given config"
  (deploy
    {:supply (:supply config 0)
     :decimals (:decimals config 18)
     :transfers []}))

(defn transfer [token to amount]
  (let [from *caller*]
    (assert (>= (balance token from) amount))
    (update! token :transfers conj
      {:from from :to to :amount amount})))`,
  },
  '0x1234': {
    address: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    cnsName: null,
    balance: 42000000,
    juice: 12345678,
    memory: 512,
    source: `(def agent-config
  {:type :autonomous
   :constraints {:max-spend 1000
                 :duration 86400000}})

(defn execute [action]
  (when (within-constraints? action)
    (perform action)))`,
  },
};

export default function LiveInspector() {
  const [query, setQuery] = useState('');
  const [account, setAccount] = useState<AccountData | null>(null);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate network delay
    setTimeout(() => {
      const found = MOCK_ACCOUNTS[query.toLowerCase()] || MOCK_ACCOUNTS['0x1234'];
      setAccount(found);
      setIsSearching(false);
      setIsSourceExpanded(false);
    }, 400);
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="CNS name or address (e.g., convex.world)"
          className="inspector-input"
        />
        <button type="submit" className="inspector-search-btn" disabled={isSearching}>
          {isSearching ? 'Looking...' : 'Lookup'}
        </button>
      </form>

      {account && (
        <div className="inspector-result">
          <div className="inspector-identity">
            <div className="inspector-address-row">
              <code className="inspector-address">{account.address}</code>
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
              <span className="inspector-stat-label">Juice Used</span>
              <span className="inspector-stat-value inspector-stat-juice">{formatNumber(account.juice)}</span>
            </div>
            <div className="inspector-stat">
              <span className="inspector-stat-label">Memory</span>
              <span className="inspector-stat-value">{formatNumber(account.memory)} bytes</span>
            </div>
          </div>

          <div className="inspector-source">
            <button 
              onClick={() => setIsSourceExpanded(!isSourceExpanded)}
              className="inspector-source-toggle"
            >
              {isSourceExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span>CVM Source</span>
            </button>
            {isSourceExpanded && (
              <pre className="inspector-source-code">
                <code>{account.source}</code>
              </pre>
            )}
          </div>
        </div>
      )}

      {!account && (
        <div className="inspector-empty">
          <p>Enter a CNS name or address to inspect account state</p>
          <div className="inspector-examples">
            <span>Try:</span>
            <button onClick={() => setQuery('convex.world')}>convex.world</button>
            <button onClick={() => setQuery('convex.fungible')}>convex.fungible</button>
          </div>
        </div>
      )}
    </div>
  );
}
