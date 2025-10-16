import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <header className="py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-convex-dark-blue">
            <Image src="/images/logo_dark_blue.svg" alt="Convex Logo" width={200} height={80} className="w-50 h-20" />
          </Link>

        </div>
        <div className="flex gap-6">
          <Link href="/ecosystem" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
            Ecosystem
          </Link>
          {/*
          <Link href="/team" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
            Team
          </Link>
          */}
          <Link href="/tools" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
            Tools
          </Link>
          <a href="https://docs.convex.world" target="discord" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
            Docs
            <Image src="/link.svg" alt="Link" width={16} height={16} className="inline-block w-4 h-4 ml-1" />
          </a>
          <a href="https://discord.com/invite/xfYGq4CT7v" target="docs" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
            Discord
            <Image src="/link.svg" alt="Link" width={16} height={16} className="inline-block w-4 h-4 ml-1" />
          </a>
        </div>
      </nav>
    </header>
  );
} 