import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

let supabaseUrl = process.env.SUPABASE_URL || 'https://nvfzfzmlutqqaxvttplo.supabase.co';
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '');

const supabase = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY);

async function fix() {
  console.log('Deleting test row...');
  await supabase.from('app_data').delete().eq('section_key', 'test');
  
  console.log('Reading local data.json...');
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  
  const upserts = Object.keys(data).map(key => ({
    section_key: key,
    section_data: data[key]
  }));
  
  console.log('Upserting real data to Supabase...');
  const { error } = await supabase.from('app_data').upsert(upserts, { onConflict: 'section_key' });
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Successfully seeded Supabase!');
  }
}
fix();
