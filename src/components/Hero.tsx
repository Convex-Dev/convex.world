'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

function ConvexLogoBackground() {
  return (
    <div className="hero-logo-bg" aria-hidden="true">
      <svg viewBox="-60 -60 120 120" className="hero-logo-svg">
        {/* Convex logo: pointy-top hexagon with three lines from bottom vertex */}
        <g className="hero-logo-group">
          {/* Hexagon outline */}
          <path 
            className="hero-logo-hex" 
            d="M 0,-52 L 45,-26 L 45,26 L 0,52 L -45,26 L -45,-26 Z"
            fill="none"
          />
          {/* Three lines from bottom (0,52) to top-left, top, top-right */}
          <line className="hero-logo-line" x1="0" y1="52" x2="-45" y2="-26"/>
          <line className="hero-logo-line" x1="0" y1="52" x2="0" y2="-52"/>
          <line className="hero-logo-line" x1="0" y1="52" x2="45" y2="-26"/>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  
  return (
    <section className="hero hero-simple">
      <ConvexLogoBackground />
      
      <div className="hero-content-wrapper">
        <h1 className="hero-title">
          <span className="hero-accent-bold">{t('title')}</span> {t('titleSuffix')}
        </h1>
        
        <p className="hero-subtitle">
          {t('subtitle')}
        </p>

        <div className="hero-cta-group">
          <Link href="https://docs.convex.world/docs/overview/concepts" className="btn btn-primary btn-lg" target="_blank">
            <span>{t('cta.protocol')}</span>
          </Link>
          <Link href="/coin" className="btn btn-sandbox btn-lg">
            <span>{t('cta.coin')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
