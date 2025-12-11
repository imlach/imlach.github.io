import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        film: resolve(__dirname, 'film.html'),
        live: resolve(__dirname, 'live.html'),
      }
    }
  },
  server: {
    open: true,
    port: 3000
  }
})
