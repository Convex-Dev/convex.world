import Card from "@/components/Card";

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
    description: "Paisley is a membership-based cooperative for freelancers and creatives that uses the power of Convex to build a better future for all.",
    image: "/images/paisley-logo.png",
    link: "https://paisley.io"
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
                  <img
                    src={image}
                    alt={title}
                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
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
      </div>
  );
} 