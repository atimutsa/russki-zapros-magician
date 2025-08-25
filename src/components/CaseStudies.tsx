
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  const cases = [
    {
      id: 1,
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
      fullDescription: "AutoService Pro - крупный автосервис с высокой загруженностью. Проблема заключалась в том, что клиенты часто не могли дозвониться в рабочее время, а заявки, поступающие в нерабочее время, терялись.",
      solution: "Чат-бот принимает заявки 24/7, определяет тип услуги, предварительно оценивает стоимость и записывает клиента на удобное время. Интеграция с CRM позволяет автоматически создавать заказы.",
      clientFeedback: "Чат-бот стал настоящим прорывом для нашего сервиса. Теперь мы не теряем ни одной заявки, и клиенты довольны быстротой обслуживания."
    },
    {
      id: 2,
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
      fullDescription: "TechSolutions предоставляет IT-услуги для среднего и крупного бизнеса. Основная проблема - высокая стоимость привлечения B2B клиентов через традиционные каналы и низкая конверсия холодных обращений.",
      solution: "Внедрена система автоматического поиска и квалификации лидов с использованием AI. Система анализирует потребности компаний, проводит первичную квалификацию и передает горячие лиды менеджерам.",
      clientFeedback: "TWIN помог нам кардинально изменить подход к лидогенерации. Теперь наши менеджеры работают только с квалифицированными лидами, что значительно повысило эффективность продаж."
    },
    {
      id: 4,
      title: "Как компания-производитель жалюзи автоматизировала общение с клиентами и улучшила NPS с помощью решений TWIN",
      client: "Производитель жалюзи",
      description: "Компания-производитель жалюзи и рулонных штор автоматизировала лидогенерацию и мониторинг удовлетворенности клиентов.",
      results: [
        "Конверсия звонков в лиды 9-10%",
        "Стоимость лида снижена до 600-800 рублей",
        "NPS 97% - используется в маркетинге",
        "40% лидов переходят к замерщику",
      ],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
      color: "from-teal-500 to-green-500",
      fullDescription: "Компания-производитель жалюзи и рулонных штор обратилась к TWIN, чтобы протестировать лидогенерацию через голосового бота. Несмотря на активное использование всех доступных каналов для привлечения клиентов, компания искала дополнительный источник лидов. Клиент хотел протестировать новые способы привлечения лидов и дополнить свои существующие каналы. Основная цель заключалась в том, чтобы проверить эффективность голосового бота для обзвона базы потенциальных клиентов.",
      solution: "TWIN предложил решение на базе голосового бота, который обзванивал базу потенциальных клиентов с предложением: «Вам нужны качественные жалюзи по низкой цене? У нас сезонные скидки до 50%. Соединить вас со специалистом?». Если клиент был заинтересован, бот записывал имя и удобное время для звонка менеджера. Бот также распознавал ключевые фразы, такие как «мне нужен ремонт» или «есть ли у вас японские шторы?», и предлагал перезвонить позже. После успешного проекта с лидогенерацией клиент решил внедрить NPS-опросы для мониторинга удовлетворенности клиентов. Бот автоматически звонил клиентам после монтажа изделий, чтобы узнать их мнение о качестве продукции и работе сотрудников. Главной целью было выявление возможных негативных отзывов на ранней стадии, чтобы оперативно решить проблемы до того, как клиенты решат писать публичные негативные отзывы.",
      clientFeedback: "Выражаем благодарность команде TWIN за внедрение эффективных решений по автоматизации общения с нашими клиентами. Голосовые боты показали отличные результаты, позволив нам существенно расширить каналы привлечения и оптимизировать процесс обработки лидов. Надеемся на дальнейшее плодотворное сотрудничество и желаем команде TWIN дальнейшего роста и новых достижений."
    },
    {
      id: 5,
      title: "Как голосовой бот TWIN помогает частному предпринимателю стабильно получать лиды для бизнеса по установке пластиковых окон",
      client: "Частный предприниматель",
      description: "Снизили стоимость лида до 1500 рублей и стабилизировали поток заявок на уровне 3-4 в день.",
      results: [
        "Стоимость лида снижена до 1500 рублей",
        "Стабильный поток 3-4 лида в день",
        "Конверсия из лида в договор 30%",
        "Автоматизация процесса лидогенерации",
      ],
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000&auto=format&fit=crop",
      color: "from-orange-500 to-red-500",
      fullDescription: "Частный предприниматель, специализирующийся на продаже и установке пластиковых окон. Он занимается сбором заказов, закупкой на заводе, доставкой и монтажом у клиентов. Работает в формате малого бизнеса и ориентируется на частных лиц (B2C). Предприниматель столкнулся с высокой конкуренцией на рынке пластиковых окон. Для рекламы в контексте требовались значительные бюджеты, что было невыгодно для малого бизнеса. С другой стороны, работа с платформами вроде Avito требовала постоянного общения с клиентами, на что у клиента не хватало времени. Основной задачей было снизить стоимость лида и автоматизировать процесс общения.",
      solution: "TWIN предложил автоматизацию лидогенерации с помощью голосового бота. Клиентам звонил бот-опросник, который сначала интересовался, актуальна ли для них покупка пластиковых окон. Если клиент отвечал утвердительно, бот уточнял имя и предлагал выбрать удобное время для звонка специалиста. Были проведены A/B тесты по первой фразе бота. Самый высокий результат показала фраза: «Вам нужны качественные пластиковые окна по низкой цене?» с добавлением бонуса: «А еще у нас до конца месяца в подарок идет подоконник белый сатин», что увеличило конверсию на 1-1,5%. Внедрение было быстрым и простым. Все лиды отправлялись клиенту в Telegram с записью разговора и транскрибацией. Бот был настроен на активное слушание: если клиент говорил долго, бот поддерживал диалог с помощью фраз вроде «Понял», «Ясно», «Угу». Для обзвона использовалась мобильная карусель с дозваниваемостью на уровне 60%.",
      clientFeedback: "Я работаю один, сам на себя, на звонки и поиск клиентов времени просто нет, а нанимать менеджера накладно. Обратился к TWIN за помощью в автоматизации, и они предложили отличное решение — настроили голосового бота, который сам обзванивает потенциальных клиентов и присылает мне лиды в Telegram. В день стабильно получаю 3-4 лида, что для меня оптимально. Стоимость лида — 1500 рублей, и в эту сумму уже включены все расходы: база клиентов, телефония и работа бота. Очень удобно, что можно сразу послушать запись разговора и посмотреть, что обсуждалось с клиентом. Это серьезно упростило мою работу, теперь я могу больше времени уделять непосредственно заказам и монтажу. TWIN меня полностью устраивает, планирую дальше развивать сотрудничество."
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
      const slideWidth = 100 / cases.length;
      const translateValue = activeIndex * -slideWidth;
      slidesRef.current.style.transform = `translateX(${translateValue}%)`;
    }
  }, [activeIndex, cases.length]);

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
                        
                        <button 
                          onClick={() => setSelectedCase(caseItem.id)}
                          className="text-indigo-600 font-semibold inline-flex items-center group hover:text-indigo-700 transition-colors"
                        >
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

      {/* Modal для детального просмотра кейса */}
      <Dialog open={selectedCase !== null} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">
                  {cases.find(c => c.id === selectedCase)?.title}
                </DialogTitle>
              </DialogHeader>
              
              {(() => {
                const caseData = cases.find(c => c.id === selectedCase);
                if (!caseData) return null;
                
                return (
                  <div className="space-y-6">
                    {/* Клиент и краткое описание */}
                    <div>
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                        {caseData.client}
                      </span>
                      <p className="text-gray-600 text-lg">{caseData.description}</p>
                    </div>

                    {/* Изображение */}
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-r ${caseData.color} opacity-80 z-10`}></div>
                      <img 
                        src={caseData.image} 
                        alt={caseData.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Подробное описание */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Описание проекта</h3>
                      <p className="text-gray-700 leading-relaxed">{caseData.fullDescription}</p>
                    </div>

                    {/* Решение */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Решение от TWIN</h3>
                      <p className="text-gray-700 leading-relaxed">{caseData.solution}</p>
                    </div>

                    {/* Результаты */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Результаты</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {caseData.results.map((result, idx) => (
                          <div key={idx} className="flex items-start p-4 bg-green-50 rounded-lg">
                            <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.5 8.5L7.5 10.5L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span className="text-gray-700 font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Отзыв клиента */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Отзыв клиента</h3>
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-500">
                        <p className="text-gray-700 italic leading-relaxed">
                          "{caseData.clientFeedback}"
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CaseStudies;
