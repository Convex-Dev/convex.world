import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users, Building2, Globe2 } from "lucide-react";
import ExtLink from "@/components/ExtLink";
import ContentPage from "@/components/ContentPage";
import CtaSection from "@/components/CtaSection";
import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import StructuredData from "@/lib/structured-data";
import { ecosystemItems } from "@/data/ecosystem-items";

export const metadata = {
  title: "Ecosystem — Projects on Convex",
  description: "Organisations and projects building on the Convex decentralised lattice platform. Explore the growing ecosystem of dApps, tools, and services powered by Convex.",
  keywords: ["Convex ecosystem", "decentralised projects", "dApps", "web3 projects", "blockchain ecosystem", "Convex partners"],
};

export default function Ecosystem() {
  return (
    <ContentPage>
      {/* Hero Section */}
      <PageHero
        className="community-hero"
        eyebrow="// Building on Convex"
        title="Featured Projects"
      />

      {/* Projects Grid */}
      <Section>
        <div className="grid-responsive">
          {ecosystemItems.map((item) => {
            const body = (
              <>
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
              </>
            );

            if (!item.link) {
              return (
                <div key={item.key} className="eco-card eco-card-static">
                  {body}
                  <div className="eco-card-link">
                    <span>Website launching soon</span>
                  </div>
                </div>
              );
            }

            return (
              <ExtLink
                key={item.key}
                href={item.link}
                className="hover-card eco-card"
              >
                {body}
                <div className="eco-card-link">
                  <span>Visit project</span>
                  <ArrowUpRight size={14} />
                </div>
              </ExtLink>
            );
          })}
        </div>
      </Section>

      {/* Join Section */}
      <Section>
        <SectionHeader number="002" title="Join the Ecosystem" subtitle="Build with us and be part of the next generation of decentralised systems" />
        <div className="eco-join-grid">
          <div className="eco-join-card">
            <div className="eco-join-icon">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <h4>For Enterprises</h4>
            <p>Deploy production-ready solutions on Convex infrastructure.</p>
            <ExtLink href="https://docs.convex.world" className="btn btn-secondary">
              Learn More
            </ExtLink>
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
            <ExtLink href="https://discord.gg/xfYGq4CT7v" className="btn btn-secondary">
              Join Discord
            </ExtLink>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CtaSection
        className="page-cta"
        title="Building on Convex?"
        description="If you're building on Convex and want to be featured here, reach out and we'll add you to the ecosystem."
        links={[
          { label: "Get in Touch", href: "https://discord.gg/xfYGq4CT7v", external: true },
        ]}
      />
      <StructuredData type="WebPage" metadata={metadata} path="/ecosystem/" />
    </ContentPage>
  );
}
