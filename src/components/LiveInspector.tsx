'use client';

import { useState, useCallback } from 'react';
import { Search, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { useConvex } from '@/contexts/ConvexContext';
import { useTranslations } from 'next-intl';

interface AccountData {
  address: string;
  cnsName: string | null;
  balance: number;
  memory: number;
  environment: string | null;
  error?: string;
}

export default function LiveInspector() {
  const { convex } = useConvex();
  const t = useTranslations('inspector');
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
      // CNS name lookup - try to resolve using @ syntax
      cnsName = trimmed;
      const cnsResult = await convex.query(`@${trimmed}`);
      if (cnsResult.errorCode || cnsResult.value === null || cnsResult.value === undefined) {
        return null;
      }
      address = String(cnsResult.value).replace('#', '');
    }
    
    // Single combined query for balance and account info
    // Uses vector syntax per Mike's recommendation to minimize API calls
    const combinedResult = await convex.query(`[(balance ${address}) (account ${address})]`);
    
    let balance = 0;
    let memory = 0;
    let environment: string | null = null;
    
    if (Array.isArray(combinedResult.value) && combinedResult.value.length >= 2) {
      const [balanceVal, accountInfo] = combinedResult.value;
      balance = typeof balanceVal === 'number' ? balanceVal : 0;
      
      if (accountInfo && typeof accountInfo === 'object') {
        const info = accountInfo as Record<string, unknown>;
        memory = typeof info.memory === 'number' ? info.memory : 0;
        if (info.environment) {
          environment = JSON.stringify(info.environment, null, 2);
        }
      }
    }
    
    return {
      address: String(address),
      cnsName,
      balance,
      memory,
      environment,
    };
  }, [convex]);

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
        <h3>{t('stateInspector')}</h3>
        <span className="inspector-badge">{t('readOnly')}</span>
      </div>

      <form onSubmit={handleSearch} className="inspector-search">
        <Search size={16} className="inspector-search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('placeholder')}
          className="inspector-input"
        />
        <button type="submit" className="inspector-search-btn" disabled={isSearching}>
          {isSearching ? t('looking') : t('lookup')}
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
              <button onClick={copyAddress} className="inspector-copy" title={t('copyAddress')}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            {account.cnsName && (
              <div className="inspector-cns">{account.cnsName}</div>
            )}
          </div>

          <div className="inspector-stats">
            <div className="inspector-stat">
              <span className="inspector-stat-label">{t('balance')}</span>
              <span className="inspector-stat-value">{formatNumber(account.balance)}</span>
            </div>
            <div className="inspector-stat">
              <span className="inspector-stat-label">{t('memory')}</span>
              <span className="inspector-stat-value">{formatNumber(account.memory)} {t('bytes')}</span>
            </div>
          </div>

          {account.environment && (
            <div className="inspector-source">
              <button 
                onClick={() => setIsSourceExpanded(!isSourceExpanded)}
                className="inspector-source-toggle"
              >
                {isSourceExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span>{t('environment')}</span>
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
          <p>{t('emptyMessage')}</p>
          <div className="inspector-examples">
            <span>{t('try')}</span>
            <button onClick={() => setSearchQuery('9')}>{t('account')} #9</button>
            <button onClick={() => setSearchQuery('12')}>{t('account')} #12</button>
          </div>
        </div>
      )}
    </div>
  );
}
