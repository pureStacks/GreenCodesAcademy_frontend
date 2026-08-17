import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nvfzfzmlutqqaxvttplo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Znpmem1sdXRxcWF4dnR0cGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MDc3OTQsImV4cCI6MjEwMjM4Mzc5NH0.Omfy9sRxCb3njmLQ1fap38mAYe5lQ90ZvxFYGX0tVUQ';

// Purge any stale tokens from localStorage so no unauthorized or legacy persisted sessions allow automatic entry
if (typeof window !== 'undefined') {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token'))) {
        localStorage.removeItem(key);
      }
    }
  } catch (err) {
    // Ignore storage access issues
  }
}

// Configure Supabase client with sessionStorage so authentication only exists for the active session and requires explicit login
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});
