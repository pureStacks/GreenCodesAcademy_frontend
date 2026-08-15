import app from '../server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  // Vercel serverless functions inside /api sometimes strip the /api prefix from req.url
  // Since our Express app routes are strictly defined as /api/*, we must restore it.
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url === '/' ? '' : req.url);
  }
  
  return app(req, res);
}
