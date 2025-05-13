
import { motion } from "framer-motion";
import { Clock, DollarSign, Ban, Share2, Headphones } from "lucide-react";

const WhyUs = () => {
  const features = [
    {
      id: 1,
      icon: <Clock className="w-8 h-8 text-indigo-600" />,
      title: "Запуск от 3 дней",
      description: "Быстрый старт и внедрение проекта в ваш бизнес-процесс",
    },
    {
      id: 2,
      icon: <DollarSign className="w-8 h-8 text-indigo-600" />,
      title: "Работа с любым бюджетом",
      description: "Подберем решение под ваши финансовые возможности",
    },
    {
      id: 3,
      icon: <Ban className="w-8 h-8 text-indigo-600" />,
      title: "Не берём абонплату",
      description: "Платите только за результат и использование",
    },
    {
      id: 4,
      icon: <Share2 className="w-8 h-8 text-indigo-600" />,
      title: "Интеграции в CRM / телефонию",
      description: "Подключаем к вашим существующим системам",
    },
    {
      id: 5,
      icon: <Headphones className="w-8 h-8 text-indigo-600" />,
      title: "Поддержка и сопровождение",
      description: "Обслуживаем и развиваем вашу систему после запуска",
    },
  ];

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
    <section id="whyus" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Почему мы?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Тимлекс помогает бизнесу эффективно автоматизировать коммуникации и повышать продажи с помощью ИИ
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
              variants={item}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block mb-4 group-hover:bg-indigo-50 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
