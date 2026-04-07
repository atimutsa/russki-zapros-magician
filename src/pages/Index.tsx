import { useEffect } from "react";

import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import AudioDemo from "@/components/AudioDemo";
import PricingSection from "@/components/PricingSection";
import Integrations from "@/components/Integrations";
import CtaSection from "@/components/CtaSection";

type IndexProps = {
  openModal: () => void;
};

const Index = ({ openModal }: IndexProps) => {
  // Плавный скролл к якорям
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
      <main>
        <HeroSection openModal={openModal} />
        <TrustBadges />
        <WhyUs />
        <Services />
        <CaseStudies />
        <AudioDemo />
        <PricingSection onOpenModal={openModal} />
        <Integrations />
        <CtaSection openModal={openModal} />
      </main>
  );
};

export default Index;
