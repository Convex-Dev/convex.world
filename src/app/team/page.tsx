import Image from "next/image";
import ContentPage from "@/components/ContentPage";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    discord?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Core Team",
    role: "Leadership & Development",
    description: "Our core team brings together decades of experience in distributed systems, cryptography, and software engineering.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      github: "https://github.com/Convex-Dev",
      linkedin: "https://linkedin.com/company/convex-world",
      twitter: "https://twitter.com/convex_world",
    },
  },
  {
    name: "Research Team",
    role: "R&D",
    description: "Our research team focuses on advancing the state of the art in consensus mechanisms, formal verification, and distributed systems.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      github: "https://github.com/Convex-Dev",
    },
  },
  {
    name: "Community Team",
    role: "Community & Developer Relations",
    description: "Dedicated to growing and supporting our global community of developers, validators, and contributors.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      discord: "https://discord.com/invite/xfYGq4CT7v",
      twitter: "https://twitter.com/convex_world",
    },
  },
  {
    name: "Advisory Team",
    role: "Strategic Advisors",
    description: "Industry veterans providing strategic guidance on technology, business, and ecosystem development.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      linkedin: "https://linkedin.com/company/convex-world",
    },
  },
];

const socialIcons: Record<string, { src: string; alt: string }> = {
  github: { src: "/images/social_github.webp", alt: "GitHub" },
  linkedin: { src: "/images/social_linkedin.webp", alt: "LinkedIn" },
  twitter: { src: "/images/social_twitter.webp", alt: "Twitter" },
  discord: { src: "/images/social_discord.webp", alt: "Discord" },
};

export default function Team() {
  return (
    <ContentPage noLatticeBg>
      <div className="container">
        <div className="hero-section">
          <h1>Our Team</h1>
          <p className="intro-text">
            Meet the people building the future of decentralised economic systems
          </p>
        </div>

        <div className="tools-grid">
          {teamMembers.map((member) => (
            <article key={member.name} className="card">
              <div className="endpoint-header">
                <div>
                  <h3>{member.name}</h3>
                  <p className="role-text">{member.role}</p>
                </div>
                <Image
                  src={member.imageUrl}
                  alt={`${member.name} Icon`}
                  width={70}
                  height={40}
                />
              </div>
              <p className="description-text">{member.description}</p>
              <div>
                {Object.entries(member.links).map(([platform, url]) => {
                  if (!url) return null;
                  const icon = socialIcons[platform];
                  if (!icon) return null;
                  return (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                      <Image src={icon.src} alt={icon.alt} width={24} height={24} />
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </ContentPage>
  );
}
