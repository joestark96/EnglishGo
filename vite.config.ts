import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@ionic/react', '@ionic/react-router', 'ionicons'],
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/tts': {
        target: 'https://ottsy.weilbyte.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tts/, '/api/generation'),
      },
    },
  },
});
