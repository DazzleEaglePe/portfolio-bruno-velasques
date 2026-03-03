-- ======================================================
-- Giveaways Participant Position RPC
-- Run this in your Supabase SQL Editor (supabase.com → SQL)
-- ======================================================

-- This function returns the sequential position of a user's entry 
-- in the giveaway bypassing RLS, without exposing other users' data.

create or replace function get_giveaway_position(p_user_id uuid)
returns integer
language sql
security definer
as $$
  select count(*)::integer 
  from public.giveaway_entries
  where created_at <= (
    select created_at 
    from public.giveaway_entries 
    where user_id = p_user_id 
    limit 1
  );
$$;
