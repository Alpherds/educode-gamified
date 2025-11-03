// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp()
  const $supabase = nuxtApp.$supabase

  const { data } = await $supabase.auth.getSession()
  if (!data.session && to.path.startsWith('/dashboard')) {
    return navigateTo('/login')
  }
})
