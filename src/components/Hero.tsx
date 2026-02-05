'use client';

import Link from 'next/link';
import HexGridMobile from './HexGridMobile';

export default function Hero() {
  return (
    <section className="hero hero-split">
      <div className="hero-left">
        <h1 className="hero-title">
          <span className="hero-accent-bold">Engine</span> for the<br />agentic economy
        </h1>
        
        <p className="hero-subtitle">
          The open, decentralised full-stack for data and value exchange in an agentic world
        </p>

        <div className="hero-cta-group">
          <Link href="https://docs.convex.world/docs/overview/concepts" className="btn btn-primary btn-lg" target="_blank">
            <span>Explore Protocol</span>
          </Link>
          <Link href="/developers" className="btn btn-sandbox btn-lg">
            <span>Start Building</span>
          </Link>
        </div>
        
        {/* Mobile hex grid - shown only on mobile */}
        <HexGridMobile />
      </div>
      
      <div className="hero-right">
        {/* Superpower content is rendered in the HexGridBackground */}
      </div>
    </section>
  );
}
