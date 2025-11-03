// plugins/monaco.client.ts
import MonacoEditor from 'monaco-editor-vue3'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('MonacoEditor', MonacoEditor)
})
