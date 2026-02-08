import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
	preview: {
    host: true,
    port: 4173, // یا هر پورتی که استفاده می‌کنی
    allowedHosts: ['admin.greatnovatools.ir'], // دامنه‌ای که میخوای اجازه بدی
  },  
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
