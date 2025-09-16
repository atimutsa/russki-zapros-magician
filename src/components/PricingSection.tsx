import { Check, Star, Bot, Zap, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PricingSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const plans = [
    {
      name: "Базовый",
      price: "69 000",
      period: "разработка от 2-х недель",
      icon: Bot,
      color: "primary",
      features: [
        "Создание скрипта",
        "Сборка сценария",
        "Одна задача в диалоге",
        "До 15 входящих вопросов",
        "Обучение по платформе"
      ]
    },
    {
      name: "Стандарт",
      price: "129 000",
      period: "разработка от 3-х недель",
      icon: Zap,
      color: "secondary",
      popular: true,
      features: [
        "Пилотный запуск",
        "Создание скрипта",
        "Сборка сценария",
        "От двух задач в диалоге",
        "До 35 входящих вопросов",
        "Обучение по платформе"
      ]
    },
    {
      name: "Twin",
      price: "279 000",
      period: "разработка от 4-х недель",
      icon: Target,
      color: "accent",
      features: [
        "Создание детальной статус-модели",
        "A/B тесты",
        "3 пилотных запуска",
        "Создание скрипта",
        "Сборка сценария",
        "Мультиканал чат/голос",
        "Вопросы не ограничены",
        "Скидки на обучение сотрудников",
        "Обучение по платформе"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Стоимость для клиента
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Выберите подходящий тариф для разработки вашего ИИ-ассистента
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto shadow-sm border border-indigo-100">
            <p className="text-sm font-medium text-gray-700">
              🎯 Детект автоответчиков и голосовых ассистентов за 3 секунды — на них не тратится трафик
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg ${
                  plan.popular ? 'ring-2 ring-indigo-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    Популярный выбор
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30" />
                
                <CardHeader className={`relative ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-indigo-600" />
                    </div>
                    <CardTitle className="text-2xl mb-2 text-gray-900">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-lg text-gray-500">₽</span>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      {plan.period}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-sm text-gray-500">Что входит:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="bg-indigo-100 text-indigo-600 p-1 rounded-full flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={onOpenModal}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white' 
                        : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                    }`}
                    size="lg"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto mb-8 border border-indigo-100 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 rounded-2xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Автоматический обзвон
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">₽</span>
                    </div>
                    <p className="font-semibold text-gray-900">Стоимость: от 0,14 ₽/сек</p>
                  </div>
                  <p className="text-sm text-gray-600">Посекундная тарификация</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="font-semibold text-gray-900">Без лишних трат</p>
                  </div>
                  <p className="text-sm text-gray-600">Оплата только за успешные звонки</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-center text-gray-700">
                  💡 <strong>Пример:</strong> Звонок длительностью 2 минуты = 16,8 ₽
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-900">
              Нужно что-то особенное?
            </p>
            <p className="text-gray-600">
              Обсудим индивидуальные условия и найдем оптимальное решение для вашего бизнеса
            </p>
            <Button 
              onClick={onOpenModal} 
              variant="default" 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;