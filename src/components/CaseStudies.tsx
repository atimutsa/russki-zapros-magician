
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);

  const cases = [
    {
      id: 1,
      title: "Автоматизация обзвона для сети фитнес-клубов",
      client: "FitNetwork",
      description: "Внедрение голосового бота для обзвона клиентов, пропустивших занятия, и предложение новых абонементов.",
      results: [
        "Увеличение возврата клиентов на 35%",
        "Экономия 250 часов работы менеджеров в месяц",
        "ROI 420% за 3 месяца",
      ],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      title: "Чат-бот для обработки заявок автосервиса",
      client: "AutoService Pro",
      description: "Разработка и внедрение чат-бота для приема заявок на ремонт, ответов на вопросы клиентов и записи на обслуживание.",
      results: [
        "Сокращение времени обработки заявки с 15 до 2 минут",
        "Увеличение количества записей на ТО на 42%",
        "Работа 24/7 без участия операторов",
      ],
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Система лидогенерации для B2B компании",
      client: "TechSolutions",
      description: "Комплексное решение для поиска и квалификации потенциальных клиентов в сегменте IT-услуг для бизнеса.",
      results: [
        "Привлечение 120+ целевых лидов ежемесячно",
        "Снижение стоимости привлечения клиента на 47%",
        "Конверсия в продажу выросла с 5% до 12%",
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slidesRef.current) {
      const translateValue = activeIndex * -100;
      slidesRef.current.style.transform = `translateX(${translateValue}%)`;
    }
  }, [activeIndex]);

  return (
    <section id="cases" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Кейсы</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Реальные результаты наших клиентов
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              ref={slidesRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${cases.length * 100}%` }}
            >
              {cases.map((caseItem) => (
                <div 
                  key={caseItem.id} 
                  className="w-full px-4"
                  style={{ flex: `0 0 ${100 / cases.length}%` }}
                >
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <span className="text-sm font-medium text-indigo-600 mb-2 block">
                            {caseItem.client}
                          </span>
                          <h3 className="text-2xl font-bold mb-4">{caseItem.title}</h3>
                          <p className="text-gray-600 mb-6">{caseItem.description}</p>
                          
                          <div className="space-y-3 mb-8">
                            <h4 className="font-semibold">Результаты:</h4>
                            <ul className="space-y-2">
                              {caseItem.results.map((result, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="bg-green-100 text-green-600 p-1 rounded-full mr-2 mt-0.5">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                      <path d="M5.5 8.5L7.5 10.5L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </span>
                                  <span>{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <button className="text-indigo-600 font-semibold inline-flex items-center group">
                          Подробнее
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="relative h-64 md:h-auto">
                        <div className={`absolute inset-0 bg-gradient-to-r ${caseItem.color} opacity-80`}></div>
                        <img 
                          src={caseItem.image} 
                          alt={caseItem.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {cases.map((_, idx) => (
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
            className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-full z-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={nextSlide}
            variant="outline" 
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full z-10"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
