export interface EcosystemItem {
  key: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageDark?: string;
  link: string;
}

export const ecosystemItems: EcosystemItem[] = [
  {
    key: "covia",
    title: "Covia.ai",
    description: "Building the universal grid for AI, enabling powerful AI agent ecosystems across organisational boundaries.",
    category: "AI Infrastructure",
    image: "/images/covia.webp",
    link: "https://covia.ai",
  },
  {
    key: "paisley",
    title: "Paisley",
    description: "A membership-owned cooperative platform for freelancers and creatives building a better future for all.",
    category: "Creator Economy",
    image: "/images/paisley-logo.webp",
    imageDark: "/images/PAISLEY_logo_white.png",
    link: "https://paisley.io",
  },
  {
    key: "eu",
    title: "European Union",
    description: "Part of the Next Generation Internet programme, focusing on efficient scalable DLT infrastructure and interoperable token exchange.",
    category: "Government",
    image: "/images/Europe.webp",
    link: "https://docs.convex.world/docs/products/tokengine",
  },
  {
    key: "lumoza",
    title: "Lumoza",
    description: "Transforming the music industry with solutions to help artists register and manage their copyrights.",
    category: "Music & IP",
    image: "/images/lumoza.avif",
    link: "https://lumoza.io",
  },
  {
    key: "remelife",
    title: "ReMeLife",
    description: "The first AI-Web3 Care-2-Earn community ecosystem, building ReMeGrid—a decentralised rewards-based care community.",
    category: "Healthcare",
    image: "/images/remelife.webp",
    link: "https://remelife.com",
  },
  {
    key: "alphacards",
    title: "Alpha Cards",
    description: "A satirical collectible trading card game parodying luxury finance culture, with on-chain card forging and trading powered by Convex.",
    category: "Gaming",
    image: "/images/alphacards.webp",
    link: "https://mikera.github.io/alpha-cards/",
  },
];
