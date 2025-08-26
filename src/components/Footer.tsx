
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="footer" className="relative bg-gray-900 text-gray-300 pt-16 pb-8 overflow-hidden">
      {/* Wavy background for footer */}
      <div className="absolute inset-0 w-screen h-full opacity-20 pointer-events-none left-1/2 -translate-x-1/2">
        <svg 
          viewBox="0 0 1440 600" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full absolute left-0 bottom-0"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,96 C120,64 240,32 360,32 C480,32 600,64 720,80 C840,96 960,96 1080,80 C1200,64 1320,32 1440,32 L1440,600 L0,600 Z" 
            fill="#6366f1" 
            opacity="0.2"
          />
          <path 
            d="M0,192 C120,160 240,128 360,144 C480,160 600,224 720,224 C840,224 960,160 1080,128 C1200,96 1320,96 1440,128 L1440,600 L0,600 Z" 
            fill="#8b5cf6" 
            opacity="0.2"
          />
          <path 
            d="M0,288 C120,320 240,352 360,336 C480,320 600,256 720,256 C840,256 960,320 1080,352 C1200,384 1320,384 1440,352 L1440,600 L0,600 Z" 
            fill="#9b87f5" 
            opacity="0.1"
          />
        </svg>
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/058e03b5-8fb5-4bf5-bfed-e3786ee979d5.png" 
                alt="Тимлекс" 
                className="h-10 w-auto"
              />
            </div>
            <p className="mb-4">
              Агентство ИИ-коммуникаций для бизнеса. Автоматизируем общение с клиентами с помощью современных технологий.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://t.me/TeamlexBot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@teamlex.ru"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Услуги</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Голосовой бот</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Чат-бот</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Лидогенерация</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Интеграции с CRM</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">О компании</h4>
            <ul className="space-y-2">
              <li>
                <a href="#whyus" className="hover:text-white transition-colors">Почему мы</a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors">Кейсы</a>
              </li>
              <li>
                <Link to="/policy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5" />
                <a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5" />
                <a href="mailto:info@teamlex.ru" className="hover:text-white transition-colors">info@teamlex.ru</a>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 mr-2 mt-0.5" />
                <a href="https://t.me/TeamlexBot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@TeamlexBot</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© {currentYear} Тимлекс. Все права защищены.</p>
            </div>
            
            <div className="text-gray-500">
              <p>ООО "Тимлекс" | ИНН: 3703025269 | ОГРН: 370301001</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
