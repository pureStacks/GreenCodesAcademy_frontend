import express from 'express';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';


const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey123';
const DATA_FILE = path.join(process.cwd(), 'data.json');

let supabaseUrl = process.env.SUPABASE_URL || 'https://nvfzfzmlutqqaxvttplo.supabase.co';
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '');
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Znpmem1sdXRxcWF4dnR0cGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MDc3OTQsImV4cCI6MjEwMjM4Mzc5NH0.Omfy9sRxCb3njmLQ1fap38mAYe5lQ90ZvxFYGX0tVUQ';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());


// Helper to read data
const readData = async () => {
  try {
    const { data, error } = await supabase.from('app_data').select('*');
    if (!error && data) {
      if (data.length > 0) {
        const fullData: any = {};
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
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.warn('Local read fallback failed:', err.message);
    return {};
  }
};


// Helper to write data
const writeData = async (data: any) => {
  try {
    // Write all sections to Supabase
    const upserts = Object.keys(data).map(key => ({
      section_key: key,
      section_data: data[key]
    }));
    const { error } = await supabase.from('app_data').upsert(upserts, { onConflict: 'section_key' });
    if (!error) {
       try {
         fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
       } catch (err) {
         console.warn('Local write fallback failed (expected on Vercel):', err.message);
       }
       return;
    } else {
       console.error('Supabase write error:', error.message);
    }
  } catch (err) {
    console.warn('Supabase write failed, writing locally');
  }
  
  // Fallback to local
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('Local write fallback failed (expected on Vercel):', err.message);
  }
};


// Authentication Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// Public endpoint to get all site data
app.get('/api/data', async (req, res) => {
  const data = await readData();
  // Strip out sensitive info for public data
  const { enrollments, admin, ...publicData } = data;
  res.json(publicData);
});

// Admin login
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  const data = await readData();
  
  let isValid = false;
  
  if (data.admin && data.admin.passwordHash) {
    isValid = await bcrypt.compare(password, data.admin.passwordHash);
  } else {
    // Default fallback
    isValid = (password === 'admin123');
  }

  if (isValid) {
    const token = jwt.sign({ username: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Update password
app.put('/api/admin/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const data = await readData();
  
  let isValid = false;
  if (data.admin && data.admin.passwordHash) {
    isValid = await bcrypt.compare(currentPassword, data.admin.passwordHash);
  } else {
    isValid = (currentPassword === 'admin123');
  }

  if (!isValid) {
    return res.status(400).json({ error: 'Incorrect current password' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);
  
  if (!data.admin) data.admin = {};
  data.admin.passwordHash = passwordHash;
  
  await writeData(data);
  res.json({ success: true });
});

// Submit enrollment (public)
app.post('/api/enrollments', async (req, res) => {
  const enrollment = {
    id: Date.now().toString(),
    ...req.body,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  const data = await readData();
  if (!data.enrollments) data.enrollments = [];
  data.enrollments.push(enrollment);
  await writeData(data);
  
  res.status(201).json({ success: true });
});

// --- PROTECTED ADMIN ROUTES ---

// Get full data including enrollments
app.get('/api/admin/data', authenticateToken, async (req, res) => {
  res.json(await readData());
});

// Update specific section of data
app.put('/api/admin/data/:section', authenticateToken, async (req, res) => {
  const { section } = req.params;
  const newData = req.body;
  
  const data = await readData();
  data[section] = newData;
  await writeData(data);
  
  res.json({ success: true, section: data[section] });
});

// Update enrollment status
app.patch('/api/admin/enrollments/:id/status', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const data = await readData();
  const enrollmentIndex = data.enrollments?.findIndex((e: any) => e.id === id);
  
  if (enrollmentIndex > -1) {
    data.enrollments[enrollmentIndex].status = status;
    await writeData(data);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Enrollment not found' });
  }
});

// Start server with Vite middleware
export default app;

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Only start the server locally
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer();
}