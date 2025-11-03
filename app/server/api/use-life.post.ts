// server/api/use-life.post.ts
import { getAdminSupabase } from '../utils/supabaseAdmin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) // expects nothing, token used for auth
  const authHeader = event.node.req.headers.authorization || ''
  if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const token = authHeader.replace('Bearer ', '')

  const supabaseAdmin = getAdminSupabase()
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  const uid = userData.user.id

  // Fetch current lives row
  const { data, error } = await supabaseAdmin
    .from('user_lives')
    .select('*')
    .eq('user_id', uid)
    .single()

  if (error && error.code !== 'PGRST116') throw createError({ statusCode: 500, statusMessage: error.message })

  // If missing, create default
  if (!data) {
    const { error: insErr } = await supabaseAdmin.from('user_lives').insert({
      user_id: uid,
      lives: 5,
      last_regenerated_at: new Date().toISOString()
    })
    if (insErr) throw createError({ statusCode: 500, statusMessage: insErr.message })
    return { success: true, lives: 5, used: false, message: 'Initialized lives' }
  }

  // lazy regenerate first (same logic as GET)
  const now = new Date()
  const last = new Date(data.last_regenerated_at)
  const diffMinutes = Math.floor((now.getTime() - last.getTime()) / 60000)
  const increments = Math.floor(diffMinutes / 30)
  let lives = data.lives
  let newLast = data.last_regenerated_at
  if (increments > 0 && lives < 5) {
    const add = Math.min(5 - lives, increments)
    lives = Math.min(5, lives + add)
    newLast = new Date(last.getTime() + increments * 30 * 60000).toISOString()
  }

  if (lives <= 0) {
    return { success: false, lives, used: false, message: 'No lives available' }
  }

  // Now decrement 1 life atomically using a small transaction
  // Supabase SQL: update ... where lives > 0, then check rowcount
  const { data: updData, error: updErr } = await supabaseAdmin.rpc('use_one_life', { p_user_id: uid })
  if (updErr) throw createError({ statusCode: 500, statusMessage: updErr.message })

  // retreive updated lives
  const { data: latest } = await supabaseAdmin.from('user_lives').select('*').eq('user_id', uid).single()
  return { success: true, used: true, lives: latest.lives }
})
