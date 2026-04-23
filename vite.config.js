import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // El nombre de tu repo debe ir entre barras diagonales / /
  base: '/sensorito-1490/',
})
