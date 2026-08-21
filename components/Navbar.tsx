'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Coins,
  RefreshCw,
  Sun,
  Moon,
  TrendingUp,
  MapPin,
  Calculator,
  ShieldCheck,
  Menu,
  X,
  Clock,
  Radio
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, refreshData, isRefreshing, timeAgoText } = useMarket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [baghdadTime, setBaghdadTime] = useState<string>('');

  // Clock for Baghdad time (UTC+3)
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
      setBaghdadTime(new Intl.DateTimeFormat('ar-IQ', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: TrendingUp },
    { href: '/provinces', label: 'أسعار المحافظات', icon: MapPin },
    { href: '/calculator', label: 'حاسبة الدولار والذهب', icon: Calculator },
    { href: '/admin', label: 'لوحة الإدارة', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e14]/95 dark:bg-[#08090c]/95 backdrop-blur-md border-b border-amber-500/20 text-slate-100 transition-colors duration-200">
      {/* Top micro bar with Baghdad clock & Live Status */}
      <div className="border-b border-slate-800/80 bg-[#07080a] text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded-full text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              بث حي مباشر
            </span>
            <span className="text-slate-400 hidden sm:inline-flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              بورصة الكفاح والحارثية + أسواق الصاغة
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>توقيت بغداد: {baghdadTime || '...'}</span>
            </div>
            <span className="hidden md:inline text-slate-500">|</span>
            <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
              <span>آخر تحديث:</span>
              <span className="text-amber-400 font-semibold">{timeAgoText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center">
                <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  بورصة <span className="text-amber-400">العراق</span>
                </span>
                <span className="text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-1.5 py-0.5 rounded">
                  IQD
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                أسعار الدولار والذهب لحظة بلحظة
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#12151e]/80 border border-slate-800 p-1.5 rounded-2xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Refresh & Theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="refresh-btn"
              onClick={() => refreshData()}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50"
              title="تحديث البيانات الآن"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">تحديث فوري</span>
            </button>

            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
              title="تبديل الوضع الليلي / الفاتح"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 bg-[#0c0e14] animate-fadeIn">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
