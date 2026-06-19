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
          The open network for data and value exchange in an agentic world.
        </p>

        <div className="hero-cta-group">
          <Link href="/developers" className="btn btn-primary btn-lg">
            <span>Start building</span>
          </Link>
          <Link href="/sandbox" className="btn btn-sandbox btn-lg">
            <span>Sandbox</span>
          </Link>
          <Link href="/vision" className="btn btn-secondary btn-lg">
            <span>Vision</span>
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
