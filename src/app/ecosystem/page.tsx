import Card from "@/components/Card";
import Image from "next/image";

const ecosystemItems: Array<{
  title: string;
  description: string;
  image?: string;
  link?: string;
}> = [
  {
    title: "Covia.ai",
    description: "Covia is using Convex lattice technology to build the universal grid for AI, enabling powerful AI agent ecosystems across organisational boundaries.",
    image: "/images/covia.png",
    link: "https://covia.ai"
  },
  {
    title: "Paisley",
    description: "A membership-owned cooperative platform for freelancers and creatives that uses the power of Convex to build a better future for all.",
    image: "/images/paisley-logo.png",
    link: "https://paisley.io"
  },
  {
    title: "European Union",
    description: "The European Union has built on Convex as part of its Next Generation Internet programme, with a focus on efficient scalable DLT infrastructure and interoperable token exchange.",
    image: "/images/Europe.png",
    link: "https://docs.convex.world/docs/products/tokengine"
  },
  {
    title: "Lumoza",
    description: "Lumoza is transforming the mucic industry with solutions to help artists register and manage their copyrights.",
    image: "/images/lumoza.avif",
    link: "https://lumoza.io"
  },
  {
    title: "ReMeLife",
    description: "The first AI-Web3 Care-2-Earn community ecosystem. Using Convex to build ReMeGrid, a decentralised rewards-based care community.",
    link: "https://remelife.com",
    image: "/images/remelife.png"
  }
];

export default function Ecosystem() {
  return (
      <div className="container">
        <div className="hero-section">
          <h1>Convex Ecosystem</h1>
          <p className="intro-text">
            Companies and projects building on Convex and Lattice technology.
          </p>
        </div>

        <div className="ecosystem-grid">
          {ecosystemItems.map(({ title, description, image, link }) => {
            const content = (
              <>
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    width={400}
                    height={150}
                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                )}
                <h3 style={{ textAlign: "center" }}>{title}</h3>
                <p className="description-text">{description}</p>
              </>
            );

            return (
              <Card key={title} className="ecosystem-box">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ecosystem-box-link"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Card>
            );
          })}
        </div>

        <p>
          If you&apos;re building on Convex and want to be featured here, let us know and we&apos;ll add you to the list.
        </p>
      </div>
  );
} 