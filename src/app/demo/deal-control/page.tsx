import HeroSection from "@/components/demo/HeroSection";
import ProblemSection from "@/components/demo/ProblemSection";
import SolutionSection from "@/components/demo/SolutionSection";
import OutcomeSection from "@/components/demo/OutcomeSection";
import DemoPreviewSection from "@/components/demo/DemoPreviewSection";

import PricingSection from "@/components/demo/PricingSection";
import CTASection from "@/components/demo/CTASection";

export default function DealControlDemoPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <OutcomeSection />
      <DemoPreviewSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
