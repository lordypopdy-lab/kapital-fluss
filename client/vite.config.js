import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/ws': {
        target: "wss://bitclub-websocket.onrender.com",
        ws: true,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  base: '/', 
})
