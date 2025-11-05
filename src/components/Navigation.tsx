import Link from 'next/link';
import Image from 'next/image';
import ColorMode from './ColorMode';

export default function Navigation() {
  return (
    <header>
      <nav>
        <Link href="/">
              <Image src="/images/logo_dark_blue.svg" alt="Convex Logo" width={200} height={80} />
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