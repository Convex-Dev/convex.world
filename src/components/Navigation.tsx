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
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

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
  label: string;
  href: string;
  sections: DropdownSection[];
}

interface NavDropdownData {
  key: string;
  href: string;
  sections: {
    titleKey?: string;
    items: {
      labelKey: string;
      href: string;
      external?: boolean;
      descriptionKey?: string;
      icon: React.ReactNode;
    }[];
  }[];
}

const navDropdownsData: NavDropdownData[] = [
  {
    key: 'developers',
    href: '/developers',
    sections: [
      {
        titleKey: 'startBuilding',
        items: [
          { labelKey: 'developerOverview', href: '/developers', descriptionKey: 'developerOverviewDesc', icon: <Code2 size={18} /> },
          { labelKey: 'documentation', href: 'https://docs.convex.world/docs/intro', external: true, descriptionKey: 'documentationDesc', icon: <BookOpen size={18} /> },
          { labelKey: 'lispTutorial', href: 'https://docs.convex.world/docs/tutorial/convex-lisp', external: true, descriptionKey: 'lispTutorialDesc', icon: <GraduationCap size={18} /> },
          { labelKey: 'sdkLibraries', href: 'https://docs.convex.world/docs/sdk', external: true, descriptionKey: 'sdkLibrariesDesc', icon: <Package size={18} /> },
        ]
      },
      {
        titleKey: 'resources',
        items: [
          { labelKey: 'sandboxRepl', href: '/sandbox', descriptionKey: 'sandboxReplDesc', icon: <Terminal size={18} /> },
          { labelKey: 'cads', href: 'https://docs.convex.world/docs/cad/0000cads', external: true, descriptionKey: 'cadsDesc', icon: <FileCode size={18} /> },
          { labelKey: 'github', href: 'https://github.com/Convex-Dev', external: true, descriptionKey: 'githubDesc', icon: <Github size={18} /> },
        ]
      }
    ]
  },
  {
    key: 'network',
    href: '/tools',
    sections: [
      {
        titleKey: 'tools',
        items: [
          { labelKey: 'toolsOverview', href: '/tools', descriptionKey: 'toolsOverviewDesc', icon: <Compass size={18} /> },
          { labelKey: 'sandbox', href: '/sandbox', descriptionKey: 'sandboxDesc', icon: <Terminal size={18} /> },
          { labelKey: 'restApi', href: 'https://peer.convex.live/swagger', external: true, descriptionKey: 'restApiDesc', icon: <Server size={18} /> },
          { labelKey: 'cliTool', href: 'https://docs.convex.world/docs/products/convex-cli', external: true, descriptionKey: 'cliToolDesc', icon: <Terminal size={18} /> },
        ]
      },
      {
        titleKey: 'inspect',
        items: [
          { labelKey: 'protonetExplorer', href: 'https://peer.convex.live/explorer', external: true, icon: <Globe size={18} /> },
          { labelKey: 'testnetExplorer', href: 'https://mikera1337-convex-testnet.hf.space/explorer', external: true, icon: <Globe size={18} /> },
          { labelKey: 'convexDesktop', href: 'https://docs.convex.world/docs/products/convex-desktop', external: true, icon: <MonitorSmartphone size={18} /> },
        ]
      }
    ]
  },
  {
    key: 'ecosystem',
    href: '/ecosystem',
    sections: [
      {
        titleKey: 'explore',
        items: [
          { labelKey: 'ecosystemOverview', href: '/ecosystem', descriptionKey: 'ecosystemOverviewDesc', icon: <Compass size={18} /> },
          { labelKey: 'convexCoin', href: '/coin', descriptionKey: 'convexCoinDesc', icon: <Coins size={18} /> },
          { labelKey: 'governance', href: 'https://docs.convex.world/docs/overview/governance', external: true, descriptionKey: 'governanceDesc', icon: <Scale size={18} /> },
        ]
      },
      {
        titleKey: 'learn',
        items: [
          { labelKey: 'whitepaper', href: 'https://docs.convex.world/docs/overview/convex-whitepaper', external: true, icon: <FileText size={18} /> },
          { labelKey: 'latticeTechnology', href: 'https://docs.convex.world/docs/overview/lattice', external: true, icon: <Layers size={18} /> },
          { labelKey: 'architecture', href: 'https://docs.convex.world/docs/overview/concepts', external: true, icon: <Box size={18} /> },
        ]
      }
    ]
  },
  {
    key: 'community',
    href: '/community',
    sections: [
      {
        titleKey: 'connect',
        items: [
          { labelKey: 'communityHub', href: '/community', descriptionKey: 'communityHubDesc', icon: <Users size={18} /> },
          { labelKey: 'discord', href: 'https://discord.com/invite/xfYGq4CT7v', external: true, descriptionKey: 'discordDesc', icon: <MessageCircle size={18} /> },
          { labelKey: 'twitterX', href: 'https://x.com/convex_world', external: true, descriptionKey: 'twitterXDesc', icon: <Twitter size={18} /> },
          { labelKey: 'youtube', href: 'https://www.youtube.com/@convex-world', external: true, descriptionKey: 'youtubeDesc', icon: <Youtube size={18} /> },
        ]
      },
      {
        titleKey: 'content',
        items: [
          { labelKey: 'blog', href: 'https://docs.convex.world/blog', external: true, icon: <Newspaper size={18} /> },
          { labelKey: 'stackOverflow', href: 'https://stackoverflow.com/questions/tagged/convex', external: true, icon: <HelpCircle size={18} /> },
        ]
      }
    ]
  }
];

export default function Navigation() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const getDropdownLabel = (key: string) => t(`dropdown.${key}.label`);
  const getSectionTitle = (key: string) => t(`dropdown.sections.${key}`);
  const getItemLabel = (key: string) => t(`dropdown.items.${key}.label`);
  const getItemDesc = (key: string) => {
    try {
      return t(`dropdown.items.${key}.description`);
    } catch {
      return undefined;
    }
  };

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
              {navDropdownsData.map((dropdown) => (
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
                    {getDropdownLabel(dropdown.key)}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-dropdown-arrow">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </Link>
                  
                  {openDropdown === dropdown.key && (
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-menu-inner">
                        {dropdown.sections.map((section, idx) => (
                          <div key={idx} className="nav-dropdown-section">
                            {section.titleKey && <span className="nav-dropdown-title">{getSectionTitle(section.titleKey)}</span>}
                            {section.items.map((item) => {
                              const isCurrentPage = item.href === dropdown.href;
                              const itemLabel = getItemLabel(item.labelKey);
                              const itemDesc = item.descriptionKey ? getItemDesc(item.labelKey) : undefined;
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
                                    <span className="nav-dropdown-item-label">{itemLabel}</span>
                                    {itemDesc && <span className="nav-dropdown-item-desc">{itemDesc}</span>}
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
                                    <span className="nav-dropdown-item-label">{itemLabel}</span>
                                    {itemDesc && <span className="nav-dropdown-item-desc">{itemDesc}</span>}
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
                            alt={getDropdownLabel(dropdown.key)}
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
              
              <a 
                href="https://docs.convex.world" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
              >
                {t('docs')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
            
            <div className="nav-utils-group">
              <LanguageSwitcher />
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
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="mobile-menu-close"
          >
            ×
          </button>

          {navDropdownsData.map((dropdown) => (
            <div key={dropdown.key} className="mobile-menu-section">
              <Link href={dropdown.href} onClick={closeMenu} className="mobile-menu-link mobile-menu-link-main">
                {getDropdownLabel(dropdown.key)}
              </Link>
              <div className="mobile-menu-subitems">
                {dropdown.sections.flatMap(section => section.items.slice(0, 3)).map((item, idx) => (
                  item.external ? (
                    <a
                      key={`${dropdown.key}-${item.labelKey}-${idx}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="mobile-menu-sublink"
                    >
                      {getItemLabel(item.labelKey)}
                    </a>
                  ) : (
                    <Link
                      key={`${dropdown.key}-${item.labelKey}-${idx}`}
                      href={item.href}
                      onClick={closeMenu}
                      className="mobile-menu-sublink"
                    >
                      {getItemLabel(item.labelKey)}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
          
          <a 
            href="https://docs.convex.world" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mobile-menu-link mobile-menu-link-external"
          >
            {t('docs')}
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