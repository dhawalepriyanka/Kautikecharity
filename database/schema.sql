CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS donation_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), donor_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
  amount_inr INTEGER NOT NULL CHECK (amount_inr >= 1), currency TEXT NOT NULL DEFAULT 'INR', campaign TEXT NOT NULL DEFAULT 'General fund',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','cancelled')),
  razorpay_order_id TEXT UNIQUE, razorpay_payment_id TEXT UNIQUE, razorpay_signature TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE donation_intents ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE donation_intents ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'INR';
ALTER TABLE donation_intents ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT UNIQUE;
ALTER TABLE donation_intents ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT UNIQUE;
ALTER TABLE donation_intents ADD COLUMN IF NOT EXISTS razorpay_signature TEXT;
ALTER TABLE donation_intents ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
-- Razorpay accepts a minimum order amount of 100 paise (₹1).
ALTER TABLE donation_intents DROP CONSTRAINT IF EXISTS donation_intents_amount_inr_check;
ALTER TABLE donation_intents ADD CONSTRAINT donation_intents_amount_inr_check CHECK (amount_inr >= 1);
CREATE INDEX IF NOT EXISTS donation_intents_status_idx ON donation_intents (status);
CREATE INDEX IF NOT EXISTS donation_intents_created_at_idx ON donation_intents (created_at DESC);
CREATE TABLE IF NOT EXISTS contact_messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
