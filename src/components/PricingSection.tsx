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
    <section id="pricing" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Стоимость для клиента
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Выберите подходящий тариф для разработки вашего ИИ-ассистента
          </p>
          <div className="bg-primary/10 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm font-medium">
              🎯 Детект автоответчиков и голосовых ассистентов за 3 секунды — на них не тратится трафик
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Популярный выбор
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-br from-${plan.color}/5 to-transparent`} />
                
                <CardHeader className={`relative ${plan.popular ? 'pt-12' : ''}`}>
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-${plan.color}/10 rounded-2xl flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 text-${plan.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-lg text-muted-foreground">₽</span>
                    </div>
                    <CardDescription className="text-sm">
                      {plan.period}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-sm text-muted-foreground">Что входит:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 text-${plan.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={onOpenModal}
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
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
          <div className="bg-muted/50 rounded-lg p-6 max-w-4xl mx-auto mb-8">
            <h3 className="font-semibold mb-3">Автоматический обзвон</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Стоимость: от 0,14 ₽/сек</p>
                <p className="text-muted-foreground">Посекундная тарификация</p>
              </div>
              <div>
                <p className="font-medium">Без лишних трат</p>
                <p className="text-muted-foreground">Оплата только за успешные звонки</p>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">
            Нужно что-то особенное? Обсудим индивидуальные условия
          </p>
          <Button onClick={onOpenModal} variant="ghost" size="lg">
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;