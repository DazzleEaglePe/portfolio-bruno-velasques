-- ======================================================
-- Giveaways Participant Counter for Portfolio
-- Run this in your Supabase SQL Editor (supabase.com → SQL)
-- ======================================================

-- This function creates a safe way to get the total number
-- of participants without exposing personal data or
-- bypassing RLS policies for regular SELECT queries.

create or replace function get_participant_count()
returns integer
language sql
security definer -- Elevates privileges so it bypasses RLS safely
as $$
  select count(*)::integer from public.giveaway_entries;
$$;
