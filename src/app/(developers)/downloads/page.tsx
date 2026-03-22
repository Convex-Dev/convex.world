import ExtLink from "@/components/ExtLink";
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import InstallCommands, { CopyBlock } from "@/components/InstallCommands";
import StructuredData from "@/lib/structured-data";

export const metadata = {
  title: "Downloads — Install Convex",
  description:
    "Download Convex — one-command install scripts, release builds, Docker images, and source code. Run a decentralised peer node in minutes.",
  keywords: ["download Convex", "install Convex", "Convex peer", "Docker image", "build from source", "Convex CLI", "run peer node"],
};

export default function Downloads() {
  return (
    <ContentPage>
      {/* Quick Install */}
      <section className="content-section tools-section">
        <SectionHeader
          number="001"
          title="Quick Install"
          subtitle="One command to install Convex and add it to your PATH"
        />
        <InstallCommands />
        <p className="downloads-prereq">
          Requires{" "}
          <ExtLink href="https://adoptium.net/temurin/releases/">
            Java 21+
          </ExtLink>
          . The installer checks and will tell you if Java is missing.
        </p>
      </section>

      {/* Direct Downloads */}
      <section className="content-section tools-section">
        <SectionHeader
          number="002"
          title="Direct Download"
          subtitle="Download convex.jar and run it with java -jar"
        />
        <div className="grid-responsive downloads-grid">
          <article className="hover-card tool-card">
            <div className="tool-card-header">
              <h3>Latest Stable Release</h3>
            </div>
            <p>
              Production-ready build, fully tested. Recommended for most users.
            </p>
            <div className="tool-card-links">
              <ExtLink
                href="https://github.com/Convex-Dev/convex/releases/latest/download/convex.jar"
                className="tool-card-link"
              >
                <span>Download convex.jar</span>
              </ExtLink>
              <ExtLink
                href="https://github.com/Convex-Dev/convex/releases/latest"
                className="tool-card-link"
              >
                <span>Release Notes</span>
              </ExtLink>
            </div>
          </article>

          <article className="hover-card tool-card">
            <div className="tool-card-header">
              <h3>Development Snapshot</h3>
            </div>
            <p>
              Latest build from the develop branch. May contain incomplete
              features or breaking changes.
            </p>
            <div className="tool-card-links">
              <ExtLink
                href="https://github.com/Convex-Dev/convex/releases/tag/snapshot-develop"
                className="tool-card-link"
              >
                <span>Snapshot Build</span>
              </ExtLink>
            </div>
          </article>

          <article className="hover-card tool-card">
            <div className="tool-card-header">
              <h3>All Releases</h3>
            </div>
            <p>
              Browse all versions with changelogs. Pin to a specific version for
              production deployments.
            </p>
            <div className="tool-card-links">
              <ExtLink
                href="https://github.com/Convex-Dev/convex/releases"
                className="tool-card-link"
              >
                <span>GitHub Releases</span>
              </ExtLink>
            </div>
          </article>
        </div>
      </section>

      {/* Docker */}
      <section className="content-section tools-section">
        <SectionHeader
          number="003"
          title="Docker"
          subtitle="Run a Convex peer in a container"
        />
        <div className="tools-quickstart">
          <div className="quickstart-step">
            <span className="quickstart-number">1</span>
            <div className="quickstart-content">
              <h4>Pull the image</h4>
              <CopyBlock text="docker pull convexlive/convex:latest" />
            </div>
          </div>
          <div className="quickstart-step">
            <span className="quickstart-number">2</span>
            <div className="quickstart-content">
              <h4>Run a peer</h4>
              <CopyBlock text="docker run convexlive/convex peer start" />
            </div>
          </div>
        </div>
        <p className="quickstart-note">
          Available tags: <code>latest</code> (stable), <code>snapshot</code>{" "}
          (develop), or a specific version like <code>0.8.3</code>.{" "}
          <ExtLink href="https://hub.docker.com/r/convexlive/convex">
            View on Docker Hub
          </ExtLink>
        </p>
      </section>

      {/* Build from Source */}
      <section className="content-section tools-section">
        <SectionHeader
          number="004"
          title="Build from Source"
          subtitle="Clone the repository and build with Maven"
        />
        <div className="tools-quickstart">
          <div className="quickstart-step">
            <span className="quickstart-number">1</span>
            <div className="quickstart-content">
              <h4>Clone the repository</h4>
              <CopyBlock text="git clone https://github.com/Convex-Dev/convex.git" />
            </div>
          </div>
          <div className="quickstart-step">
            <span className="quickstart-number">2</span>
            <div className="quickstart-content">
              <h4>Build</h4>
              <CopyBlock text="cd convex && mvn clean install" />
              <p className="quickstart-note">
                Requires Java 21+ and Maven 3.7+. The built JAR is at{" "}
                <code>convex-integration/target/convex.jar</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <StructuredData type="WebPage" metadata={metadata} path="/downloads/" />
    </ContentPage>
  );
}
