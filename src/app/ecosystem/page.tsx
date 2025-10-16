import EcosystemBox from "@/components/EcosystemBox";

const ecosystemItems: Array<{
  title: string;
  description: string;
  image?: string;
  link?: string;
}> = [
  {
    title: "Covia.AI",
    description: "Covia is using Convex lattice technology to build the universal grid for AI, enabling powerful AI agent ecosystems across organisational boundaries.",
    image: "/images/covia.png",
    link: "https://covia.ai"
  },
  {
    title: "Paisley",
    description: "Paisley is a membership-based cooperative for freelancers and creatives that uses the power of Convex to build a better future for all.",
    image: "/images/paisley-logo.png",
    link: "https://paisley.io"
  },
  {
    title: "Lumoza",
    description: "Lumoza is transforming the mucic industry with solutions to help artists register and manage their copyrights.",
    image: "/images/lumoza.avif",
    link: "https://lumoza.io"
  },
  {
    title: "ReMeLife",
    description: "The first AI-Web3 Care-2-Earn community ecosystem. Using Convex to build ReMeGrid, a decentralised rewards-based care community.",
    link: "https://remelife.io",
    image: "/images/remelife.png"
  }
];

export default function Ecosystem() {
  return (
    <div className="bg-convex-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-3">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-xl text-convex-medium-blue mb-8">
                Explore the growing ecosystem of projects and tools built on Convex
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,_1fr))] gap-6 md:gap-8 mx-auto mb-16">
              {ecosystemItems.map((item) => (
                <EcosystemBox
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  link={item.link}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 