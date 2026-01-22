'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroSlide {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}

const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Beyond Blockchain',
    title: 'Realtime Value Exchange',
    titleAccent: 'Without Block Delays',
    subtitle: 'Smart contracts and decentralised applications that execute instantly.',
  },
  {
    eyebrow: 'Lattice Technology',
    title: 'Infinitely Scalable',
    titleAccent: 'Global Data Fabric',
    subtitle: 'Self-sovereign, replicated, verifiable data infrastructure at planetary scale.',
  },
  {
    eyebrow: 'Engine for the Agentic Economy',
    title: 'AI-Native',
    titleAccent: 'Value Exchange',
    subtitle: 'Economic primitives designed for humans and autonomous agents.',
  },
];

export default function RotatingHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 300);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[activeIndex];

  return (
    <section className="hero">
      <div className={`hero-content ${isTransitioning ? 'hero-transitioning' : ''}`}>
        <h1 className="hero-title">
          <span className="hero-title-line">{currentSlide.title}</span>
          <span className="hero-title-line">
            <span className="hero-accent">{currentSlide.titleAccent}</span>
          </span>
        </h1>
        
        <p className="hero-subtitle">
          <span className="hero-subtitle-line">{currentSlide.subtitle}</span>
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.eyebrow}
            className={`hero-indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(false);
              }, 300);
            }}
            aria-label={`View: ${slide.eyebrow}`}
          >
            <span className="hero-indicator-label">{slide.eyebrow}</span>
          </button>
        ))}
      </div>

      <div className="hero-cta-group">
        <Link href="https://docs.convex.world/docs/overview/concepts" className="btn btn-primary btn-lg" target="_blank">
          <span>How It Works</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
        <Link 
          href="/sandbox" 
          className="btn btn-ghost"
        >
          <span>Try the REPL</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Audience Fast-Track */}
      <nav className="hero-audience" aria-label="I am a...">
        <span className="hero-audience-label">I am a</span>
        <div className="hero-audience-links">
          <Link href="/developers" className="hero-audience-link">Developer</Link>
          <Link href="/ecosystem" className="hero-audience-link">Enterprise</Link>
          <Link href="/coin" className="hero-audience-link">Investor</Link>
          <Link href="https://docs.convex.world/docs/overview/governance" className="hero-audience-link" target="_blank">Institution</Link>
        </div>
      </nav>
    </section>
  );
}
