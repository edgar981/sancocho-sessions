import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the initial payload light for 4G. three.js is loaded on demand
    // (see AperolGlass.jsx), so it lands in its own chunk after first paint.
    target: 'es2019',
  },
});
