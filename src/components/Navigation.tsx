'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ColorMode from './ColorMode';
import Logo from './Logo';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header>
        <nav>
          <Link href="/" aria-label="Convex home">
            <Logo priority width={280} height={84} className="nav-logo" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <Link href="/developers" className="nav-link">
              Developers
            </Link>
            <Link href="/sandbox" className="nav-link nav-link-sandbox">
              Sandbox
            </Link>
            <Link href="/tools" className="nav-link">
              Tools
            </Link>
            <Link href="/coin" className="nav-link">
              Coin
            </Link>
            <Link href="/ecosystem" className="nav-link">
              Ecosystem
            </Link>
            <Link href="/community" className="nav-link">
              Community
            </Link>
            <a 
              href="https://docs.convex.world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              Docs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
            <ColorMode />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="nav-burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
            <span className={`burger-line ${isMenuOpen ? 'open' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Navigation - Outside header for proper stacking */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          {/* Close button */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="mobile-menu-close"
          >
            ×
          </button>

          <Link href="/developers" onClick={closeMenu} className="mobile-menu-link">
            Developers
          </Link>
          <Link href="/sandbox" onClick={closeMenu} className="mobile-menu-link mobile-menu-link-sandbox">
            Sandbox
          </Link>
          <Link href="/tools" onClick={closeMenu} className="mobile-menu-link">
            Tools
          </Link>
          <Link href="/coin" onClick={closeMenu} className="mobile-menu-link">
            Coin
          </Link>
          <Link href="/ecosystem" onClick={closeMenu} className="mobile-menu-link">
            Ecosystem
          </Link>
          <Link href="/community" onClick={closeMenu} className="mobile-menu-link">
            Community
          </Link>
          <a 
            href="https://docs.convex.world" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mobile-menu-link mobile-menu-link-external"
          >
            Docs
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <div className="mobile-menu-footer">
            <ColorMode />
          </div>
        </div>
      )}
    </>
  );
}