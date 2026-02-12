'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ColorMode from './ColorMode';
import Logo from './Logo';
import { 
  Code2, BookOpen, GraduationCap, Package, Terminal, FileCode, Github,
  Globe, Search, Server, MonitorSmartphone, Compass, Coins, Scale,
  FileText, Layers, Box, Users, MessageCircle, Twitter, Youtube, 
  Newspaper, HelpCircle
} from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
  icon: React.ReactNode;
}

interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface NavDropdown {
  key: string;
  label: string;
  href: string;
  sections: DropdownSection[];
}

const navDropdowns: NavDropdown[] = [
  {
    key: 'developers',
    label: 'Developers',
    href: '/developers',
    sections: [
      {
        title: 'Start Building',
        items: [
          { label: 'Developer Overview', href: '/developers', description: 'Introduction to building on Convex', icon: <Code2 size={18} /> },
          { label: 'Documentation', href: 'https://docs.convex.world/docs/intro', external: true, description: 'Comprehensive guides and references', icon: <BookOpen size={18} /> },
          { label: 'Convex Lisp Tutorial', href: 'https://docs.convex.world/docs/tutorial/convex-lisp', external: true, description: 'Learn the language', icon: <GraduationCap size={18} /> },
          { label: 'TypeScript SDK', href: 'https://docs.convex.world/docs/tutorial/client-sdks/typescript', external: true, description: 'Client library for JS/TS', icon: <Package size={18} /> },
          { label: 'Java Client API', href: 'https://github.com/Convex-Dev/convex/tree/develop/convex-java', external: true, description: 'Client library for Java/JVM', icon: <Package size={18} /> },
        ]
      },
      {
        title: 'Resources',
        items: [
          { label: 'Sandbox REPL', href: '/sandbox', description: 'Try Convex Lisp live', icon: <Terminal size={18} /> },
          { label: 'CADs', href: 'https://docs.convex.world/docs/cad/0000cads', external: true, description: 'Convex Architecture Documents', icon: <FileCode size={18} /> },
          { label: 'GitHub', href: 'https://github.com/Convex-Dev', external: true, description: 'Source code and examples', icon: <Github size={18} /> },
          { label: 'Full Docs', href: 'https://docs.convex.world', external: true, description: 'Complete documentation site', icon: <BookOpen size={18} /> },
        ]
      }
    ]
  },
  {
    key: 'network',
    label: 'Network',
    href: '/tools',
    sections: [
      {
        title: 'Tools',
        items: [
          { label: 'Tools Overview', href: '/tools', description: 'Explore all developer tools', icon: <Compass size={18} /> },
          { label: 'Sandbox', href: '/sandbox', description: 'Interactive REPL console', icon: <Terminal size={18} /> },
          { label: 'REST API', href: 'https://peer.convex.live/swagger', external: true, description: 'API reference', icon: <Server size={18} /> },
          { label: 'CLI Tool', href: 'https://docs.convex.world/docs/products/convex-cli', external: true, description: 'Command-line interface', icon: <Terminal size={18} /> },
        ]
      },
      {
        title: 'Inspect',
        items: [
          { label: 'Protonet Explorer', href: 'https://peer.convex.live/explorer', external: true, icon: <Globe size={18} /> },
          { label: 'Testnet Explorer', href: 'https://mikera1337-convex-testnet.hf.space/explorer', external: true, icon: <Globe size={18} /> },
          { label: 'Convex Desktop', href: 'https://docs.convex.world/docs/products/convex-desktop', external: true, icon: <MonitorSmartphone size={18} /> },
        ]
      }
    ]
  },
  {
    key: 'ecosystem',
    label: 'Ecosystem',
    href: '/ecosystem',
    sections: [
      {
        title: 'Explore',
        items: [
          { label: 'Ecosystem Overview', href: '/ecosystem', description: 'Projects building on Convex', icon: <Compass size={18} /> },
          { label: 'Convex Coin', href: '/coin', description: 'CVM tokenomics and utility', icon: <Coins size={18} /> },
          { label: 'Governance', href: 'https://docs.convex.world/docs/overview/governance', external: true, description: 'Foundation and governance model', icon: <Scale size={18} /> },
        ]
      },
      {
        title: 'Learn',
        items: [
          { label: 'Whitepaper', href: 'https://docs.convex.world/docs/overview/convex-whitepaper', external: true, icon: <FileText size={18} /> },
          { label: 'Lattice Technology', href: 'https://docs.convex.world/docs/overview/lattice', external: true, icon: <Layers size={18} /> },
          { label: 'Architecture', href: 'https://docs.convex.world/docs/overview/concepts', external: true, icon: <Box size={18} /> },
        ]
      }
    ]
  },
  {
    key: 'community',
    label: 'Community',
    href: '/community',
    sections: [
      {
        title: 'Connect',
        items: [
          { label: 'Community Hub', href: '/community', description: 'Join the conversation', icon: <Users size={18} /> },
          { label: 'Discord', href: 'https://discord.com/invite/xfYGq4CT7v', external: true, description: 'Chat with builders', icon: <MessageCircle size={18} /> },
          { label: 'Twitter / X', href: 'https://x.com/convex_world', external: true, description: 'Latest updates', icon: <Twitter size={18} /> },
          { label: 'YouTube', href: 'https://www.youtube.com/@convex-world', external: true, description: 'Tutorials and demos', icon: <Youtube size={18} /> },
        ]
      },
      {
        title: 'Content',
        items: [
          { label: 'Blog', href: 'https://docs.convex.world/blog', external: true, icon: <Newspaper size={18} /> },
          { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/convex', external: true, icon: <HelpCircle size={18} /> },
        ]
      }
    ]
  }
];

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
                    className={`nav-link nav-dropdown-trigger ${openDropdown === dropdown.key ? 'active' : ''} ${dropdown.key === 'developers' ? 'nav-link-bold' : ''}`}
                  >
                    {dropdown.label}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-dropdown-arrow">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </Link>
                  
                  {openDropdown === dropdown.key && (
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-menu-inner">
                        {dropdown.sections.map((section, idx) => (
                          <div key={idx} className="nav-dropdown-section">
                            {section.title && <span className="nav-dropdown-title">{section.title}</span>}
                            {section.items.map((item) => {
                              const isCurrentPage = item.href === dropdown.href;
                              return item.external ? (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`nav-dropdown-item ${isCurrentPage ? 'nav-dropdown-item-active' : ''}`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <span className="nav-dropdown-item-icon">{item.icon}</span>
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
                                  key={item.href}
                                  href={item.href}
                                  className={`nav-dropdown-item ${isCurrentPage ? 'nav-dropdown-item-active' : ''}`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <span className="nav-dropdown-item-icon">{item.icon}</span>
                                  <span className="nav-dropdown-item-content">
                                    <span className="nav-dropdown-item-label">{item.label}</span>
                                    {item.description && <span className="nav-dropdown-item-desc">{item.description}</span>}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                        {/* Dropdown graphic */}
                        <div className="nav-dropdown-graphic">
                          <Image
                            src={`/images/navbar/${dropdown.key === 'developers' ? 'Developers' : dropdown.key}.webp`}
                            alt={dropdown.label}
                            width={440}
                            height={700}
                            className="nav-dropdown-graphic-img"
                          />
                        </div>
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
