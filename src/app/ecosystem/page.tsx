import EcosystemBox from "@/components/EcosystemBox";

const ecosystemItems: Array<{
  title: string;
  description: string;
  image?: string;
  link?: string;
}> = [
  {
    title: "Covia.ai",
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
    link: "https://remelife.com",
    image: "/images/remelife.png"
  }
];

export default function Ecosystem() {
  return (
      <div className="container">
        <div className="hero-section">
          <h1>Ecosystem</h1>
          <p className="intro-text">
            Explore the growing ecosystem of projects and companies building on Convex
          </p>
        </div>

        <div className="ecosystem-grid">
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
  );
} 