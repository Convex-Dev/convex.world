import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users, Building2, Globe2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ecosystemItems = [
  {
    key: "covia",
    title: "Covia.ai",
    description: "Building the universal grid for AI, enabling powerful AI agent ecosystems across organisational boundaries.",
    category: "AI Infrastructure",
    image: "/images/covia.webp",
    link: "https://covia.ai"
  },
  {
    key: "paisley",
    title: "Paisley",
    description: "A membership-owned cooperative platform for freelancers and creatives building a better future for all.",
    category: "Creator Economy",
    image: "/images/paisley-logo.webp",
    link: "https://paisley.io"
  },
  {
    key: "eu",
    title: "European Union",
    description: "Part of the Next Generation Internet programme, focusing on efficient scalable DLT infrastructure and interoperable token exchange.",
    category: "Government",
    image: "/images/Europe.webp",
    link: "https://docs.convex.world/docs/products/tokengine"
  },
  {
    key: "lumoza",
    title: "Lumoza",
    description: "Transforming the music industry with solutions to help artists register and manage their copyrights.",
    category: "Music & IP",
    image: "/images/lumoza.avif",
    link: "https://lumoza.io"
  },
  {
    key: "remelife",
    title: "ReMeLife",
    description: "The first AI-Web3 Care-2-Earn community ecosystem, building ReMeGrid—a decentralised rewards-based care community.",
    category: "Healthcare",
    image: "/images/remelife.webp",
    link: "https://remelife.com"
  },
  {
    key: "alphacards",
    title: "Alpha Cards",
    description: "A satirical collectible trading card game parodying luxury finance culture, with on-chain card forging and trading powered by Convex.",
    category: "Gaming",
    image: "/images/alphacards.webp",
    link: "https://mikera.github.io/alpha-cards/"
  }
];

export default function Ecosystem() {
  return (
    <>
      <Navigation />
      <main>
            <div className="lattice-bg" aria-hidden="true" />

            {/* Hero Section */}
            <section className="community-hero">
              <span className="dev-hero-tag">// Building on Convex</span>
              <h1>
                Featured Projects
              </h1>
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
              <div className="section-header">
                <span className="section-number">// 002</span>
                <h2>Join the Ecosystem</h2>
                <p>Build with us and be part of the next generation of decentralised systems</p>
              </div>

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
            <section className="eco-cta">
              <h3>Building on Convex?</h3>
              <p>If you&apos;re building on Convex and want to be featured here, reach out and we&apos;ll add you to the ecosystem.</p>
              <Link href="https://discord.gg/xfYGq4CT7v" className="btn btn-primary" target="_blank">
                Get in Touch
              </Link>
            </section>

            <div className="geo-line" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
