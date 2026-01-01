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
  titlePrefix?: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
  description: string;
  cta: CtaLink;
  secondaryCta?: CtaLink;
}

const capabilities: CapabilitySection[] = [
  {
    id: 'consensus',
    number: '01',
    titleHighlight: 'Deterministic',
    titleSuffix: 'Consensus',
    subtitle: 'State Convergence',
    description: 'Convergent Proof of Stake achieves state convergence in milliseconds. No blocks, no delays—just deterministic finality where all participants observe the same truth.',
    cta: { label: 'Read Whitepaper', href: 'https://docs.convex.world/docs/overview/convex-whitepaper', external: true },
  },
  {
    id: 'scale',
    number: '02',
    titleHighlight: 'Lattice',
    titleSuffix: 'Architecture',
    subtitle: 'Global State Fabric',
    description: 'Every participant shares one deterministic data fabric. No shards, no rollups—true horizontal scalability where compute has weight and storage is recyclable.',
    cta: { label: 'Explore Lattice', href: 'https://docs.convex.world/docs/overview/lattice', external: true },
  },
  {
    id: 'performance',
    number: '03',
    titleHighlight: 'Economic',
    titleSuffix: 'Physics',
    subtitle: 'Compute Has Weight',
    description: 'Juice measures computational cost. Memory is recyclable. State converges deterministically. The CVM executes millions of operations with predictable resource consumption.',
    cta: { label: 'View Benchmarks', href: 'https://docs.convex.world/docs/overview/performance', external: true },
  },
  {
    id: 'developer',
    number: '04',
    titlePrefix: 'Convex',
    titleHighlight: 'Lisp',
    subtitle: 'Functional Economics',
    description: 'Express economic logic in a single line. Offers resolve to settlements. Constraints are visible. Build systems where humans and autonomous agents participate under the same rules.',
    cta: { label: 'Read Documentation', href: 'https://docs.convex.world', external: true },
    secondaryCta: { label: 'View Source', href: 'https://github.com/Convex-Dev', external: true },
  },
  {
    id: 'agentic',
    number: '05',
    titleHighlight: 'Autonomous',
    titleSuffix: 'Agents',
    subtitle: 'Economic Participants',
    description: 'Humans define intent and constraints. Autonomous agents execute logic continuously. Both share the same costs, the same finality, the same accountability.',
    cta: { label: 'Agent Architecture', href: 'https://docs.convex.world/docs/overview/agentic-architecture', external: true },
  },
  {
    id: 'mission',
    number: '06',
    titleHighlight: 'Public',
    titleSuffix: 'Infrastructure',
    subtitle: 'Non-Profit Governance',
    description: 'Convex Foundation operates for the benefit of all participants. Open-source, inspectable, and accountable—infrastructure for deterministic economic systems.',
    cta: { label: 'Governance Model', href: 'https://docs.convex.world/docs/overview/governance', external: true },
    secondaryCta: { label: 'Read Manifesto', href: 'https://docs.convex.world/docs/overview/manifesto', external: true },
  },
];

function ConsensusGraphic() {
  return (
    <div className="cap-graphic cap-graphic-consensus">
      <svg viewBox="0 0 200 200" className="cap-svg">
        <circle className="consensus-ring consensus-ring-4" cx="100" cy="100" r="80" />
        <circle className="consensus-ring consensus-ring-3" cx="100" cy="100" r="60" />
        <circle className="consensus-ring consensus-ring-2" cx="100" cy="100" r="40" />
        <circle className="consensus-ring consensus-ring-1" cx="100" cy="100" r="20" />
        <circle className="consensus-core" cx="100" cy="100" r="6" />
      </svg>
    </div>
  );
}

function ScaleGraphic() {
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCells(prev => {
        const next = new Set(prev);
        const key = `${Math.floor(Math.random() * 4)}-${Math.floor(Math.random() * 4)}`;
        if (next.has(key)) {
          next.delete(key);
        } else if (next.size < 6) {
          next.add(key);
        } else {
          const arr = Array.from(next);
          next.delete(arr[Math.floor(Math.random() * arr.length)]);
          next.add(key);
        }
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="cap-graphic cap-graphic-scale">
      <svg viewBox="0 0 200 200" className="cap-svg">
        <g className="scale-grid">
          {[0, 1, 2, 3].map((i) =>
            [0, 1, 2, 3].map((j) => {
              const isActive = activeCells.has(`${i}-${j}`);
              return (
                <rect
                  key={`${i}-${j}`}
                  className={`scale-cell ${isActive ? 'scale-cell-lit' : ''}`}
                  x={30 + j * 40}
                  y={30 + i * 40}
                  width="30"
                  height="30"
                />
              );
            })
          )}
        </g>
      </svg>
    </div>
  );
}

function PerformanceGraphic({ isVisible }: { isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;
    setHasAnimated(true);
    const duration = 2500;
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
    if (val >= 1000000) return '1M+';
    if (val >= 1000) return `${(val / 1000) | 0}K`;
    return String(val);
  };
  
  return (
    <div className="cap-graphic cap-graphic-performance">
      <svg viewBox="0 0 200 200" className="cap-svg">
        <path className="perf-track" d="M 30 140 A 70 70 0 0 1 170 140" fill="none" />
        <path className={`perf-fill ${hasAnimated ? 'perf-animated' : ''}`} d="M 30 140 A 70 70 0 0 1 170 140" fill="none" />
        <line className={`perf-needle ${hasAnimated ? 'perf-animated' : ''}`} x1="100" y1="140" x2="100" y2="70" />
        <circle className="perf-needle-center" cx="100" cy="140" r="6" />
        <text className="perf-value" x="100" y="175" textAnchor="middle">{formatValue(displayValue)}</text>
      </svg>
    </div>
  );
}

type TerminalLine = { type: 'command' | 'result'; text: string };

const terminalSequences: { lines: TerminalLine[] }[] = [
  {
    lines: [
      { type: 'command', text: '(@convex.fungible/mint MY-TOKEN 1000000)' },
      { type: 'result', text: '1000000' },
      { type: 'command', text: '(@convex.fungible/transfer MY-TOKEN user 500)' },
      { type: 'result', text: '500' },
    ]
  },
  {
    lines: [
      { type: 'command', text: '(def square (fn [x] (* x x)))' },
      { type: 'result', text: '#fn' },
      { type: 'command', text: '(map square [1 2 3 4 5])' },
      { type: 'result', text: '[1 4 9 16 25]' },
    ]
  },
  {
    lines: [
      { type: 'command', text: '(@convex.fungible/balance MY-TOKEN)' },
      { type: 'result', text: '999500' },
      { type: 'command', text: '(+ 1 2 3 4 5)' },
      { type: 'result', text: '15' },
    ]
  },
  {
    lines: [
      { type: 'command', text: '(defn greet [name] (str "Hello, " name))' },
      { type: 'result', text: '#fn' },
      { type: 'command', text: '(greet "Convex")' },
      { type: 'result', text: '"Hello, Convex"' },
    ]
  },
];

function DeveloperGraphic() {
  const [seqIdx, setSeqIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorOn, setCursorOn] = useState(true);

  const seq = terminalSequences[seqIdx];
  const line = seq.lines[lineIdx];

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
        setIsTyping(true);
      }, 2000);
      return () => clearTimeout(id);
    }

    if (line.type === 'command' && isTyping) {
      if (typed.length < line.text.length) {
        const id = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), 25 + Math.random() * 20);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => { setIsTyping(false); setLineIdx(i => i + 1); setTyped(''); }, 400);
      return () => clearTimeout(id);
    }

    if (line.type === 'result') {
      const id = setTimeout(() => { setLineIdx(i => i + 1); setIsTyping(true); }, 800);
      return () => clearTimeout(id);
    }
  }, [line, typed, isTyping]);

  const renderLines = () => {
    const out: React.ReactElement[] = [];
    for (let i = 0; i < seq.lines.length; i++) {
      const l = seq.lines[i];
      if (i < lineIdx) {
        out.push(
          <div key={i} className="dev-line dev-line-visible">
            {l.type === 'command' && <span className="dev-prompt">&gt;</span>}
            <span className={l.type === 'command' ? 'dev-code' : 'dev-result'}>{l.text}</span>
          </div>
        );
      } else if (i === lineIdx && l.type === 'command' && isTyping) {
        out.push(
          <div key={i} className="dev-line dev-line-visible">
            <span className="dev-prompt">&gt;</span>
            <span className="dev-code">{typed}</span>
            <span className={`dev-cursor${cursorOn ? '' : ' dev-cursor-hidden'}`} />
          </div>
        );
      } else if (i === lineIdx && l.type === 'result') {
        out.push(
          <div key={i} className="dev-line dev-line-visible">
            <span className="dev-result">{l.text}</span>
          </div>
        );
      }
    }
    if (lineIdx >= seq.lines.length) {
      out.push(
        <div key="end" className="dev-line dev-line-visible">
          <span className="dev-prompt">&gt;</span>
          <span className={`dev-cursor${cursorOn ? '' : ' dev-cursor-hidden'}`} />
        </div>
      );
    }
    return out;
  };
  
  return (
    <div className="cap-graphic cap-graphic-developer">
      <div className="dev-terminal">
        <div className="dev-terminal-header">
          <span className="dev-dot dev-dot-red" />
          <span className="dev-dot dev-dot-yellow" />
          <span className="dev-dot dev-dot-green" />
          <span className="dev-terminal-title">convex-repl</span>
        </div>
        <div className="dev-terminal-body">
          {renderLines()}
        </div>
      </div>
    </div>
  );
}

function AgenticGraphic() {
  return (
    <div className="cap-graphic cap-graphic-agentic">
      <svg viewBox="0 0 200 200" className="cap-svg">
        <circle className="agent-core" cx="100" cy="100" r="30" />
        <circle className="agent-node agent-node-1" cx="100" cy="40" r="12" />
        <circle className="agent-node agent-node-2" cx="160" cy="100" r="12" />
        <circle className="agent-node agent-node-3" cx="100" cy="160" r="12" />
        <circle className="agent-node agent-node-4" cx="40" cy="100" r="12" />
        <line className="agent-beam agent-beam-1" x1="100" y1="70" x2="100" y2="52" />
        <line className="agent-beam agent-beam-2" x1="130" y1="100" x2="148" y2="100" />
        <line className="agent-beam agent-beam-3" x1="100" y1="130" x2="100" y2="148" />
        <line className="agent-beam agent-beam-4" x1="70" y1="100" x2="52" y2="100" />
      </svg>
    </div>
  );
}

function MissionGraphic() {
  return (
    <div className="cap-graphic cap-graphic-mission">
      <svg viewBox="0 0 200 200" className="cap-svg">
        <circle className="mission-globe" cx="100" cy="100" r="60" />
        <ellipse className="mission-equator" cx="100" cy="100" rx="60" ry="20" />
        <ellipse className="mission-meridian" cx="100" cy="100" rx="20" ry="60" />
      </svg>
    </div>
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
      { threshold: 0.5 }
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
    <div className="capabilities-journey">
      {capabilities.map((cap, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <section
            key={cap.id}
            className={`cap-section cap-section-${cap.id} ${isEven ? 'cap-layout-left' : 'cap-layout-right'}`}
          >
            
            <div className="cap-container">
              <div className="cap-content">
                <div className="cap-header">
                  <span className="cap-number">{cap.number}</span>
                  <span className="cap-subtitle">{cap.subtitle}</span>
                </div>
                <h2 className="cap-title">
                  {cap.titlePrefix && <>{cap.titlePrefix} </>}
                  <span className="cap-title-highlight">{cap.titleHighlight}</span>
                  {cap.titleSuffix && <> {cap.titleSuffix}</>}
                </h2>
                <p className="cap-description">{cap.description}</p>
                <div className="cap-cta-group">
                  <Link
                    href={cap.cta.href}
                    className="cap-cta cap-cta-primary"
                    target={cap.cta.external ? '_blank' : undefined}
                    rel={cap.cta.external ? 'noopener noreferrer' : undefined}
                  >
                    {cap.cta.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  {cap.secondaryCta && (
                    <Link
                      href={cap.secondaryCta.href}
                      className="cap-cta cap-cta-secondary"
                      target={cap.secondaryCta.external ? '_blank' : undefined}
                      rel={cap.secondaryCta.external ? 'noopener noreferrer' : undefined}
                    >
                      {cap.secondaryCta.label}
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="cap-visual" ref={cap.id === 'performance' ? perfRef : undefined}>
                {renderGraphic(cap.id)}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
