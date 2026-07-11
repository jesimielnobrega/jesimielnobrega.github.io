import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
// base: './' → funciona em GitHub Pages (subpath), Vercel e Netlify sem alterações.
export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
  ],
});
