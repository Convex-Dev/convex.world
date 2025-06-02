import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="gradient-bg absolute inset-0 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">convex.world</div>
            <div className="flex gap-6">
              <Link href="/docs" className="text-white hover:text-gray-200">Docs</Link>
              <Link href="/blog" className="text-white hover:text-gray-200">Blog</Link>
              <Link href="/community" className="text-white hover:text-gray-200">Community</Link>
            </div>
          </nav>
        </header>

        <main className="py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Build Something Amazing
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Create, collaborate, and ship your next project faster with our powerful development platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-started"
                className="glass-effect text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Get Started
              </a>
              <a
                href="https://github.com/get-convex/convex"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                GitHub →
              </a>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning Fast",
                description: "Built for speed and performance from the ground up."
              },
              {
                title: "Type Safe",
                description: "End-to-end type safety with TypeScript support."
              },
              {
                title: "Real-time by Default",
                description: "Live updates and real-time collaboration built-in."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
