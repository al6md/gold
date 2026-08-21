'use client';

import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { DollarSign, Coins, Globe2 } from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

type MetricType = 'dollar' | 'gold_mithqal' | 'gold_ounce';
type TimeframeType = 7 | 15 | 30;

const metricConfig = {
  dollar: {
    title: 'سعر صرف 100 دولار في بغداد',
    unit: 'دينار عراقي',
    key: 'baghdad_dollar_sell',
    color: '#b45309', // Terminal Amber
  },
  gold_mithqal: {
    title: 'سعر مثقال الذهب عيار 21',
    unit: 'دينار عراقي',
    key: 'gold_mithqal_21k',
    color: '#1a1a1a', // Deep Ink
  },
  gold_ounce: {
    title: 'سعر أونصة الذهب عالمياً',
    unit: 'دولار أمريكي',
    key: 'gold_ounce_usd',
    color: '#065f46', // Emerald
  },
};

function ChartCustomTooltip({ active, payload, label, unit }: any) {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded p-2.5 shadow-lg text-right font-sans">
        <p className="text-[10px] text-slate-400 font-mono-data mb-0.5">DATE: {label}</p>
        <div className="flex items-center gap-1.5 font-mono-data text-sm font-bold text-amber-400">
          <span>{typeof val === 'number' ? val.toLocaleString('en-US') : val}</span>
          <span className="text-[11px] text-slate-300 font-sans">{unit}</span>
        </div>
      </div>
    );
  }
  return null;
}

export function MarketChart() {
  const { history } = useMarket();
  const [metric, setMetric] = useState<MetricType>('dollar');
  const [timeframe, setTimeframe] = useState<TimeframeType>(7);

  const filteredData = useMemo(() => {
    if (!history || history.length === 0) return [];
    return history.slice(history.length - timeframe);
  }, [history, timeframe]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) return { high: 0, low: 0, avg: 0, change: 0 };
    
    const values = filteredData.map((d) => {
      if (metric === 'dollar') return d.baghdad_dollar_sell;
      if (metric === 'gold_mithqal') return d.gold_mithqal_21k;
      return d.gold_ounce_usd;
    });

    const high = Math.max(...values);
    const low = Math.min(...values);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / values.length) * 10) / 10;
    const change = values[values.length - 1] - values[0];

    return { high, low, avg, change };
  }, [filteredData, metric]);

  const currentCfg = metricConfig[metric];

  return (
    <section className="space-y-4">
      {/* Header matching variation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            المؤشر البياني لحركة الأسعار
          </h2>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5">
            تحليل دقيق لتذبذب أسعار صرف الدولار ومثاقيل الذهب
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="terminal-label bg-[#1a1a1a]/5 px-2.5 py-1 rounded">
            VISUALIZATION LAYER 01
          </div>
        </div>
      </div>

      {/* Controls & Metric Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center flex-wrap gap-1.5 bg-white border border-[#1a1a1a]/10 p-1 rounded-md">
          <button
            onClick={() => setMetric('dollar')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono-data font-bold transition-all ${
              metric === 'dollar'
                ? 'bg-[#1a1a1a] text-white'
                : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            DOLLAR 100$
          </button>
          <button
            onClick={() => setMetric('gold_mithqal')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono-data font-bold transition-all ${
              metric === 'gold_mithqal'
                ? 'bg-[#1a1a1a] text-white'
                : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            GOLD 21K
          </button>
          <button
            onClick={() => setMetric('gold_ounce')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono-data font-bold transition-all ${
              metric === 'gold_ounce'
                ? 'bg-[#1a1a1a] text-white'
                : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            SPOT OUNCE
          </button>
        </div>

        {/* Timeframe */}
        <div className="flex items-center bg-white border border-[#1a1a1a]/10 p-1 rounded-md">
          {([7, 15, 30] as TimeframeType[]).map((days) => (
            <button
              key={days}
              onClick={() => setTimeframe(days)}
              className={`px-2.5 py-1 rounded text-xs font-mono-data font-bold transition-colors ${
                timeframe === days
                  ? 'bg-[#b45309] text-white'
                  : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white border border-[#1a1a1a]/10 p-3.5 rounded-lg font-mono-data text-xs">
        <div>
          <span className="terminal-label block mb-0.5">HIGH ({timeframe}D)</span>
          <div className="font-bold text-sm text-[#1a1a1a]">
            {stats.high.toLocaleString('en-US')}
          </div>
        </div>
        <div>
          <span className="terminal-label block mb-0.5">LOW ({timeframe}D)</span>
          <div className="font-bold text-sm text-[#1a1a1a]">
            {stats.low.toLocaleString('en-US')}
          </div>
        </div>
        <div>
          <span className="terminal-label block mb-0.5">AVERAGE</span>
          <div className="font-bold text-sm text-[#1a1a1a]">
            {stats.avg.toLocaleString('en-US')}
          </div>
        </div>
        <div>
          <span className="terminal-label block mb-0.5">NET DELTA</span>
          <div className={`font-bold text-sm ${stats.change >= 0 ? 'text-[#065f46]' : 'text-[#b45309]'}`}>
            {stats.change >= 0 ? '+' : ''}{stats.change.toLocaleString('en-US')}
          </div>
        </div>
      </div>

      {/* Terminal Chart Area */}
      <div className="terminal-card p-4 rounded-lg">
        <div className="h-[260px] sm:h-[300px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="terminalChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentCfg.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={currentCfg.color} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 2" stroke="rgba(26, 26, 26, 0.08)" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#1a1a1a"
                opacity={0.6}
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: 'rgba(26, 26, 26, 0.15)' }}
              />
              <YAxis
                domain={['auto', 'auto']}
                stroke="#1a1a1a"
                opacity={0.6}
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: 'rgba(26, 26, 26, 0.15)' }}
                tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
              />
              <Tooltip content={<ChartCustomTooltip unit={currentCfg.unit} />} />
              <Area
                type="monotone"
                dataKey={currentCfg.key}
                stroke={currentCfg.color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#terminalChartGrad)"
                activeDot={{ r: 5, fill: '#b45309', stroke: '#1a1a1a', strokeWidth: 1.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
