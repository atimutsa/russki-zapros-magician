
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Плавный скролл к якорям
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header openModal={openModal} />
      
      <main>
        <HeroSection openModal={openModal} />
        <TrustBadges />
        <WhyUs />
        <Services />
        <CaseStudies />
        <Integrations />
        <Testimonials />
        <CtaSection openModal={openModal} />
      </main>

      <Footer />
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Index;
