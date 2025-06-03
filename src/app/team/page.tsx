import Image from "next/image";

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
      twitter: "https://twitter.com/convex_world"
    }
  },
  {
    name: "Research Team",
    role: "R&D",
    description: "Our research team focuses on advancing the state of the art in consensus mechanisms, formal verification, and distributed systems.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      github: "https://github.com/Convex-Dev"
    }
  },
  {
    name: "Community Team",
    role: "Community & Developer Relations",
    description: "Dedicated to growing and supporting our global community of developers, validators, and contributors.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      discord: "https://discord.com/invite/xfYGq4CT7v",
      twitter: "https://twitter.com/convex_world"
    }
  },
  {
    name: "Advisory Team",
    role: "Strategic Advisors",
    description: "Industry veterans providing strategic guidance on technology, business, and ecosystem development.",
    imageUrl: "/images/logo_dark_blue.svg",
    links: {
      linkedin: "https://linkedin.com/company/convex-world"
    }
  }
];

export default function Team() {
  return (
    <div className="bg-convex-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-convex-dark-blue mb-6">
                Our Team
              </h1>
              <p className="text-xl text-convex-medium-blue mb-8">
                Meet the people building the future of decentralised economic systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-convex-dark-blue">
                        {member.name}
                      </h3>
                      <p className="text-convex-medium-blue font-medium">
                        {member.role}
                      </p>
                    </div>
                    <Image
                      src={member.imageUrl}
                      alt={`${member.name} Icon`}
                      width={70}
                      height={40}
                      className="ml-4"
                    />
                  </div>
                  <p className="text-convex-medium-blue mb-4">{member.description}</p>
                  <div className="flex gap-4">
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-convex-medium-blue hover:text-convex-dark-blue"
                      >
                        <Image
                          src="/images/social_github.png"
                          alt="GitHub"
                          width={24}
                          height={24}
                        />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-convex-medium-blue hover:text-convex-dark-blue"
                      >
                        <Image
                          src="/images/social_linkedin.png"
                          alt="LinkedIn"
                          width={24}
                          height={24}
                        />
                      </a>
                    )}
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-convex-medium-blue hover:text-convex-dark-blue"
                      >
                        <Image
                          src="/images/social_twitter.png"
                          alt="Twitter"
                          width={24}
                          height={24}
                        />
                      </a>
                    )}
                    {member.links.discord && (
                      <a
                        href={member.links.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-convex-medium-blue hover:text-convex-dark-blue"
                      >
                        <Image
                          src="/images/social_discord.png"
                          alt="Discord"
                          width={24}
                          height={24}
                        />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 