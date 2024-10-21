import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import axios from 'axios'; // Caso você precise configurar algo relacionado ao axios

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL do backend onde o Spring está rodando
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o "/api" antes de enviar ao backend
      },
    },
  },
});
