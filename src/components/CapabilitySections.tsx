'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface CtaLink {
  label: string;
  href: string;
  external?: boolean;
}

interface CapabilitySection {
  id: string;
  number: string;
  subtitle: string;
  title: string;
  description: string;
  cta: CtaLink;
  secondaryCta?: CtaLink;
}

const capabilities: CapabilitySection[] = [
  {
    id: 'consensus',
    number: '01',
    subtitle: 'No Chains, No Delays',
    title: 'Converge to Truth',
    description: 'Convergent Proof of Stake achieves deterministic finality in milliseconds. Not a linear chain—a lattice where all participants observe the same truth simultaneously.',
    cta: { label: 'Read Whitepaper', href: 'https://docs.convex.world/docs/overview/convex-whitepaper', external: true },
  },
  {
    id: 'scale',
    number: '02',
    subtitle: 'Lattice Data Fabric',
    title: 'Scale Without Limits',
    description: 'No shards, no rollups—true horizontal scalability. The lattice is a global data fabric: self-healing, automatically replicated, and infinitely scalable on a P2P, self-sovereign basis.',
    cta: { label: 'Explore Lattice', href: 'https://docs.convex.world/docs/overview/lattice', external: true },
  },
  {
    id: 'performance',
    number: '03',
    subtitle: 'Economic Physics',
    title: 'Execute Predictably',
    description: 'Juice measures computational cost. Memory is recyclable. State converges deterministically. The CVM executes millions of operations with predictable, accountable resource consumption.',
    cta: { label: 'View Benchmarks', href: 'https://docs.convex.world/docs/overview/performance', external: true },
  },
  {
    id: 'developer',
    number: '04',
    subtitle: 'Convex Lisp',
    title: 'Express Economic Logic',
    description: 'One line can define a complete economic transaction. Offers resolve to settlements. Constraints are visible. Build systems where humans and autonomous agents participate under the same rules.',
    cta: { label: 'Language Guide', href: 'https://docs.convex.world/docs/cad/lisp', external: true },
    secondaryCta: { label: 'Try in Sandbox', href: '/sandbox', external: false },
  },
  {
    id: 'agentic',
    number: '05',
    subtitle: 'Human + Agent Co-Participation',
    title: 'Coordinate Autonomously',
    description: 'Humans define intent and constraints. Autonomous agents execute logic continuously. Both share the same costs, the same finality, the same accountability.',
    cta: { label: 'Agent Architecture', href: '/developers', external: false },
  },
  {
    id: 'mission',
    number: '06',
    subtitle: 'Public Infrastructure',
    title: 'Govern for All',
    description: 'Convex Foundation operates for the benefit of all participants. Open-source, inspectable, and accountable—infrastructure for deterministic economic systems.',
    cta: { label: 'Governance Model', href: 'https://docs.convex.world/docs/overview/governance', external: true },
    secondaryCta: { label: 'Read Manifesto', href: 'https://docs.convex.world/docs/overview/manifesto', external: true },
  },
];

function ConsensusGraphic() {
  return (
    <svg viewBox="0 0 120 120" className="cap-mini-svg">
      <circle className="consensus-ring consensus-ring-3" cx="60" cy="60" r="50" />
      <circle className="consensus-ring consensus-ring-2" cx="60" cy="60" r="35" />
      <circle className="consensus-ring consensus-ring-1" cx="60" cy="60" r="20" />
      <circle className="consensus-core" cx="60" cy="60" r="6" />
    </svg>
  );
}

function ScaleGraphic() {
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set(['0-1', '1-0', '1-2', '2-1']));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCells(prev => {
        const next = new Set(prev);
        const key = `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 3)}`;
        if (next.has(key)) {
          if (next.size > 2) next.delete(key);
        } else if (next.size < 6) {
          next.add(key);
        } else {
          const arr = Array.from(next);
          next.delete(arr[Math.floor(Math.random() * arr.length)]);
          next.add(key);
        }
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 120 120" className="cap-mini-svg">
      <g className="scale-grid">
        {[0, 1, 2].map((i) =>
          [0, 1, 2].map((j) => {
            const isActive = activeCells.has(`${i}-${j}`);
            return (
              <rect
                key={`${i}-${j}`}
                className={`scale-cell ${isActive ? 'scale-cell-lit' : ''}`}
                x={20 + j * 30}
                y={20 + i * 30}
                width="24"
                height="24"
                rx="3"
              />
            );
          })
        )}
      </g>
    </svg>
  );
}

function PerformanceGraphic({ isVisible }: { isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;
    setHasAnimated(true);
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * 1000000));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, hasAnimated]);

  const formatValue = (val: number) => {
    if (val >= 1000000) return '1M+ TPS';
    if (val >= 1000) return `${(val / 1000) | 0}K`;
    return String(val);
  };

  return (
    <svg viewBox="0 0 140 120" className="cap-mini-svg">
      <path className="perf-track" d="M 25 70 A 45 45 0 0 1 115 70" fill="none" />
      <path className={`perf-fill ${hasAnimated ? 'perf-animated' : ''}`} d="M 25 70 A 45 45 0 0 1 115 70" fill="none" />
      <line className={`perf-needle ${hasAnimated ? 'perf-animated' : ''}`} x1="70" y1="70" x2="70" y2="35" />
      <circle className="perf-needle-center" cx="70" cy="70" r="4" />
      <text className="perf-value" x="70" y="100" textAnchor="middle">{formatValue(displayValue)}</text>
    </svg>
  );
}

type TerminalLine = { type: 'command' | 'result'; text: string };

const terminalSequences: TerminalLine[][] = [
  [
    { type: 'command', text: '(transfer 100)' },
    { type: 'result', text: '100' },
  ],
  [
    { type: 'command', text: '(balance)' },
    { type: 'result', text: '999500' },
  ],
  [
    { type: 'command', text: '(+ 1 2 3)' },
    { type: 'result', text: '6' },
  ],
];

function DeveloperGraphic() {
  const [seqIdx, setSeqIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  const seq = terminalSequences[seqIdx];
  const line = seq[lineIdx];

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!line) {
      const id = setTimeout(() => {
        setSeqIdx(i => (i + 1) % terminalSequences.length);
        setLineIdx(0);
        setTyped('');
      }, 1500);
      return () => clearTimeout(id);
    }

    if (line.type === 'command') {
      if (typed.length < line.text.length) {
        const id = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), 60);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => { setLineIdx(i => i + 1); setTyped(''); }, 400);
      return () => clearTimeout(id);
    }

    if (line.type === 'result') {
      const id = setTimeout(() => { setLineIdx(i => i + 1); }, 800);
      return () => clearTimeout(id);
    }
  }, [line, typed]);

  const currentCommand = line?.type === 'command' ? typed : (lineIdx > 0 ? seq[0].text : '');
  const showResult = lineIdx >= 1 && seq[1];

  return (
    <div className="terminal-mini">
      <div className="terminal-mini-header">
        <span className="terminal-mini-dot red" />
        <span className="terminal-mini-dot yellow" />
        <span className="terminal-mini-dot green" />
      </div>
      <div className="terminal-mini-body">
        <div className="terminal-mini-line">
          <span className="terminal-mini-prompt">&gt;</span>
          <span className="terminal-mini-code">{currentCommand}</span>
          {line?.type === 'command' && <span className={`terminal-mini-cursor ${cursorOn ? '' : 'off'}`} />}
        </div>
        {showResult && (
          <div className="terminal-mini-line">
            <span className="terminal-mini-result">{seq[1].text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AgenticGraphic() {
  return (
    <svg viewBox="0 0 120 120" className="cap-mini-svg">
      <circle className="agent-core" cx="60" cy="60" r="18" />
      <circle className="agent-node agent-node-1" cx="60" cy="25" r="8" />
      <circle className="agent-node agent-node-2" cx="95" cy="60" r="8" />
      <circle className="agent-node agent-node-3" cx="60" cy="95" r="8" />
      <circle className="agent-node agent-node-4" cx="25" cy="60" r="8" />
      <line className="agent-beam agent-beam-1" x1="60" y1="42" x2="60" y2="33" />
      <line className="agent-beam agent-beam-2" x1="78" y1="60" x2="87" y2="60" />
      <line className="agent-beam agent-beam-3" x1="60" y1="78" x2="60" y2="87" />
      <line className="agent-beam agent-beam-4" x1="42" y1="60" x2="33" y2="60" />
    </svg>
  );
}

function MissionGraphic() {
  return (
    <svg viewBox="0 0 120 120" className="cap-mini-svg">
      <circle className="mission-globe" cx="60" cy="60" r="40" />
      <ellipse className="mission-equator" cx="60" cy="60" rx="40" ry="14" />
      <ellipse className="mission-meridian" cx="60" cy="60" rx="14" ry="40" />
    </svg>
  );
}

export default function CapabilitySections() {
  const [perfVisible, setPerfVisible] = useState(false);
  const perfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPerfVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (perfRef.current) {
      observer.observe(perfRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderGraphic = (id: string) => {
    switch (id) {
      case 'consensus': return <ConsensusGraphic />;
      case 'scale': return <ScaleGraphic />;
      case 'performance': return <PerformanceGraphic isVisible={perfVisible} />;
      case 'developer': return <DeveloperGraphic />;
      case 'agentic': return <AgenticGraphic />;
      case 'mission': return <MissionGraphic />;
      default: return null;
    }
  };

  return (
    <section className="capabilities-compact">
      <div className="capabilities-compact-grid">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            className={`cap-compact-card cap-compact-${cap.id}`}
            ref={cap.id === 'performance' ? perfRef : undefined}
          >
            <div className="cap-compact-graphic">
              {renderGraphic(cap.id)}
            </div>
            <div className="cap-compact-content">
              <div className="cap-compact-header">
                <span className="cap-compact-number">{cap.number}</span>
                <span className="cap-compact-subtitle">{cap.subtitle}</span>
              </div>
              <h3 className="cap-compact-title">{cap.title}</h3>
              <p className="cap-compact-description">{cap.description}</p>
              <div className="cap-compact-ctas">
                <Link
                  href={cap.cta.href}
                  className="cap-compact-cta-primary"
                  target={cap.cta.external ? '_blank' : undefined}
                  rel={cap.cta.external ? 'noopener noreferrer' : undefined}
                >
                  {cap.cta.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                {cap.secondaryCta && (
                  <Link
                    href={cap.secondaryCta.href}
                    className="cap-compact-cta-secondary"
                    target={cap.secondaryCta.external ? '_blank' : undefined}
                    rel={cap.secondaryCta.external ? 'noopener noreferrer' : undefined}
                  >
                    {cap.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
