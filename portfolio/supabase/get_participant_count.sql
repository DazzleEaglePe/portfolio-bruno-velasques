-- ======================================================
-- Giveaways Participant Counter for Portfolio
-- Run this in your Supabase SQL Editor (supabase.com → SQL)
-- ======================================================

-- Drop the old version first to ensure a clean state
drop function if exists get_participant_count();

-- This function creates a safe way to get the total number
-- of participants without exposing personal data or
-- bypassing RLS policies for regular SELECT queries.
-- SET search_path ensures it always looks in the 'public' schema.

create or replace function get_participant_count()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from giveaway_entries;
$$;
