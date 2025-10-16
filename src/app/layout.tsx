import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function Head() {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0F206C" />
      <meta name="description" content="Create, collaborate, and ship decentralised economic systems." />
      <meta name="keywords" content="blockchain, decentralized, convex, web3, consensus, smart contracts" />
      <meta name="author" content="Convex" />
      
      {/* Open Graph */}
      <meta property="og:title" content="convex.world" />
      <meta property="og:description" content="Create, collaborate, and ship decentralised economic systems." />
      <meta property="og:url" content="https://convex-dev.github.io/convex.world" />
      <meta property="og:site_name" content="convex.world" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content="/convex.world/images/social_card.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="convex.world" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="convex.world" />
      <meta name="twitter:description" content="Create, collaborate, and ship decentralised economic systems." />
      <meta name="twitter:image" content="/convex.world/images/social_twitter.png" />
      <meta name="twitter:creator" content="@convex_world" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </head>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Navigation />
        <main className="app-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
