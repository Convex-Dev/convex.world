import EcosystemBox from "@/components/EcosystemBox";

const ecosystemItems = [
  {
    title: "Projects",
    description: "Discover decentralized applications and services built on Convex."
  },
  {
    title: "Tools",
    description: "Find developer tools, libraries, and resources for building on Convex."
  },
  {
    title: "Community",
    description: "Connect with other builders and contributors in the Convex ecosystem."
  },
  {
    title: "Resources",
    description: "Access documentation, guides, and learning materials."
  }
];

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
              {ecosystemItems.map((item) => (
                <EcosystemBox
                  key={item.title}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 