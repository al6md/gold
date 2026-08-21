'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calculator,
  Coins,
  DollarSign,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Printer,
  FileText
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

type TabType = 'dollar' | 'gold' | 'zakat';

export function CalculatorView() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'dollar';
  const queryRate = searchParams.get('rate');
  const queryKarat = searchParams.get('karat');

  const { provinces, goldPrices, summary } = useMarket();

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  // --- Dollar Calculator State ---
  const initialRate = queryRate
    ? Number(queryRate)
    : provinces.find((p) => p.id === 'baghdad_kifah')?.sell_price || 150500;

  const [dollarExchangeRate, setDollarExchangeRate] = useState<number>(initialRate);
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [iqdAmount, setIqdAmount] = useState<string>(() => {
    return Math.round(initialRate).toString();
  });

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const calculatedIqd = Math.round((num / 100) * dollarExchangeRate);
      setIqdAmount(calculatedIqd.toString());
    } else {
      setIqdAmount('');
    }
  };

  const handleIqdChange = (val: string) => {
    setIqdAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && dollarExchangeRate > 0) {
      const calculatedUsd = Math.round(((num * 100) / dollarExchangeRate) * 100) / 100;
      setUsdAmount(calculatedUsd.toString());
    } else {
      setUsdAmount('');
    }
  };

  const usdPresets = [
    { label: 'ورقة ($100)', value: 100 },
    { label: '5 أوراق ($500)', value: 500 },
    { label: 'شدة ($1,000)', value: 1000 },
    { label: 'دفتر ($10,000)', value: 10000 },
    { label: '5 دفاتر ($50,000)', value: 50000 },
    { label: '10 دفاتر ($100,000)', value: 100000 },
  ];

  // --- Gold Calculator State ---
  const [selectedKarat, setSelectedKarat] = useState<number>(queryKarat ? Number(queryKarat) : 21);
  const [goldWeightMode, setGoldWeightMode] = useState<'mithqal' | 'gram'>('mithqal');
  const [goldWeightInput, setGoldWeightInput] = useState<string>('1');
  const [siyaghaFeePerMithqal, setSiyaghaFeePerMithqal] = useState<string>('10000');

  const selectedGoldObj = goldPrices.find((g) => g.karat === selectedKarat) || goldPrices[2];
  const currentMithqalRawPrice = selectedGoldObj?.mithqal_iqd || 515000;

  const parsedGoldWeight = parseFloat(goldWeightInput) || 0;
  const parsedSiyagha = parseFloat(siyaghaFeePerMithqal) || 0;

  const totalGrams = goldWeightMode === 'mithqal' ? parsedGoldWeight * 5 : parsedGoldWeight;
  const totalMithqals = goldWeightMode === 'mithqal' ? parsedGoldWeight : parsedGoldWeight / 5;

  const totalRawGoldIqd = Math.round(totalMithqals * currentMithqalRawPrice);
  const totalSiyaghaIqd = Math.round(totalMithqals * parsedSiyagha);
  const grandTotalGoldIqd = totalRawGoldIqd + totalSiyaghaIqd;
  const grandTotalGoldUsd =
    dollarExchangeRate > 0 ? Math.round(((grandTotalGoldIqd * 100) / dollarExchangeRate) * 100) / 100 : 0;

  // Copy Gold Invoice
  const handleCopyGoldInvoice = async () => {
    const text = `🧾 وصل تقديري لحساب الذهب - بورصة العراق
-----------------------------------------
• العيار: عيار ${selectedKarat}k
• الوزن الإجمالي: ${totalMithqals.toFixed(2)} مثقال (${totalGrams.toFixed(2)} غرام)
• سعر مثقال الذهب الصافي: ${currentMithqalRawPrice.toLocaleString('en-US')} د.ع
• قيمة الذهب الخام: ${totalRawGoldIqd.toLocaleString('en-US')} د.ع
• أجور الصياغة: ${totalSiyaghaIqd.toLocaleString('en-US')} د.ع (${parsedSiyagha.toLocaleString('en-US')} د.ع/مثقال)
-----------------------------------------
💰 الإجمالي الكلي المطلوب: ${grandTotalGoldIqd.toLocaleString('en-US')} د.ع ($${grandTotalGoldUsd.toFixed(2)} USD)
⏰ تم الحساب وفق أسعار بورصة العراق الحية`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedInvoice(true);
      setTimeout(() => setCopiedInvoice(false), 2500);
    } catch {
      // Fallback
    }
  };

  // --- Zakat Calculator State ---
  const [zakatGrams24k, setZakatGrams24k] = useState<string>('100');
  const zakatThreshold24k = 85;
  const parsedZakatGrams = parseFloat(zakatGrams24k) || 0;
  const isZakatEligible = parsedZakatGrams >= zakatThreshold24k;
  const zakatDueGrams = isZakatEligible ? parsedZakatGrams * 0.025 : 0;
  const pricePerGram24k = goldPrices.find((g) => g.karat === 24)?.gram_iqd || 117600;
  const zakatDueIqd = Math.round(zakatDueGrams * pricePerGram24k);
  const zakatDueUsd =
    dollarExchangeRate > 0 ? Math.round(((zakatDueIqd * 100) / dollarExchangeRate) * 100) / 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            حاسبة الذهب والدولار
          </h1>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5 font-sans">
            تحويل فوري وشامل وفق أسعار البورصة الموازية والبنك المركزي العراقي
          </p>
        </div>

        <div className="terminal-label bg-[#1a1a1a]/5 px-2.5 py-1 rounded self-start sm:self-auto">
          FINANCIAL ENGINE
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center bg-white border border-[#1a1a1a]/15 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('dollar')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono-data font-bold transition-all ${
            activeTab === 'dollar'
              ? 'bg-[#1a1a1a] text-white shadow-sm'
              : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>USD ↔ IQD CONVERTER</span>
        </button>

        <button
          onClick={() => setActiveTab('gold')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono-data font-bold transition-all ${
            activeTab === 'gold'
              ? 'bg-[#1a1a1a] text-white shadow-sm'
              : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>GOLD & SIYAGHA</span>
        </button>

        <button
          onClick={() => setActiveTab('zakat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono-data font-bold transition-all ${
            activeTab === 'zakat'
              ? 'bg-[#1a1a1a] text-white shadow-sm'
              : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>ZAKAT ESTIMATOR</span>
        </button>
      </div>

      {/* TAB 1: Dollar ↔ Dinar */}
      {activeTab === 'dollar' && (
        <div className="terminal-card p-6 rounded-lg space-y-6">
          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/10 p-3.5 rounded space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1a1a1a]">سعر الصرف المعتمد:</span>
              <div className="flex items-center gap-2 font-mono-data">
                <button
                  onClick={() => {
                    const r = provinces.find((p) => p.id === 'baghdad_kifah')?.sell_price || 150500;
                    setDollarExchangeRate(r);
                    if (usdAmount) setIqdAmount(Math.round((parseFloat(usdAmount) / 100) * r).toString());
                  }}
                  className="px-2 py-0.5 rounded bg-white border border-[#1a1a1a]/15 text-[#b45309] font-bold hover:bg-[#b45309]/10"
                >
                  الكفاح ({(provinces.find((p) => p.id === 'baghdad_kifah')?.sell_price || 150500).toLocaleString('en-US')})
                </button>
                <button
                  onClick={() => {
                    setDollarExchangeRate(132000);
                    if (usdAmount) setIqdAmount(Math.round((parseFloat(usdAmount) / 100) * 132000).toString());
                  }}
                  className="px-2 py-0.5 rounded bg-white border border-[#1a1a1a]/15 text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/10"
                >
                  البنك المركزي (132,000)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                value={dollarExchangeRate}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDollarExchangeRate(val);
                  if (val > 0 && usdAmount) {
                    setIqdAmount(Math.round((parseFloat(usdAmount) / 100) * val).toString());
                  }
                }}
                className="w-full bg-white border border-[#1a1a1a]/20 rounded px-3 py-1.5 font-mono-data font-bold text-[#b45309] text-sm focus:outline-none focus:border-[#1a1a1a]"
              />
              <span className="text-xs font-mono-data text-[#1a1a1a]/60 shrink-0">IQD / 100$</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-4 rounded">
              <div className="flex items-center justify-between mb-1">
                <span className="terminal-label">المبلغ بالدولار</span>
                <span className="font-mono-data text-xs font-bold text-[#b45309]">USD ($)</span>
              </div>
              <input
                type="number"
                value={usdAmount}
                onChange={(e) => handleUsdChange(e.target.value)}
                className="w-full bg-transparent font-mono-data text-3xl font-black text-[#1a1a1a] focus:outline-none"
                placeholder="100"
              />
            </div>

            <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-4 rounded">
              <div className="flex items-center justify-between mb-1">
                <span className="terminal-label">المبلغ بالدينار</span>
                <span className="font-mono-data text-xs font-bold text-[#b45309]">IQD (د.ع)</span>
              </div>
              <input
                type="number"
                value={iqdAmount}
                onChange={(e) => handleIqdChange(e.target.value)}
                className="w-full bg-transparent font-mono-data text-3xl font-black text-[#b45309] focus:outline-none"
                placeholder="150500"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="terminal-label block mb-2">QUICK DENOMINATIONS (السوق العراقي)</span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {usdPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleUsdChange(preset.value.toString())}
                  className="p-2 rounded bg-white hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white border border-[#1a1a1a]/15 text-xs font-bold font-mono-data transition-colors text-center"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] text-white p-5 rounded-lg text-center shadow-md">
            <span className="terminal-label text-slate-400 block mb-1">CALCULATED EXCHANGE CONVERSION</span>
            <div className="font-mono-data text-xl sm:text-3xl font-black text-amber-400">
              ${parseFloat(usdAmount || '0').toLocaleString('en-US')} USD = {parseFloat(iqdAmount || '0').toLocaleString('en-US')} IQD
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Gold Calculator */}
      {activeTab === 'gold' && (
        <div className="terminal-card p-6 rounded-lg space-y-6">
          <div className="space-y-2">
            <span className="terminal-label block">SELECT GOLD KARAT</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { karat: 24, label: 'عيار 24 (السبائك والخام)' },
                { karat: 22, label: 'عيار 22 (الخليجي)' },
                { karat: 21, label: 'عيار 21 (المتداول العراقي)' },
                { karat: 18, label: 'عيار 18 (الإيطالي والليزر)' },
              ].map((k) => (
                <button
                  key={k.karat}
                  onClick={() => setSelectedKarat(k.karat)}
                  className={`p-3 rounded border text-right transition-all font-mono-data ${
                    selectedKarat === k.karat
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm'
                      : 'bg-white text-[#1a1a1a] border-[#1a1a1a]/15 hover:border-[#1a1a1a]/40'
                  }`}
                >
                  <span className="text-xs font-bold block">{k.label}</span>
                  <span className="text-[10px] opacity-70">
                    {(goldPrices.find((g) => g.karat === k.karat)?.mithqal_iqd || 0).toLocaleString('en-US')} IQD
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="terminal-label">وزن الذهب المطلوب</span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded border border-[#1a1a1a]/15 text-xs font-mono-data">
                  <button
                    onClick={() => setGoldWeightMode('mithqal')}
                    className={`px-2 py-0.5 rounded ${goldWeightMode === 'mithqal' ? 'bg-[#1a1a1a] text-white' : 'text-[#1a1a1a]/60'}`}
                  >
                    مثقال (5g)
                  </button>
                  <button
                    onClick={() => setGoldWeightMode('gram')}
                    className={`px-2 py-0.5 rounded ${goldWeightMode === 'gram' ? 'bg-[#1a1a1a] text-white' : 'text-[#1a1a1a]/60'}`}
                  >
                    غرام (1g)
                  </button>
                </div>
              </div>
              <input
                type="number"
                value={goldWeightInput}
                onChange={(e) => setGoldWeightInput(e.target.value)}
                className="w-full bg-transparent font-mono-data text-2xl font-black text-[#1a1a1a] focus:outline-none"
                placeholder="1"
              />
            </div>

            <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-4 rounded">
              <span className="terminal-label block mb-2">أجور الصياغة التقديرية (د.ع / مثقال)</span>
              <input
                type="number"
                value={siyaghaFeePerMithqal}
                onChange={(e) => setSiyaghaFeePerMithqal(e.target.value)}
                className="w-full bg-transparent font-mono-data text-2xl font-black text-[#b45309] focus:outline-none"
                placeholder="10000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-data">
            <div className="bg-[#f8f7f4] p-3 rounded border border-[#1a1a1a]/10">
              <span className="terminal-label block mb-1">WEIGHT</span>
              <span className="font-bold text-[#1a1a1a]">{totalMithqals.toFixed(2)} مثقال ({totalGrams.toFixed(2)}g)</span>
            </div>
            <div className="bg-[#f8f7f4] p-3 rounded border border-[#1a1a1a]/10">
              <span className="terminal-label block mb-1">RAW VALUE</span>
              <span className="font-bold text-[#1a1a1a]">{totalRawGoldIqd.toLocaleString('en-US')} IQD</span>
            </div>
            <div className="bg-[#f8f7f4] p-3 rounded border border-[#1a1a1a]/10">
              <span className="terminal-label block mb-1">SIYAGHA</span>
              <span className="font-bold text-[#1a1a1a]">{totalSiyaghaIqd.toLocaleString('en-US')} IQD</span>
            </div>
            <div className="bg-[#f8f7f4] p-3 rounded border border-[#1a1a1a]/10">
              <span className="terminal-label block mb-1">USD VALUE</span>
              <span className="font-bold text-[#065f46]">${grandTotalGoldUsd.toFixed(2)}</span>
            </div>
          </div>

          {/* Estimation Invoice Card */}
          <div className="p-4 bg-white border-2 border-dashed border-[#1a1a1a]/20 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#b45309]" />
                <span className="font-bold text-xs text-[#1a1a1a]">وصل تقديري لعملية الشراء</span>
              </div>
              <button
                onClick={handleCopyGoldInvoice}
                className="inline-flex items-center gap-1 text-xs font-mono-data font-bold text-[#b45309] hover:underline"
              >
                {copiedInvoice ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInvoice ? 'تم نسخ الوصل!' : 'نسخ الوصل للمشاركة'}</span>
              </button>
            </div>

            <div className="text-xs font-mono-data text-[#1a1a1a]/80 space-y-1 bg-[#f8f7f4] p-3 rounded">
              <div className="flex justify-between">
                <span>سعر الذهب الخام:</span>
                <span>{totalRawGoldIqd.toLocaleString('en-US')} د.ع</span>
              </div>
              <div className="flex justify-between">
                <span>أجور الصياغة:</span>
                <span>+{totalSiyaghaIqd.toLocaleString('en-US')} د.ع</span>
              </div>
              <div className="flex justify-between border-t border-[#1a1a1a]/10 pt-1 font-bold text-[#1a1a1a]">
                <span>المجموع النهائي:</span>
                <span className="text-[#b45309]">{grandTotalGoldIqd.toLocaleString('en-US')} د.ع</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] text-white p-5 rounded-lg text-center shadow-md">
            <span className="terminal-label text-slate-400 block mb-1">TOTAL AMOUNT PAYABLE (المبلغ الإجمالي)</span>
            <div className="font-mono-data text-2xl sm:text-4xl font-black text-amber-400">
              {grandTotalGoldIqd.toLocaleString('en-US')} IQD
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Zakat */}
      {activeTab === 'zakat' && (
        <div className="terminal-card p-6 rounded-lg space-y-6">
          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/10 p-3.5 rounded text-xs text-[#1a1a1a]/80 leading-relaxed font-sans">
            <strong className="text-[#1a1a1a] font-bold">النصاب الشرعي للذهب: </strong>
            85 غراماً من عيار 24 (أو 97.14 غراماً عيار 21)، ومقدار الزكاة الواجب إخراجها هو 2.5% (ربع العشر) عند مرور حول قمري كامل.
          </div>

          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-4 rounded">
            <span className="terminal-label block mb-1">24K GOLD OWNED (GRAMS)</span>
            <input
              type="number"
              value={zakatGrams24k}
              onChange={(e) => setZakatGrams24k(e.target.value)}
              className="w-full bg-transparent font-mono-data text-3xl font-black text-[#1a1a1a] focus:outline-none"
              placeholder="100"
            />
          </div>

          <div className={`p-3 rounded border text-xs font-mono-data ${isZakatEligible ? 'bg-emerald-50 border-emerald-300 text-[#065f46]' : 'bg-slate-50 border-slate-300 text-slate-700'}`}>
            <span className="font-bold block mb-0.5">
              {isZakatEligible ? 'STATUS: NISAB REACHED (ZAKAT DUE)' : 'STATUS: BELOW NISAB THRESHOLD (85g)'}
            </span>
          </div>

          {isZakatEligible && (
            <div className="bg-[#1a1a1a] text-white p-5 rounded-lg text-center space-y-2 shadow-md">
              <span className="terminal-label text-slate-400 block">ZAKAT OBLIGATION (2.5%)</span>
              <div className="font-mono-data text-2xl sm:text-4xl font-black text-emerald-400">
                {zakatDueIqd.toLocaleString('en-US')} IQD
              </div>
              <div className="font-mono-data text-xs text-slate-400">
                ({zakatDueGrams.toFixed(2)} grams gold / ${zakatDueUsd.toFixed(2)} USD)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
