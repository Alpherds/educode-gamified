import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    fileURLToPath(new URL('./app/assets/css/main.css', import.meta.url))
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: { 'process.env.DEBUG': false }
  },
  app: {
    head: {
      title: 'EduCode – Learn. Code. Level Up.',
      meta: [
        { name: 'description', content: 'EduCode — interactive learning IDE with gamification' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
