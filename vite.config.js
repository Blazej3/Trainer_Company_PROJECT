import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Trainer_Company_PROJECT/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
