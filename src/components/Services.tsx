
import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 1,
      icon: <Headphones className="w-10 h-10 text-indigo-600" />,
      title: "Голосовой бот",
      description: "Автоматизация звонков и телефонных коммуникаций с клиентами",
      features: [
        "Распознавание естественной речи",
        "Интеграция с CRM-системами",
        "Обработка входящих и исходящих вызовов",
        "Сбор обратной связи и опросы"
      ],
      dialog: [
        { speaker: "Бот", text: "Добрый день! Вас беспокоит компания «Тимлекс». Хотели бы уточнить, интересна ли вам услуга автоматизации коммуникаций?" },
        { speaker: "Клиент", text: "Да, мы как раз рассматриваем варианты." },
        { speaker: "Бот", text: "Отлично! Могу я уточнить, какие задачи вы хотите решить в первую очередь?" }
      ]
    },
    {
      id: 2,
      icon: <MessageSquare className="w-10 h-10 text-indigo-600" />,
      title: "Чат-бот",
      description: "Автоматизация текстовых коммуникаций в мессенджерах, соцсетях и на сайте",
      features: [
        "Мультиканальность (Telegram, WhatsApp, VK)",
        "Обработка запросов 24/7",
        "Квалификация лидов",
        "Интеграция с вашими системами"
      ],
      dialog: [
        { speaker: "Клиент", text: "Здравствуйте! Могу ли я узнать стоимость чат-бота?" },
        { speaker: "Бот", text: "Добрый день! Стоимость зависит от функционала и количества каналов. Расскажите, для каких целей вам нужен чат-бот?" },
        { speaker: "Клиент", text: "Нам нужно автоматизировать ответы на типовые вопросы клиентов." }
      ]
    },
    {
      id: 3,
      icon: <Users className="w-10 h-10 text-indigo-600" />,
      title: "Лидогенерация",
      description: "Комплексное решение для привлечения клиентов с помощью ИИ",
      features: [
        "Автоматический поиск клиентов",
        "Квалификация и прогрев лидов",
        "Интеграция с отделом продаж",
        "Аналитика и отчетность"
      ],
      results: [
        { metric: "Среднее количество лидов", value: "150+ в месяц" },
        { metric: "Конверсия в продажу", value: "до 15%" },
        { metric: "Снижение стоимости привлечения", value: "до 40%" },
        { metric: "ROI", value: "от 300%" }
      ]
    }
  ];

  const currentService = services[activeTab];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы помогаем бизнесу автоматизировать коммуникации и увеличивать продажи
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {services.map((service, index) => (
            <button
              key={service.id}
              className={`p-4 rounded-lg text-left transition-all ${
                activeTab === index 
                  ? "bg-white shadow-lg border-l-4 border-indigo-600" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="flex items-start">
                <div className={`mr-4 p-2 rounded-lg ${
                  activeTab === index ? "bg-indigo-50" : "bg-gray-100"
                }`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${
                    activeTab === index ? "text-indigo-600" : "text-gray-900"
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">{currentService.title}</h3>
              <ul className="space-y-3 mb-6">
                {currentService.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 p-1 rounded-full mr-2 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.5 8.5L7.5 10.5L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              {currentService.id !== 3 ? (
                <Card className="bg-gray-50 border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Пример диалога</CardTitle>
                    <CardDescription>Как работает наш бот</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentService.dialog?.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.speaker === "Бот" ? "justify-start" : "justify-end"}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.speaker === "Бот" 
                                ? "bg-indigo-100 text-indigo-900" 
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            <p className="text-xs font-semibold mb-1">{message.speaker}</p>
                            <p>{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gray-50 border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Результаты</CardTitle>
                    <CardDescription>Что получают наши клиенты</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {currentService.results?.map((result, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-500">{result.metric}</p>
                          <p className="text-xl font-bold text-indigo-600">{result.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
