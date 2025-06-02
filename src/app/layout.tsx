import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "convex.world",
  description: "Create, collaborate, and ship decentralised economic systems.",
  metadataBase: new URL('https://convex.world'),
  openGraph: {
    title: 'convex.world',
    description: 'Create, collaborate, and ship decentralised economic systems.',
    url: 'https://convex.world',
    siteName: 'convex.world',
    images: [
      {
        url: '/images/social_card.png',
        width: 1200,
        height: 630,
        alt: 'convex.world',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'convex.world',
    description: 'Create, collaborate, and ship decentralised economic systems.',
    images: ['/images/social_twitter.png'],
    creator: '@convex_world',
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="min-h-screen bg-convex-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navigation />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
