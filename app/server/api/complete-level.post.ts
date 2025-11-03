// server/api/complete-level.post.ts
import { getAdminSupabase } from '../utils/supabaseAdmin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { level, score, status, xpEarned } = body
  if (typeof level !== 'number' || typeof score !== 'number' || !status) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }

  const authHeader = event.node.req.headers.authorization || ''
  if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const token = authHeader.replace('Bearer ', '')

  const supabaseAdmin = getAdminSupabase()
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token)
  if (userErr || !userData?.user) throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  const uid = userData.user.id

  // insert into game_history
  const { error: histErr } = await supabaseAdmin.from('game_history').insert({
    user_id: uid,
    level,
    score,
    status,
    started_at: body.started_at ?? new Date().toISOString(),
    finished_at: new Date().toISOString()
  })
  if (histErr) throw createError({ statusCode: 500, statusMessage: histErr.message })

  // add to leaderboard
  const { error: lbErr } = await supabaseAdmin.from('leaderboard').insert({
    user_id: uid,
    score,
    level
  })
  if (lbErr) throw createError({ statusCode: 500, statusMessage: lbErr.message })

  // increment xp via RPC
  const xp = typeof xpEarned === 'number' ? xpEarned : 0
  const { error: xpErr } = await supabaseAdmin.rpc('increment_user_xp', { p_user_id: uid, p_xp: xp })
  if (xpErr) throw createError({ statusCode: 500, statusMessage: xpErr.message })

  return { success: true }
})
