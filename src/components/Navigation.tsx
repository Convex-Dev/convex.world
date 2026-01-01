'use client';

import { useState } from 'react';
import Link from 'next/link';
import ColorMode from './ColorMode';
import Logo from './Logo';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav>
        <Link href="/" aria-label="Convex home">
          <Logo priority />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <Link href="/developers" className="nav-link">
            Developers
          </Link>
          <Link href="/tools" className="nav-link">
            Tools
          </Link>
          <Link href="/ecosystem" className="nav-link">
            Ecosystem
          </Link>
          <Link href="/coin" className="nav-link">
            Coin
          </Link>
          <Link href="/developers#sandbox" className="nav-link nav-link-sandbox">
            Sandbox
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

        {/* Mobile Navigation */}
        <div className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
          <Link href="/developers" className="nav-link" onClick={closeMenu}>
            Developers
          </Link>
          <Link href="/tools" className="nav-link" onClick={closeMenu}>
            Tools
          </Link>
          <Link href="/ecosystem" className="nav-link" onClick={closeMenu}>
            Ecosystem
          </Link>
          <Link href="/coin" className="nav-link" onClick={closeMenu}>
            Coin
          </Link>
          <Link href="/developers#sandbox" className="nav-link nav-link-sandbox" onClick={closeMenu}>
            Sandbox
          </Link>
          <a 
            href="https://docs.convex.world" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
            onClick={closeMenu}
          >
            Docs
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <div className="nav-mobile-footer">
            <ColorMode />
          </div>
        </div>
      </nav>
    </header>
  );
}