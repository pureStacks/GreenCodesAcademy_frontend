import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
async function check() {
  const { data, error } = await supabase.from('app_data').select('*');
  console.log('Select error:', error);
}
check();
