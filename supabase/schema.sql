-- =========================================================
-- Iraqi Market Exchange Database Schema (Supabase / Postgres)
-- بورصة العراق - أسعار الذهب والدولار
-- =========================================================

-- 1. Table: dollar_prices
CREATE TABLE IF NOT EXISTS dollar_prices (
    id TEXT PRIMARY KEY,
    province_ar TEXT NOT NULL,
    province_en TEXT NOT NULL,
    market_name TEXT NOT NULL,
    buy_price NUMERIC NOT NULL,
    sell_price NUMERIC NOT NULL,
    change_iqd NUMERIC DEFAULT 0,
    change_percent NUMERIC DEFAULT 0,
    high_24h NUMERIC NOT NULL,
    low_24h NUMERIC NOT NULL,
    is_override BOOLEAN DEFAULT FALSE,
    source TEXT DEFAULT 'بورصة الكفاح والحارثية',
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: gold_prices
CREATE TABLE IF NOT EXISTS gold_prices (
    id TEXT PRIMARY KEY,
    karat INTEGER NOT NULL,
    karat_name_ar TEXT NOT NULL,
    mithqal_iqd NUMERIC NOT NULL,
    mithqal_usd NUMERIC NOT NULL,
    gram_iqd NUMERIC NOT NULL,
    gram_usd NUMERIC NOT NULL,
    siyagha_avg_iqd NUMERIC DEFAULT 10000,
    mithqal_with_siyagha_iqd NUMERIC NOT NULL,
    change_24h_iqd NUMERIC DEFAULT 0,
    change_percent NUMERIC DEFAULT 0,
    source TEXT DEFAULT 'سوق الصاغة العراقي + البورصة العالمية',
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: price_history
CREATE TABLE IF NOT EXISTS price_history (
    id BIGSERIAL PRIMARY KEY,
    recorded_at DATE NOT NULL UNIQUE,
    timestamp BIGINT NOT NULL,
    baghdad_dollar_sell NUMERIC NOT NULL,
    baghdad_dollar_buy NUMERIC NOT NULL,
    erbil_dollar_sell NUMERIC NOT NULL,
    basra_dollar_sell NUMERIC NOT NULL,
    gold_mithqal_21k NUMERIC NOT NULL,
    gold_ounce_usd NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: app_settings
CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE dollar_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all users
CREATE POLICY "Allow public read dollar_prices" ON dollar_prices FOR SELECT USING (true);
CREATE POLICY "Allow public read gold_prices" ON gold_prices FOR SELECT USING (true);
CREATE POLICY "Allow public read price_history" ON price_history FOR SELECT USING (true);
CREATE POLICY "Allow public read app_settings" ON app_settings FOR SELECT USING (true);

-- Allow authenticated/service role full access
CREATE POLICY "Allow service role write dollar_prices" ON dollar_prices FOR ALL USING (true);
CREATE POLICY "Allow service role write gold_prices" ON gold_prices FOR ALL USING (true);
CREATE POLICY "Allow service role write price_history" ON price_history FOR ALL USING (true);
CREATE POLICY "Allow service role write app_settings" ON app_settings FOR ALL USING (true);
