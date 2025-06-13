import { Button } from "@/components/ui/button";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  openModal: () => void;
}

const HeroSection = ({ openModal }: HeroSectionProps) => {
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const phrases = [
    "ИИ-коммуникации для вашего бизнеса",
    "Автоматизация выполнения рутинных задач любой сложности",
    "Автоматизация поиска клиентов и продаж для вашего бизнеса 24/7"
  ];
  const controls = useAnimationControls();

  // Typing effect with phrase cycling
  useEffect(() => {
    let currentIndex = 0;
    const currentPhrase = phrases[currentPhraseIndex];

    const typeNextCharacter = () => {
      if (currentIndex < currentPhrase.length) {
        setText(currentPhrase.substring(0, currentIndex + 1));
        currentIndex++;
        
        // Random delay between 50ms and 150ms to simulate human typing
        const randomDelay = Math.floor(Math.random() * 100) + 50;
        setTimeout(typeNextCharacter, randomDelay);
      } else {
        // Show animations when first phrase is complete
        if (currentPhraseIndex === 0) {
          controls.start({ opacity: 1, y: 0 });
        }
        
        // Wait 2 seconds before starting next phrase
        setTimeout(() => {
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 2000);
      }
    };

    // Start typing after a short delay
    setTimeout(typeNextCharacter, currentPhraseIndex === 0 ? 500 : 100);
  }, [currentPhraseIndex, phrases, controls]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden w-full">
      {/* Градиентный фон с анимированными волнами */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-700 via-purple-600 to-purple-800 z-0">
        <div className="absolute inset-0 opacity-60 w-full">
          <svg 
            viewBox="0 0 1440 690" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full absolute bottom-0 left-0"
            preserveAspectRatio="none"
            style={{ minWidth: '100vw' }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M0,224 C120,256 240,288 360,288 C480,288 600,256 720,240 C840,224 960,224 1080,240 C1200,256 1320,288 1440,288 L1440,690 L0,690 Z" 
              fill="#9b87f5" 
              opacity="0.3"
              animate={{
                d: [
                  "M0,224 C120,256 240,288 360,288 C480,288 600,256 720,240 C840,224 960,224 1080,240 C1200,256 1320,288 1440,288 L1440,690 L0,690 Z",
                  "M0,256 C120,240 240,224 360,224 C480,224 600,256 720,272 C840,288 960,288 1080,272 C1200,256 1320,224 1440,224 L1440,690 L0,690 Z",
                  "M0,224 C120,256 240,288 360,288 C480,288 600,256 720,240 C840,224 960,224 1080,240 C1200,256 1320,288 1440,288 L1440,690 L0,690 Z"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut"
              }}
            />
            <motion.path 
              d="M0,400 C120,384 240,368 360,368 C480,368 600,384 720,400 C840,416 960,432 1080,416 C1200,400 1320,352 1440,352 L1440,690 L0,690 Z" 
              fill="#7E69AB" 
              opacity="0.2"
              animate={{
                d: [
                  "M0,400 C120,384 240,368 360,368 C480,368 600,384 720,400 C840,416 960,432 1080,416 C1200,400 1320,352 1440,352 L1440,690 L0,690 Z",
                  "M0,368 C120,384 240,400 360,400 C480,400 600,384 720,368 C840,352 960,336 1080,352 C1200,368 1320,416 1440,416 L1440,690 L0,690 Z",
                  "M0,400 C120,384 240,368 360,368 C480,368 600,384 720,400 C840,416 960,432 1080,416 C1200,400 1320,352 1440,352 L1440,690 L0,690 Z"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.path 
              d="M0,480 C120,496 240,512 360,496 C480,480 600,432 720,432 C840,432 960,480 1080,496 C1200,512 1320,496 1440,464 L1440,690 L0,690 Z" 
              fill="#D6BCFA" 
              opacity="0.15"
              animate={{
                d: [
                  "M0,480 C120,496 240,512 360,496 C480,480 600,432 720,432 C840,432 960,480 1080,496 C1200,512 1320,496 1440,464 L1440,690 L0,690 Z",
                  "M0,464 C120,448 240,432 360,448 C480,464 600,512 720,512 C840,512 960,464 1080,448 C1200,432 1320,448 1440,480 L1440,690 L0,690 Z",
                  "M0,480 C120,496 240,512 360,496 C480,480 600,432 720,432 C840,432 960,480 1080,496 C1200,512 1320,496 1440,464 L1440,690 L0,690 Z"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex items-center justify-center"
          >
            {text}
            <span className="animate-pulse">|</span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Голосовые и чат-боты, автоматизация продаж и общения с клиентами
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={openModal} 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full bg-white text-indigo-700 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Получить бесплатную консультацию
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-12 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg py-4 px-6 inline-flex gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-left">
              <p className="text-sm text-gray-100">Работаем с</p>
              <p className="text-xl font-semibold text-white">2020 года</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-left">
              <p className="text-sm text-gray-100">Реализовали более</p>
              <p className="text-xl font-semibold text-white">500 проектов</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
