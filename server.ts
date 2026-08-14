import express from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey123';
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

// Helper to write data
const writeData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
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
app.get('/api/data', (req, res) => {
  const data = readData();
  // Strip out enrollments for public data
  const { enrollments, ...publicData } = data;
  res.json(publicData);
});

// Admin login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Default demo password validation (in a real app, check against DB)
  if (password === 'your_password' || password === 'admin123') {
    const token = jwt.sign({ username: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Submit enrollment (public)
app.post('/api/enrollments', (req, res) => {
  const enrollment = {
    id: Date.now().toString(),
    ...req.body,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  
  const data = readData();
  if (!data.enrollments) data.enrollments = [];
  data.enrollments.push(enrollment);
  writeData(data);
  
  res.status(201).json({ success: true });
});

// --- PROTECTED ADMIN ROUTES ---

// Get full data including enrollments
app.get('/api/admin/data', authenticateToken, (req, res) => {
  res.json(readData());
});

// Update specific section of data
app.put('/api/admin/data/:section', authenticateToken, (req, res) => {
  const { section } = req.params;
  const newData = req.body;
  
  const data = readData();
  data[section] = newData;
  writeData(data);
  
  res.json({ success: true, section: data[section] });
});

// Update enrollment status
app.patch('/api/admin/enrollments/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const data = readData();
  const enrollmentIndex = data.enrollments?.findIndex((e: any) => e.id === id);
  
  if (enrollmentIndex > -1) {
    data.enrollments[enrollmentIndex].status = status;
    writeData(data);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Enrollment not found' });
  }
});

// Start server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
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

startServer();