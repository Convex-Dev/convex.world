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
          <Link href="/ecosystem" className="nav-title">
            Ecosystem
          </Link>
          {/*
          <Link href="/team" className="nav-title">
            Team
          </Link>
          */}
          <Link href="/tools" className="nav-title">
            Toolkit
          </Link>
          <a href="https://peer.convex.live/explorer" target="explorer" className="nav-title">
            Explorer
            <Image src="/link.svg" alt="Link" width={16} height={16} />
          </a>
          <a href="https://docs.convex.world" target="discord" className="nav-title">
            Docs
            <Image src="/link.svg" alt="Link" width={16} height={16} />
          </a>
          <a href="https://discord.com/invite/xfYGq4CT7v" target="docs" className="nav-title">
            Discord
            <Image src="/link.svg" alt="Link" width={16} height={16} />
          </a>
          <ColorMode />
        </div>
      </nav>
    </header>
  );
} 