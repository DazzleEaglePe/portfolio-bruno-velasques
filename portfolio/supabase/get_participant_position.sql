-- ======================================================
-- Giveaway Position Calculator for Portfolio
-- Run this in your Supabase SQL Editor (supabase.com → SQL)
-- ======================================================

-- Drop the old version first to ensure a clean state
drop function if exists get_giveaway_position(uuid);

-- This function calculates the sequential position of a user
-- in the giveaway, based on their entry's created_at timestamp.
-- SET search_path ensures it always looks in the 'public' schema.

create or replace function get_giveaway_position(p_user_id uuid)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer 
  from giveaway_entries
  where created_at <= (
    select created_at 
    from giveaway_entries 
    where user_id = p_user_id 
    limit 1
  );
$$;
