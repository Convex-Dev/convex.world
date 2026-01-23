import { setRequestLocale, getTranslations } from 'next-intl/server';
import CapabilitySections from "@/components/CapabilitySections";
import LiveInspector from "@/components/LiveInspector";
import ResourceGauges from "@/components/ResourceGauges";
import Hero from "@/components/Hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('inspector');

  return (
    <>
      {/* Lattice Grid Background */}
      <div className="lattice-bg" aria-hidden="true" />

      {/* Hero — Single focused message */}
      <Hero />

      {/* Capabilities Journey */}
      <CapabilitySections />

      {/* Live Tools Section — Expressions layer: evidence of capabilities */}
      <section className="inspector-section">
        <div className="section-header">
          <span className="section-number">// {t('observe')}</span>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </div>
        <div className="live-tools-grid">
          <LiveInspector />
          <ResourceGauges />
        </div>
      </section>

      {/* Geometric separator */}
      <div className="geo-line" aria-hidden="true" />
    </>
  );
}
