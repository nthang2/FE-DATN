import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
  },
  optimizeDeps: {
    exclude: [],
  },
  define: {
    process: {
      env: {},
    },
  },
});
