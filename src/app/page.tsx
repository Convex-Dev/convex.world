import Image from "next/image";

export default function Home() {
  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-convex-dark-blue mb-6">
            Convex
          </h1>
          <p className="text-xl text-convex-medium-blue mb-8">
            An open-source engine for building decentralized economic systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.convex.world/docs/intro"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-convex-dark-blue text-white hover:bg-convex-medium-blue transition-colors"
            >
              Introduction
            </a>
            <a
              href="https://github.com/Convex-Dev"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-convex-dark-blue text-white hover:bg-convex-medium-blue transition-colors"
            >
              Contribute 
              <Image 
                src="/images/social_github.png" 
                alt="Github" 
                width={16} 
                height={16} 
                className="m-2"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
            <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Decentralised Consensus</h3>
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
            Explore our comprehensive <a
              href="https://docs.convex.world"
              className="text-convex-medium-blue hover:text-convex-dark-blue underline"
            >documentation</a> and join the Convex <a
            href="https://discord.com/invite/xfYGq4CT7v"
            className="text-convex-medium-blue hover:text-convex-dark-blue underline"
          >community.</a>
          </p>
        </div>
      </div>
    </main>
  );
}
