'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ColorMode from './ColorMode';
import Logo from './Logo';

import { navDropdowns } from '@/data/nav-dropdowns';
import { getIcon } from '@/lib/icons';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <nav ref={navRef}>
          <Link href="/" aria-label="Convex home">
            <Logo priority width={400} height={120} className="nav-logo" />
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div className="nav-desktop">
            <div className="nav-links-group">
              {navDropdowns.map((dropdown) => (
                <div
                  key={dropdown.key}
                  className="nav-dropdown-container"
                  onMouseEnter={() => setOpenDropdown(dropdown.key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={dropdown.href}
                    className={`nav-link nav-dropdown-trigger ${openDropdown === dropdown.key ? 'active' : ''} ${dropdown.navClass ?? ''}`}
                  >
                    {dropdown.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-dropdown-arrow">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </Link>

                  {openDropdown === dropdown.key && (
                    <div className="nav-dropdown-menu">
                      <div className={`nav-dropdown-menu-inner ${!dropdown.graphicKey ? 'nav-dropdown-menu-wide' : ''}`}>
                        {dropdown.featuredItem && (
                          <Link
                            href={dropdown.featuredItem.href}
                            className="nav-dropdown-featured"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <svg className="nav-dropdown-featured-icon" viewBox="-60 -60 120 120" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(140, 210, 80, 0.8)">
                              <path d="M 0,-52 L 45,-26 L 45,26 L 0,52 L -45,26 L -45,-26 Z"/>
                              <line x1="0" y1="52" x2="-45" y2="-26"/><line x1="0" y1="52" x2="0" y2="-52"/><line x1="0" y1="52" x2="45" y2="-26"/>
                            </svg>
                            <span className="nav-dropdown-featured-label">{dropdown.featuredItem.label}</span>
                            {dropdown.featuredItem.description && <span className="nav-dropdown-featured-desc">{dropdown.featuredItem.description}</span>}
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-dropdown-featured-arrow">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </Link>
                        )}
                        <div className="nav-dropdown-sections">
                          {dropdown.sections.map((section, idx) => (
                            <div key={idx} className="nav-dropdown-section">
                              {section.title && <span className="nav-dropdown-title">{section.title}</span>}
                              {section.items.map((item) => {
                                const Icon = getIcon(item.icon);
                                return item.external ? (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`nav-dropdown-item ${item.featured ? 'nav-dropdown-item-active' : ''}`}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="nav-dropdown-item-icon"><Icon size={16} /></span>
                                    <span className="nav-dropdown-item-content">
                                      <span className="nav-dropdown-item-label">{item.label}</span>
                                      {item.description && <span className="nav-dropdown-item-desc">{item.description}</span>}
                                    </span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-external-icon">
                                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                    </svg>
                                  </a>
                                ) : (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`nav-dropdown-item ${item.featured ? 'nav-dropdown-item-active' : ''}`}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="nav-dropdown-item-icon"><Icon size={16} /></span>
                                    <span className="nav-dropdown-item-content">
                                      <span className="nav-dropdown-item-label">{item.label}</span>
                                      {item.description && <span className="nav-dropdown-item-desc">{item.description}</span>}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                        {dropdown.graphicKey && (
                          <div className="nav-dropdown-graphic">
                            <Image
                              src={`/images/navbar/${dropdown.graphicKey}.webp`}
                              alt={dropdown.label}
                              width={440}
                              height={700}
                              className="nav-dropdown-graphic-img"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

            </div>

            <div className="nav-utils-group">
              <ColorMode />
            </div>
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          {navDropdowns.map((dropdown) => (
            <div key={dropdown.key} className="mobile-menu-section">
              <Link href={dropdown.href} onClick={closeMenu} className="mobile-menu-link mobile-menu-link-main">
                {dropdown.label}
              </Link>
              <div className="mobile-menu-subitems">
                {dropdown.sections.flatMap(section => section.items.slice(0, 3)).map((item, idx) => {
                  const isOverview = item.label.toLowerCase().includes('overview') || item.label === 'Community Hub';
                  return item.external ? (
                    <a
                      key={`${dropdown.key}-${item.label}-${idx}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className={`mobile-menu-sublink ${isOverview ? 'mobile-menu-sublink-overview' : ''}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={`${dropdown.key}-${item.label}-${idx}`}
                      href={item.href}
                      onClick={closeMenu}
                      className={`mobile-menu-sublink ${isOverview ? 'mobile-menu-sublink-overview' : ''}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mobile-menu-footer">
            <ColorMode />
          </div>
        </div>
      )}
    </>
  );
}
