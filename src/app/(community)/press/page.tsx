import { Mail, MapPin, Building2, ArrowUpRight, Github, Download } from "lucide-react";
import ExtLink from "@/components/ExtLink";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import StructuredData from "@/lib/structured-data";
import { messagingPillars, techSpecs } from "@/data/press";

export const metadata = {
  title: "Press",
  description:
    "Official descriptions, technical facts, and media assets for accurate coverage of Convex.",
};

export default function Press() {
  return (
    <ContentPage>
      <section className="press-hero">
        <span className="press-hero-eyebrow">Press &amp; Media</span>
        <h1>Convex Media Resources</h1>
        <p className="press-hero-quote">
          We build deterministic shared economic infrastructure for humans and
          autonomous agents.
        </p>
        <p className="press-hero-supporting">
          Official descriptions, technical facts, and media assets for accurate
          coverage of Convex.
        </p>
      </section>

      <section className="press-section">
        <SectionHeader
          number="001"
          title="About Convex"
          subtitle="Official description for media use"
        />
        <div className="press-boilerplate">
          <p>
            We are the Convex Foundation, a non-profit organisation stewarding
            the Convex network.
          </p>
          <p>
            Convex is a deterministic economic system that provides shared
            global state for humans and autonomous agents. It unifies compute,
            data, and value into a single execution fabric, enabling real-time
            coordination and transaction finality without centralised control.
          </p>
          <p>
            Convex is built on a Lattice Data Fabric and Convergent Proof of
            Stake, allowing the network to reach consensus in milliseconds
            while scaling horizontally without sharding or rollups.
          </p>
          <p>
            Our mission is to provide open, energy-efficient, and public
            infrastructure for the next generation of economic coordination.
          </p>
        </div>
      </section>

      <section className="press-section">
        <SectionHeader
          number="002"
          title="Media Kit"
          subtitle="Official brand assets with version control"
        />
        <p className="press-section-desc">
          We provide our official brand assets and documentation via a shared
          repository to ensure accuracy, transparency, and version control.
        </p>
        <div className="press-media-actions">
          <ExtLink
            href="https://drive.google.com/drive/folders/1Zrw76dOho2PL5jtN58Ips2Docl_z6-t5?usp=drive_link"
            className="btn btn-primary"
          >
            <Download size={16} />
            <span>Download Media Kit</span>
          </ExtLink>
        </div>
      </section>

      <section className="press-section">
        <SectionHeader
          number="003"
          title="Key Concepts"
          subtitle="Core messaging pillars"
        />
        <div className="press-pillars">
          {messagingPillars.map((pillar, i) => (
            <div key={pillar.title} className="press-pillar hover-card">
              <span className="press-pillar-index">0{i + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="press-section">
        <SectionHeader
          number="004"
          title="Technical Overview"
          subtitle="Specifications for technical press"
        />
        <div className="press-specs-card">
          <div className="press-specs">
            {techSpecs.map((spec) => (
              <div key={spec.label} className="press-spec">
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="press-section">
        <SectionHeader
          number="005"
          title="Convex Foundation"
          subtitle="Governance and stewardship"
        />
        <div className="press-foundation">
          <p>
            The Convex Foundation is a non-profit organisation responsible for
            the long-term stewardship of the Convex network. It oversees
            protocol development, ecosystem grants, and community governance.
          </p>
          <p>
            The Foundation is headquartered in Woking, United Kingdom and
            operates with a commitment to open, transparent, and
            community-driven governance.
          </p>
        </div>
      </section>

      <section className="press-section press-contact">
        <SectionHeader
          number="006"
          title="Press Contact"
          subtitle="For media inquiries, research requests, or verification"
        />
        <div className="press-contact-card">
          <div className="press-contact-details">
            <div className="press-contact-item">
              <Mail size={16} />
              <div>
                <span className="press-contact-label">Email</span>
                <a href="mailto:press@convex.world">press@convex.world</a>
              </div>
            </div>
            <div className="press-contact-item">
              <Building2 size={16} />
              <div>
                <span className="press-contact-label">Organisation</span>
                <span>Convex Foundation</span>
              </div>
            </div>
            <div className="press-contact-item">
              <MapPin size={16} />
              <div>
                <span className="press-contact-label">Location</span>
                <span>Woking, United Kingdom</span>
              </div>
            </div>
          </div>
          <div className="press-contact-links">
            <ExtLink href="https://github.com/Convex-Dev" className="press-link">
              <Github size={16} />
              GitHub
              <ArrowUpRight size={14} />
            </ExtLink>
            <ExtLink href="https://discord.com/invite/xfYGq4CT7v" className="press-link">
              Discord
              <ArrowUpRight size={14} />
            </ExtLink>
          </div>
        </div>
      </section>

      <StructuredData type="WebPage" metadata={metadata} path="/press/" />
    </ContentPage>
  );
}
