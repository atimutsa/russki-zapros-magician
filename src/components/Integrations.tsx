
import { motion } from "framer-motion";

const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: "amoCRM",
      logo: "https://www.amocrm.com/static/images/pages/logo/amocrm_logo.svg",
    },
    {
      id: 2,
      name: "Bitrix24",
      logo: "https://cdn.bitrix24.com/bitrix/images/logo/bitrix24_logo.svg",
    },
    {
      id: 3,
      name: "WhatsApp",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png",
    },
    {
      id: 4,
      name: "Avito",
      logo: "https://www.avito.ru/s/cc/patterns/img/avito-logo.svg",
    },
    {
      id: 5,
      name: "VK",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/2048px-VK_Compact_Logo_%282021-present%29.svg.png",
    },
    {
      id: 6,
      name: "Telegram",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Интеграции</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Готовые и кастомные интеграции с вашими системами
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {integrations.map((integration) => (
            <motion.div 
              key={integration.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-24 flex items-center justify-center"
              variants={item}
            >
              <img 
                src={integration.logo} 
                alt={integration.name} 
                className="max-h-12 max-w-full"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-indigo-600 font-medium">
            Мы также разрабатываем индивидуальные решения под ваши нужды
          </p>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
