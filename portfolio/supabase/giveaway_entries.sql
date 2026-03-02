-- ======================================================
-- Giveaway Entries Table for Portfolio Sorteo Mensual
-- Run this in your Supabase SQL Editor (supabase.com → SQL)
-- ======================================================

-- Create the giveaway_entries table
create table if not exists public.giveaway_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  business_name text not null,
  phone text,
  ruc text,
  address text,
  business_type text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.giveaway_entries enable row level security;

-- Policy: Authenticated users can INSERT their own entries
create policy "Users can insert their own entries"
  on public.giveaway_entries
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Policy: Users can only SELECT their own entries
create policy "Users can view their own entries"
  on public.giveaway_entries
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Policy: Allow anon inserts (for users who just signed up and session hasn't refreshed yet)
create policy "Allow insert for anon during sign-up"
  on public.giveaway_entries
  for insert
  to anon
  with check (true);

-- ======================================================
-- MIGRATION: Run this if the table already exists
-- ======================================================
-- ALTER TABLE public.giveaway_entries ADD COLUMN IF NOT EXISTS phone text;
-- ALTER TABLE public.giveaway_entries ADD COLUMN IF NOT EXISTS ruc text;
-- ALTER TABLE public.giveaway_entries ADD COLUMN IF NOT EXISTS address text;
-- ALTER TABLE public.giveaway_entries ADD COLUMN IF NOT EXISTS business_type text;
