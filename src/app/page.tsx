import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-convex-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-convex-dark-blue">convex.world</div>
            </div>
            <div className="flex gap-6">
              <a href="https://docs.convex.world" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">Documentation</a>
              <a href="https://github.com/Convex-Dev" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">GitHub</a>
              <a href="https://discord.com/invite/xfYGq4CT7v" className="text-convex-medium-blue hover:text-convex-dark-blue transition-colors">Discord</a>
            </div>
          </nav>
        </header>

        <main className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-convex-dark-blue mb-6">
                Convex
              </h1>
              <p className="text-xl text-convex-medium-blue mb-8">
                An open-source engine for building decentralized economic systems
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://docs.convex.world/getting-started"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-convex-dark-blue text-white hover:bg-convex-medium-blue transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="https://github.com/Convex-Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-convex-dark-blue text-base font-medium rounded-md text-convex-dark-blue bg-white hover:bg-convex-sky-blue transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Decentralized Consensus</h3>
                <p className="text-convex-medium-blue">Build robust economic systems with our unique consensus mechanism designed for scalability and security.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Smart Contracts</h3>
                <p className="text-convex-medium-blue">Write and deploy smart contracts using our expressive and secure programming model.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Developer Tools</h3>
                <p className="text-convex-medium-blue">Comprehensive suite of development tools, including CLI, SDKs, and extensive documentation.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Community Driven</h3>
                <p className="text-convex-medium-blue">Join our active community of developers and contributors shaping the future of decentralized systems.</p>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-convex-dark-blue mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-convex-medium-blue mb-8">
                Explore our comprehensive documentation and join the Convex community.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://docs.convex.world"
                  className="text-convex-medium-blue hover:text-convex-dark-blue underline"
                >
                  Read the Docs
                </a>
                <span className="text-convex-medium-blue">•</span>
                <a
                  href="https://discord.com/invite/xfYGq4CT7v"
                  className="text-convex-medium-blue hover:text-convex-dark-blue underline"
                >
                  Join Discord
                </a>
                <span className="text-convex-medium-blue">•</span>
                <a
                  href="https://github.com/Convex-Dev"
                  className="text-convex-medium-blue hover:text-convex-dark-blue underline"
                >
                  Contribute
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
