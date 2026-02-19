import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface ContentPageProps {
  children: ReactNode;
  mainClassName?: string;
  noLatticeBg?: boolean;
}

export default function ContentPage({ children, mainClassName, noLatticeBg }: ContentPageProps) {
  return (
    <>
      <Navigation />
      <main className={mainClassName}>
        {!noLatticeBg && <div className="lattice-bg" aria-hidden="true" />}
        {children}
        <div className="geo-line" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}
