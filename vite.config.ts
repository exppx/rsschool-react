import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pokemons': path.resolve(__dirname, './src/features/pokemons'),
      '@ui': path.resolve(__dirname, './src/features/ui'),
    },
  },
});
