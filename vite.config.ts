import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/slack': {
        target: 'https://slack.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/slack/, '')
      }
    }
  }
});