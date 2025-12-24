import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Convex",
    template: "%s | Convex",
  },
  description:
    "Create, collaborate, and ship production-grade decentralised economic systems using the Convex lattice technology.",
  keywords: [
    "blockchain",
    "decentralized",
    "convex",
    "web3",
    "consensus",
    "smart contracts",
  ],
  authors: [{ name: "Convex Team" }],
  creator: "Convex",
  publisher: "Convex",
  metadataBase: new URL("https://convex.world"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Convex – Decentralised Economic Systems",
    description:
      "Create, collaborate, and ship production-grade decentralised economic systems.",
    url: "https://convex.world",
    siteName: "Convex",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/social_card.webp",
        width: 1200,
        height: 630,
        alt: "Convex – Build the future of decentralised economies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convex",
    description:
      "Build production-grade decentralised economic systems using Convex lattice technology.",
    images: ["/images/social_twitter.webp"],
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
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0F206C",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Convex",
  url: "https://convex.world",
  logo: "https://convex.world/images/logo.webp",
  sameAs: [
    "https://twitter.com/convex_world",
    "https://github.com/convex-dev",
    "https://discord.com/invite/xfYGq4CT7v",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
