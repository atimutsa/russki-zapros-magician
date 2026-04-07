import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    Sparkles,
    PhoneCall,
    Filter,
    ShieldCheck,
    Timer,
    Wallet,
    ArrowRight,
    BadgeCheck,
} from "lucide-react";

type LeadgenProps = {
    openModal: () => void;
};

export default function Leadgen({ openModal }: LeadgenProps) {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <main className="min-h-screen">
            {/* HERO (цвета как на главной) */}
            <section className="relative overflow-hidden">
                {/* фон */}
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(135deg, #7F7AED 0%, #B06DF0 55%, #6366F1 100%)",
                    }}
                />
                <div
                    className="absolute inset-0 -z-10 opacity-25"
                    style={{
                        background:
                            "radial-gradient(900px circle at 18% 18%, rgba(224,231,255,1), transparent 15%)," +
                            "radial-gradient(700px circle at 85% 25%, rgba(220,252,231,1), transparent 45%)",
                    }}
                />

                {/* контент */}
                <div className="container mx-auto px-4 pt-28 md:pt-32 pb-0">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center py-12 md:py-16">
                        <div className="text-white">
                            <div className="flex flex-wrap gap-2">
          <span
              className="rounded-full border px-3 py-1 text-sm"
              style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.12)" }}
          >
            не реклама
          </span>
                                <span
                                    className="rounded-full border px-3 py-1 text-sm"
                                    style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.12)" }}
                                >
            не колл-центр
          </span>
                                <span
                                    className="rounded-full border px-3 py-1 text-sm"
                                    style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.12)" }}
                                >
            не холодные звонки
          </span>
                            </div>

                            <h1 className="mt-5 text-3xl md:text-5xl font-semibold leading-tight">
                                ИИ-голосовой бот для лидогенерации
                            </h1>

                            <p className="mt-4 text-base md:text-lg max-w-xl text-white/85">
                                Мы находим аудиторию под вашу нишу. ИИ выявляет интерес и передаёт вам только тех,
                                кто готов говорить с менеджером.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <Button
                                    onClick={openModal}
                                    className="h-11 px-6 bg-[#CB4294] text-white hover:bg-white/90 hover:text-[#333333]"
                                >
                                    Оставить заявку
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => scrollTo("economy")}
                                    className="h-11 px-6 border-white/35 text-[#333333] hover:bg-white/10"
                                >
                                    Посмотреть экономику
                                </Button>
                            </div>

                            <div className="mt-9 grid grid-cols-3 gap-3 max-w-xl">
                                <div
                                    className="rounded-xl border px-4 py-3"
                                    style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.10)" }}
                                >
                                    <div className="text-2xl font-semibold">7–10%</div>
                                    <div className="text-xs text-white/80 mt-1">интерес (услуги)</div>
                                </div>
                                <div
                                    className="rounded-xl border px-4 py-3"
                                    style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.10)" }}
                                >
                                    <div className="text-2xl font-semibold">4,6%</div>
                                    <div className="text-xs text-white/80 mt-1">интерес (недвиж.)</div>
                                </div>
                                <div
                                    className="rounded-xl border px-4 py-3"
                                    style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.10)" }}
                                >
                                    <div className="text-2xl font-semibold">+30%</div>
                                    <div className="text-xs text-white/80 mt-1">повторные продажи</div>
                                </div>
                            </div>
                        </div>

                        {/* правая карточка */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Как это работает</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-3">
                                    <div
                                        className="mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center"
                                        style={{ background: "#E0E7FF" }}
                                    >
                                        <span className="text-[#6366F1] font-semibold">1</span>
                                    </div>
                                    <div>
                                        <div className="font-medium">Формируем аудиторию</div>
                                        <div className="text-sm text-muted-foreground">
                                            Люди уже интересовались конкурентами. Спрос есть.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div
                                        className="mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center"
                                        style={{ background: "#E0E7FF" }}
                                    >
                                        <span className="text-[#6366F1] font-semibold">2</span>
                                    </div>
                                    <div>
                                        <div className="font-medium">ИИ делает первичный контакт</div>
                                        <div className="text-sm text-muted-foreground">
                                            Спокойно, без выгорания, строго по сценарию.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div
                                        className="mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center"
                                        style={{ background: "#DCFCE7" }}
                                    >
                                        <span className="text-emerald-700 font-semibold">3</span>
                                    </div>
                                    <div>
                                        <div className="font-medium">Передаём заинтересованных</div>
                                        <div className="text-sm text-muted-foreground">
                                            Менеджер подключается только там, где есть смысл.
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <Button
                                    onClick={openModal}
                                    className="w-full h-11"
                                    style={{
                                        background: "linear-gradient(135deg, #7F7AED 0%, #B06DF0 100%)",
                                    }}
                                >
                                    Получить расчёт под нишу
                                </Button>

                                <p className="text-xs text-muted-foreground">
                                    Никаких “магических лидов”. Просто управляемый поток первичных контактов.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* ВОЛНА на всю ширину под Header */}
                <svg
                    className="block w-screen -mb-1"
                    style={{ marginLeft: "calc(50% - 50vw)" }}
                    viewBox="0 0 1440 160"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,117.3C840,128,960,128,1080,117.3C1200,107,1320,85,1380,74.7L1440,64L1440,160L1380,160C1320,160,1200,160,1080,160C960,160,840,160,720,160C600,160,480,160,360,160C240,160,120,160,60,160L0,160Z"
                        className="fill-background"
                    />
                </svg>
            </section>


            {/* WHY */}
            <section className="container mx-auto px-4 py-14">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-sm text-muted-foreground">Коротко, без сказок</p>
                    <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
                        Почему привлекать клиентов стало тяжелее
                    </h2>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Рынок стал жёстче</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-muted-foreground">
                            <p>Реклама дорожает, результат прыгает.</p>
                            <p>Менеджеры тратят время на пустые прозвоны.</p>
                            <p>Холодные звонки раздражают и бьют по репутации.</p>
                            <p>Часто всё упирается в самый первый контакт.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Пока вы откладываете</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-muted-foreground">
                            <p>Эти же люди уходят к конкурентам — просто раньше.</p>
                            <p>Потери идут не из-за “плохих продаж”, а из-за скорости контакта.</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">Логичный вопрос</p>
                    <h3 className="mt-2 text-xl md:text-2xl font-semibold">
                        Откуда брать клиентов? И кто будет этим заниматься?
                    </h3>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    <Card className="border-primary/20">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <BadgeCheck className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">База — на нас</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Мы собираем аудиторию под нишу. Это люди с уже проявленным интересом.
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Без “колл-центра”</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Нет обзвона “всем подряд”. Диалоги короче, негатива почти нет.
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Filter className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">ИИ — фильтр интереса</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Менеджер подключается только там, где человек реально готов обсуждать.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* TECH */}
            <section className="bg-muted/30">
                <div className="container mx-auto px-4 py-14">
                    <div className="flex items-end justify-between gap-4 flex-wrap">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold">Технология дозвона</h2>
                            <p className="text-muted-foreground mt-2 max-w-2xl">
                                Звонки с разных мобильных номеров, распознавание автоответчиков, учёт часовых
                                поясов и запрет звонков ночью.
                            </p>
                        </div>
                        <Button variant="outline" onClick={openModal} className="h-11">
                            Хочу демо
                        </Button>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Timer className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-base">Дозваниваемость</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>Мобильная карусель снижает риск блокировок.</p>
                                <p>Определяем автоответчики и ассистентов.</p>
                                <p>Звонки по графику, без ночных сюрпризов.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <PhoneCall className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-base">Любая база</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>Наша база — или ваша (спящие, недошедшие, старые клиенты).</p>
                                <p>Размер базы не ограничен.</p>
                                <p>Оплата только за фактическое общение.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* ECONOMY */}
            <section id="economy" className="container mx-auto px-4 py-14">
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-primary" /> Прозрачная экономика
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-muted-foreground">
                            <p>Трафик обзвона — 17 копеек в секунду, посекундная тарификация.</p>
                            <p>Оплата только за фактическое общение, без “платежей за воздух”.</p>
                            <p>Бонус на трафик: 500 ₽ → 1000 ₽ → 1500 ₽ и далее +500 ₽ в месяц до 5000 ₽.</p>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle>Сделаем расчёт</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Пара вопросов по нише и гео — покажем цифры по вашей ситуации.
                            </p>
                            <Button onClick={openModal} className="w-full h-11">
                                Получить расчёт
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                Откроется форма заявки прямо здесь.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* LAUNCH + PRICE */}
            <section className="bg-muted/30">
                <div className="container mx-auto px-4 py-14">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Как запускаемся</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3 text-sm text-muted-foreground">
                                <div className="flex gap-3">
                                    <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
                                        1
                                    </div>
                                    <div>Задача, оффер, сценарий</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
                                        2
                                    </div>
                                    <div>Договор, ТЗ</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
                                        3
                                    </div>
                                    <div>Разработка 2–4 недели</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
                                        4
                                    </div>
                                    <div>Тест и доводка диалогов</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
                                        5
                                    </div>
                                    <div>Автономная лидогенерация</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle>Стоимость и условия</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-muted-foreground">
                                <p>
                                    <span className="font-medium text-foreground">75 000 ₽</span> — разработка и настройка
                                    (возможна рассрочка до 3 месяцев).
                                </p>
                                <p>
                                    <span className="font-medium text-foreground">50 000 ₽/мес</span> — база 1000 номеров,
                                    поддержка (5 часов), бонусы на трафик.
                                </p>
                                <p>1 раз в год — месяц паузы без потери бонуса.</p>

                                <Button onClick={openModal} className="w-full h-11">
                                    Оставить заявку
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-10 max-w-3xl">
                        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
                        <p className="text-muted-foreground mt-2">
                            Что обычно спрашивают перед стартом.
                        </p>

                        <div className="mt-6">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="a">
                                    <AccordionTrigger>Это похоже на колл-центр?</AccordionTrigger>
                                    <AccordionContent>
                                        Нет. Работа идёт по аудитории с уже проявленным интересом, а ИИ отсекает
                                        нецелевых.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="b">
                                    <AccordionTrigger>Куда попадают лиды?</AccordionTrigger>
                                    <AccordionContent>
                                        В ваш отдел продаж: как только человек проявил интерес. При желании добавим
                                        интеграции.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="c">
                                    <AccordionTrigger>Сколько времени на запуск?</AccordionTrigger>
                                    <AccordionContent>
                                        Обычно 2–4 недели: оффер, сценарий, разработка, тест и доводка.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="d">
                                    <AccordionTrigger>Можно работать по нашей базе?</AccordionTrigger>
                                    <AccordionContent>
                                        Да. Спящие, недошедшие, старые клиенты — всё подходит. Оплата только за
                                        фактическое общение.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="container mx-auto px-4 py-16">
                <Card className="relative overflow-hidden border-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
                    <CardContent className="relative py-10 md:py-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-semibold">
                                    Мы приводим клиентов. ИИ фильтрует интерес. Вы продаёте.
                                </h2>
                                <p className="text-muted-foreground mt-2">
                                    Запишитесь на демонстрацию и получите расчёт под вашу нишу.
                                </p>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <Button onClick={openModal} className="h-11 px-6">
                                    Записаться на демонстрацию
                                </Button>
                                <Button variant="outline" onClick={() => scrollTo("economy")} className="h-11 px-6">
                                    Экономика
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
