export default function Ecosystem() {
  return (
    <div className="bg-convex-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-convex-dark-blue mb-6">
                Ecosystem
              </h1>
              <p className="text-xl text-convex-medium-blue mb-8">
                Explore the growing ecosystem of projects and tools built on Convex
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Projects</h3>
                <p className="text-convex-medium-blue">Discover decentralized applications and services built on Convex.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Tools</h3>
                <p className="text-convex-medium-blue">Find developer tools, libraries, and resources for building on Convex.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Community</h3>
                <p className="text-convex-medium-blue">Connect with other builders and contributors in the Convex ecosystem.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
                <h3 className="text-xl font-semibold text-convex-dark-blue mb-3">Resources</h3>
                <p className="text-convex-medium-blue">Access documentation, guides, and learning materials.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 