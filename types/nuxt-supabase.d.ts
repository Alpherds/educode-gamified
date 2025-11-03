// types/nuxt-supabase.d.ts
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Minimal global typing so `useNuxtApp().$supabase` and `this.$supabase`
 * are available in components and composables without import path issues.
 *
 * If you want stricter typed DB tables later, we can extend this with a Database interface.
 */

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient
  }
}

export {}