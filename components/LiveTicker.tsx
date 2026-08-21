'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function LiveTicker() {
  const { summary, provinces, goldPrices } = useMarket();

  const baghdadPrice = provinces.find((p) => p.id === 'baghdad_kifah');
  const erbilPrice = provinces.find((p) => p.id === 'erbil');
  const basraPrice = provinces.find((p) => p.id === 'basra');
  const karbalaPrice = provinces.find((p) => p.id === 'karbala');
  const najafPrice = provinces.find((p) => p.id === 'najaf');
  const gold21k = goldPrices.find((g) => g.karat === 21);
  const gold24k = goldPrices.find((g) => g.karat === 24);

  const tickerItems = [
    {
      title: 'بغداد (الكفاح)',
      buy: baghdadPrice?.buy_price || 150250,
      sell: baghdadPrice?.sell_price || 150500,
      unit: 'لكل $100',
      isUp: true,
      change: '+250',
    },
    {
      title: 'مثقال الذهب 21',
      price: (gold21k?.mithqal_iqd || 515000).toLocaleString() + ' د.ع',
      unit: 'عراقي',
      isUp: (summary?.gold_ounce_change_usd || 0) >= 0,
      change: (summary?.gold_ounce_change_usd || 0) >= 0 ? 'ارتفاع' : 'انخفاض',
    },
    {
      title: 'أربيل (البورصة)',
      buy: erbilPrice?.buy_price || 150450,
      sell: erbilPrice?.sell_price || 150750,
      unit: 'لكل $100',
      isUp: true,
      change: '+250',
    },
    {
      title: 'أونصة الذهب عالمياً',
      price: `$${(summary?.gold_ounce_usd || 2920.50).toFixed(2)}`,
      unit: 'Global Spot',
      isUp: (summary?.gold_ounce_change_usd || 0) >= 0,
      change: `${(summary?.gold_ounce_change_usd || 0) >= 0 ? '+' : ''}${(summary?.gold_ounce_change_usd || 0).toFixed(1)}$`,
    },
    {
      title: 'البصرة (العشار)',
      buy: basraPrice?.buy_price || 150400,
      sell: basraPrice?.sell_price || 150700,
      unit: 'لكل $100',
      isUp: true,
      change: '+200',
    },
    {
      title: 'مثقال الذهب 24',
      price: (gold24k?.mithqal_iqd || 588000).toLocaleString() + ' د.ع',
      unit: 'سبائك',
      isUp: true,
      change: '+0.2%',
    },
    {
      title: 'كربلاء المقدسة',
      buy: karbalaPrice?.buy_price || 150300,
      sell: karbalaPrice?.sell_price || 150600,
      unit: 'لكل $100',
      isUp: true,
      change: '+150',
    },
    {
      title: 'النجف الأشرف',
      buy: najafPrice?.buy_price || 150300,
      sell: najafPrice?.sell_price || 150600,
      unit: 'لكل $100',
      isUp: true,
      change: '+150',
    },
    {
      title: 'البنك المركزي (الرسمي)',
      price: '1,320 د.ع',
      unit: 'لكل $1',
      isUp: true,
      change: 'ثابت',
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#10131d] border-y border-amber-500/20 py-2.5">
      {/* Label Badge */}
      <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-[#0b0d14] via-[#0b0d14] to-transparent pl-8 pr-4">
        <span className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          شريط الأسعار
        </span>
      </div>

      {/* Ticker Items Container with CSS marquee */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee pr-36">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 px-3.5 py-1 rounded-xl text-xs"
          >
            <span className="text-slate-300 font-medium">{item.title}:</span>

            {item.buy && item.sell ? (
              <span className="font-mono font-bold text-amber-400">
                {item.sell.toLocaleString()} / {item.buy.toLocaleString()}
              </span>
            ) : (
              <span className="font-mono font-bold text-amber-400">{item.price}</span>
            )}

            <span className="text-[10px] text-slate-500 font-normal">({item.unit})</span>

            <span
              className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                item.isUp
                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'
                  : 'text-rose-400 bg-rose-950/40 border border-rose-800/40'
              }`}
            >
              {item.isUp ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
