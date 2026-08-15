import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function check() {
  console.log('Checking connection...');
  const { data, error } = await supabase.from('enrollments').select('*').limit(1);
  if (error) {
    console.error('Error querying enrollments:', error.message);
  } else {
    console.log('enrollments table exists:', data);
  }
}
check();
