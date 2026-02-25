import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import AgentLatticeAnimation from "@/components/AgentLatticeAnimation";
import StructuredData from "@/lib/structured-data";
import { howAgentsConnect } from "@/data/ai-how-agents-connect";
import { capabilities } from "@/data/ai-capabilities";
import { getIcon } from "@/lib/icons";

export const metadata = {
  title: "Agentic Economy — Convex",
  description: "The open network where autonomous agents are first-class economic participants. Built-in MCP, programmable accounts, and a live Lisp compiler.",
};

export default function AgenticEconomy() {
  return (
    <>
    <StructuredData type="WebPage" metadata={metadata} path="/ai/" />
    <SuperpowerPage
      tag="// Platform"
      title="Agentic Economy"
      description="The open network where autonomous agents are first-class economic participants. Built-in MCP, programmable accounts, and a live Lisp compiler give agents the same rights, the same costs, and the same finality as humans."
      highlights={[
        { label: "MCP", value: "Native" },
        { label: "Accounts", value: "Programmable" },
        { label: "Identity", value: "DID" },
      ]}
      visual={<div className="vision-hero-visual"><AgentLatticeAnimation /></div>}
    >
      {/* Why Agentic */}
      <section className="vision-section">
        <SectionHeader number="001" title="Why Agentic" subtitle="Purpose-built for autonomous economic actors" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">01</span>
            <h3>First-Class Participants</h3>
            <p>Agents aren&apos;t bolted-on integrations. On Convex, every account is a programmable Lisp machine. Fund an agent and it holds keys, owns tokens, signs transactions, and writes economic code autonomously.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">02</span>
            <h3>Symmetric Rules</h3>
            <p>Humans and agents share the same costs, the same finality, the same accountability. No second-class citizens, no privileged APIs, no separate runtimes.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">03</span>
            <h3>Live Code Generation</h3>
            <p>The on-chain compiler means agents generate, compile, and deploy new Convex Lisp directly on the lattice. No external toolchains, no build pipelines, no deployment gates.</p>
          </article>
        </div>
      </section>

      {/* How Agents Connect */}
      <section className="vision-section">
        <SectionHeader number="002" title="How Agents Connect" subtitle="From discovery to execution in milliseconds" />
        <div className="cpos-explainer">
          {howAgentsConnect.map((step) => {
            const Icon = getIcon(step.icon);
            return (
              <div key={step.title} className="cpos-step">
                <div className="cpos-step-number"><Icon size={20} strokeWidth={1.5} /></div>
                <div className="cpos-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities */}
      <section className="vision-section">
        <SectionHeader number="003" title="Capabilities" subtitle="The agent toolkit on the lattice" />
        <div className="vision-principles-grid">
          {capabilities.map((cap) => {
            const Icon = getIcon(cap.icon);
            return (
              <article key={cap.title} className="vision-principle-card">
                <div className="vision-principle-icon"><Icon size={22} strokeWidth={1.5} /></div>
                <h4>{cap.title}</h4>
                <p>{cap.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Ecosystem */}
      <section className="vision-section">
        <SectionHeader number="004" title="Ecosystem" subtitle="Infrastructure and standards for the agentic economy" />
        <div className="vision-pillars">
          <article className="vision-pillar">
            <span className="vision-pillar-number">
              <a href="https://www.covia.ai/" target="_blank" rel="noopener noreferrer">covia.ai</a>
            </span>
            <h3>Covia Grid</h3>
            <p>The universal grid for AI orchestration. Covia provides MCP-enabled access to Convex, enabling agent ecosystems across organisational boundaries.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">
              <a href="https://www.thinkagents.ai/" target="_blank" rel="noopener noreferrer">THINK</a>
            </span>
            <h3>THINK Agent Standard</h3>
            <p>Universal framework for autonomous on-chain agents, co-developed by Convex with 70+ companies. Soul, Mind, Body architecture for sovereign digital entities.</p>
          </article>
          <article className="vision-pillar">
            <span className="vision-pillar-number">
              <a href="https://github.com/Convex-Dev" target="_blank" rel="noopener noreferrer">GitHub</a>
            </span>
            <h3>Open Source</h3>
            <p>The full Convex stack is open source. Inspect, fork, contribute. Agents operate on infrastructure anyone can verify.</p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Build with agents"
        description="Connect your agent to the lattice or explore the developer tools."
        links={[
          { label: "MCP Documentation", href: "https://docs.convex.world/docs/cad/mcp", external: true },
          { label: "Developer Overview", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
    </>
  );
}
