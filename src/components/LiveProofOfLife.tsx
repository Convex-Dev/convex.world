'use client';

import { useState, useEffect } from 'react';

interface StatValue {
  current: number;
  target: number;
  format: (val: number) => string;
}

export default function LiveProofOfLife() {
  const [stats, setStats] = useState<Record<string, StatValue>>({
    height: { 
      current: 14892847, 
      target: 14892847, 
      format: (v) => v.toLocaleString() 
    },
    participants: { 
      current: 2847, 
      target: 2847, 
      format: (v) => v.toLocaleString() 
    },
    juice: { 
      current: 847.2, 
      target: 847.2, 
      format: (v) => `${v.toFixed(1)}M` 
    },
    convergence: { 
      current: 487, 
      target: 487, 
      format: (v) => `<${Math.round(v)}ms` 
    },
  });

  const [pulseKey, setPulseKey] = useState(0);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        height: { 
          ...prev.height, 
          target: prev.height.target + Math.floor(Math.random() * 3) + 1 
        },
        participants: { 
          ...prev.participants, 
          target: prev.participants.target + (Math.random() > 0.7 ? 1 : Math.random() > 0.9 ? -1 : 0)
        },
        juice: { 
          ...prev.juice, 
          target: prev.juice.target + (Math.random() * 0.3) 
        },
        convergence: { 
          ...prev.convergence, 
          target: 450 + Math.random() * 100 
        },
      }));
      setPulseKey(k => k + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
        <span className="pol-indicator" key={pulseKey} />
        <span className="pol-status-text">Live</span>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Consensus Height</div>
        <div className="pol-value">{stats.height.format(Math.floor(stats.height.current))}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Active Participants</div>
        <div className="pol-value">{stats.participants.format(Math.floor(stats.participants.current))}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">Juice Consumed</div>
        <div className="pol-value">{stats.juice.format(stats.juice.current)}</div>
      </div>
      
      <div className="pol-item">
        <div className="pol-label">State Convergence</div>
        <div className="pol-value">{stats.convergence.format(stats.convergence.current)}</div>
      </div>
    </div>
  );
}
