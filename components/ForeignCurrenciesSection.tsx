'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function ForeignCurrenciesSection() {
  const { currencies } = useMarket();

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            سوق العملات الأجنبية
          </h2>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5">
            أسعار الصيرفة المباشرة لليورو، الإسترليني، العملات الإقليمية مقابل الدينار العراقي
          </p>
        </div>

        <div className="terminal-label bg-[#1a1a1a]/5 px-2.5 py-1 rounded self-start sm:self-auto">
          FX CROSS RATES
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currencies.map((curr) => {
          const isUp = curr.change_percent >= 0;

          return (
            <div
              key={curr.code}
              className="terminal-card terminal-card-cut p-4 rounded-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{curr.flag}</span>
                  <div>
                    <h3 className="font-bold text-sm text-[#1a1a1a]">{curr.name_ar}</h3>
                    <span className="font-mono-data text-[10px] text-[#1a1a1a]/50 font-bold uppercase">
                      {curr.code} ({curr.symbol})
                    </span>
                  </div>
                </div>

                <span
                  className={`font-mono-data text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                    isUp ? 'text-[#065f46] bg-emerald-50' : 'text-[#b45309] bg-amber-50'
                  }`}
                >
                  {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(curr.change_percent)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#f8f7f4] border border-[#1a1a1a]/10 rounded p-2.5 text-center font-mono-data">
                <div>
                  <span className="terminal-label block text-[9px] mb-0.5">شراء</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1a1a1a]">
                    {curr.buy_iqd.toLocaleString('en-US')}
                  </span>
                  <span className="text-[9px] text-[#1a1a1a]/40 block font-sans">د.ع</span>
                </div>

                <div className="border-r border-[#1a1a1a]/10 pr-2">
                  <span className="terminal-label block text-[9px] mb-0.5 text-[#b45309]">بيع</span>
                  <span className="text-xs sm:text-sm font-black text-[#b45309]">
                    {curr.sell_iqd.toLocaleString('en-US')}
                  </span>
                  <span className="text-[9px] text-[#b45309]/70 block font-sans">د.ع</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
