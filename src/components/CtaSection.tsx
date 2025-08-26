
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  openModal: () => void;
}

const CtaSection = ({ openModal }: CtaSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
      {/* Волновой фон */}
      <div className="absolute inset-0 w-screen overflow-hidden left-1/2 -translate-x-1/2">
        <svg
          className="absolute bottom-0 left-0 w-full h-48 transform"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="0.06"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="white"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-48 transform"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="0.08"
            d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,117.3C672,117,768,203,864,218.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Обсудим ваш проект за 15 минут?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Наши специалисты помогут подобрать подходящее решение для вашего бизнеса
            и ответят на все вопросы
          </p>
          <Button
            onClick={openModal}
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 text-lg font-medium px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Оставить заявку
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
