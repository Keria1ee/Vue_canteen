import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath,URL} from 'url';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  port:5173,
  host: '0.0.0.0',
  server: {
    proxy: {
      '/api': {
        target: 'http://192.144.200.148:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')

      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
