
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="footer" className="relative bg-gray-900 text-gray-300 pt-16 pb-8 overflow-hidden">
      {/* Wavy background for footer */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <svg 
          viewBox="0 0 1000 1000" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-20"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,100 C200,150 400,50 600,150 C800,250 1000,150 1000,150 L1000,1000 L0,1000 Z" 
            fill="#6366f1" 
          />
          <path 
            d="M0,200 C200,150 400,250 600,150 C800,50 1000,150 1000,150 L1000,1000 L0,1000 Z" 
            fill="#8b5cf6" 
            opacity="0.5"
          />
        </svg>
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Тимлекс</h3>
            <p className="mb-4">
              Агентство ИИ-коммуникаций для бизнеса. Автоматизируем общение с клиентами с помощью современных технологий.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://t.me/timlex_support" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@timlex.ru"
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
                <a href="mailto:info@timlex.ru" className="hover:text-white transition-colors">info@timlex.ru</a>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 mr-2 mt-0.5" />
                <a href="https://t.me/timlex_support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@timlex_support</a>
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
              <p>ООО "Тимлекс" | ИНН: 1234567890 | ОГРН: 1234567890123</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
