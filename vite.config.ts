import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@news': path.resolve(__dirname, './src/features/news'),
      '@ui': path.resolve(__dirname, './src/features/ui'),
    },
  },
});
