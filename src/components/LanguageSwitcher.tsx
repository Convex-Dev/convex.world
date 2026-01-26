'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Get current locale from pathname
  const pathLocale = pathname.split('/')[1];
  const locale: Locale = locales.includes(pathLocale as Locale) ? (pathLocale as Locale) : 'en';
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const currentPath = pathname;
    // Remove current locale from path if present
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '') || '/';
    // Navigate to new locale path
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Languages size={18} />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown size={14} className={`language-chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="language-dropdown" role="listbox">
          {locales.map((loc) => (
            <button
              key={loc}
              className={`language-option ${loc === locale ? 'active' : ''}`}
              onClick={() => switchLocale(loc)}
              role="option"
              aria-selected={loc === locale}
            >
              <span className="language-option-name">{localeNames[loc]}</span>
              <span className="language-option-code">{loc.toUpperCase()}</span>
              {loc === locale && <Check size={16} className="language-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
