import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-convex-dark-blue">
            convex.world
          </Link>

        </div>
        <div className="flex gap-6">
        <Link href="/ecosystem" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
            Ecosystem
          </Link>
          <a href="https://docs.convex.world" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
          Documentation
          <img src="/link.svg" alt="Link" className="inline-block w-4 h-4 ml-1" />
          </a>
          <a href="https://github.com/Convex-Dev" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
          GitHub<img src="/link.svg" alt="Link" className="inline-block w-4 h-4 ml-1" />
          </a>
          <a href="https://discord.com/invite/xfYGq4CT7v" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">
          Discord<img src="/link.svg" alt="Link" className="inline-block w-4 h-4 ml-1" /></a>
        </div>
      </nav>
    </header>
  );
} 