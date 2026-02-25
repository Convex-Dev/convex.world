import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ExtLink from "@/components/ExtLink";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import StructuredData from "@/lib/structured-data";
import { tools } from "@/data/tools";
import { getIcon } from "@/lib/icons";

export const metadata = {
  title: "Tools",
  description: "Explore, build, test, and deploy on Convex. CLI tools, SDKs, REPL sandbox, and developer resources.",
};

export default function Tools() {
  return (
    <ContentPage>
      {/* Hero Section */}
      <section className="tools-hero">
        <span className="dev-hero-tag">//Network Resources</span>
        <h1 className="page-hero-title">Convex Tools</h1>
        <p>Everything you need to explore, build, test, and deploy</p>
      </section>

      {/* Tools Grid */}
      <section className="content-section tools-section">
        <div className="grid-responsive">
          {tools.map((tool, i) => {
            const IconComponent = getIcon(tool.icon);
            const number = (i + 1).toString().padStart(2, "0");
            return (
              <div key={tool.title} className="tool-card-wrapper">
                <article className="hover-card tool-card">
                  <div className="tool-card-header">
                    <div className="tool-card-icon">
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                    <h3>{tool.title}</h3>
                    <span className="tool-card-number">{number}</span>
                  </div>
                  <p>{tool.description}</p>
                  <div className="tool-card-links">
                    {tool.links.map((link) => {
                      const ext = link.isExternal ?? false;
                      const inner = (
                        <>
                          <span>{link.name}</span>
                          {ext && <ArrowUpRight size={14} aria-hidden />}
                        </>
                      );
                      return ext ? (
                        <ExtLink
                          key={link.href + link.name}
                          href={link.href}
                          className="tool-card-link"
                        >
                          {inner}
                        </ExtLink>
                      ) : (
                        <Link key={link.href + link.name} href={link.href} className="tool-card-link">
                          {inner}
                        </Link>
                      );
                    })}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="content-section tools-section">
        <SectionHeader number="002" title="Quick Start" subtitle="Get up and running with the Convex CLI" />
        <div className="tools-quickstart">
          <div className="quickstart-step">
            <span className="quickstart-number">1</span>
            <div className="quickstart-content">
              <h4>Install Java 21+</h4>
              <div className="quickstart-code">
                <code>java --version</code>
              </div>
              <p className="quickstart-note">
                Download from{" "}
                <ExtLink href="https://adoptium.net/temurin/releases/">
                  Eclipse Temurin
                </ExtLink>
                {" "}or{" "}
                <ExtLink href="https://www.oracle.com/java/technologies/downloads/">
                  Oracle JDK
                </ExtLink>
              </p>
            </div>
          </div>
          <div className="quickstart-step">
            <span className="quickstart-number">2</span>
            <div className="quickstart-content">
              <h4>Download convex.jar</h4>
              <div className="quickstart-code">
                <code>curl -O https://convex.world/convex.jar</code>
              </div>
              <p className="quickstart-note">
                Or download from the{" "}
                <ExtLink href="https://docs.convex.world/docs/products/convex-cli">
                  CLI documentation
                </ExtLink>
              </p>
            </div>
          </div>
          <div className="quickstart-step">
            <span className="quickstart-number">3</span>
            <div className="quickstart-content">
              <h4>Run the CLI</h4>
              <div className="quickstart-code">
                <code>java -jar convex.jar</code>
              </div>
              <p className="quickstart-note">
                See{" "}
                <ExtLink href="https://docs.convex.world/docs/products/convex-cli">
                  full CLI docs
                </ExtLink>
                {" "}for commands and setup aliases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="page-cta tools-cta"
        title="Ready to build?"
        description="Explore the documentation for in-depth guides and API references."
        links={[
          { label: "Read the Docs", href: "https://docs.convex.world", external: true },
          { label: "Developer Overview", href: "/developers", variant: "secondary" },
        ]}
      />
      <StructuredData type="WebPage" metadata={metadata} path="/tools/" />
    </ContentPage>
  );
}
