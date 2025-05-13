
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Алексей Петров",
      position: "Директор по продажам",
      company: "ТехноСтарт",
      avatar: "https://i.pravatar.cc/100?img=1",
      logo: "https://placehold.co/200x80?text=ТехноСтарт",
      text: "Благодаря голосовому боту от Тимлекс мы смогли автоматизировать процесс холодного обзвона. Теперь наши менеджеры работают только с заинтересованными клиентами, а конверсия выросла на 23%.",
      rating: 5,
    },
    {
      id: 2,
      name: "Елена Сидорова",
      position: "Маркетинг-директор",
      company: "BeautyShop",
      avatar: "https://i.pravatar.cc/100?img=5",
      logo: "https://placehold.co/200x80?text=BeautyShop",
      text: "Чат-бот в нашем Instagram полностью преобразил работу с клиентами. Ответы на вопросы стали мгновенными, а клиенты довольны сервисом. Рекомендую Тимлекс всем, кто хочет улучшить клиентский опыт.",
      rating: 5,
    },
    {
      id: 3,
      name: "Сергей Иванов",
      position: "Генеральный директор",
      company: "ФинансГрупп",
      avatar: "https://i.pravatar.cc/100?img=3",
      logo: "https://placehold.co/200x80?text=ФинансГрупп",
      text: "Внедрили систему лидогенерации от Тимлекс год назад. За это время наш поток клиентов вырос в 2.5 раза, а затраты на маркетинг снизились. Команда всегда на связи и быстро реагирует на запросы.",
      rating: 4,
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slidesRef.current) {
      const translateValue = activeIndex * -100;
      slidesRef.current.style.transform = `translateX(${translateValue}%)`;
    }
  }, [activeIndex]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Что говорят клиенты</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Отзывы о нашей работе от реальных клиентов
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              ref={slidesRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full px-4"
                  style={{ flex: `0 0 ${100 / testimonials.length}%` }}
                >
                  <motion.div 
                    className="bg-gray-50 rounded-xl p-8 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                      <img 
                        src={testimonial.logo} 
                        alt={testimonial.company} 
                        className="h-10 hidden md:block"
                      />
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-5 h-5 ${
                            idx < testimonial.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 italic">
                      "{testimonial.text}"
                    </blockquote>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === idx ? "bg-indigo-600" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
          
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-12 transform -translate-y-1/2 rounded-full z-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={nextSlide}
            variant="outline" 
            size="icon"
            className="absolute top-1/2 -right-12 transform -translate-y-1/2 rounded-full z-10"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
