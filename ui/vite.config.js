import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      '/api': {
        target: 'http://api:5000',
        changeOrigin: true,//used to send messgae that the request is comming from port 5000 range 
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
