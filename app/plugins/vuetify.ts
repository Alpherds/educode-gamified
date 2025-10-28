// app/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: { mdi }
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          dark: true,
          colors: {
            background: '#0d0d0d',
            surface: '#1a1a1a',
            primary: '#e10600',
            secondary: '#8b5cf6',
            'on-primary': '#ffffff'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
