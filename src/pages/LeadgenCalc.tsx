// src/pages/LeadgenCalc.tsx
import React, { useEffect, useMemo, useState } from "react";

import ContactModal from "@/components/ContactModal";
type MonthRow = {
    month: number;

    isDevMonth: boolean;
    isVacationMonth: boolean;
    isActiveMonth: boolean;

    candidatesIncluded: number;
    candidatesExtra: number;
    candidatesTotal: number;

    contactRate: number; // 0..1
    contacted: number;

    avgTalkSec: number;

    convInterest: number; // 0..1
    interested: number;

    convDeal: number; // 0..1
    deals: number;

    revenue: number;

    costsBot: number;
    costsAbon: number;
    costsExtraBase: number;

    // traffic
    trafficSec: number;
    costsTrafficGross: number;
    trafficBonusPlan: number; // bonus level value (500..5000)
    trafficBonusUsed: number; // applied (<= gross)
    costsTrafficNet: number; // gross - used

    costsTotal: number;
    profit: number;
    cumProfit: number;
    roi: number; // profit/costsTotal

    cpl: number | null; // cost per interest
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const roundTo1000 = (n: number) => Math.round(n / 1000) * 1000;

// NBSP between number and ₽ to prevent wrapping
const fmtRub = (n: number) => `${Math.round(n).toLocaleString("ru-RU")}\u00A0₽`;
const fmtInt = (n: number) => Math.round(n).toLocaleString("ru-RU");
const fmtPct = (v01: number) => `${(v01 * 100).toFixed(1)}%`;

function sCurve(from: number, to: number, step: number, k: number) {
    if (step <= 0) return from;
    const kk = clamp(k, 0.05, 3);
    return from + (to - from) * (1 - Math.exp(-kk * step));
}

function MiniLineChart({ values, height = 120 }: { values: number[]; height?: number }) {
    const width = 900;
    const padX = 18;
    const padY = 14;

    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const span = maxV - minV || 1;

    const points = values
        .map((v, i) => {
            const x = padX + (i * (width - padX * 2)) / Math.max(1, values.length - 1);
            const y = padY + (1 - (v - minV) / span) * (height - padY * 2);
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ");

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="chart">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7F7AED" stopOpacity="1" />
                    <stop offset="100%" stopColor="#B06DF0" stopOpacity="1" />
                </linearGradient>
            </defs>

            <polyline
                fill="none"
                stroke="rgba(99,102,241,0.20)"
                strokeWidth="6"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <polyline
                fill="none"
                stroke="url(#g)"
                strokeWidth="3"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <line
                x1={padX}
                x2={width - padX}
                y1={height - padY}
                y2={height - padY}
                stroke="rgba(224,231,255,0.7)"
            />
        </svg>
    );
}

function MiniBars({
                      a,
                      b,
                      c,
                      labels,
                  }: {
    a: number[];
    b: number[];
    c: number[];
    labels: string[];
}) {
    const maxV = Math.max(
        1,
        ...a.map((x) => Math.abs(x)),
        ...b.map((x) => Math.abs(x)),
        ...c.map((x) => Math.abs(x))
    );

    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-2 items-end">
                {a.map((_, i) => {
                    const ha = (Math.abs(a[i]) / maxV) * 100;
                    const hb = (Math.abs(b[i]) / maxV) * 100;
                    const hc = (Math.abs(c[i]) / maxV) * 100;

                    return (
                        <div key={i} className="col-span-1 min-w-0">
                            <div className="h-28 flex items-end gap-1">
                                <div
                                    className="w-1/3 rounded-t-lg"
                                    style={{ height: `${ha}%`, background: "rgba(99,102,241,0.85)" }}
                                    title={`выручка: ${fmtRub(a[i])}`}
                                />
                                <div
                                    className="w-1/3 rounded-t-lg"
                                    style={{ height: `${hb}%`, background: "rgba(176,109,240,0.80)" }}
                                    title={`расходы: ${fmtRub(b[i])}`}
                                />
                                <div
                                    className="w-1/3 rounded-t-lg"
                                    style={{
                                        height: `${hc}%`,
                                        background: "rgba(220,252,231,0.95)",
                                        outline: "1px solid rgba(16,185,129,0.35)",
                                    }}
                                    title={`прибыль: ${fmtRub(c[i])}`}
                                />
                            </div>
                            <div className="mt-1 text-[10px] text-slate-500 text-center truncate">{labels[i]}</div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ background: "rgba(99,102,241,0.85)" }} />
          выручка
        </span>
                <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ background: "rgba(176,109,240,0.80)" }} />
          расходы
        </span>
                <span className="inline-flex items-center gap-2">
          <span
              className="w-3 h-3 rounded"
              style={{
                  background: "rgba(220,252,231,0.95)",
                  outline: "1px solid rgba(16,185,129,0.35)",
              }}
          />
          прибыль
        </span>
            </div>
        </div>
    );
}



function DualAxisSvgChart({
                              candidates,
                              cpl,
                              height = 180,
                          }: {
    candidates: number[];
    cpl: number[];
    height?: number;
}) {
    const width = 900;
    const padX = 22;
    const padY = 16;

    const minC = Math.min(...candidates, 0);
    const maxC = Math.max(...candidates, 1);
    const minL = Math.min(...cpl, 0);
    const maxL = Math.max(...cpl, 1);

    const spanC = maxC - minC || 1;
    const spanL = maxL - minL || 1;

    const pts = (arr: number[], minV: number, span: number) =>
        arr
            .map((v, i) => {
                const x = padX + (i * (width - padX * 2)) / Math.max(1, arr.length - 1);
                const y = padY + (1 - (v - minV) / span) * (height - padY * 2);
                return `${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ");

    const pCandidates = pts(candidates, minC, spanC);
    const pCpl = pts(cpl, minL, spanL);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="chart">
            <defs>
                <linearGradient id="cand_g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7F7AED" stopOpacity="1" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="cpl_g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#DCFCE7" stopOpacity="1" />
                </linearGradient>
            </defs>

            <polyline
                fill="none"
                stroke="rgba(99,102,241,0.20)"
                strokeWidth="6"
                points={pCandidates}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <polyline
                fill="none"
                stroke="url(#cand_g)"
                strokeWidth="3"
                points={pCandidates}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <polyline
                fill="none"
                stroke="rgba(16,185,129,0.20)"
                strokeWidth="6"
                points={pCpl}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <polyline
                fill="none"
                stroke="url(#cpl_g)"
                strokeWidth="3"
                points={pCpl}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <line x1={padX} x2={width - padX} y1={height - padY} y2={height - padY} stroke="rgba(224,231,255,0.7)" />

            <text x={padX} y={14} fontSize="12" fill="rgba(71,85,105,0.9)">
                кандидаты (левая шкала)
            </text>
            <text x={width - padX} y={14} fontSize="12" textAnchor="end" fill="rgba(71,85,105,0.9)">
                стоимость лида (правая шкала)
            </text>
        </svg>
    );
}

function PercentInput({
                          value,
                          onChange,
                          min = 0,
                          max = 100,
                      }: {
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
}) {
    return (
        <div className="mt-1 flex items-center gap-2">
            <input
                type="number"
                min={min}
                max={max}
                value={Number.isFinite(value) ? value : 0}
                onChange={(e) => onChange(parseFloat(e.target.value || "0"))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#6366F1]"
            />
            <span className="text-sm text-slate-500">%</span>
        </div>
    );
}


export default function LeadgenCalc() {
    // Hide global header on this page only
    useEffect(() => {
        document.body.classList.add("leadgen-calc-no-header");
        return () => document.body.classList.remove("leadgen-calc-no-header");
    }, []);

    // constants
    const BOT_PRICE = 75_000;
    const BOT_INSTALLMENT = 25_000;
    const ABON = 54_000;

    const INCLUDED_CANDIDATES = 1000;
    const COST_PER_SEC = 0.33;

    const getExtraPackPricePer1000 = (extraCandidates: number) => {
        const k = Math.round(extraCandidates / 1000);
        if (k <= 0) return 0;
        if (k < 3) return 49_000;        // 1 000 – 2 000
        if (k < 5) return 44_000;        // 3 000 – 4 000
        if (k < 10) return 39_000;       // 5 000 – 9 000
        return 29_000;                   // 10 000+
    };


    // horizon
    const [months, setMonths] = useState(12);

    // payment
    const [installments, setInstallments] = useState(true);

    // traffic inputs
    const [avgTalkSec, setAvgTalkSec] = useState(16);

    // scaling candidates
    const [scaleCandidates, setScaleCandidates] = useState(true);
    const [maxExtraCandidates, setMaxExtraCandidates] = useState(5000); // 0..50000 step 1000
    const [candidatesGrowthK, setCandidatesGrowthK] = useState(0.9);

    // if scaling off - fixed extra
    const [fixedExtraCandidates, setFixedExtraCandidates] = useState(0);

    // contact rate (FIXED)
    const [contactPct, setContactPct] = useState(55);

    // conversions
    const [convMinPct, setConvMinPct] = useState(2);
    const [convMaxPct, setConvMaxPct] = useState(7);
    const [convDealPct, setConvDealPct] = useState(30);

    // money
    const [avgCheck, setAvgCheck] = useState(25_000);

    // growth speed for conversions
    const [growthK, setGrowthK] = useState(0.85);

    // bonus on traffic
    const [trafficBonusEnabled, setTrafficBonusEnabled] = useState(true);

    // bonus vacations (up to 2; 2nd resets bonus ladder)
    const [vacationsEnabled, setVacationsEnabled] = useState(false);
    const [vacationMonth1, setVacationMonth1] = useState<number>(0); // 0 = none
    const [vacationMonth2, setVacationMonth2] = useState<number>(0); // 0 = none

    const data = useMemo<MonthRow[]>(() => {
        const mCount = clamp(months, 3, 36);

        const v1 = vacationsEnabled ? vacationMonth1 : 0;
        const v2 = vacationsEnabled ? vacationMonth2 : 0;
        const vacSet = new Set<number>();
        if (v1 >= 1 && v1 <= mCount) vacSet.add(v1);
        if (v2 >= 1 && v2 <= mCount) vacSet.add(v2);

        const rows: MonthRow[] = [];

        for (let m = 1; m <= mCount; m++) {
            const isDevMonth = m === 1;
            const isVacationMonth = vacSet.has(m);
            const isActiveMonth = !isDevMonth && !isVacationMonth;

            // extra candidates per month
            let extraThisMonth = 0;

            if (isActiveMonth) {
                if (scaleCandidates) {
                    const raw = sCurve(0, maxExtraCandidates, Math.max(0, m - 2), candidatesGrowthK);
                    extraThisMonth = roundTo1000(clamp(raw, 0, 50_000));
                } else {
                    extraThisMonth = roundTo1000(clamp(fixedExtraCandidates, 0, 50_000));
                }
            }

            const candidatesIncluded = isActiveMonth ? INCLUDED_CANDIDATES : 0;
            const candidatesExtra = isActiveMonth ? extraThisMonth : 0;
            const candidatesTotal = candidatesIncluded + candidatesExtra;

            const contactRate = isActiveMonth ? clamp(contactPct / 100, 0, 1) : 0;
            const contacted = Math.round(candidatesTotal * contactRate);

            const convInterest = isActiveMonth
                ? clamp(sCurve(convMinPct / 100, convMaxPct / 100, Math.max(0, m - 2), growthK), 0, 1)
                : 0;

            const interested = Math.round(contacted * convInterest);

            const convDeal = isActiveMonth ? clamp(convDealPct / 100, 0, 1) : 0;
            const deals = Math.round(interested * convDeal);

            const revenue = deals * avgCheck;

            // costs bot
            let costsBot = 0;
            if (installments) {
                if (m >= 1 && m <= 3) costsBot = BOT_INSTALLMENT;
            } else {
                if (m === 1) costsBot = BOT_PRICE;
            }

            // abon + base purchase only in active months
            const costsAbon = isActiveMonth ? ABON : 0;

            const packs = Math.round(candidatesExtra / 1000);
            const pricePer1000 = getExtraPackPricePer1000(candidatesExtra);
            const costsExtraBase = isActiveMonth ? packs * pricePer1000 : 0;

            // traffic
            const trafficSec = isActiveMonth ? candidatesTotal * clamp(avgTalkSec, 0, 600) : 0;
            const costsTrafficGross = isActiveMonth ? trafficSec * COST_PER_SEC : 0;

            // placeholders for bonus, will be post-processed
            const trafficBonusPlan = 0;
            const trafficBonusUsed = 0;
            const costsTrafficNet = 0;

            const costsTotal = costsBot + costsAbon + costsExtraBase + costsTrafficNet;
            const profit = revenue - costsTotal;

            const roi = costsTotal > 0 ? profit / costsTotal : 0;
            const cpl = interested > 0 ? costsTotal / interested : null;

            rows.push({
                month: m,
                isDevMonth,
                isVacationMonth,
                isActiveMonth,
                candidatesIncluded,
                candidatesExtra,
                candidatesTotal,
                contactRate,
                contacted,
                avgTalkSec: clamp(avgTalkSec, 0, 600),
                convInterest,
                interested,
                convDeal,
                deals,
                revenue,
                costsBot,
                costsAbon,
                costsExtraBase,
                trafficSec,
                costsTrafficGross,
                trafficBonusPlan,
                trafficBonusUsed,
                costsTrafficNet,
                costsTotal,
                profit,
                cumProfit: 0,
                roi,
                cpl,
            });
        }

        // bonus ladder: month1=500, month2=1000 ... up to 5000
        // - no carryover
        // - vacation month freezes ladder (does not advance)
        // - second vacation => reset ladder to 500 from next month
        const vacMonths = trafficBonusEnabled ? [...vacSet].sort((a, b) => a - b) : [];
        const secondVac = vacMonths.length >= 2 ? vacMonths[1] : null;

        if (trafficBonusEnabled) {
            let ladder = 1;

            for (const r of rows) {
                if (secondVac && r.month === secondVac + 1) ladder = 1;

                r.trafficBonusPlan = Math.min(500 * ladder, 5000);

                if (r.isActiveMonth) {
                    r.trafficBonusUsed = Math.min(r.costsTrafficGross, r.trafficBonusPlan);
                    r.costsTrafficNet = Math.max(0, r.costsTrafficGross - r.trafficBonusUsed);
                } else {
                    r.trafficBonusUsed = 0;
                    r.costsTrafficNet = 0;
                }

                if (!r.isVacationMonth) ladder = Math.min(ladder + 1, 10);
            }
        } else {
            for (const r of rows) {
                r.trafficBonusPlan = 0;
                r.trafficBonusUsed = 0;
                r.costsTrafficNet = r.isActiveMonth ? r.costsTrafficGross : 0;
            }
        }

        // recompute totals/cum
        let cum = 0;
        for (const r of rows) {
            r.costsTotal = r.costsBot + r.costsAbon + r.costsExtraBase + r.costsTrafficNet;
            r.profit = r.revenue - r.costsTotal;
            cum += r.profit;
            r.cumProfit = cum;
            r.roi = r.costsTotal > 0 ? r.profit / r.costsTotal : 0;
            r.cpl = r.interested > 0 ? r.costsTotal / r.interested : null;
        }

        return rows;
    }, [
        months,
        installments,
        avgTalkSec,
        scaleCandidates,
        maxExtraCandidates,
        candidatesGrowthK,
        fixedExtraCandidates,
        contactPct,
        convMinPct,
        convMaxPct,
        convDealPct,
        avgCheck,
        growthK,
        trafficBonusEnabled,
        vacationsEnabled,
        vacationMonth1,
        vacationMonth2,
    ]);

    const summary = useMemo(() => {
        const totalRevenue = data.reduce((s, r) => s + r.revenue, 0);
        const totalCosts = data.reduce((s, r) => s + r.costsTotal, 0);
        const totalProfit = totalRevenue - totalCosts;

        const breakevenIdx = data.findIndex((r) => r.cumProfit >= 0);
        const breakevenMonth = breakevenIdx >= 0 ? data[breakevenIdx].month : null;

        const totalInterested = data.reduce((s, r) => s + r.interested, 0);
        const avgCpl = totalInterested > 0 ? totalCosts / totalInterested : null;

        return { totalRevenue, totalCosts, totalProfit, breakevenMonth, avgCpl };
    }, [data]);

    const chartMonths = data.map((r) => `M${r.month}`);
    const revenueSeries = data.map((r) => r.revenue);
    const costsSeries = data.map((r) => r.costsTotal);
    const profitSeries = data.map((r) => r.profit);
    const cumProfitSeries = data.map((r) => r.cumProfit);

    const currentExtraPricePer1000 = getExtraPackPricePer1000(scaleCandidates ? maxExtraCandidates : fixedExtraCandidates);

    const monthOptions = useMemo(() => {
        const mCount = clamp(months, 3, 36);
        return Array.from({ length: mCount }, (_, i) => i + 1);
    }, [months]);

    const conditionsText = useMemo(() => {
        const botPay = installments
            ? `Оплата бота: рассрочка 3 месяца по ${fmtRub(BOT_INSTALLMENT)} (разработка 2–4 недели).`
            : `Оплата бота: ${fmtRub(BOT_PRICE)} в месяц 1 (разработка 2–4 недели).`;

        const abon = `Абонентка: ${fmtRub(ABON)} в активные месяцы (с месяца 2). Включено кандидатов: ${fmtInt(
            INCLUDED_CANDIDATES
        )}/мес.`;

        const extra = scaleCandidates
            ? `Масштабирование кандидатов: включено, максимум докупки ${fmtInt(maxExtraCandidates)}/мес, скорость роста ${candidatesGrowthK.toFixed(2)}.`
            : `Масштабирование кандидатов: отключено, докупка фиксированная ${fmtInt(fixedExtraCandidates)}/мес.`;

        const contact = `Контактность базы: ${contactPct}%. (фиксированная по месяцам)`;
        const talk = `Средняя длительность диалога: ${avgTalkSec} сек. Тариф: ${COST_PER_SEC.toFixed(2)} ₽/сек.`;
        const conv = `Конверсия в интерес: ${convMinPct}% → ${convMaxPct}% (k=${growthK.toFixed(
            2
        )}). Конверсия интерес→договор: ${convDealPct}%.`;
        const money = `Средний чек: ${fmtRub(avgCheck)}.`;

        const bonus = trafficBonusEnabled
            ? `Бонус на трафик включён: 500 → 1000 → … → 5000 ₽ (неиспользованный не переносится).`
            : `Бонус на трафик выключен.`;

        let vacations = `Бонусные каникулы: выключены.`;
        if (vacationsEnabled) {
            const chosen = [vacationMonth1, vacationMonth2].filter((x) => x && x >= 1).sort((a, b) => a - b);
            vacations = chosen.length
                ? `Бонусные каникулы: включены. Месяцы каникул: ${chosen.join(", ")}. В каникулы обзвона нет; после 1-х бонус продолжается, после 2-х — начинается с 500.`
                : `Бонусные каникулы: включены (месяцы не выбраны).`;
        }

        return [botPay, abon, extra, contact, talk, conv, money, bonus, vacations].join("\n");
    }, [
        installments,
        ABON,
        BOT_INSTALLMENT,
        BOT_PRICE,
        INCLUDED_CANDIDATES,
        scaleCandidates,
        maxExtraCandidates,
        fixedExtraCandidates,
        candidatesGrowthK,
        contactPct,
        avgTalkSec,
        convMinPct,
        convMaxPct,
        growthK,
        convDealPct,
        avgCheck,
        trafficBonusEnabled,
        vacationsEnabled,
        vacationMonth1,
        vacationMonth2,
    ]);

    // CTA
    const [ctaOpen, setCtaOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#E0E7FF] via-white to-[#DCFCE7]">
            {/* page-only global styles */}
            <style jsx global>{`
        body.leadgen-calc-no-header header,
        body.leadgen-calc-no-header .header,
        body.leadgen-calc-no-header #header,
        body.leadgen-calc-no-header [data-site-header="true"] {
          display: none !important;
        }
      `}</style>

            {/* Sticky top bar (acts like header) */}
            <div className="sticky top-0 z-[999]">
                <div className="mx-auto max-w-7xl px-4 pt-3">
                    <div className="rounded-3xl bg-white/75 backdrop-blur border border-white shadow-xl">
                        <div className="p-4 md:p-5">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                                <div>
                                    <div className="text-lg md:text-xl font-extrabold text-slate-900">Leadgen ROI-калькулятор</div>
                                    <div className="text-xs md:text-sm text-slate-600 mt-1">
                                        Месяц 1 — разработка. С месяца 2 — лидген и абонентка.
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="px-4 py-3 rounded-2xl bg-[#E0E7FF] border border-white">
                                        <div className="text-[11px] text-slate-500">точка окупаемости</div>
                                        <div className="text-base font-bold text-slate-900">
                                            {summary.breakevenMonth ? `месяц ${summary.breakevenMonth}` : "не вышли в плюс"}
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-[#DCFCE7] border border-white">
                                        <div className="text-[11px] text-slate-500">стоимость лида</div>
                                        <div className="text-base font-bold text-slate-900 whitespace-nowrap">
                                            {summary.avgCpl === null ? "—" : fmtRub(summary.avgCpl)}
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-white border border-white">
                                        <div className="text-[11px] text-slate-500">итоговая прибыль</div>
                                        <div className="text-base font-bold text-slate-900 whitespace-nowrap">{fmtRub(summary.totalProfit)}</div>
                                    </div>

                                    <button
                                        onClick={() => setCtaOpen(true)}
                                        className="rounded-2xl px-5 py-3 font-bold text-white shadow-lg"
                                        style={{ background: "linear-gradient(90deg,#7F7AED,#B06DF0)" }}
                                    >
                                        Отправить заявку
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* spacer to keep content from being hidden under sticky bar */}
                    <div className="h-4" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="rounded-3xl bg-white/70 backdrop-blur border border-white shadow-xl overflow-hidden">
                    <div className="p-6 md:p-8">
                        {/* Inputs */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Payments + Traffic merged */}
                            <div className="rounded-2xl p-5 border border-[#E0E7FF] bg-white lg:col-span-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold text-slate-900">Платежи · База · Трафик</h2>

                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Payments */}
                                    <div className="rounded-2xl p-4 bg-gradient-to-r from-[#6366F1]/10 to-[#B06DF0]/10 border border-white">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">бот</div>
                                                <div className="text-xs text-slate-600 mt-1">разработка 2–4 недели</div>
                                            </div>
                                            <div className="text-sm font-extrabold text-slate-900">{fmtRub(BOT_PRICE)}</div>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <label className="flex items-center justify-between gap-3">
                                                <span className="text-sm text-slate-700">в рассрочку на 3 месяца</span>
                                                <input
                                                    type="checkbox"
                                                    checked={installments}
                                                    onChange={(e) => setInstallments(e.target.checked)}
                                                    className="h-5 w-5 accent-[#6366F1]"
                                                />
                                            </label>

                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-slate-700">абонентка (с месяца 2)</div>
                                                <div className="text-sm font-bold text-slate-900">{fmtRub(ABON)}</div>
                                            </div>

                                            <div className="pt-2 border-t border-white/70 space-y-3">
                                                <label className="flex items-center justify-between gap-3">
                                                    <span className="text-sm text-slate-700">бонус на трафик</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={trafficBonusEnabled}
                                                        onChange={(e) => setTrafficBonusEnabled(e.target.checked)}
                                                        className="h-5 w-5 accent-[#6366F1]"
                                                    />
                                                </label>

                                                <label className="flex items-center justify-between gap-3">
                                                    <span className="text-sm text-slate-700">бонусные каникулы</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={vacationsEnabled}
                                                        onChange={(e) => setVacationsEnabled(e.target.checked)}
                                                        className="h-5 w-5 accent-[#6366F1]"
                                                    />
                                                </label>

                                                {vacationsEnabled && (
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-xs text-slate-600">каникулы 1 (месяц)</label>
                                                            <select
                                                                value={vacationMonth1}
                                                                onChange={(e) => setVacationMonth1(parseInt(e.target.value, 10))}
                                                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 bg-white outline-none focus:border-[#6366F1]"
                                                            >
                                                                <option value={0}>—</option>
                                                                {monthOptions.map((m) => (
                                                                    <option key={m} value={m}>
                                                                        {m}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-slate-600">каникулы 2 (месяц)</label>
                                                            <select
                                                                value={vacationMonth2}
                                                                onChange={(e) => setVacationMonth2(parseInt(e.target.value, 10))}
                                                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 bg-white outline-none focus:border-[#6366F1]"
                                                            >
                                                                <option value={0}>—</option>
                                                                {monthOptions.map((m) => (
                                                                    <option key={m} value={m}>
                                                                        {m}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-2 text-xs text-slate-600">
                                                            В каникулы обзвона нет. После 1-х каникул бонус продолжается. После 2-х — начинается заново с 500.
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="pt-2 border-t border-white/70">
                                                    <label className="text-sm text-slate-700">
                                                        горизонт расчёта: <span className="font-semibold text-slate-900">{months}</span> мес
                                                    </label>
                                                    <input
                                                        className="mt-2 w-full accent-[#6366F1]"
                                                        type="range"
                                                        min={6}
                                                        max={24}
                                                        value={months}
                                                        onChange={(e) => setMonths(parseInt(e.target.value, 10))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Base + Traffic */}
                                    <div className="rounded-2xl p-4 bg-white border border-slate-100">
                                        <div className="text-sm font-bold text-slate-900">кандидаты</div>

                                        <div className="mt-3 rounded-2xl p-4 bg-[#E0E7FF] border border-white">
                                            <div className="text-xs text-slate-600">в абонентке</div>
                                            <div className="text-lg font-extrabold text-slate-900">{fmtInt(INCLUDED_CANDIDATES)} / месяц</div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="flex items-center justify-between gap-3">
                                                <span className="text-sm text-slate-700">масштабировать кандидатов</span>
                                                <input
                                                    type="checkbox"
                                                    checked={scaleCandidates}
                                                    onChange={(e) => setScaleCandidates(e.target.checked)}
                                                    className="h-5 w-5 accent-[#6366F1]"
                                                />
                                            </label>

                                            {scaleCandidates ? (
                                                <div className="mt-3">
                                                    <label className="text-sm text-slate-700">
                                                        максимум докупки: <span className="font-semibold text-slate-900">{fmtInt(maxExtraCandidates)}</span>
                                                    </label>
                                                    <input
                                                        className="mt-2 w-full accent-[#6366F1]"
                                                        type="range"
                                                        min={0}
                                                        max={50_000}
                                                        step={1000}
                                                        value={maxExtraCandidates}
                                                        onChange={(e) => setMaxExtraCandidates(parseInt(e.target.value, 10))}
                                                    />
                                                    <div className="mt-2 text-xs text-slate-600">
                                                        цена при этом объёме: <b>{fmtRub(currentExtraPricePer1000)}</b> / 1000
                                                    </div>

                                                    <div className="mt-3">
                                                        <label className="text-sm text-slate-700">
                                                            скорость роста кандидатов:{" "}
                                                            <span className="font-semibold text-slate-900">{candidatesGrowthK.toFixed(2)}</span>
                                                        </label>
                                                        <input
                                                            className="mt-2 w-full accent-[#6366F1]"
                                                            type="range"
                                                            min={0.2}
                                                            max={1.6}
                                                            step={0.05}
                                                            value={candidatesGrowthK}
                                                            onChange={(e) => setCandidatesGrowthK(parseFloat(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-3">
                                                    <label className="text-sm text-slate-700">
                                                        докупка кандидатов: <span className="font-semibold text-slate-900">{fmtInt(fixedExtraCandidates)}</span>
                                                    </label>
                                                    <input
                                                        className="mt-2 w-full accent-[#6366F1]"
                                                        type="range"
                                                        min={0}
                                                        max={50_000}
                                                        step={1000}
                                                        value={fixedExtraCandidates}
                                                        onChange={(e) => setFixedExtraCandidates(parseInt(e.target.value, 10))}
                                                    />
                                                    <div className="mt-2 text-xs text-slate-600">
                                                        цена при этом объёме: <b>{fmtRub(getExtraPackPricePer1000(fixedExtraCandidates))}</b> / 1000
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm text-slate-700">средняя длительность</label>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={600}
                                                        value={avgTalkSec}
                                                        onChange={(e) => setAvgTalkSec(parseInt(e.target.value || "0", 10))}
                                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#6366F1]"
                                                    />
                                                    <span className="text-sm text-slate-500">сек</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-700">тариф</label>
                                                <div className="mt-1 rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 text-slate-900 font-semibold">
                                                    {COST_PER_SEC.toFixed(2)} ₽/сек
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Conversions */}
                            <div className="rounded-2xl p-5 border border-[#E0E7FF] bg-white">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold text-slate-900">Конверсии</h2>

                                </div>

                                <div className="mt-4 space-y-4">
                                    <div className="rounded-2xl p-4 bg-white border border-slate-100">
                                        <div className="text-sm font-bold text-slate-900">конверсия в интерес</div>
                                        <div className="mt-1 text-sm text-slate-700">
                                            {convMinPct}% — {convMaxPct}%
                                        </div>

                                        <div className="relative mt-3 h-10">
                                            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-slate-100" />
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
                                                style={{
                                                    left: `${((Math.min(convMinPct, convMaxPct) - 1) / 14) * 100}%`,
                                                    right: `${100 - ((Math.max(convMinPct, convMaxPct) - 1) / 14) * 100}%`,
                                                    background: "linear-gradient(90deg,#7F7AED,#B06DF0)",
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min={1}
                                                max={20}
                                                value={convMinPct}
                                                onChange={(e) => {
                                                    const v = parseInt(e.target.value, 10);
                                                    setConvMinPct(Math.min(v, convMaxPct));
                                                }}
                                                className="absolute inset-0 w-full bg-transparent range-thumb-only z-30"
                                            />

                                            <input
                                                type="range"
                                                min={1}
                                                max={20}
                                                value={convMaxPct}
                                                onChange={(e) => {
                                                    const v = parseInt(e.target.value, 10);
                                                    setConvMaxPct(Math.max(v, convMinPct));
                                                }}
                                                className="absolute inset-0 w-full bg-transparent range-thumb-only z-40"
                                            />
                                            <style jsx global>{`
                                              .range-thumb-only {
                                                pointer-events: none;
                                              }
                                            
                                              .range-thumb-only::-webkit-slider-thumb {
                                                pointer-events: auto;
                                                cursor: grab;
                                              }
                                            
                                              .range-thumb-only::-moz-range-thumb {
                                                pointer-events: auto;
                                                cursor: grab;
                                              }
                                            `}</style>

                                        </div>

                                        <div className="mt-2 text-xs text-slate-600">диапазон: 1% — 15%</div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-700">
                                            контактность базы: <span className="font-semibold text-slate-900">{contactPct}%</span>
                                        </label>
                                        <input
                                            className="mt-2 w-full accent-[#6366F1]"
                                            type="range"
                                            min={1}
                                            max={100}
                                            value={contactPct}
                                            onChange={(e) => setContactPct(parseInt(e.target.value, 10))}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-700">
                                            интерес → договор: <span className="font-semibold text-slate-900">{convDealPct}%</span>
                                        </label>
                                        <input
                                            className="mt-2 w-full accent-[#6366F1]"
                                            type="range"
                                            min={1}
                                            max={100}
                                            value={convDealPct}
                                            onChange={(e) => setConvDealPct(parseInt(e.target.value, 10))}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-700">средний чек</label>
                                        <input
                                            type="number"
                                            min={0}
                                            step={1000}
                                            value={avgCheck}
                                            onChange={(e) => {
                                                const v = parseInt(e.target.value || "0", 10);
                                                setAvgCheck(Math.round(v / 1000) * 1000);
                                            }}
                                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#6366F1]"
                                        />
                                    </div>

                                    <div className="pt-2 border-t border-slate-100">
                                        <label className="text-sm text-slate-700">
                                            скорость улучшения (k): <span className="font-semibold text-slate-900">{growthK.toFixed(2)}</span>
                                        </label>
                                        <input
                                            className="mt-2 w-full accent-[#6366F1]"
                                            type="range"
                                            min={0.2}
                                            max={1.6}
                                            step={0.05}
                                            value={growthK}
                                            onChange={(e) => setGrowthK(parseFloat(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="rounded-2xl p-5 bg-white border border-white shadow-sm">
                                <div className="text-xs text-slate-500">итого выручка</div>
                                <div className="text-xl font-extrabold text-slate-900 whitespace-nowrap">{fmtRub(summary.totalRevenue)}</div>
                            </div>
                            <div className="rounded-2xl p-5 bg-white border border-white shadow-sm">
                                <div className="text-xs text-slate-500">итого расходы</div>
                                <div className="text-xl font-extrabold text-slate-900 whitespace-nowrap">{fmtRub(summary.totalCosts)}</div>
                            </div>
                            <div className="rounded-2xl p-5 bg-white border border-white shadow-sm">
                                <div className="text-xs text-slate-500">итого прибыль</div>
                                <div className="text-xl font-extrabold text-slate-900 whitespace-nowrap">{fmtRub(summary.totalProfit)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: charts + table */}
                    <div className="border-t border-white bg-white/60 backdrop-blur p-6 md:p-8">

                        <div className="mt-6 rounded-2xl overflow-hidden border border-[#E0E7FF] bg-white">

                            <div className="px-5 py-4 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">Таблица по месяцам</h3>
                                <div className="text-xs text-slate-500">M1 — разработка</div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#E0E7FF]/70 text-slate-700">
                                    <tr>
                                        <th className="text-left px-4 py-3 whitespace-nowrap">мес</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">кандидаты</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">контактов</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">интерес</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">интересов</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">договоров</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">CPL</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">выручка</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">расходы</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">прибыль</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">ROI</th>
                                        <th className="text-right px-4 py-3 whitespace-nowrap">накопл.</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {data.map((r) => {
                                        const profitClass = r.profit >= 0 ? "text-emerald-700" : "text-rose-700";
                                        const cumClass = r.cumProfit >= 0 ? "text-emerald-700" : "text-rose-700";

                                        const monthTag = r.isVacationMonth ? " (каникулы)" : r.isDevMonth ? " (разработка)" : "";

                                        return (
                                            <tr key={r.month} className="border-t border-slate-100 hover:bg-slate-50/60">
                                                <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                                                    {r.month}
                                                    <span className="text-slate-400 font-normal">{monthTag}</span>
                                                </td>

                                                <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">{fmtInt(r.candidatesTotal)}</td>
                                                <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">{fmtInt(r.contacted)}</td>

                                                <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">{fmtPct(r.convInterest)}</td>
                                                <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">{fmtInt(r.interested)}</td>
                                                <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">{fmtInt(r.deals)}</td>

                                                <td className="px-4 py-3 text-right text-slate-900 font-semibold whitespace-nowrap">
                                                    {r.cpl === null ? "—" : fmtRub(r.cpl)}
                                                </td>

                                                <td className="px-4 py-3 text-right text-slate-900 font-semibold whitespace-nowrap">{fmtRub(r.revenue)}</td>
                                                <td className="px-4 py-3 text-right text-slate-900 whitespace-nowrap">{fmtRub(r.costsTotal)}</td>

                                                <td className={`px-4 py-3 text-right font-bold whitespace-nowrap ${profitClass}`}>{fmtRub(r.profit)}</td>
                                                <td className="px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                                                    {r.costsTotal > 0 ? `${(r.roi * 100).toFixed(0)}%` : "—"}
                                                </td>
                                                <td className={`px-4 py-3 text-right font-bold whitespace-nowrap ${cumClass}`}>{fmtRub(r.cumProfit)}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            {/* text description of all selected conditions */}
                            <div className="px-5 py-4 bg-white border-t border-slate-100">
                                <div className="text-xs font-semibold text-slate-900">Выбранные условия</div>
                                <pre className="mt-2 text-xs text-slate-600 whitespace-pre-wrap leading-5">{conditionsText}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA modal */}
            <ContactModal isOpen={ctaOpen} onClose={() => setCtaOpen(false)} presetMessage={conditionsText} />
        </div>
    );
}
