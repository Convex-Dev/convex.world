import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MAIN_CONTENT_ID } from "@/components/SkipLink";

interface ContentPageProps {
  children: ReactNode;
  mainClassName?: string;
  noLatticeBg?: boolean;
}

export default function ContentPage({ children, mainClassName, noLatticeBg }: ContentPageProps) {
  return (
    <>
      <Navigation />
      <main id={MAIN_CONTENT_ID} className={`page-content${mainClassName ? ` ${mainClassName}` : ''}`}>
        {!noLatticeBg && <div className="lattice-bg" aria-hidden="true" />}
        {children}
        <div className="geo-line" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
