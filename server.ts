import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createProxyMiddleware } from 'http-proxy-middleware';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy requests to the platform proxy if it's running
  app.use('/api-proxy', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    onError: (err, req, res) => {
      console.warn('Proxy error (this is normal in dev environment if proxy is not running):', err.message);
      res.status(502).send('Proxy not available');
    }
  }));

  // Serve environment variables to the frontend
  app.get("/env.js", (req, res) => {
    res.type("application/javascript");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.send(`window.__GEMINI_API_KEY__ = "${process.env.GEMINI_API_KEY || process.env.API_KEY || ''}";`);
  });

  // API routes FIRST
  app.get("/api/config", (req, res) => {
    console.log("Received request for /api/config");
    console.log("GEMINI_API_KEY length:", process.env.GEMINI_API_KEY?.length || 0);
    console.log("API_KEY length:", process.env.API_KEY?.length || 0);
    res.json({ 
      geminiApiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || ""
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
