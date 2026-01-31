// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "/",
//   server: {
//     proxy: {
//       "/api": "http://localhost:4000",
//     },
//     headers: {
//       "Cache-Control": "no-store",
//       "Service-Worker-Allowed": "/",
//     },
//     host: true,
//     port: 5173,
//   },
//   define: {
//     "process.env": process.env,
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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