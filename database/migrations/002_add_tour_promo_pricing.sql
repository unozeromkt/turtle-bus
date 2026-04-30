ALTER TABLE tours
ADD COLUMN IF NOT EXISTS is_promoted BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS promo_original_price_adult NUMERIC,
ADD COLUMN IF NOT EXISTS promo_price_adult NUMERIC;

CREATE INDEX IF NOT EXISTS idx_tours_is_promoted ON tours(is_promoted);