
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [comment, setComment] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Если пользователь ввел текст и не начал с @, добавляем @
    if (value && !value.startsWith('@')) {
      value = '@' + value;
    }
    setTelegram(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !isAgree) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = {
      name,
      phone,
      telegram: telegram || undefined, // Не отправляем пустое поле
      comment: comment || undefined,   // Не отправляем пустое поле
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://webhook.site/eb743f0f-e3ae-495a-8596-a2046e03635a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
        setName("");
        setPhone("");
        setTelegram("");
        setComment("");
        setIsAgree(false);
        onClose();
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast.error("Произошла ошибка при отправке заявки. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оставить заявку</DialogTitle>
          <DialogDescription>
            Заполните форму, и мы свяжемся с вами в течение рабочего дня
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя*</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Петров"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон*</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              required
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram">Ник в Telegram</Label>
            <Input
              id="telegram"
              value={telegram}
              onChange={handleTelegramChange}
              placeholder="@username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Расскажите о вашем проекте или задайте вопрос"
              rows={3}
            />
          </div>
          <div className="flex items-start gap-2 mt-4">
            <div className="flex h-5 items-center">
              <input
                id="agreement"
                type="checkbox"
                checked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
            </div>
            <Label htmlFor="agreement" className="text-xs text-gray-500">
              Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с{" "}
              <a href="/policy" className="text-indigo-600 hover:underline">
                политикой конфиденциальности
              </a>
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </span>
            ) : (
              "Оставить заявку"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
