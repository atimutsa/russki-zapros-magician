
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TrustBadges = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const badges = [
    {
      id: 1,
      title: "DIS Group",
      description: "dis-group.ru",
      url: "https://dis-group.ru/",
    },
    {
      id: 2,
      title: "MIMS Automobility Moscow",
      description: "mims.ru",
      url: "https://mims.ru/",
    },
    {
      id: 3,
      title: "ЦЕНТР ПРОДАЖ НОВОСТРОЕК",
      description: "города Сочи",
      url: null,
    },
    {
      id: 4,
      title: "СТО Маслёнка",
      description: "maslenka52.ru",
      url: "https://maslenka52.ru/",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Нам доверяют</h2>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-4">
            {badges.map((badge) => (
              <CarouselItem key={badge.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * badge.id }}
                >
                  {badge.url ? (
                    <a 
                      href={badge.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center w-full h-full"
                    >
                      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-100 rounded-full">
                        {/* Placeholder для иконок. В реальном проекте заменить на реальные SVG */}
                        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{badge.title}</h3>
                      <p className="text-gray-500 text-sm">{badge.description}</p>
                    </a>
                  ) : (
                    <>
                      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-100 rounded-full">
                        {/* Placeholder для иконок. В реальном проекте заменить на реальные SVG */}
                        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{badge.title}</h3>
                      <p className="text-gray-500 text-sm">{badge.description}</p>
                    </>
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TrustBadges;
