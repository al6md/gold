'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  MapPin,
  Calculator,
  ShieldCheck,
  RefreshCw,
  Clock,
  Menu,
  X,
  Radio,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { summary, provinces, isRefreshing, refreshData, timeAgoText } = useMarket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [baghdadTime, setBaghdadTime] = useState<string>('');

  // Update Baghdad live clock
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

  const navLinks = [
    { href: '/', label: 'الرئيسية', sublabel: 'LIVE OVERVIEW', icon: TrendingUp },
    { href: '/provinces', label: 'المحافظات', sublabel: '14 EXCHANGES', icon: MapPin },
    { href: '/calculator', label: 'حاسبة الذهب', sublabel: 'CONVERTER', icon: Calculator },
  ];

  // Marquee string with live dynamic prices
  const baghdadPrice = provinces.find(p => p.id === 'baghdad_kifah') || provinces[0];
  const erbilPrice = provinces.find(p => p.id === 'erbil') || provinces[2];
  const basraPrice = provinces.find(p => p.id === 'basra') || provinces[4];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f7f4] text-[#1a1a1a]">
      {/* 1. Top Amber Marquee Strip & Tech Meta */}
      <header className="border-b-2 border-[#020617] flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 py-2.5 bg-white z-30 gap-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#020617]">
            بورصة <span className="text-[#b45309]">العراق</span>
          </Link>
          <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest bg-[#020617] text-white px-2 py-0.5 rounded-[2px] font-black">
            DYNAMIC ASSET PORTAL
          </span>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block animate-pulse"></span>
            <span>NETWORK: CBI_GLOBAL_LINK</span>
          </div>
          <div className="hidden sm:inline">STATUS: ONLINE_ACTIVE</div>
          <div className="text-[#020617] bg-[#f8fafc] border border-[#020617]/15 px-2 py-0.5 rounded-[2px]">
            BAGHDAD: {baghdadTime || 'LIVE'}
          </div>
        </div>
      </header>

      {/* Marquee Ticker */}
      <div className="bg-[#b45309] text-white py-1.5 px-4 overflow-hidden select-none border-b-2 border-[#020617] text-xs font-bold font-mono-data tracking-wide z-30">
        <div className="animate-ticker-marquee flex items-center gap-12 whitespace-nowrap">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              <span>بغداد (الكفاح): {baghdadPrice?.sell_price?.toLocaleString('en-US') || '150,500'} / {baghdadPrice?.buy_price?.toLocaleString('en-US') || '150,250'} د.ع</span>
            </span>
            <span>—</span>
            <span>مثقال الذهب عيار 21: {summary?.mithqal_21k_iqd?.toLocaleString('en-US') || '515,000'} د.ع</span>
            <span>—</span>
            <span>أربيل: {erbilPrice?.sell_price?.toLocaleString('en-US') || '150,750'} د.ع</span>
            <span>—</span>
            <span>أونصة الذهب عالمياً: ${(summary?.gold_ounce_usd ?? 2920.50).toFixed(2)}</span>
            <span>—</span>
            <span>البصرة (العشار): {basraPrice?.sell_price?.toLocaleString('en-US') || '150,700'} د.ع</span>
            <span>—</span>
            <span>سعر البنك المركزي الرسمي: {summary?.cbi_official_rate || 1320} د.ع</span>
            <span>—</span>
            <span>أونصة الفضة: ${(summary?.silver_ounce_usd ?? 32.40).toFixed(2)}</span>
          </div>
          {/* Duplicate loop */}
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              <span>بغداد (الكفاح): {baghdadPrice?.sell_price?.toLocaleString('en-US') || '150,500'} / {baghdadPrice?.buy_price?.toLocaleString('en-US') || '150,250'} د.ع</span>
            </span>
            <span>—</span>
            <span>مثقال الذهب عيار 21: {summary?.mithqal_21k_iqd?.toLocaleString('en-US') || '515,000'} د.ع</span>
            <span>—</span>
            <span>أربيل: {erbilPrice?.sell_price?.toLocaleString('en-US') || '150,750'} د.ع</span>
            <span>—</span>
            <span>أونصة الذهب عالمياً: ${(summary?.gold_ounce_usd ?? 2920.50).toFixed(2)}</span>
            <span>—</span>
            <span>البصرة (العشار): {basraPrice?.sell_price?.toLocaleString('en-US') || '150,700'} د.ع</span>
            <span>—</span>
            <span>سعر البنك المركزي الرسمي: {summary?.cbi_official_rate || 1320} د.ع</span>
            <span>—</span>
            <span>أونصة الفضة: ${(summary?.silver_ounce_usd ?? 32.40).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* 2. Responsive App Shell Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-32px-48px)]">
        {/* Mobile Header Bar (Visible on < lg screens) */}
        <header className="lg:hidden bg-white border-b border-[#1a1a1a]/10 p-4 flex items-center justify-between sticky top-0 z-20">
          <Link href="/" className="flex items-center gap-2">
            <div>
              <h1 className="font-display text-xl text-[#1a1a1a]">
                بورصة <span className="text-[#b45309]">العراق</span>
              </h1>
              <span className="terminal-label block text-[9px] -mt-1">IQD MARKET TERMINAL v2.0</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshData()}
              disabled={isRefreshing}
              className="p-2 border border-[#1a1a1a]/10 rounded bg-[#f8f7f4] text-[#1a1a1a] text-xs"
              title="تحديث فوري"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#b45309]' : ''}`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#1a1a1a]/10 rounded bg-[#f8f7f4] text-[#1a1a1a]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-white border-b-2 border-[#1a1a1a] p-4 flex flex-col gap-1 z-20">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#1a1a1a] text-white'
                      : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  <span className={`terminal-label ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                    {link.sublabel}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Desktop Sidebar (Fixed 280px, border-left in RTL) */}
        <aside className="hidden lg:flex w-[280px] bg-white border-l border-[#020617] p-6 flex-col justify-between shrink-0 sticky top-0 h-[calc(100vh-32px-48px)]">
          <div className="flex flex-col">
            {/* Brand with tech styling */}
            <div className="mb-6 pb-5 border-b-2 border-[#020617]">
              <Link href="/" className="group block">
                <h1 className="font-display text-2xl font-black tracking-tight text-[#020617] group-hover:text-[#b45309] transition-colors">
                  بورصة <span className="text-[#b45309]">العراق</span>
                </h1>
                <div className="font-mono text-[10px] uppercase font-bold text-[#64748b] tracking-wider mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block animate-pulse"></span>
                  <span>DYNAMIC ASSET PORTAL</span>
                </div>
              </Link>
            </div>

            {/* Navigation links */}
            <nav>
              <ul className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-[4px] text-xs font-bold transition-all border ${
                          isActive
                            ? 'bg-[#020617] text-white border-[#020617] shadow-[3px_3px_0_#b45309]'
                            : 'text-[#020617] border-transparent hover:border-[#020617] hover:bg-[#020617]/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#b45309]' : 'text-[#020617]/60'}`} />
                          <span>{link.label}</span>
                        </div>
                        <span className={`terminal-label text-[9px] ${isActive ? 'text-amber-400 font-mono' : 'text-[#64748b]'}`}>
                          {link.sublabel}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Sidebar Bottom: Status & Refresh */}
          <div className="pt-5 border-t-2 border-[#020617] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="terminal-label">SYSTEM REFRESH</span>
                <span className="font-mono text-xs text-[#020617] font-bold mt-0.5">
                  {timeAgoText || 'Live Synced'}
                </span>
              </div>
              <button
                onClick={() => refreshData()}
                disabled={isRefreshing}
                className="p-2 rounded-[4px] bg-white border border-[#020617] shadow-[2px_2px_0_#020617] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none text-[#020617] transition-all disabled:opacity-50"
                title="تحديث البيانات"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#b45309]' : ''}`} />
              </button>
            </div>

            <div className="p-3 bg-white border border-[#020617] shadow-[3px_3px_0_#020617] rounded-[4px] text-[11px] leading-relaxed text-[#020617]/80">
              <div className="flex items-center gap-1.5 font-bold text-[#020617] mb-1 font-mono text-[10px]">
                <div className="pulse-status-box"></div>
                <span>CBI_GLOBAL_LINK: ACTIVE</span>
              </div>
              <span>متابعة حية ومباشرة لحركة السيولة وأسعار الصاغة والمحافظات.</span>
            </div>
          </div>
        </aside>

        {/* Main Content Pane with Dot Pattern */}
        <main className="flex-1 terminal-grid-bg p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* 3. Footer Bar */}
      <footer className="bg-[#1a1a1a] text-[#f8f7f4] py-4 px-6 border-t border-[#1a1a1a] text-xs z-30 space-y-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-data">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="font-bold tracking-wider">© 2026 IRAQ MARKET TERMINAL</span>
            <span className="hidden md:inline opacity-30">|</span>
            <Link href="/privacy" className="text-slate-300 hover:text-amber-400 underline transition-colors">
              سياسة الخصوصية
            </Link>
            <span className="opacity-30">•</span>
            <Link href="/terms" className="text-slate-300 hover:text-amber-400 underline transition-colors">
              شروط الاستخدام
            </Link>
            <span className="opacity-30">•</span>
            <Link href="/contact" className="text-slate-300 hover:text-amber-400 underline transition-colors">
              اتصل بنا
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              STATUS: LIVE
            </span>
            <span className="opacity-80">BAGHDAD, IQ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
