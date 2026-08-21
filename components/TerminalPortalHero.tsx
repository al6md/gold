'use client';

import React from 'react';
import Link from 'next/link';
import { useMarket } from '@/context/MarketContext';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export function TerminalPortalHero() {
  const { summary, goldPrices, provinces, currencies } = useMarket();

  const baghdad = provinces.find((p) => p.id === 'baghdad_kifah') || provinces[0];
  const erbil = provinces.find((p) => p.id === 'erbil') || provinces[2];
  const basra = provinces.find((p) => p.id === 'basra') || provinces[4];
  const najaf = provinces.find((p) => p.id === 'najaf') || provinces[3];

  const gold21k = goldPrices.find((g) => g.karat === 21);
  const gold24k = goldPrices.find((g) => g.karat === 24);
  const gold18k = goldPrices.find((g) => g.karat === 18);

  const mithqal21k = gold21k?.mithqal_iqd || 971478;
  const dollarParallel = baghdad?.sell_price || 150500;
  const spotOunce = summary?.gold_ounce_usd || 2589.10;
  const spotChange = summary?.gold_ounce_change_usd || 4.20;

  const eurCurrency = currencies.find((c) => c.code === 'EUR');
  const gbpCurrency = currencies.find((c) => c.code === 'GBP');

  // Format shorthand display (e.g. 971.4K, 150.5K)
  const formatK = (num: number) => {
    return (num / 1000).toFixed(1) + 'K';
  };

  return (
    <div className="w-full">
      {/* 3-Column Terminal Grid matching design variation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: GOLD_MODULE (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#020617] shadow-[8px_8px_0_#020617] p-6 flex flex-col relative rounded-[4px]">
          <div className="absolute -top-3 right-5 bg-[#020617] text-white px-3 py-0.5 text-[11px] font-black font-mono tracking-wider">
            GOLD_MODULE
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[11px] text-[#64748b] font-bold uppercase tracking-wider">
              مثقال الذهب العراقي (عيار 21)
            </span>
            <div className="text-5xl sm:text-6xl font-black font-display text-[#020617] leading-none">
              {formatK(mithqal21k)}
            </div>
            <div className="font-mono text-sm text-[#0891b2] font-bold">
              {mithqal21k.toLocaleString('en-US')} IQD / MITHQAL
            </div>
          </div>

          <div className="text-[10px] font-black text-[#64748b] flex items-center gap-2.5 my-5 uppercase tracking-wider after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0f172a]/10">
            PRICE_BREAKDOWN_KARATS
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#0f172a]/10">
                  <th className="text-right text-[11px] text-[#64748b] font-bold pb-2">العيار</th>
                  <th className="text-right text-[11px] text-[#64748b] font-bold pb-2">المثقال (د.ع)</th>
                  <th className="text-right text-[11px] text-[#64748b] font-bold pb-2">الغرام (د.ع)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0f172a]/10 text-xs sm:text-sm font-bold font-mono">
                <tr>
                  <td className="py-2.5 font-sans font-bold">عيار 24</td>
                  <td className="py-2.5">{(gold24k?.mithqal_iqd || 1110261).toLocaleString('en-US')}</td>
                  <td className="py-2.5">{(gold24k?.gram_iqd || 222052).toLocaleString('en-US')}</td>
                </tr>
                <tr className="bg-[#b45309]/5">
                  <td className="py-2.5 text-[#b45309] font-black font-sans">عيار 21</td>
                  <td className="py-2.5 text-[#b45309] font-black">{mithqal21k.toLocaleString('en-US')}</td>
                  <td className="py-2.5 text-[#b45309] font-black">{(gold21k?.gram_iqd || 194296).toLocaleString('en-US')}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold">عيار 18</td>
                  <td className="py-2.5">{(gold18k?.mithqal_iqd || 832696).toLocaleString('en-US')}</td>
                  <td className="py-2.5">{(gold18k?.gram_iqd || 166539).toLocaleString('en-US')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
            <Link
              href="/calculator?tab=gold"
              className="border border-[#b45309] bg-[#b45309] text-white py-2.5 px-3 text-xs font-bold text-center rounded-[4px] hover:bg-[#92400e] transition-colors"
            >
              حساب الأوزان
            </Link>
            <Link
              href="/provinces"
              className="border border-[#020617] bg-white text-[#020617] py-2.5 px-3 text-xs font-bold text-center rounded-[4px] hover:bg-[#020617] hover:text-white transition-colors"
            >
              نشرة الصاغة
            </Link>
          </div>
        </div>

        {/* Center Column: Central Crystal / Dynamic Orb Visualization (4 cols) */}
        <div className="lg:col-span-4 bg-white/90 border border-[#0f172a]/15 p-6 flex flex-col justify-between items-center rounded-[4px] min-h-[360px] shadow-sm relative overflow-hidden">
          
          <div className="w-full text-center">
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest block mb-1">
              GLOBAL BENCHMARK MATRIX
            </span>
          </div>

          {/* Big Crystal Diamond Visual */}
          <div className="my-auto py-8">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 border-4 border-[#020617] rotate-45 bg-white flex items-center justify-center shadow-lg transition-transform hover:rotate-[47deg] duration-300">
              <div className="absolute inset-2.5 border border-[#020617]/20 pointer-events-none" />
              <div className="-rotate-45 text-center w-full px-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#64748b] block font-bold">
                  SPOT_PRICE_GLOBAL
                </span>
                <div className="text-2xl sm:text-3xl font-black font-display text-[#020617] tracking-tight my-1">
                  ${spotOunce.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className={`text-xs font-mono font-black ${spotChange >= 0 ? 'text-[#059669]' : 'text-[#dc2626]'}`}>
                  {spotChange >= 0 ? '▲ (+' : '▼ ('}{spotChange.toFixed(2)})
                </span>
              </div>
            </div>
          </div>

          {/* FX Core Cross Rates */}
          <div className="w-full text-center mt-4">
            <div className="text-[10px] font-black text-[#64748b] flex items-center justify-center gap-2.5 uppercase tracking-wider after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0f172a]/10 before:content-[''] before:flex-1 before:h-[1px] before:bg-[#0f172a]/10">
              LIVE_CURRENCY_CORE
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-3 font-mono">
              <div className="text-center">
                <div className="text-[10px] text-[#64748b] font-bold">EUR / IQD</div>
                <div className="font-black text-base sm:text-lg text-[#020617]">
                  {eurCurrency ? eurCurrency.sell_iqd.toLocaleString('en-US') : '1,749'}
                </div>
              </div>
              <div className="border-r border-[#0f172a]/15 pr-8 text-center">
                <div className="text-[10px] text-[#64748b] font-bold">GBP / IQD</div>
                <div className="font-black text-base sm:text-lg text-[#020617]">
                  {gbpCurrency ? gbpCurrency.sell_iqd.toLocaleString('en-US') : '2,041'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: CURRENCY_MODULE (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#020617] shadow-[8px_8px_0_#020617] p-6 flex flex-col relative rounded-[4px]">
          <div className="absolute -top-3 right-5 bg-[#020617] text-white px-3 py-0.5 text-[11px] font-black font-mono tracking-wider">
            CURRENCY_MODULE
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[11px] text-[#64748b] font-bold uppercase tracking-wider">
              سعر صرف الدولار (الموازي)
            </span>
            <div className="text-5xl sm:text-6xl font-black font-display text-[#020617] leading-none">
              {formatK(dollarParallel)}
            </div>
            <div className="font-mono text-sm text-[#0891b2] font-bold">
              {dollarParallel.toLocaleString('en-US')} IQD / $100
            </div>
          </div>

          <div className="text-[10px] font-black text-[#64748b] flex items-center gap-2.5 my-5 uppercase tracking-wider after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0f172a]/10">
            REGIONAL_EXCHANGES
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#0f172a]/10">
                  <th className="text-right text-[11px] text-[#64748b] font-bold pb-2">الموقع</th>
                  <th className="text-right text-[11px] text-[#64748b] font-bold pb-2">البيع</th>
                  <th className="text-right text-[11px] text-[#64748b] font-bold pb-2">التغير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0f172a]/10 text-xs sm:text-sm font-bold font-mono">
                <tr>
                  <td className="py-2.5 font-sans font-bold">بورصة الكفاح</td>
                  <td className="py-2.5">{(baghdad?.sell_price || 150500).toLocaleString('en-US')}</td>
                  <td className="py-2.5 text-[#059669]">+{baghdad?.change_iqd || 250}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold">بورصة أربيل</td>
                  <td className="py-2.5">{(erbil?.sell_price || 150750).toLocaleString('en-US')}</td>
                  <td className="py-2.5 text-[#059669]">+{erbil?.change_iqd || 200}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold">بورصة البصرة</td>
                  <td className="py-2.5">{(basra?.sell_price || 150700).toLocaleString('en-US')}</td>
                  <td className="py-2.5 text-[#059669]">+{basra?.change_iqd || 200}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold">النجف الأشرف</td>
                  <td className="py-2.5">{(najaf?.sell_price || 150600).toLocaleString('en-US')}</td>
                  <td className="py-2.5 text-[#059669]">+{najaf?.change_iqd || 200}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
            <Link
              href="/calculator?tab=currency"
              className="border border-[#b45309] bg-[#b45309] text-white py-2.5 px-3 text-xs font-bold text-center rounded-[4px] hover:bg-[#92400e] transition-colors"
            >
              محول العملات
            </Link>
            <div
              className="border border-[#020617] bg-white text-[#020617] py-2.5 px-3 text-xs font-bold text-center rounded-[4px] flex items-center justify-center cursor-default"
              title="سعر البنك المركزي العراقي 1,320 د.ع"
            >
              المركزي: {summary?.cbi_official_rate || 1320}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
