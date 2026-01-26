import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from "next/link";
import { ArrowUpRight, Shield, Coins, TrendingUp, Zap } from "lucide-react";

function ConvexLogoAnimated() {
  return (
    <div className="coin-logo-container">
      <svg className="coin-grid" viewBox="0 0 400 400" aria-hidden="true">
        {[...Array(9)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} className="grid-line" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" className="grid-line" />
        ))}
      </svg>
      
      <svg className="coin-logo-svg" viewBox="0 0 100 100" aria-hidden="true">
        <polygon 
          className="logo-hex" 
          points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" 
          fill="none" 
          strokeWidth="1.5"
        />
        <line className="logo-line logo-line-1" x1="50" y1="5" x2="50" y2="95" />
        <line className="logo-line logo-line-2" x1="50" y1="95" x2="7" y2="27.5" />
        <line className="logo-line logo-line-3" x1="50" y1="95" x2="93" y2="27.5" />
        
        <circle className="energy-pulse pulse-1" cx="50" cy="50" r="20" />
        <circle className="energy-pulse pulse-2" cx="50" cy="50" r="35" />
        <circle className="energy-pulse pulse-3" cx="50" cy="50" r="50" />
      </svg>
      
      <div className="coin-glow" />
    </div>
  );
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Coin({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('coin');

  return (
    <main className="coin-page">
      <ConvexLogoAnimated />

      <section className="coin-hero">
        <span className="coin-ticker">{t('hero.ticker')}</span>
        <h1>{t('hero.title')}</h1>
        <p className="coin-tagline">{t('hero.tagline')}</p>
        <div className="coin-hero-stats">
          <div className="coin-hero-stat">
            <span className="coin-hero-stat-value">{t('hero.stats.supply.value')}</span>
            <span className="coin-hero-stat-label">{t('hero.stats.supply.label')}</span>
          </div>
          <div className="coin-hero-stat-divider" />
          <div className="coin-hero-stat">
            <span className="coin-hero-stat-value">10<sup>9</sup></span>
            <span className="coin-hero-stat-label">{t('hero.stats.coppers.label')}</span>
          </div>
          <div className="coin-hero-stat-divider" />
          <div className="coin-hero-stat">
            <span className="coin-hero-stat-value">{t('hero.stats.fees.value')}</span>
            <span className="coin-hero-stat-label">{t('hero.stats.fees.label')}</span>
          </div>
        </div>
        <div className="btn-group">
          <Link href="https://app.paisley.io" className="btn btn-primary" target="_blank">
            {t('hero.cta.buy')}
            <ArrowUpRight size={16} />
          </Link>
          <Link href="https://docs.convex.world/docs/cad/tokenomics" className="btn btn-secondary" target="_blank">
            {t('hero.cta.tokenomics')}
          </Link>
        </div>
      </section>

      <section className="coin-value-section">
        <div className="coin-value-grid">
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Zap size={24} strokeWidth={1.5} />
            </div>
            <h3>{t('value.fuel.title')}</h3>
            <p>{t('value.fuel.description')}</p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Shield size={24} strokeWidth={1.5} />
            </div>
            <h3>{t('value.stake.title')}</h3>
            <p>{t('value.stake.description')}</p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <Coins size={24} strokeWidth={1.5} />
            </div>
            <h3>{t('value.currency.title')}</h3>
            <p>{t('value.currency.description')}</p>
          </div>
          <div className="coin-value-card">
            <div className="coin-value-icon">
              <TrendingUp size={24} strokeWidth={1.5} />
            </div>
            <h3>{t('value.rewards.title')}</h3>
            <p>{t('value.rewards.description')}</p>
          </div>
        </div>
      </section>

      <section className="coin-free-banner">
        <div className="coin-free-content">
          <h2>{t('free.title')} <span>{t('free.titleAccent')}</span></h2>
          <div className="coin-free-items">
            <div className="coin-free-item">
              <span className="coin-free-check">✓</span>
              <div>
                <strong>{t('free.agentic.title')}</strong>
                <p>{t('free.agentic.description')}</p>
              </div>
            </div>
            <div className="coin-free-item">
              <span className="coin-free-check">✓</span>
              <div>
                <strong>{t('free.reads.title')}</strong>
                <p>{t('free.reads.description')}</p>
              </div>
            </div>
            <div className="coin-free-item">
              <span className="coin-free-check">✓</span>
              <div>
                <strong>{t('free.offchain.title')}</strong>
                <p>{t('free.offchain.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="coin-tokenomics">
        <div className="section-header">
          <span className="section-number">// {t('tokenomics.number')}</span>
          <h2>{t('tokenomics.title')}</h2>
          <p>{t('tokenomics.subtitle')}</p>
        </div>

        <div className="coin-allocation">
          <div className="coin-allocation-visual">
            <div className="coin-allocation-ring">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="ring-bg" />
                <circle cx="50" cy="50" r="45" className="ring-25" strokeDasharray="70.68 212.06" strokeDashoffset="53" />
                <circle cx="50" cy="50" r="45" className="ring-75" strokeDasharray="212.06 70.68" strokeDashoffset="-17.67" />
              </svg>
              <div className="coin-allocation-center">
                <span>1B</span>
                <small>{t('tokenomics.maxSupply')}</small>
              </div>
            </div>
          </div>
          <div className="coin-allocation-details">
            <div className="coin-allocation-item">
              <div className="coin-allocation-bar bar-25" />
              <div className="coin-allocation-info">
                <span className="coin-allocation-percent">25%</span>
                <h4>{t('tokenomics.development.title')}</h4>
                <p>{t('tokenomics.development.description')}</p>
              </div>
            </div>
            <div className="coin-allocation-item">
              <div className="coin-allocation-bar bar-75" />
              <div className="coin-allocation-info">
                <span className="coin-allocation-percent">75%</span>
                <h4>{t('tokenomics.release.title')}</h4>
                <p>{t('tokenomics.release.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="coin-curve-section">
        <div className="section-header">
          <span className="section-number">// {t('curve.number')}</span>
          <h2>{t('curve.title')}</h2>
          <p>{t('curve.subtitle')}</p>
        </div>

        <div className="coin-curve-content">
          <div className="coin-curve-formula">
            <div className="coin-formula-box">
              <code>price = c × x / (1 - x)</code>
              <div className="coin-formula-legend">
                <span><strong>c</strong> = {t('curve.formula.basePrice')}</span>
                <span><strong>x</strong> = {t('curve.formula.proportion')}</span>
              </div>
            </div>
            <p>{t('curve.description')}</p>
          </div>
          <div className="coin-curve-chart">
            <svg viewBox="0 0 400 280" className="release-curve-svg">
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={`h${i}`} x1="50" y1={40 + i * 40} x2="380" y2={40 + i * 40} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <line key={`v${i}`} x1={50 + i * 33} y1="40" x2={50 + i * 33} y2="240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}
              
              <line x1="50" y1="240" x2="380" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50" y1="40" x2="50" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              <path
                d="M50,240 C100,238 150,232 182,222 C214,212 240,195 260,175 C280,155 300,120 314,75 C320,55 325,40 325,40 L325,240 Z"
                fill="url(#areaGradient)"
              />
              
              <path
                d="M50,240 C100,238 150,232 182,222 C214,212 240,195 260,175 C280,155 300,120 314,75 C320,55 325,40 325,40"
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              
              <text x="45" y="44" textAnchor="end" className="chart-label">$500</text>
              <text x="45" y="84" textAnchor="end" className="chart-label">$400</text>
              <text x="45" y="124" textAnchor="end" className="chart-label">$300</text>
              <text x="45" y="164" textAnchor="end" className="chart-label">$200</text>
              <text x="45" y="204" textAnchor="end" className="chart-label">$100</text>
              <text x="45" y="244" textAnchor="end" className="chart-label">$0</text>
              
              <text x="50" y="258" textAnchor="middle" className="chart-label">0%</text>
              <text x="116" y="258" textAnchor="middle" className="chart-label">20%</text>
              <text x="182" y="258" textAnchor="middle" className="chart-label">40%</text>
              <text x="248" y="258" textAnchor="middle" className="chart-label">60%</text>
              <text x="314" y="258" textAnchor="middle" className="chart-label">80%</text>
              <text x="380" y="258" textAnchor="middle" className="chart-label">100%</text>
              
              <text x="20" y="140" textAnchor="middle" className="chart-axis-title" transform="rotate(-90, 20, 140)">Coin Price</text>
              <text x="215" y="275" textAnchor="middle" className="chart-axis-title">Proportion Released</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="coin-cta">
        <h3>{t('cta.title')}</h3>
        <p>{t('cta.description')}</p>
        <div className="btn-group">
          <Link href="https://app.paisley.io" className="btn btn-primary" target="_blank">
            {t('cta.buy')}
            <ArrowUpRight size={16} />
          </Link>
          <Link href="https://discord.com/invite/xfYGq4CT7v" className="btn btn-secondary" target="_blank">
            {t('cta.community')}
          </Link>
        </div>
        <div className="coin-cta-links">
          <Link href="https://docs.convex.world/docs/cad/tokenomics" target="_blank">
            {t('cta.tokenomicsLink')} <ArrowUpRight size={12} />
          </Link>
          <Link href="https://docs.convex.world/docs/overview/convex-whitepaper" target="_blank">
            {t('cta.whitepaperLink')} <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </main>
  );
}
