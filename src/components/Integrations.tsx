
import { motion } from "framer-motion";

const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: "amoCRM",
      logo: "/lovable-uploads/7018e875-d8e9-4e0a-b6b4-b052ecafe406.png",
    },
    {
      id: 2,
      name: "Bitrix24",
      logo: "/lovable-uploads/5336fc22-6979-45c6-829c-b8fab478ec90.png",
    },
    {
      id: 3,
      name: "WhatsApp",
      logo: "/lovable-uploads/d6f85d4c-6e6f-4493-92e9-8fd81809bb2c.png",
    },
    {
      id: 4,
      name: "Avito",
      logo: "/lovable-uploads/428a098d-4f04-40b5-97cd-25a76b632c9a.png",
    },
    {
      id: 5,
      name: "VK",
      logo: "/lovable-uploads/26cc1921-36e3-488c-ac8c-4258e5bec2e3.png",
    },
    {
      id: 6,
      name: "Telegram",
      logo: "/lovable-uploads/d236c1e9-3798-496e-bb16-7bd809ca8f04.png",
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
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 w-full h-32 flex flex-col items-center justify-center group hover-scale"
              variants={item}
            >
              <div className="flex-1 flex items-center justify-center mb-2">
                <img 
                  src={integration.logo} 
                  alt={integration.name} 
                  className="max-h-10 max-w-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                  {integration.name}
                </span>
              </div>
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
