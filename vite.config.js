import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // API requests
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Static files and images
      '/static': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Default fallback for images
      '/images': {
        target: 'http://localhost:5000/static/images',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''),
      }
    }
  }
})