

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  openModal: () => void;
}

const Header = ({ openModal }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { name: "Возможности", href: "#services" },
    { name: "Кейсы", href: "#cases" },
    { name: "О нас", href: "#whyus" },
    { name: "Контакты", href: "#footer" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            {isScrolled ? (
              <img 
                src="/lovable-uploads/c56da609-f699-4610-9756-0d7ef1421fea.png" 
                alt="Тимлекс" 
                className="h-10 w-auto"
              />
            ) : (
              <img 
                src="/lovable-uploads/058e03b5-8fb5-4bf5-bfed-e3786ee979d5.png" 
                alt="Тимлекс" 
                className="h-10 w-auto"
              />
            )}
          </a>
        </div>

        {isMobile ? (
          <>
            <button 
              className="block lg:hidden" 
              onClick={toggleMobileMenu}
              aria-label="Меню"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''} ${isScrolled ? 'bg-primary' : 'bg-white'}`}></span>
                <span className={`w-full h-0.5 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''} ${isScrolled ? 'bg-primary' : 'bg-white'}`}></span>
                <span className={`w-full h-0.5 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${isScrolled ? 'bg-primary' : 'bg-white'}`}></span>
              </div>
            </button>
            
            {isMobileMenuOpen && (
              <div className="fixed inset-0 bg-white z-[9999] shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-white"></div>
                <nav className="relative flex flex-col gap-6 py-8 px-4 pt-20 bg-white w-full h-full min-h-screen">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <Button 
                    onClick={() => {
                      openModal();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="w-full mt-4"
                  >
                    Оставить заявку
                  </Button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              <Button onClick={openModal} variant="default">
                Оставить заявку
              </Button>
              <a
                href="https://t.me/TeamlexBot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@teamlex.ru"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

