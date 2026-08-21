'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Sliders,
  Scale
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function GoldKaratsSection() {
  const { goldPrices, summary } = useMarket();
  const [userSiyaghaFee, setUserSiyaghaFee] = useState<number>(summary?.default_siyagha_fee || 10000);
  const [activeUnit, setActiveUnit] = useState<'mithqal' | 'gram'>('mithqal');

  return (
    <section className="space-y-4">
      {/* Section Header: Title + Terminal label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            أوزان الذهب العراقي
          </h2>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5">
            محسوب لحظياً وفق معادلة البورصة العالمية (Spot) ومضروباً بسعر صرف الدولار الموازي
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="terminal-label bg-[#1a1a1a]/5 px-2.5 py-1 rounded">
            Standard Metrics
          </div>
          {/* Unit Switcher */}
          <div className="flex items-center bg-white border border-[#1a1a1a]/15 p-0.5 rounded">
            <button
              onClick={() => setActiveUnit('mithqal')}
              className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-all ${
                activeUnit === 'mithqal'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
              }`}
            >
              MITHQAL (5g)
            </button>
            <button
              onClick={() => setActiveUnit('gram')}
              className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-all ${
                activeUnit === 'gram'
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
              }`}
            >
              GRAM (1g)
            </button>
          </div>
        </div>
      </div>

      {/* Siyagha fee adjustment bar */}
      <div className="bg-white border border-[#1a1a1a]/10 p-3.5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#b45309]" />
          <span className="font-bold text-[#1a1a1a]">أجور الصياغة التقديرية:</span>
          <span className="text-[#1a1a1a]/60 text-[11px]">(تتراوح بين 7,000 إلى 15,000 د.ع للمثقال)</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="30000"
            step="1000"
            value={userSiyaghaFee}
            onChange={(e) => setUserSiyaghaFee(Number(e.target.value))}
            className="w-28 sm:w-40 accent-[#b45309] cursor-pointer"
          />
          <span className="font-mono-data font-bold text-[#b45309] bg-[#f8f7f4] border border-[#1a1a1a]/10 px-2 py-0.5 rounded">
            +{userSiyaghaFee.toLocaleString('en-US')} IQD
          </span>
        </div>
      </div>

      {/* 4 Karat Cards matching variation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goldPrices.map((gold) => {
          const rawPrice = activeUnit === 'mithqal' ? gold.mithqal_iqd : gold.gram_iqd;
          const rawUsd = activeUnit === 'mithqal' ? gold.mithqal_usd : gold.gram_usd;
          const fee = activeUnit === 'mithqal' ? userSiyaghaFee : Math.round(userSiyaghaFee / 5);
          const priceWithFee = rawPrice + fee;

          return (
            <div
              key={gold.karat}
              className="terminal-card terminal-card-cut p-5 flex flex-col justify-between rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="terminal-label">
                  {gold.karat === 24
                    ? 'عيار 24 (الخام)'
                    : gold.karat === 21
                    ? 'عيار 21 (المتداول)'
                    : gold.karat === 18
                    ? 'عيار 18 (الإيطالي)'
                    : 'عيار 22 (الخليجي)'}
                </span>
                <span className="text-[10px] font-mono-data font-bold text-[#b45309]">
                  {gold.karat}K
                </span>
              </div>

              <div className="my-3">
                <div className="font-mono-data text-2xl sm:text-3xl font-black text-[#1a1a1a] tracking-tight">
                  {rawPrice.toLocaleString('en-US')}
                </div>
                <div className="flex items-center justify-between text-xs font-mono-data text-[#1a1a1a]/60 mt-1">
                  <span className="terminal-label">
                    د.ع / {activeUnit === 'mithqal' ? 'مثقال' : 'غرام'}
                  </span>
                  <span>${rawUsd.toFixed(1)} USD</span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-[#1a1a1a]/10 text-xs font-mono-data">
                <div className="flex items-center justify-between">
                  <span className="text-[#1a1a1a]/60">مع الصياغة:</span>
                  <span className="font-bold text-[#065f46]">{priceWithFee.toLocaleString('en-US')} د.ع</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#1a1a1a]/50">
                  <span>{activeUnit === 'mithqal' ? 'سعر الغرام:' : 'سعر المثقال:'}</span>
                  <span>
                    {activeUnit === 'mithqal'
                      ? `${gold.gram_iqd.toLocaleString('en-US')} د.ع`
                      : `${gold.mithqal_iqd.toLocaleString('en-US')} د.ع`}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2">
                <Link
                  href={`/calculator?tab=gold&karat=${gold.karat}`}
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded bg-[#f8f7f4] hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white border border-[#1a1a1a]/10 text-xs font-bold transition-colors font-mono-data"
                >
                  <Calculator className="w-3 h-3" />
                  <span>CALCULATE WEIGHT</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules & weights reference */}
      <div className="bg-white border border-[#1a1a1a]/10 p-4 rounded-lg flex items-start gap-3">
        <Scale className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
        <div className="text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
          <strong className="text-[#1a1a1a] font-bold">معيار الذهب العراقي: </strong>
          المثقال العراقي الصاغي يساوي قانونياً <span className="font-bold text-[#1a1a1a]">5 غرامات</span>، في حين تزن الأونصة العالمية <span className="font-bold text-[#1a1a1a]">31.1035 غرام</span> (ما يعادل 6.22 مثقال).
        </div>
      </div>
    </section>
  );
}
