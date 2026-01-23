import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import "../globals.css";
import { ConvexProvider } from "@/contexts/ConvexContext";
import { WalletProvider } from "@/contexts/WalletContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Convex",
    template: "%s | Convex",
  },
  description:
    "Decentralised agentic economic systems using Convex lattice technology.",
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
    title: "Convex – Engine for the Agentic Economy",
    description:
      "Agentic economic systems built on lattice technology.",
    url: "https://convex.world",
    siteName: "Convex",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://convex.world/images/logo_dark_blue.svg",
        width: 1200,
        height: 630,
        alt: "Convex – Engine for the agentic economy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convex",
    description:
      "Build production-grade decentralised economic systems using Convex lattice technology.",
    images: ["https://convex.world/images/logo_dark_blue.svg"],
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
  logo: "https://convex.world/images/convex.svg",
  sameAs: [
    "https://twitter.com/convex_world",
    "https://github.com/convex-dev",
    "https://discord.com/invite/xfYGq4CT7v",
  ],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <main>
        <WalletProvider persistKey="convex.world:wallet">
          <ConvexProvider>
            {children}
          </ConvexProvider>
        </WalletProvider>
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
