// composables/useGame.ts
import { ref } from 'vue'

export function useGame() {
  const nuxtApp = useNuxtApp()
  const $supabase = nuxtApp.$supabase
  const loading = ref(false)
  const lives = ref<number | null>(null)
  const next_in_minutes = ref<number | null>(null)

  async function getAccessToken() {
    const r = await $supabase.auth.getSession()
    // r.data?.session?.access_token may be undefined
    return r.data?.session?.access_token ?? null
  }

  async function fetchLives() {
    loading.value = true
    try {
      const token = await getAccessToken()
      if (!token) throw new Error('Not authenticated')

      // <-- typed $fetch to avoid unknown
      const res = await $fetch<{ lives: number; regenerated: number; next_in_minutes: number }>('/api/lives', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })

      lives.value = res.lives
      next_in_minutes.value = res.next_in_minutes ?? 0
      return res
    } finally {
      loading.value = false
    }
  }

  async function useLife() {
    loading.value = true
    try {
      const token = await getAccessToken()
      if (!token) throw new Error('Not authenticated')

      const res = await $fetch<{ success: boolean; lives: number; used?: boolean; message?: string }>('/api/use-life', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })

      lives.value = res.lives
      return res
    } finally {
      loading.value = false
    }
  }

  async function completeLevel(payload: { level: number; score: number; status: 'completed' | 'failed'; xpEarned?: number }) {
    loading.value = true
    try {
      const token = await getAccessToken()
      if (!token) throw new Error('Not authenticated')
      const res = await $fetch<{ success: boolean }>('/api/complete-level', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      })
      return res
    } finally {
      loading.value = false
    }
  }

  return { loading, lives, next_in_minutes, fetchLives, useLife, completeLevel }
}
