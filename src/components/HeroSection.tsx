
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  openModal: () => void;
}

const HeroSection = ({ openModal }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Градиентный фон с волнами */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-0">
        <div className="absolute inset-0 opacity-30">
          <svg 
            viewBox="0 0 1000 1000" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path 
              d="M0,400 C200,450 400,300 600,450 C800,600 1000,500 1000,500 L1000,1000 L0,1000 Z" 
              fill="url(#gradient)" 
              opacity="0.2"
            />
            <path 
              d="M0,600 C200,550 400,700 600,550 C800,400 1000,500 1000,500 L1000,1000 L0,1000 Z" 
              fill="url(#gradient)" 
              opacity="0.1"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ИИ-коммуникации для вашего бизнеса
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Голосовые и чат-боты, автоматизация продаж и общения с клиентами
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={openModal} 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Получить бесплатную консультацию
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg py-4 px-6 inline-flex gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-left">
              <p className="text-sm text-gray-500">Работаем с</p>
              <p className="text-xl font-semibold">2020 года</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Реализовали более</p>
              <p className="text-xl font-semibold">500 проектов</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
