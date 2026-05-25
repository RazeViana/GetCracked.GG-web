import { Comparison } from "@/components/landing/Comparison";
import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { PerformanceBench } from "@/components/landing/PerformanceBench";
import { TopNav } from "@/components/landing/TopNav";
import { TrustStrip } from "@/components/landing/TrustStrip";

export default function Page() {
  return (
    <>
      <TopNav />
      <Hero />
      <TrustStrip />
      <Features />
      <PerformanceBench />
      <Comparison />
      <FinalCta />
      <Footer />
    </>
  );
}
