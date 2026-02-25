import superpowers from "@/data/superpowers.json";

export interface NavDropdownItem {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
  icon: string;
  featured?: boolean;
}

export interface NavDropdownSection {
  title?: string;
  items: NavDropdownItem[];
}

export interface NavDropdown {
  key: string;
  label: string;
  href: string;
  navClass?: string;
  graphicKey?: string;
  featuredItem?: NavDropdownItem;
  sections: NavDropdownSection[];
}

const innovationCategories: Record<string, string> = {
  infrastructure: "Core Infrastructure",
  economy: "Smart Economy",
  platform: "Platform",
};

function buildInnovationSections(): NavDropdownSection[] {
  const groups: Record<string, NavDropdownItem[]> = {};
  for (const key of Object.keys(innovationCategories)) groups[key] = [];

  for (const sp of superpowers) {
    const cat = sp.category ?? "platform";
    if (groups[cat]) {
      groups[cat].push({
        label: sp.title,
        href: sp.href,
        external: "external" in sp ? (sp.external as boolean) : undefined,
        description: sp.desc,
        icon: sp.icon ?? "shield",
      });
    }
  }

  return Object.entries(innovationCategories).map(([cat, title]) => ({
    title,
    items: groups[cat],
  }));
}

export const navDropdowns: NavDropdown[] = [
  {
    key: "innovation",
    label: "Innovation",
    href: "/vision",
    navClass: "nav-link-innovation",
    featuredItem: {
      label: "The Vision",
      href: "/vision",
      description: "The open network for data and value in an agentic world",
      icon: "eye",
    },
    sections: buildInnovationSections(),
  },
  {
    key: "developers",
    label: "Developers",
    href: "/developers",
    navClass: "nav-link-bold",
    graphicKey: "Developers",
    sections: [
      {
        title: "Start Building",
        items: [
          { label: "Developer Overview", href: "/developers", description: "Introduction to building on Convex", icon: "code-2", featured: true },
          { label: "Documentation", href: "https://docs.convex.world/docs/intro", external: true, description: "Comprehensive guides and references", icon: "book-open" },
          { label: "Convex Lisp Tutorial", href: "https://docs.convex.world/docs/tutorial/convex-lisp", external: true, description: "Learn the language", icon: "graduation-cap" },
          { label: "TypeScript SDK", href: "https://docs.convex.world/docs/tutorial/client-sdks/typescript", external: true, description: "Client library for JS/TS", icon: "package" },
          { label: "Java Client API", href: "https://github.com/Convex-Dev/convex/tree/develop/convex-java", external: true, description: "Client library for Java/JVM", icon: "package" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Sandbox REPL", href: "/sandbox", description: "Try Convex Lisp live", icon: "terminal" },
          { label: "CADs", href: "https://docs.convex.world/docs/cad/0000cads", external: true, description: "Convex Architecture Documents", icon: "file-code" },
          { label: "GitHub", href: "https://github.com/Convex-Dev", external: true, description: "Source code and examples", icon: "github" },
          { label: "Full Docs", href: "https://docs.convex.world", external: true, description: "Complete documentation site", icon: "book-open" },
        ],
      },
    ],
  },
  {
    key: "network",
    label: "Network",
    href: "/tools",
    graphicKey: "network",
    sections: [
      {
        title: "Tools",
        items: [
          { label: "Tools Overview", href: "/tools", description: "Explore all developer tools", icon: "wrench", featured: true },
          { label: "Sandbox", href: "/sandbox", description: "Interactive REPL console", icon: "terminal" },
          { label: "REST API", href: "https://peer.convex.live/swagger", external: true, description: "API reference", icon: "server" },
          { label: "CLI Tool", href: "https://docs.convex.world/docs/products/convex-cli", external: true, description: "Command-line interface", icon: "terminal" },
        ],
      },
      {
        title: "Inspect",
        items: [
          { label: "Protonet Explorer", href: "https://peer.convex.live/explorer", external: true, icon: "globe" },
          { label: "Testnet Explorer", href: "https://mikera1337-convex-testnet.hf.space/explorer", external: true, icon: "globe" },
          { label: "Convex Desktop", href: "https://docs.convex.world/docs/products/convex-desktop", external: true, icon: "monitor-smartphone" },
        ],
      },
    ],
  },
  {
    key: "ecosystem",
    label: "Ecosystem",
    href: "/ecosystem",
    graphicKey: "ecosystem",
    sections: [
      {
        title: "Explore",
        items: [
          { label: "Ecosystem Overview", href: "/ecosystem", description: "Projects building on Convex", icon: "compass", featured: true },
          { label: "Convex Coin", href: "/coin", description: "CVM tokenomics and utility", icon: "coins" },
          { label: "Governance", href: "https://docs.convex.world/docs/overview/governance", external: true, description: "Foundation and governance model", icon: "scale" },
        ],
      },
      {
        title: "Learn",
        items: [
          { label: "Whitepaper", href: "https://docs.convex.world/docs/overview/convex-whitepaper", external: true, icon: "file-text" },
          { label: "Lattice Technology", href: "https://docs.convex.world/docs/overview/lattice", external: true, icon: "layers" },
          { label: "Architecture", href: "https://docs.convex.world/docs/overview/concepts", external: true, icon: "boxes" },
        ],
      },
    ],
  },
  {
    key: "community",
    label: "Community",
    href: "/community",
    graphicKey: "community",
    sections: [
      {
        title: "Connect",
        items: [
          { label: "Community Hub", href: "/community", description: "Join the conversation", icon: "users", featured: true },
          { label: "Discord", href: "https://discord.com/invite/xfYGq4CT7v", external: true, description: "Chat with builders", icon: "message-circle" },
          { label: "Twitter / X", href: "https://x.com/convex_world", external: true, description: "Latest updates", icon: "twitter" },
          { label: "YouTube", href: "https://www.youtube.com/@convex-world", external: true, description: "Tutorials and demos", icon: "youtube" },
        ],
      },
      {
        title: "Content",
        items: [
          { label: "Blog", href: "https://docs.convex.world/blog", external: true, icon: "newspaper" },
          { label: "Stack Overflow", href: "https://stackoverflow.com/questions/tagged/convex", external: true, icon: "help-circle" },
        ],
      },
    ],
  },
];
