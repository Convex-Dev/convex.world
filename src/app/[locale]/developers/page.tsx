import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Terminal, Boxes, Zap, Code2 } from "lucide-react";
import AnimatedTerminal from "@/components/AnimatedTerminal";

const heroTerminalSequences = [
  {
    lines: [
      { type: 'command' as const, text: '(import convex.fungible :as fun)' },
      { type: 'command' as const, text: '(deploy (fun/build-token {:supply 1000000}))' },
      { type: 'result' as const, text: '#token:0x8a2f...' },
    ]
  },
  {
    lines: [
      { type: 'command' as const, text: '(@convex.fungible/mint MY-TOKEN 500000)' },
      { type: 'result' as const, text: '500000' },
      { type: 'command' as const, text: '(@convex.fungible/balance MY-TOKEN)' },
      { type: 'result' as const, text: '500000' },
    ]
  },
  {
    lines: [
      { type: 'command' as const, text: '(def accounts (query (all :users)))' },
      { type: 'result' as const, text: '[#addr:0x1a.. #addr:0x2b..]' },
      { type: 'command' as const, text: '(count accounts)' },
      { type: 'result' as const, text: '2847' },
    ]
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Developer({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('developers');

  return (
    <>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero Section - Asymmetric Layout */}
      <section className="dev-hero-split">
        <div className="dev-hero-content">
          <span className="dev-hero-tag">// {t('hero.tag')}</span>
          <h1>{t('hero.title')}<br /><span className="hero-accent">{t('hero.titleAccent')}</span></h1>
          <p>{t('hero.subtitle')}</p>
          <div className="btn-group">
            <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
              {t('hero.cta.docs')}
            </Link>
            <Link href="https://github.com/Convex-Dev" className="btn btn-secondary" target="_blank">
              {t('hero.cta.source')}
            </Link>
          </div>
        </div>
        <div className="dev-hero-visual">
          <AnimatedTerminal sequences={heroTerminalSequences} title="convex-lisp" />
        </div>
      </section>

      {/* Core Technologies */}
      <section className="dev-section">
        <div className="section-header">
          <span className="section-number">// {t('core.number')}</span>
          <h2>{t('core.title')}</h2>
          <p>{t('core.subtitle')}</p>
        </div>

        <div className="dev-grid">
          {/* CVM Card */}
          <article className="dev-card dev-card-featured">
            <span className="dev-card-number">{t('core.cvm.number')}</span>
            <div className="dev-card-icon dev-card-icon-cvm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="2" fill="var(--accent-primary)" />
                <rect x="7" y="7" width="4" height="4" rx="1" fill="var(--accent-highlight)" />
                <rect x="13" y="7" width="4" height="4" rx="1" fill="var(--accent-highlight)" />
                <rect x="7" y="13" width="4" height="4" rx="1" fill="var(--accent-highlight)" />
                <rect x="13" y="13" width="4" height="4" rx="1" fill="var(--accent-highlight)" />
                <line x1="2" y1="9" x2="4" y2="9" stroke="var(--accent-highlight)" strokeWidth="2" />
                <line x1="2" y1="15" x2="4" y2="15" stroke="var(--accent-highlight)" strokeWidth="2" />
                <line x1="20" y1="9" x2="22" y2="9" stroke="var(--accent-highlight)" strokeWidth="2" />
                <line x1="20" y1="15" x2="22" y2="15" stroke="var(--accent-highlight)" strokeWidth="2" />
              </svg>
            </div>
            <h3>{t('core.cvm.title')}</h3>
            <p>{t('core.cvm.description')}</p>
            <ul className="dev-features">
              <li><Zap size={14} /> {t('core.cvm.features.turing')}</li>
              <li><Zap size={14} /> {t('core.cvm.features.tps')}</li>
              <li><Zap size={14} /> {t('core.cvm.features.green')}</li>
              <li><Zap size={14} /> {t('core.cvm.features.compiler')}</li>
            </ul>
          </article>

          {/* Convex Lisp Card */}
          <article className="dev-card dev-card-featured">
            <span className="dev-card-number">{t('core.lisp.number')}</span>
            <div className="dev-card-icon">
              <Image src="/images/convex86.webp" alt="Convex" width={24} height={24} />
            </div>
            <h3>{t('core.lisp.title')}</h3>
            <p>{t('core.lisp.description')}</p>
            <p>{t('core.lisp.codeDesc')}</p>
            <div className="dev-inline-code">
              <code>(if (trusted? addr) (fun/transfer token addr 1000))</code>
            </div>
            <p className="dev-highlight">
              <strong>{t('core.lisp.highlight')}</strong>
            </p>
          </article>

          {/* Lattice Data Card */}
          <article className="dev-card">
            <span className="dev-card-number">{t('core.lattice.number')}</span>
            <div className="dev-card-icon dev-card-icon-lattice">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="var(--accent-consensus)" />
                <rect x="14" y="3" width="7" height="7" rx="1" fill="var(--accent-primary)" />
                <rect x="3" y="14" width="7" height="7" rx="1" fill="var(--accent-primary)" />
                <rect x="14" y="14" width="7" height="7" rx="1" fill="var(--accent-consensus)" />
                <line x1="10" y1="6.5" x2="14" y2="6.5" stroke="var(--accent-highlight)" strokeWidth="1.5" />
                <line x1="10" y1="17.5" x2="14" y2="17.5" stroke="var(--accent-highlight)" strokeWidth="1.5" />
                <line x1="6.5" y1="10" x2="6.5" y2="14" stroke="var(--accent-highlight)" strokeWidth="1.5" />
                <line x1="17.5" y1="10" x2="17.5" y2="14" stroke="var(--accent-highlight)" strokeWidth="1.5" />
              </svg>
            </div>
            <h3>{t('core.lattice.title')}</h3>
            <p className="dev-tagline">{t('core.lattice.tagline')}</p>
            <p>{t('core.lattice.description')}</p>
          </article>
        </div>
      </section>

      {/* Getting Started */}
      <section className="dev-section">
        <div className="section-header">
          <span className="section-number">// {t('started.number')}</span>
          <h2>{t('started.title')}</h2>
          <p>{t('started.subtitle')}</p>
        </div>

        <div className="dev-resources-grid">
          <Link href="https://docs.convex.world/docs/intro" className="dev-resource-card" target="_blank">
            <BookOpen size={20} strokeWidth={1.5} />
            <div>
              <h4>{t('started.docs.title')}</h4>
              <p>{t('started.docs.desc')}</p>
            </div>
          </Link>
          <Link href="https://docs.convex.world/docs/tutorial/convex-lisp/convex-lisp" className="dev-resource-card" target="_blank">
            <Terminal size={20} strokeWidth={1.5} />
            <div>
              <h4>{t('started.tutorial.title')}</h4>
              <p>{t('started.tutorial.desc')}</p>
            </div>
          </Link>
          <Link href="https://github.com/Convex-Dev/convex/tree/develop/convex-java" className="dev-resource-card" target="_blank">
            <Boxes size={20} strokeWidth={1.5} />
            <div>
              <h4>{t('started.sdk.title')}</h4>
              <p>{t('started.sdk.desc')}</p>
            </div>
          </Link>
          <Link href="/sandbox" className="dev-resource-card">
            <Code2 size={20} strokeWidth={1.5} />
            <div>
              <h4>{t('started.sandbox.title')}</h4>
              <p>{t('started.sandbox.desc')}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Builder Section */}
      <section className="dev-cta">
        <div className="dev-cta-content">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.description')}</p>
          <div className="btn-group">
            <Link href="https://docs.convex.world" className="btn btn-primary" target="_blank">
              {t('cta.docs')}
            </Link>
            <Link href="https://discord.com/invite/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
              {t('cta.community')}
            </Link>
          </div>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </>
  );
}
