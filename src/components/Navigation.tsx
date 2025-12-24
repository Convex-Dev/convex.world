import Link from 'next/link';
import ColorMode from './ColorMode';
import Logo from './Logo';

export default function Navigation() {
  return (
    <header>
      <nav>
        <Link href="/" aria-label="Convex home">
          <Logo priority />
        </Link>
        <div>
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
      </nav>
    </header>
  );
}