import Link from 'next/link';
import Image from 'next/image';
import ColorMode from './ColorMode';

export default function Navigation() {
  return (
    <header className="py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image src="/images/logo_dark_blue.svg" alt="Convex Logo" width={200} height={80} className="w-50 h-20" />
          </Link>

        </div>
        <div className="flex gap-6">
          <Link href="/ecosystem" className="nav-title">
            Ecosystem
          </Link>
          {/*
          <Link href="/team" className="nav-title">
            Team
          </Link>
          */}
          <Link href="/tools" className="nav-title">
            Tools
          </Link>
          <a href="https://docs.convex.world" target="discord" className="nav-title">
            Docs
            <Image src="/link.svg" alt="Link" width={16} height={16} className="inline-block w-4 h-4 ml-1" />
          </a>
          <a href="https://discord.com/invite/xfYGq4CT7v" target="docs" className="nav-title">
            Discord
            <Image src="/link.svg" alt="Link" width={16} height={16} className="inline-block w-4 h-4 ml-1" />
          </a>
          <ColorMode />
        </div>
      </nav>
    </header>
  );
} 