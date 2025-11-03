// server/api/check-env.get.ts (temporary)
export default defineEventHandler(() => {
  return {
    SUPABASE_URL: process.env.SUPABASE_URL ? 'present' : 'missing',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'present' : 'missing',
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY ? 'present' : 'missing'
  }
})
