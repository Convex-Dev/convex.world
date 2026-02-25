import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users, Building2, Globe2 } from "lucide-react";
import ContentPage from "@/components/ContentPage";
import CtaSection from "@/components/CtaSection";
import SectionHeader from "@/components/SectionHeader";
import StructuredData from "@/lib/structured-data";
import { ecosystemItems } from "@/data/ecosystem-items";

export const metadata = {
  title: "Ecosystem",
  description: "Organisations and projects building on the Convex decentralised lattice platform.",
};

export default function Ecosystem() {
  return (
    <ContentPage>
      <StructuredData type="WebPage" metadata={metadata} path="/ecosystem/" />
      {/* Hero Section */}
      <section className="community-hero">
        <span className="dev-hero-tag">// Building on Convex</span>
        <h1>Featured Projects</h1>
        <p className="community-hero-text">Organisations leveraging Convex for real-world impact</p>
      </section>

      {/* Projects Grid */}
      <section className="eco-section">
        <div className="eco-grid">
          {ecosystemItems.map((item) => (
            <a
              key={item.key}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="eco-card"
            >
              <span className="eco-card-category">{item.category}</span>
              <div className="eco-card-header">
                <div className="eco-card-image">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={120}
                      height={120}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </div>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              <div className="eco-card-link">
                <span>Visit project</span>
                <ArrowUpRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="eco-section">
        <SectionHeader number="002" title="Join the Ecosystem" subtitle="Build with us and be part of the next generation of decentralised systems" />
        <div className="eco-join-grid">
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <h4>For Enterprises</h4>
            <p>Deploy production-ready solutions on Convex infrastructure.</p>
            <Link href="https://docs.convex.world" className="btn btn-secondary" target="_blank">
              Learn More
            </Link>
          </div>
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Users size={24} strokeWidth={1.5} />
            </div>
            <h4>For Developers</h4>
            <p>Start building with our comprehensive SDK and documentation.</p>
            <Link href="/developers" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Globe2 size={24} strokeWidth={1.5} />
            </div>
            <h4>For Communities</h4>
            <p>Join our Discord and connect with builders worldwide.</p>
            <Link href="https://discord.gg/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
              Join Discord
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="eco-cta"
        title="Building on Convex?"
        description="If you're building on Convex and want to be featured here, reach out and we'll add you to the ecosystem."
        links={[
          { label: "Get in Touch", href: "https://discord.gg/xfYGq4CT7v", external: true },
        ]}
      />
    </ContentPage>
  );
}
