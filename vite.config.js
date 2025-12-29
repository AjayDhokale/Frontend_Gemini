import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server:{
    proxy: {
      // '/api' : 'https://backend-gemini-sepia.vercel.app',
      '/api' : 'http://localhost:4000'
    }
  },
  plugins: [
    react(),
    tailwindcss()],
})
