'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface GaugeProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: 'juice' | 'memory' | 'primary';
}

function Gauge({ label, value, max, unit, color }: GaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorVar = color === 'juice' 
    ? 'var(--accent-juice)' 
    : color === 'memory' 
      ? 'var(--accent-consensus)' 
      : 'var(--accent-primary)';

  return (
    <div className="resource-gauge">
      <div className="gauge-header">
        <span className="gauge-label">{label}</span>
        <span className="gauge-value" style={{ color: colorVar }}>
          {value.toLocaleString()} <span className="gauge-unit">{unit}</span>
        </span>
      </div>
      <div className="gauge-track">
        <div 
          className="gauge-fill" 
          style={{ 
            width: `${percentage}%`,
            background: colorVar,
            boxShadow: `0 0 12px ${colorVar}`
          }} 
        />
        <div className="gauge-markers">
          {[25, 50, 75].map(mark => (
            <div key={mark} className="gauge-marker" style={{ left: `${mark}%` }} />
          ))}
        </div>
      </div>
      <div className="gauge-limits">
        <span>0</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function ResourceGauges() {
  const t = useTranslations('gauges');
  const [juiceUsed, setJuiceUsed] = useState(234567);
  const [memoryUsed, setMemoryUsed] = useState(1847);
  
  const juiceMax = 1000000;
  const memoryMax = 4096;

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setJuiceUsed(prev => {
        const delta = Math.floor(Math.random() * 5000) - 1000;
        return Math.max(0, Math.min(juiceMax, prev + delta));
      });
      setMemoryUsed(prev => {
        const delta = Math.floor(Math.random() * 100) - 30;
        return Math.max(0, Math.min(memoryMax, prev + delta));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="resource-gauges">
      <div className="gauges-header">
        <h4>{t('title')}</h4>
        <span className="gauges-status">
          <span className="gauges-indicator" />
          {t('monitoring')}
        </span>
      </div>
      
      <div className="gauges-grid">
        <Gauge 
          label={t('juiceConsumption')} 
          value={juiceUsed} 
          max={juiceMax} 
          unit={t('units')}
          color="juice"
        />
        <Gauge 
          label={t('memoryAllocation')} 
          value={memoryUsed} 
          max={memoryMax} 
          unit={t('bytes')}
          color="memory"
        />
      </div>

      <div className="gauges-info">
        <div className="gauge-info-item">
          <span className="gauge-info-dot" style={{ background: 'var(--accent-juice)' }} />
          <span>{t('juiceInfo')}</span>
        </div>
        <div className="gauge-info-item">
          <span className="gauge-info-dot" style={{ background: 'var(--accent-consensus)' }} />
          <span>{t('memoryInfo')}</span>
        </div>
      </div>
    </div>
  );
}
