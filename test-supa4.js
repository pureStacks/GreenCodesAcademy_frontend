import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

let supabaseUrl = process.env.SUPABASE_URL || 'https://nvfzfzmlutqqaxvttplo.supabase.co';
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '');

const supabase = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY);

async function check() {
  console.log('Writing to', supabaseUrl);
  const upserts = [{section_key: 'test', section_data: {hello: 'world'}}];
  const { error } = await supabase.from('app_data').upsert(upserts, { onConflict: 'section_key' });
  if (error) {
    console.error('Supabase write error:', error);
  } else {
    console.log('Success!');
  }
}
check();
