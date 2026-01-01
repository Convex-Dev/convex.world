'use client';

import { useState, useEffect, useCallback } from 'react';
import { query } from '@/lib/convex-api';

interface StatValue {
  current: number;
  target: number;
  format: (val: number) => string;
}

export default function LiveProofOfLife() {
  const [stats, setStats] = useState<Record<string, StatValue>>({
    // Consensus Height - derived from timestamp progression
    height: { 
      current: 0, 
      target: 0, 
      format: (v) => v > 0 ? Math.floor(v / 1000).toLocaleString() : '—'
    },
    // Juice Price - shows network compute cost
    juice: { 
      current: 0, 
      target: 0, 
      format: (v) => v.toLocaleString()
    },
    // Global State Size - shows state growth
    state: { 
      current: 0, 
      target: 0, 
      format: (v) => {
        if (v >= 1e12) return `${(v / 1e12).toFixed(2)}T`;
        if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
        if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
        return v.toLocaleString();
      }
    },
    // Latency - network responsiveness
    latency: { 
      current: 0, 
      target: 0, 
      format: (v) => `${Math.round(v)}ms` 
    },
  });

  const [pulseKey, setPulseKey] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch real network metrics
  const fetchStatus = useCallback(async () => {
    const startTime = Date.now();
    
    try {
      // Fetch metrics in parallel
      const [timestampResult, juicePriceResult, supplyResult] = await Promise.all([
        query('*timestamp*'),
        query('*juice-price*'),
        query('(coin-supply)'),
      ]);
      
      const latency = Date.now() - startTime;
      
      const timestamp = typeof timestampResult.value === 'number' ? timestampResult.value : 0;
      const juicePrice = typeof juicePriceResult.value === 'number' ? juicePriceResult.value : 0;
      const supply = typeof supplyResult.value === 'number' ? supplyResult.value : 0;
      
      if (timestamp > 0) {
        setIsConnected(true);
        setStats(prev => ({
          height: { ...prev.height, target: timestamp },
          juice: { ...prev.juice, target: juicePrice },
          state: { ...prev.state, target: supply },
          latency: { ...prev.latency, target: latency },
        }));
        setPulseKey(k => k + 1);
      } else {
        setIsConnected(false);
      }
    } catch {
      setIsConnected(false);
    }
  }, []);

  // Initial fetch and polling
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // Animate values towards targets
  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setStats(prev => {
        const updated = { ...prev };
        let changed = false;
        
        Object.keys(updated).forEach(key => {
          const stat = updated[key];
          const diff = stat.target - stat.current;
          if (Math.abs(diff) > 0.1) {
            updated[key] = { 
              ...stat, 
              current: stat.current + diff * 0.1 
            };
            changed = true;
          } else if (stat.current !== stat.target) {
            updated[key] = { ...stat, current: stat.target };
            changed = true;
          }
        });
        
        return changed ? updated : prev;
      });
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="proof-of-life">
      <div className="pol-status">
        <span className={`pol-indicator ${isConnected ? '' : 'pol-disconnected'}`} key={pulseKey} />
        <span className="pol-status-text">{isConnected ? 'Live' : 'Offline'}</span>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Consensus</div>
        <div className="pol-value">{stats.height.format(stats.height.current)}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Juice Price</div>
        <div className="pol-value">{stats.juice.format(Math.floor(stats.juice.current))}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">State</div>
        <div className="pol-value">{stats.state.format(stats.state.current)}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Latency</div>
        <div className="pol-value">{stats.latency.format(stats.latency.current)}</div>
      </div>
    </div>
  );
}
