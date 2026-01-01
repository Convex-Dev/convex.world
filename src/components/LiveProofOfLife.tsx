'use client';

import { useState, useEffect, useCallback } from 'react';
import { getNetworkStatus, getJuicePrice, getCoinSupply } from '@/lib/convex-api';

interface StatValue {
  current: number;
  target: number;
  format: (val: number) => string;
}

export default function LiveProofOfLife() {
  const [stats, setStats] = useState<Record<string, StatValue>>({
    height: { 
      current: 0, 
      target: 0, 
      format: (v) => v.toLocaleString() 
    },
    supply: { 
      current: 0, 
      target: 0, 
      format: (v) => {
        if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
        if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
        return v.toLocaleString();
      }
    },
    juicePrice: { 
      current: 0, 
      target: 0, 
      format: (v) => v.toLocaleString()
    },
    convergence: { 
      current: 0, 
      target: 0, 
      format: (v) => `<${Math.round(v)}ms` 
    },
  });

  const [pulseKey, setPulseKey] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch real network status and metrics
  const fetchStatus = useCallback(async () => {
    const startTime = Date.now();
    
    // Fetch all metrics in parallel
    const [status, juicePrice, coinSupply] = await Promise.all([
      getNetworkStatus(),
      getJuicePrice(),
      getCoinSupply(),
    ]);
    
    const latency = Date.now() - startTime;
    
    if (status) {
      setIsConnected(true);
      setStats(prev => ({
        height: { 
          ...prev.height, 
          target: status.consensusPoint
        },
        supply: { 
          ...prev.supply, 
          target: coinSupply || prev.supply.target
        },
        juicePrice: { 
          ...prev.juicePrice, 
          target: juicePrice || prev.juicePrice.target
        },
        convergence: { 
          ...prev.convergence, 
          target: Math.min(latency, 500)
        },
      }));
      setPulseKey(k => k + 1);
    } else {
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
        <div className="pol-label">Consensus Height</div>
        <div className="pol-value">{stats.height.format(Math.floor(stats.height.current))}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Coin Supply</div>
        <div className="pol-value">{stats.supply.format(stats.supply.current)}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Juice Price</div>
        <div className="pol-value">{stats.juicePrice.format(stats.juicePrice.current)}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Latency</div>
        <div className="pol-value">{stats.convergence.format(stats.convergence.current)}</div>
      </div>
    </div>
  );
}
