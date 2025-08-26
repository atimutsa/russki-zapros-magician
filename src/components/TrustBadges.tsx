
import { motion } from "framer-motion";

const TrustBadges = () => {
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Нам доверяют</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {badges.map((badge) => {
            const CardContent = (
              <>
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-100 rounded-full">
                  {/* Placeholder для иконок. В реальном проекте заменить на реальные SVG */}
                  <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{badge.title}</h3>
                <p className="text-gray-500 text-sm">{badge.description}</p>
              </>
            );

            return (
              <motion.div 
                key={badge.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                variants={item}
              >
                {badge.url ? (
                  <a 
                    href={badge.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center"
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
