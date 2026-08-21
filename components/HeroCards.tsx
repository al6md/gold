'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function HeroCards() {
  const { summary, provinces, goldPrices } = useMarket();
  const [baghdadTime, setBaghdadTime] = useState<string>('05:00:00 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Baghdad',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setBaghdadTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const baghdad = provinces.find((p) => p.id === 'baghdad_kifah') || provinces[0];
  const gold21k = goldPrices.find((g) => g.karat === 21);

  const buyPrice = baghdad?.buy_price || 150250;
  const sellPrice = baghdad?.sell_price || 150500;
  const changeIqd = baghdad?.change_iqd || 250;
  const isDollarUp = changeIqd >= 0;

  const mithqal21kIqd = gold21k?.mithqal_iqd || 515000;
  const mithqalChange = gold21k?.change_percent || 0.34;
  const isGoldUp = mithqalChange >= 0;

  const cbiRate = summary?.cbi_official_rate || 1320;

  const goldOunce = summary?.gold_ounce_usd || 2920.50;
  const goldOunceChange = summary?.gold_ounce_change_usd || 5.20;
  const isOunceUp = goldOunceChange >= 0;

  return (
    <div className="space-y-6">
      {/* Header section matching design variation */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b-2 border-[#1a1a1a] gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#065f46] text-xs font-bold font-mono-data tracking-wider mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#065f46] animate-pulse inline-block"></span>
            <span>LIVE MARKET DATA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
            نظرة عامة على السوق
          </h2>
        </div>

        <div className="text-left sm:text-left self-start sm:self-auto bg-white/60 sm:bg-transparent p-2 sm:p-0 rounded border sm:border-0 border-[#1a1a1a]/10">
          <div className="terminal-label">Baghdad Time</div>
          <div className="font-mono-data text-xl sm:text-2xl font-bold text-[#1a1a1a] tracking-tight">
            {baghdadTime}
          </div>
        </div>
      </div>

      {/* 4 Hero Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Dollar Parallel Rate */}
        <div className="terminal-card terminal-card-cut p-5 sm:p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <span className="terminal-label">سعر الدولار الموازي</span>
            <span className="text-[10px] font-mono-data font-bold text-[#1a1a1a]/50">IQD/100$</span>
          </div>

          <div className="my-2">
            <div className="font-mono-data text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight">
              {sellPrice.toLocaleString('en-US')}
            </div>
            <div className="text-xs text-[#1a1a1a]/60 font-mono-data mt-0.5">
              شراء: {buyPrice.toLocaleString('en-US')} د.ع
            </div>
          </div>

          <div className={`flex items-center gap-1.5 text-xs font-mono-data font-bold ${isDollarUp ? 'text-[#065f46]' : 'text-[#b45309]'}`}>
            {isDollarUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{isDollarUp ? '▲ +' : '▼ '}{changeIqd} IQD</span>
          </div>
        </div>

        {/* Card 2: Mithqal Gold 21k */}
        <div className="terminal-card terminal-card-cut p-5 sm:p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <span className="terminal-label">مثقال الذهب 21k</span>
            <span className="text-[10px] font-mono-data font-bold text-[#1a1a1a]/50">5 GRAMS</span>
          </div>

          <div className="my-2">
            <div className="font-mono-data text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight">
              {mithqal21kIqd.toLocaleString('en-US')}
            </div>
            <div className="text-xs text-[#1a1a1a]/60 font-mono-data mt-0.5">
              الغرام: {(gold21k?.gram_iqd || 103000).toLocaleString('en-US')} د.ع
            </div>
          </div>

          <div className={`flex items-center gap-1.5 text-xs font-mono-data font-bold ${isGoldUp ? 'text-[#065f46]' : 'text-[#b45309]'}`}>
            {isGoldUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{isGoldUp ? '▲ +' : '▼ '}{mithqalChange}%</span>
          </div>
        </div>

        {/* Card 3: CBI Official Rate */}
        <div className="terminal-card terminal-card-cut p-5 sm:p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <span className="terminal-label">البنك المركزي</span>
            <span className="text-[10px] font-mono-data font-bold text-[#1a1a1a]/50">CENTRAL BANK</span>
          </div>

          <div className="my-2">
            <div className="font-mono-data text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight">
              {cbiRate.toLocaleString('en-US')}
            </div>
            <div className="text-xs text-[#1a1a1a]/60 font-mono-data mt-0.5">
              100$ = {(cbiRate * 100).toLocaleString('en-US')} د.ع
            </div>
          </div>

          <div className="text-xs font-mono-data font-bold text-[#1a1a1a]/60">
            OFFICIAL RATE
          </div>
        </div>

        {/* Card 4: Spot Gold Ounce */}
        <div className="terminal-card terminal-card-cut p-5 sm:p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <span className="terminal-label">أونصة الذهب عالمياً</span>
            <span className="text-[10px] font-mono-data font-bold text-[#1a1a1a]/50">SPOT USD</span>
          </div>

          <div className="my-2">
            <div className="font-mono-data text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight">
              ${goldOunce.toFixed(0)}
            </div>
            <div className="text-xs text-[#1a1a1a]/60 font-mono-data mt-0.5">
              دقيق: ${goldOunce.toFixed(2)}
            </div>
          </div>

          <div className={`flex items-center gap-1.5 text-xs font-mono-data font-bold ${isOunceUp ? 'text-[#065f46]' : 'text-[#b45309]'}`}>
            {isOunceUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{isOunceUp ? '▲ +' : '▼ '}${Math.abs(goldOunceChange).toFixed(1)} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
