import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nvfzfzmlutqqaxvttplo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Znpmem1sdXRxcWF4dnR0cGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MDc3OTQsImV4cCI6MjEwMjM4Mzc5NH0.Omfy9sRxCb3njmLQ1fap38mAYe5lQ90ZvxFYGX0tVUQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
