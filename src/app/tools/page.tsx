import Image from "next/image";
import Link from "next/link";

interface Tool {
  title: string;
  description: string;
  link: {
    href: string;
    isExternal: boolean;
  };
  icon: string;
}

const tools: Tool[] = [
  {
    title: "REST API",
    description: "Access Convex network data and functionality through our comprehensive REST API endpoints.",
    link: {
      href: "/tools/rest-api",
      isExternal: false
    },
    icon: "/images/logo_dark_blue.svg"
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for interacting with the Convex network, managing accounts, and deploying smart contracts.",
    link: {
      href: "https://docs.convex.world/docs/tools/cli",
      isExternal: true
    },
    icon: "/images/logo_dark_blue.svg"
  },
  {
    title: "SDKs",
    description: "Native libraries for multiple programming languages to build applications on Convex.",
    link: {
      href: "https://docs.convex.world/docs/tools/sdks",
      isExternal: true
    },
    icon: "/images/logo_dark_blue.svg"
  },
  {
    title: "Developer Tools",
    description: "Suite of development tools including debugger, test framework, and local network simulator.",
    link: {
      href: "https://docs.convex.world/docs/tools/developer",
      isExternal: true
    },
    icon: "/images/logo_dark_blue.svg"
  }
];

export default function Tools() {
  return (
    <div className="bg-convex-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-convex-dark-blue mb-6">
                Developer Tools
              </h1>
              <p className="text-xl text-convex-medium-blue mb-8">
                Everything you need to build on the Convex network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {tools.map((tool) => (
                <div
                  key={tool.title}
                  className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue hover:border-convex-medium-blue transition-colors"
                >
                  {tool.link.isExternal ? (
                    <a
                      href={tool.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <ToolContent tool={tool} />
                    </a>
                  ) : (
                    <Link href={tool.link.href} className="block">
                      <ToolContent tool={tool} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ToolContent({ tool }: { tool: Tool }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-convex-dark-blue">
            {tool.title}
          </h3>
        </div>
        <Image
          src={tool.icon}
          alt={`${tool.title} Icon`}
          width={70}
          height={40}
          className="ml-4"
        />
      </div>
      <p className="text-convex-medium-blue">{tool.description}</p>
      <div className="mt-4 flex items-center text-convex-medium-blue">
        <span className="text-sm">
          {tool.link.isExternal ? "Learn more" : "View documentation"}
        </span>
        {tool.link.isExternal && (
          <Image src="/link.svg" alt="External Link" width={16} height={16} className="w-4 h-4 ml-1" />
        )}
      </div>
    </>
  );
} 