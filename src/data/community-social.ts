export interface SocialLink {
  key: string;
  name: string;
  description: string;
  action: string;
  logo: string;
  href: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    key: "discord",
    name: "Discord",
    description: "Join the conversation with builders, researchers, and enthusiasts.",
    action: "Join",
    logo: "/images/social_discord.webp",
    href: "https://discord.com/invite/xfYGq4CT7v",
    color: "discord",
  },
  {
    key: "youtube",
    name: "YouTube",
    description: "Watch tutorials, demos, and deep dives into Convex technology.",
    action: "Visit",
    logo: "/images/youtube.svg",
    href: "https://www.youtube.com/@convex-world",
    color: "youtube",
  },
  {
    key: "x",
    name: "X",
    description: "Follow for the latest updates, announcements, and community highlights.",
    action: "Explore",
    logo: "/images/x-logo.svg",
    href: "https://x.com/convex_world",
    color: "twitter",
  },
  {
    key: "blog",
    name: "Blog",
    description: "In-depth articles on technology, roadmap, and ecosystem developments.",
    action: "Read",
    logo: "/images/convex-blue.svg",
    href: "https://docs.convex.world/blog",
    color: "blog",
  },
];

export interface RecentItem {
  type: "blog" | "announcement";
  title: string;
  description: string;
  date: string;
  author: string;
  href: string;
  tags: string[];
}

export const FALLBACK_RECENT: RecentItem[] = [
  {
    type: "blog",
    title: "AI Meets the Lattice",
    description: "A new era of autonomous economic agents. Manus AI demonstrates how AI can actively participate as an economic actor on Convex.",
    date: "Nov 2025",
    author: "Manus AI",
    href: "https://docs.convex.world/blog/ai-meets-convex",
    tags: ["AI", "MCP", "Digital Assets"],
  },
  {
    type: "blog",
    title: "Countdown to Protonet",
    description: "The groundbreaking Convex Protonet goes live. Everything you need to know about the launch.",
    date: "Nov 2024",
    author: "Convex",
    href: "https://docs.convex.world/blog/protonet-countdown",
    tags: ["Protonet", "Launch", "Lattice"],
  },
];
