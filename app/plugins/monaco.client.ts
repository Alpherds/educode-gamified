// plugins/monaco.client.ts
import loader from '@monaco-editor/loader'

export default defineNuxtPlugin(() => {
  if (process.server) return

  // Use CDN to avoid bundling Monaco into dev build
  loader.config({
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs'
    }
  })

  return {
    provide: {
      monacoLoader: loader
    }
  }
})
