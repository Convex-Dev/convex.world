'use client';

import { useState, useEffect, useCallback } from 'react';
import { useConvex } from '@/contexts/ConvexContext';

interface StatValue {
  current: number;
  target: number;
  format: (val: number) => string;
}

export default function LiveProofOfLife() {
  const { convex } = useConvex();
  const [stats, setStats] = useState<Record<string, StatValue>>({
    // Global State - derived from timestamp progression  
    state: { 
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
    // Green consensus - Convex has lowest energy consumption per transaction
    green: { 
      current: 100, 
      target: 100, 
      format: () => '100%'
    },
    // Finality - deterministic, not probabilistic like PoS chains
    finality: { 
      current: 0, 
      target: 0, 
      format: (v) => `${Math.round(v)}ms` 
    },
  });

  const [pulseKey, setPulseKey] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch real network metrics with single combined query
  const fetchStatus = useCallback(async () => {
    try {
      // Single query returning vector of all metrics
      // API route returns peerLatencyMs measured server-side for accurate finality
      const result = await convex.query('[*timestamp* *juice-price* (coin-supply)]') as { 
        value?: unknown[]; 
        peerLatencyMs?: number;
        errorCode?: string;
      };
      
      // Result value is an array: [timestamp, juicePrice, coinSupply]
      if (Array.isArray(result.value) && result.value.length >= 3) {
        const [timestamp, juicePrice] = result.value;
        // Use server-side peer latency for accurate finality measurement
        const latency = result.peerLatencyMs ?? 0;
        
        setIsConnected(true);
        setStats(prev => ({
          state: { ...prev.state, target: timestamp as number },
          juice: { ...prev.juice, target: juicePrice as number },
          green: { ...prev.green, target: 100 },
          finality: { ...prev.finality, target: latency },
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
    const interval = setInterval(fetchStatus, 15000); // Poll every 15 seconds
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
      
      <div className="pol-metrics">
        <div className="pol-item">
          <div className="pol-label">Global State</div>
          <div className="pol-value">{stats.state.format(stats.state.current)}</div>
        </div>
        
        <div className="pol-item">
          <div className="pol-label">Juice Price</div>
          <div className="pol-value">{stats.juice.format(Math.floor(stats.juice.current))}</div>
        </div>
        
        <div className="pol-item">
          <div className="pol-label">Green Consensus</div>
          <div className="pol-value">{stats.green.format(stats.green.current)}</div>
        </div>
        
        <div className="pol-item">
          <div className="pol-label">Finality</div>
          <div className="pol-value">{stats.finality.format(stats.finality.current)}</div>
        </div>
      </div>
    </div>
  );
}
