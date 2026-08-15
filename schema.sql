-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.app_data (
  section_key text PRIMARY KEY,
  section_data jsonb NOT NULL
);

-- Ensure RLS is disabled or setup properly (for a simple backend-only connection, we can just leave it accessible via service key / backend anon key if we disable RLS, but since we use the anon key in the backend, let's enable RLS and add a policy, OR simply disable RLS if this is a private project).

-- Since the backend uses the anon key, we'll allow all operations for now (or you can restrict it).
ALTER TABLE public.app_data DISABLE ROW LEVEL SECURITY;
