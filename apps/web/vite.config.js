import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Frontend aur API dono repo root ki ek hi local .env file read karte hain.
  envDir: '../..',
  server: { port: 5173 },
});
