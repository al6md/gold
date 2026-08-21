'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { DollarProvincePrice, GoldPrice, CurrencyRate, MarketSummary, PriceHistoryPoint } from '@/lib/types';
import {
  DEFAULT_MARKET_SUMMARY,
  DEFAULT_PROVINCES,
  DEFAULT_GOLD_PRICES,
  DEFAULT_CURRENCIES,
  DEFAULT_HISTORY
} from '@/lib/default-data';

interface MarketDataState {
  summary: MarketSummary | null;
  provinces: DollarProvincePrice[];
  goldPrices: GoldPrice[];
  currencies: CurrencyRate[];
  history: PriceHistoryPoint[];
  announcement?: string;
  lastUpdated: Date | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  refreshData: () => Promise<void>;
  timeAgoText: string;
}

const MarketContext = createContext<MarketDataState | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [summary, setSummary] = useState<MarketSummary | null>(DEFAULT_MARKET_SUMMARY);
  const [provinces, setProvinces] = useState<DollarProvincePrice[]>(DEFAULT_PROVINCES);
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>(DEFAULT_GOLD_PRICES);
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(DEFAULT_CURRENCIES);
  const [history, setHistory] = useState<PriceHistoryPoint[]>(DEFAULT_HISTORY);
  const [announcement, setAnnouncement] = useState<string>('أسعار صرف الدولار ومثقال الذهب محدثة لحظياً مباشرة من بورصة الكفاح وأسواق الصاغة.');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [timeAgoText, setTimeAgoText] = useState<string>('لحظات');

  // Toggle dark/light theme
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const next = prevTheme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('iraq_exchange_theme', next);
      } catch {
        //
      }
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    }
    setError(null);
    try {
      const res = await fetch(`/api/prices?t=${Date.now()}`, {
        cache: 'no-store'
      });
      if (!res.ok) {
        throw new Error('فشل جلب البيانات من الخادم');
      }
      const data = await res.json();
      setSummary(data.summary);
      setProvinces(data.provinces || []);
      setGoldPrices(data.goldPrices || []);
      setCurrencies(data.currencies || []);
      setHistory(data.history || []);
      setAnnouncement(data.announcement || '');
      setLastUpdated(new Date(data.last_updated || Date.now()));
    } catch (err: unknown) {
      console.error('Market fetch error:', err);
      setError((err as Error).message || 'حدث خطأ في الاتصال بالبورصة');
    } finally {
      setIsLoading(false);
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  }, []);

  // Initial fetch and 30s polling
  useEffect(() => {
    let active = true;
    
    // Fetch initial
    fetch(`/api/prices?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setSummary(data.summary);
        setProvinces(data.provinces || []);
        setGoldPrices(data.goldPrices || []);
        setCurrencies(data.currencies || []);
        setHistory(data.history || []);
        setAnnouncement(data.announcement || '');
        setLastUpdated(new Date(data.last_updated || Date.now()));
        setIsLoading(false);
      })
      .catch(() => {
        if (active) setIsLoading(false);
      });

    const interval = setInterval(() => {
      if (active) {
        fetchData();
      }
    }, 30000); // 30 seconds

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [fetchData]);

  // Live ticking relative time formatter (e.g. منذ 5 ثواني / منذ دقيقتين)
  useEffect(() => {
    const tick = () => {
      if (!lastUpdated) {
        setTimeAgoText('جاري التحديث...');
        return;
      }
      const now = new Date().getTime();
      const diffSec = Math.max(0, Math.floor((now - lastUpdated.getTime()) / 1000));

      if (diffSec < 10) {
        setTimeAgoText('منذ لحظات (بث حي)');
      } else if (diffSec < 60) {
        setTimeAgoText(`منذ ${diffSec} ثانية`);
      } else {
        const mins = Math.floor(diffSec / 60);
        if (mins === 1) {
          setTimeAgoText('منذ دقيقة واحدة');
        } else if (mins === 2) {
          setTimeAgoText('منذ دقيقتين');
        } else if (mins <= 10) {
          setTimeAgoText(`منذ ${mins} دقائق`);
        } else {
          setTimeAgoText(`منذ ${mins} دقيقة`);
        }
      }
    };

    tick();
    const timer = setInterval(tick, 2000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  return (
    <MarketContext.Provider
      value={{
        summary,
        provinces,
        goldPrices,
        currencies,
        history,
        announcement,
        lastUpdated,
        isLoading,
        isRefreshing,
        error,
        theme,
        toggleTheme,
        refreshData: () => fetchData(true),
        timeAgoText,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
