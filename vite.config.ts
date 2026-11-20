import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// VITE_BASE permite publicar bajo una subruta (p. ej. GitHub Pages: /respirakids-web/).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
})
