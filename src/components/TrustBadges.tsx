
import { motion } from "framer-motion";

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      title: "ТОП-100 ИИ стартапов",
      description: "По версии AI Russia",
      icon: "/badge-top100.svg",
    },
    {
      id: 2,
      title: "Резидент Технопарка",
      description: "Сколково",
      icon: "/badge-skolkovo.svg",
    },
    {
      id: 3,
      title: "Победитель хакатона",
      description: "AI Journey 2022",
      icon: "/badge-hackathon.svg",
    },
    {
      id: 4,
      title: "Участник программы",
      description: "ФРИИ Акселератор",
      icon: "/badge-frii.svg",
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {badges.map((badge) => (
            <motion.div 
              key={badge.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              variants={item}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-indigo-100 rounded-full">
                {/* Placeholder для иконок. В реальном проекте заменить на реальные SVG */}
                <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold mb-1">{badge.title}</h3>
              <p className="text-gray-500 text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
