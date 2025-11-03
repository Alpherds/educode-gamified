// /composables/useAuth.ts
import { ref, onMounted } from 'vue'
import type { SupabaseClient, Session, User } from '@supabase/supabase-js'

export function useAuth() {
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase as SupabaseClient

  const user = ref<User | null>(null)
  const loading = ref(true)

  onMounted(async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data?.session?.user ?? null
    loading.value = false

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  })

  return { user, loading }
}
