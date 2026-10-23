import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PROTONET_PEER_URL, TESTNET_PEER_URL } from "@/lib/networks";
import { ORGANIZATION_LOGO } from "@/lib/structured-data";
import SkipLink from "@/components/SkipLink";

const SOCIAL_CARD_URL = "https://convex.world/brand/social-card.png";

export const metadata: Metadata = {
  title: {
    default: "Convex",
    template: "%s | Convex",
  },
  description:
    "Convex is the decentralised lattice platform for agentic economic systems — sub-second finality, infinite scalability, 100% green consensus. Created by Mike Anderson.",
  keywords: [
    "convex",
    "convex world",
    "decentralised platform",
    "decentralised consensus",
    "lattice technology",
    "agentic economy",
    "AI agent infrastructure",
    "autonomous agent platform",
    "smart contract platform",
    "blockchain alternative",
    "proof of stake consensus",
    "convergent proof of stake",
    "CPoS",
    "decentralised virtual machine",
    "web3 development",
    "web3 platform",
    "decentralised data fabric",
    "CRDT database",
    "decentralised file system",
    "DeFi platform",
    "token creation",
    "digital asset platform",
    "NFT platform",
    "decentralised identity",
    "decentralised exchange",
    "decentralised governance",
    "on-chain compiler",
    "Lisp smart contracts",
    "Convex Lisp",
    "functional programming smart contracts",
    "CVM token",
    "decentralised name service",
    "MCP server",
    "model context protocol",
    "Mike Anderson",
    "open source decentralised",
    "non-profit foundation",
    "green consensus",
    "energy efficient consensus",
    "sub-second finality",
    "infinite scalability",
  ],
  authors: [
    { name: "Mike Anderson", url: "https://github.com/mikera" },
    { name: "Convex Foundation" },
  ],
  creator: "Mike Anderson",
  publisher: "Convex Foundation",
  metadataBase: new URL("https://convex.world"),
  openGraph: {
    title: "Convex – Engine for the Agentic Economy",
    description:
      "The decentralised lattice platform for agentic economic systems. Sub-second finality, infinite scalability, 100% green consensus. Created by Mike Anderson.",
    url: "https://convex.world",
    siteName: "Convex",
    locale: "en_GB",
    type: "website",
    // Absolute URL required for Discord. Social platforms do not render SVG, so this is a PNG.
    images: [
      {
        url: SOCIAL_CARD_URL,
        width: 1200,
        height: 630,
        alt: "Convex – Engine for the agentic economy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convex – Engine for the Agentic Economy",
    description:
      "The decentralised lattice platform for agentic economic systems. Sub-second finality, infinite scalability, 100% green consensus.",
    images: [SOCIAL_CARD_URL],
    creator: "@convex_world",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    apple: "/brand/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0F206C",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Convex Foundation",
    alternateName: "Convex",
    url: "https://convex.world",
    logo: ORGANIZATION_LOGO,
    description:
      "Non-profit foundation building the decentralised lattice platform for agentic economic systems.",
    founder: {
      "@type": "Person",
      name: "Mike Anderson",
      url: "https://github.com/mikera",
      jobTitle: "Inventor and Chief Technology Officer",
    },
    sameAs: [
      "https://x.com/convex_world",
      "https://github.com/Convex-Dev",
      "https://discord.com/invite/xfYGq4CT7v",
      "https://www.youtube.com/@convex-world",
      "https://www.linkedin.com/company/convex-foundation/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mike Anderson",
    url: "https://github.com/mikera",
    jobTitle: "Inventor and Chief Technology Officer",
    description:
      "Creator and inventor of Convex, the decentralised lattice platform. Former founding CTO at Ocean Protocol. Technology veteran, represented the UK in the International Olympiad in Informatics.",
    affiliation: {
      "@type": "Organization",
      name: "Convex Foundation",
      url: "https://convex.world",
    },
    sameAs: [
      "https://github.com/mikera",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://docs.convex.world" />
        <link rel="dns-prefetch" href={TESTNET_PEER_URL} />
        <link rel="dns-prefetch" href={PROTONET_PEER_URL} />
        <link rel="preconnect" href="https://docs.convex.world" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
