import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace("import { createServer as createViteServer } from 'vite';", "");
code = code.replace(
`    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });`,
`    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });`
);
fs.writeFileSync('server.ts', code);
