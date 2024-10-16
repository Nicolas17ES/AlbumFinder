import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Required for Railway or other cloud providers
    port: Number(process.env.PORT) || 5173, // Use the PORT environment variable or fallback to 5173
  },
});
