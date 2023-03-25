import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'src',
  build: {
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      input: "index.html",
      main: "./src/main.jsx",
      styles: "./src/css/main.css",
    },
  },
});
