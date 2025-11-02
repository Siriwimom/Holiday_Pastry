import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/Holiday_Pastry/",
  plugins: [react()],
  server: {
    proxy: {
    '/api': 'https://holiday-backend.onrender.com',
    '/uploads': 'https://holiday-backend.onrender.com'
  },
  },
})
