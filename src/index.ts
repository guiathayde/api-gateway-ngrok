import 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import ngrok from '@ngrok/ngrok';

import { services } from './services';

const app = express();
const port = process.env.PORT || 8443;

// =========================
// Proxy configuration
// =========================

for (const service of services) {
  app.use(
    service.path,
    createProxyMiddleware({
      target: `http://${
        process.env.MODE === 'development'
          ? 'localhost'
          : 'host.docker.internal'
      }:${service.port}`,
      changeOrigin: true,
      pathRewrite: (path) => service.path + path,
      logger: process.env.MODE === 'dev' ? console : undefined,
    })
  );
}

// =========================
// Start the server
// =========================

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

ngrok
  .connect({ addr: port, authtoken: process.env.NGROK_AUTHTOKEN })
  .then((listener) =>
    console.log(`✈️ Ingress established at: ${listener.url()}`)
  )
  .catch((error) =>
    console.error(`❌ Error establishing ingress: ${error.message}`)
  );
