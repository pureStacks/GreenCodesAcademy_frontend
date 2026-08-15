import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function check() {
  console.log('Writing...');
  const upserts = [{section_key: 'test', section_data: {hello: 'world'}}];
  const { error } = await supabase.from('app_data').upsert(upserts, { onConflict: 'section_key' });
  if (error) {
    console.error('Supabase write error:', error);
  } else {
    console.log('Success!');
  }
}
check();
