import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt','imageninicio.jpg'],
      manifest: {
        name: 'Proyecto Becas',
        short_name: 'Becas',
        description: 'Aplicación PWA de Becas',
        theme_color: '#42b883',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          
        ]
      }
    })
  ]
})
