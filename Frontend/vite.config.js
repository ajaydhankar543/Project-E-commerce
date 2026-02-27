import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'webdevlopment.studio', // Add your domain here
      '.webdevlopment.studio' // Optional: allows all subdomains too
    ]
  }
  
})
