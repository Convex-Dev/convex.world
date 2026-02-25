import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmartRedirect from "@/components/SmartRedirect";

export default function NotFound() {
  return (
    <>
      <SmartRedirect />
      <Navigation />
      <main className="not-found">
        <section className="not-found-content">
          <span className="not-found-code">404</span>
          <h1>Page not found</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="not-found-links">
            <Link href="/" className="btn btn-primary">Back to Home</Link>
            <Link href="/vision" className="btn btn-secondary">Explore Convex</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
