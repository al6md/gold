export interface DollarProvincePrice {
  id: string;
  province_en: string;
  province_ar: string;
  region: 'baghdad' | 'kurdistan' | 'south' | 'middle_euphrates' | 'north' | 'west';
  market_name: string;
  buy_price: number; // Price per $100 USD in IQD (e.g. 150250)
  sell_price: number; // Price per $100 USD in IQD (e.g. 150500)
  previous_close?: number;
  change_iqd: number;
  change_percent: number;
  high_24h: number;
  low_24h: number;
  last_updated: string; // ISO string
  is_override?: boolean;
  source: string;
}

export interface GoldPrice {
  karat: number; // 24, 22, 21, 18
  karat_name_ar: string;
  mithqal_iqd: number; // 5 grams in IQD
  mithqal_usd: number; // 5 grams in USD
  gram_iqd: number; // 1 gram in IQD
  gram_usd: number; // 1 gram in USD
  siyagha_avg_iqd: number; // Average craftsmanship fee per mithqal
  mithqal_with_siyagha_iqd: number;
  change_24h_iqd: number;
  change_percent: number;
  last_updated: string;
  source: string;
}

export interface CurrencyRate {
  code: string;
  name_ar: string;
  symbol: string;
  flag: string;
  buy_iqd: number; // Price per 1 unit or per 100 units
  sell_iqd: number;
  unit: number; // 1 or 100 or 1000
  change_percent: number;
  last_updated: string;
}

export interface MarketSummary {
  cbi_official_rate: number; // 1320 IQD per 1 USD (132,000 per $100)
  cbi_transfer_rate: number; // 1310 IQD per 1 USD
  baghdad_buy: number;
  baghdad_sell: number;
  baghdad_change_iqd: number;
  baghdad_change_percent: number;
  gold_ounce_usd: number;
  gold_ounce_change_usd: number;
  gold_ounce_change_percent: number;
  silver_ounce_usd: number;
  dxy_index: number;
  mithqal_21k_iqd: number;
  mithqal_21k_change_iqd: number;
  default_siyagha_fee: number;
  last_updated: string;
  sources: string[];
}

export interface PriceHistoryPoint {
  date: string;
  timestamp: number;
  baghdad_dollar_sell: number;
  baghdad_dollar_buy: number;
  erbil_dollar_sell: number;
  basra_dollar_sell: number;
  gold_mithqal_21k: number;
  gold_ounce_usd: number;
}

export interface AppSettings {
  default_siyagha_fee: number;
  admin_pin: string;
  announcement?: string;
  auto_refresh_seconds: number;
  overrides: Record<string, { buy: number; sell: number; updated_at: string }>;
}
