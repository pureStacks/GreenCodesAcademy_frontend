import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

// Catch errors on read fallback
code = code.replace(
`  // Fallback
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));`,
`  // Fallback
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    console.warn('Local read fallback failed:', err.message);
    return {};
  }`
);

// Catch errors on write fallback
code = code.replace(
`    if (!error) {
       fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
       return;
    }`,
`    if (!error) {
       try {
         fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
       } catch (err) {
         console.warn('Local write fallback failed (expected on Vercel):', err.message);
       }
       return;
    }`
);

code = code.replace(
`  // Fallback to local
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');`,
`  // Fallback to local
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('Local write fallback failed (expected on Vercel):', err.message);
  }`
);

// Export app for serverless
code = code.replace(
`async function startServer() {`,
`export default app;\n\nasync function startServer() {`
);

code = code.replace(
`startServer();`,
`// Only start the server locally
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer();
}`
);

fs.writeFileSync('server.ts', code);
