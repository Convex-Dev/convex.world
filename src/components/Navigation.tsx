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
        </nav>
      </header>

      {/* Mobile Navigation - Outside header for proper stacking */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#09090b',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            paddingTop: '80px',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#fafafa',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '8px',
              lineHeight: 1,
            }}
          >
            ×
          </button>

          <Link 
            href="/developers" 
            onClick={closeMenu}
            style={{
              color: '#fafafa',
              fontSize: '18px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
            }}
          >
            Developers
          </Link>
          <Link 
            href="/tools" 
            onClick={closeMenu}
            style={{
              color: '#fafafa',
              fontSize: '18px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
            }}
          >
            Tools
          </Link>
          <Link 
            href="/ecosystem" 
            onClick={closeMenu}
            style={{
              color: '#fafafa',
              fontSize: '18px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
            }}
          >
            Ecosystem
          </Link>
          <Link 
            href="/coin" 
            onClick={closeMenu}
            style={{
              color: '#fafafa',
              fontSize: '18px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
            }}
          >
            Coin
          </Link>
          <Link 
            href="/developers#sandbox" 
            onClick={closeMenu}
            style={{
              color: '#6AAAEE',
              fontSize: '18px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
            }}
          >
            Sandbox
          </Link>
          <a 
            href="https://docs.convex.world" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
            style={{
              color: '#fafafa',
              fontSize: '18px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Docs
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <ColorMode />
          </div>
        </div>
      )}
    </>
  );
}