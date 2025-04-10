import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 this makes it accessible from outside the container (0.0.0.0)
    port: 3000  // optional, just to be explicit
  }
})
