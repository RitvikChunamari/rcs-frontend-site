import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/rcs-frontend-site/',
  build: { rollupOptions: { input: { main: resolve('index.html'), threadline: resolve('comparison/after/index.html') } } },
})
