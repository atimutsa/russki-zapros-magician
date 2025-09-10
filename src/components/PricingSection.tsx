import { Check, Star, Phone, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PricingSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Прозрачные цены
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Никаких скрытых платежей. Оплачивайте только за результат.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Разработка бота */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Разработка ИИ-бота</CardTitle>
                  <CardDescription>Полный цикл создания и настройки</CardDescription>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">от 69 000</span>
                <span className="text-lg text-muted-foreground">₽</span>
              </div>
              
              <Badge variant="secondary" className="w-fit">
                <Star className="w-3 h-3 mr-1" />
                Иногда бесплатно в рамках лидгена
              </Badge>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <div className="space-y-3">
                {[
                  "Настройка под ваш бизнес",
                  "Интеграция с CRM системами", 
                  "Обучение на ваших данных",
                  "Техническая поддержка",
                  "Аналитика и отчеты",
                  "Неограниченные правки"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={onOpenModal}
                className="w-full mt-6"
                size="lg"
              >
                Обсудить проект
              </Button>
            </CardContent>
          </Card>

          {/* Обзвон */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Автоматический обзвон</CardTitle>
                  <CardDescription>Посекундная тарификация</CardDescription>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">от 0,14</span>
                <span className="text-lg text-muted-foreground">₽/сек</span>
              </div>
              
              <Badge variant="outline" className="w-fit">
                Точная тарификация по секундам
              </Badge>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <div className="space-y-3">
                {[
                  "Оплата только за успешные звонки",
                  "Посекундная тарификация",
                  "Без абонентской платы",
                  "Детальная статистика звонков",
                  "Запись всех разговоров",
                  "Интеграция с вашей базой"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-center">
                  <strong>Пример:</strong> Звонок длительностью 2 минуты = 16,8 ₽
                </p>
              </div>

              <Button 
                onClick={onOpenModal}
                variant="outline"
                className="w-full mt-6"
                size="lg"
              >
                Рассчитать стоимость
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Нужно что-то особенное? Обсудим индивидуальные условия
          </p>
          <Button onClick={onOpenModal} variant="ghost" size="lg">
            Связаться с нами
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;