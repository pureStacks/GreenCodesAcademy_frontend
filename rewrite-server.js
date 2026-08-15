import fs from 'fs';

let serverCode = fs.readFileSync('server.ts', 'utf8');

serverCode = serverCode.replace("import fs from 'fs';", "import fs from 'fs';\nimport { createClient } from '@supabase/supabase-js';");

serverCode = serverCode.replace(
  "const DATA_FILE = path.join(process.cwd(), 'data.json');",
  "const DATA_FILE = path.join(process.cwd(), 'data.json');\n\nconst supabaseUrl = process.env.SUPABASE_URL || 'https://nvfzfzmlutqqaxvttplo.supabase.co';\nconst supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Znpmem1sdXRxcWF4dnR0cGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MDc3OTQsImV4cCI6MjEwMjM4Mzc5NH0.Omfy9sRxCb3njmLQ1fap38mAYe5lQ90ZvxFYGX0tVUQ';\nconst supabase = createClient(supabaseUrl, supabaseKey);"
);

const readDataReplacement = `
// Helper to read data
const readData = async () => {
  try {
    const { data, error } = await supabase.from('app_data').select('*');
    if (!error && data) {
      if (data.length > 0) {
        const fullData = {};
        data.forEach(row => {
          fullData[row.section_key] = row.section_data;
        });
        return fullData;
      }
    }
  } catch (err) {
    console.warn('Supabase read failed, falling back to local file');
  }

  // Fallback
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};
`;

serverCode = serverCode.replace(
  /\/\/ Helper to read data[\s\S]*?};\n/,
  readDataReplacement + "\n"
);

const writeDataReplacement = `
// Helper to write data
const writeData = async (data) => {
  try {
    // Write all sections to Supabase
    const upserts = Object.keys(data).map(key => ({
      section_key: key,
      section_data: data[key]
    }));
    const { error } = await supabase.from('app_data').upsert(upserts, { onConflict: 'section_key' });
    if (!error) {
       fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
       return;
    } else {
       console.error('Supabase write error:', error.message);
    }
  } catch (err) {
    console.warn('Supabase write failed, writing locally');
  }
  
  // Fallback to local
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};
`;

serverCode = serverCode.replace(
  /\/\/ Helper to write data[\s\S]*?};\n/,
  writeDataReplacement + "\n"
);

// Now update all endpoints to use async readData and writeData
serverCode = serverCode.replace(/app\.get\('\/api\/data', \(req, res\) => {/g, "app.get('/api/data', async (req, res) => {");
serverCode = serverCode.replace(/const data = readData\(\);/g, "const data = await readData();");
serverCode = serverCode.replace(/writeData\(data\);/g, "await writeData(data);");
serverCode = serverCode.replace(/app\.post\('\/api\/enrollments', \(req, res\) => {/g, "app.post('/api/enrollments', async (req, res) => {");
serverCode = serverCode.replace(/app\.get\('\/api\/admin\/data', authenticateToken, \(req, res\) => {/g, "app.get('/api/admin/data', authenticateToken, async (req, res) => {");
serverCode = serverCode.replace(/res\.json\(readData\(\)\);/g, "res.json(await readData());");
serverCode = serverCode.replace(/app\.put\('\/api\/admin\/data\/:section', authenticateToken, \(req, res\) => {/g, "app.put('/api/admin/data/:section', authenticateToken, async (req, res) => {");
serverCode = serverCode.replace(/app\.patch\('\/api\/admin\/enrollments\/:id\/status', authenticateToken, \(req, res\) => {/g, "app.patch('/api/admin/enrollments/:id/status', authenticateToken, async (req, res) => {");

fs.writeFileSync('server.ts', serverCode);
console.log('server.ts updated');
