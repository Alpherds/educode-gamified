// server/api/lives.get.ts
import { getRequestHeader } from 'h3'
import { getAdminSupabase } from '../utils/supabaseAdmin' // adjust path if needed

export default defineEventHandler(async (event) => {
  // require Authorization header from client (via supabase auth helper or cookie)
  const authHeader = event.node.req.headers.authorization || ''
  if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  // We will use admin client to read user's lives safely
  const supabaseAdmin = getAdminSupabase()

  // read user from auth header (JWT) using supabase auth admin endpoint
  // simpler: extract user id on client and pass in body? safer: verify token
  // We'll try to decode the JWT via supabase admin auth API:
  const token = authHeader.replace('Bearer ', '')
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  const uid = userData.user.id

  // get user_lives row
  const { data, error } = await supabaseAdmin
    .from('user_lives')
    .select('*')
    .eq('user_id', uid)
    .single()

  if (error && error.code !== 'PGRST116') throw createError({ statusCode: 500, statusMessage: error.message })

  // if no row, create default
  if (!data) {
    const { data: insert, error: insErr } = await supabaseAdmin
      .from('user_lives')
      .insert({ user_id: uid, lives: 5, last_regenerated_at: new Date().toISOString() })
    if (insErr) throw createError({ statusCode: 500, statusMessage: insErr.message })
    return { lives: 5, regenerated: 0 }
  }

  // compute lazy regeneration
  const now = new Date()
  const last = new Date(data.last_regenerated_at)
  const diffMinutes = Math.floor((now.getTime() - last.getTime()) / 60000)
  const increments = Math.floor(diffMinutes / 30)
  let lives = data.lives
  let regenerated = 0
  let newLast = data.last_regenerated_at

  if (increments > 0 && lives < 5) {
    const add = Math.min(5 - lives, increments)
    lives = Math.min(5, lives + add)
    regenerated = add
    // update last_regenerated_at forward by number of increments applied
    newLast = new Date(last.getTime() + increments * 30 * 60000).toISOString()
    // persist updated lives and last_regenerated_at
    const { error: updErr } = await supabaseAdmin
      .from('user_lives')
      .update({ lives, last_regenerated_at: newLast })
      .eq('user_id', uid)
    if (updErr) throw createError({ statusCode: 500, statusMessage: updErr.message })
  }

  // compute next regen time (minutes left)
  let minutesToNext = 0
  if (lives >= 5) minutesToNext = 0
  else {
    const next = new Date(new Date(newLast).getTime() + 30 * 60000)
    minutesToNext = Math.max(0, Math.ceil((next.getTime() - now.getTime()) / 60000))
  }

  return { lives, regenerated, next_in_minutes: minutesToNext }
})
