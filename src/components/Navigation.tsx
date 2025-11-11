import Image from 'next/image';
import Link from 'next/link';
import ColorMode from './ColorMode';
import Logo from './Logo';

export default function Navigation() {
  return (
    <header>
      <nav>
        <Link href="/">
          <Logo priority />
          <span className="sr-only">Convex home</span>
        </Link>
        <div>
          <Link href="/developers" className="nav-title">
            Developers
          </Link>
          <Link href="/tools" className="nav-title">
            Tools
          </Link>

          <Link href="/ecosystem" className="nav-title">
            Ecosystem
          </Link>
          {/*
          <Link href="/team" className="nav-title">
            Team
          </Link>
          */}
          <Link href="/coin" className="nav-title">
            Coin
          </Link>

          <a href="https://docs.convex.world" target="discord" className="nav-title">
            Docs
            <Image src="/link.svg" alt="Link" width={16} height={16} />
          </a>

          <ColorMode />
        </div>
      </nav>
    </header>
  );
} 