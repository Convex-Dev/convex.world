export interface ToolLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface Tool {
  title: string;
  description: string;
  icon: string;
  links: ToolLink[];
}

export const tools: Tool[] = [
  {
    title: "Sandbox",
    description: "Interactive REPL to run Convex Lisp queries and transactions on the testnet. Try examples, inspect state, and observe Juice costs.",
    icon: "code-2",
    links: [{ name: "Open Sandbox", href: "/sandbox" }],
  },
  {
    title: "Explorer",
    description: "Explore the Convex network, view transactions, blocks, and network activity in real-time.",
    icon: "compass",
    links: [
      { name: "Protonet", href: "https://peer.convex.live/explorer", isExternal: true },
      { name: "Testnet", href: "https://mikera1337-convex-testnet.hf.space/explorer", isExternal: true },
    ],
  },
  {
    title: "Convex Desktop",
    description: "Desktop application for power users and developers. Interact as a wallet and run local test networks.",
    icon: "monitor",
    links: [{ name: "Docs", href: "https://docs.convex.world/docs/products/convex-desktop", isExternal: true }],
  },
  {
    title: "REST API",
    description: "Access Convex network data and functionality through comprehensive REST API endpoints.",
    icon: "globe",
    links: [{ name: "Swagger", href: "https://peer.convex.live/swagger", isExternal: true }],
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for interacting with the network, managing accounts, and deploying contracts.",
    icon: "terminal",
    links: [{ name: "Docs", href: "https://docs.convex.world/docs/products/convex-cli", isExternal: true }],
  },
  {
    title: "Convex SDK",
    description: "Libraries for multiple programming languages to build applications on Convex.",
    icon: "boxes",
    links: [{ name: "Docs", href: "https://docs.convex.world/docs/sdk", isExternal: true }],
  },
];
