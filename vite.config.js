import { defineConfig } from 'vite';
import { resolve } from 'path';

function rewriteAdminRoute() {
  return {
    name: 'rewrite-bigadmin-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/bigadmin' || req.url === '/bigadmin/') {
          req.url = '/bigadmin.html';
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/bigadmin' || req.url === '/bigadmin/') {
          req.url = '/bigadmin.html';
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [rewriteAdminRoute()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'bigadmin.html')
      }
    }
  }
});
