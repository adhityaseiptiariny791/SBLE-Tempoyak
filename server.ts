import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cloud Run injects PORT (e.g. 8080). In dev container with NGINX proxy, use DEFAULT_APP_PORT (3000).
const isDevContainer = Boolean(process.env.NGINX_PORT && process.env.PORT === process.env.NGINX_PORT);
const PORT = Number(isDevContainer ? (process.env.DEFAULT_APP_PORT || 3000) : (process.env.PORT || 3000));

// Serve static assets from Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Cloud Run
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

// SPA fallback: route all other requests to index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Smart Bio-Learning Environment (SBLE) server listening on 0.0.0.0:${PORT}`);
});
