<template>
  <v-app class="game-page">
    <v-app-bar color="transparent" elevate-on-scroll flat>
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center" style="cursor:pointer" @click="goDashboard">
          <v-icon color="primary" size="28">mdi-gamepad-variant</v-icon>
          <h2 class="ml-2 text-h6 font-weight-bold">EduCode — Ladder Game</h2>
        </div>
        <div class="d-flex align-center">
          <v-chip class="mr-2" variant="tonal">Level {{ profile?.current_level ?? 1 }}</v-chip>
          <v-chip class="mr-2" variant="tonal">XP {{ profile?.xp ?? 0 }}</v-chip>
          <v-chip variant="tonal">❤️ {{ profile?.hearts ?? 0 }}</v-chip>
          <v-btn color="error" variant="outlined" class="ml-3" @click="logout">Logout</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="py-8">
        <v-row>
          <!-- Left: main play area -->
          <v-col cols="12" md="8">
            <v-card class="pa-6 glass-card rounded-xl" elevation="8">
              <div class="d-flex justify-space-between align-center mb-4">
                <div>
                  <h3 class="text-h6 font-weight-bold mb-1">Level {{ activeLevel?.id }} — {{ activeLevel?.title }}</h3>
                  <p class="text-caption text-muted mb-0">{{ activeLevel?.description }}</p>
                </div>
                <div class="text-right">
                  <div class="text-subtitle-2">⏱ <strong>{{ timeLeft }}s</strong></div>
                  <div class="text-caption text-muted mt-1">Hearts: {{ profile?.hearts ?? 0 }}</div>
                </div>
              </div>

              <v-divider />

              <div class="mt-4">
                <p class="mb-2"><strong>Challenge:</strong> {{ activeLevel?.challenge_prompt || 'Solve the task.' }}</p>

                <!-- Controls -->
                <v-row class="mb-3">
                  <v-col cols="12" sm="4">
                    <v-select v-model="selectedLang" :items="supportedLangs" label="Language" density="comfortable"/>
                  </v-col>
                  <v-col cols="12" sm="8" class="d-flex justify-end">
                    <v-btn :loading="isRunning" color="primary" @click="runCode">Run</v-btn>
                    <v-btn class="ml-2" color="success" @click="submitResult" :loading="isSubmitting">Submit</v-btn>
                    <v-btn class="ml-2" variant="outlined" @click="skipAttempt">Skip</v-btn>
                  </v-col>
                </v-row>

                <!-- Monaco editor -->
                <client-only>
                  <ClientOnlyEditor v-model="code" :language="selectedLang" />
                </client-only>

                <div class="mt-4">
                  <h4 class="text-subtitle-1">Output</h4>
                  <v-card class="pa-3 mt-2" variant="tonal">
                    <pre class="mb-0">{{ output || 'No output yet' }}</pre>
                  </v-card>
                </div>

                <v-alert v-if="feedback" :type="feedbackType" class="mt-4">
                  {{ feedback }}
                </v-alert>
              </div>
            </v-card>

            <v-card class="pa-4 mt-6 glass-card rounded-xl" elevation="6">
              <h4 class="text-h6 mb-3">Progress Ladder</h4>
              <LadderMap :levels="levels" :unlockedLevel="profile?.current_level ?? 1" :currentLevelId="activeLevel?.id ?? profile?.current_level ?? 1" @select="onSelectLevel"/>
            </v-card>
          </v-col>

          <!-- Right: stats and history -->
          <v-col cols="12" md="4">
            <v-card class="pa-4 glass-card rounded-xl sticky-card" elevation="6">
              <h4 class="text-h6">Your Stats</h4>
              <p class="mb-1">XP: <strong>{{ profile?.xp ?? 0 }}</strong></p>
              <p class="mb-1">Hearts: <strong>{{ profile?.hearts ?? 0 }}</strong></p>
              <p class="mb-1">Current Level: <strong>{{ profile?.current_level ?? 1 }}</strong></p>

              <v-divider class="my-3" />

              <h5 class="text-subtitle-2">Recent Attempts</h5>
              <v-list dense>
                <v-list-item v-for="h in recentHistory" :key="h.id">
                  <v-list-item-content>
                    <div class="text-body-2">Lv {{ h.level }} — {{ h.status }}</div>
                    <div class="text-caption text-muted">{{ new Date(h.finished_at).toLocaleString() }}</div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="!recentHistory.length">
                  <v-list-item-content><div class="text-caption">No attempts yet</div></v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import LadderMap from '~/components/LadderMap.vue'
import ClientOnlyEditor from '~/components/ClientOnlyEditor.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase

// state
const profile = ref<any>(null)
const levels = ref<any[]>([])
const activeLevel = ref<any>(null)
const selectedLang = ref('python')
const supportedLangs = ['python', 'cpp', 'java']
const code = ref<string>('')
const output = ref<string>('')
const timeLeft = ref<number>(60)
const timerRef: any = null
let intervalRef: any = null
const isRunning = ref(false)
const isSubmitting = ref(false)
const feedback = ref('')
const feedbackType = ref<'success'|'error'>('success')
const recentHistory = ref<any[]>([])

// helpers: load profile, levels, history
const loadData = async () => {
  const { data: userResult } = await $supabase.auth.getUser()
  const user = userResult.user
  if (!user) return router.push('/login')

  // profile
  const { data: profileData, error: pErr } = await $supabase.from('profiles').select('*').eq('id', user.id).single()
  if (pErr && pErr.code !== 'PGRST116') console.error(pErr) // PGRST116 sometimes for empty single
  profile.value = profileData || { current_level: 1, xp: 0, hearts: 5 }

  // levels
  const { data: levelsData } = await $supabase.from('levels').select('*').order('id',{ascending:true})
  levels.value = levelsData || []

  // active level - use profile.current_level if present
  const lvlId = profile.value?.current_level ?? 1
  activeLevel.value = levels.value.find((l:any) => l.id === lvlId) || levels.value[0] || null

  // set editor starter code
  code.value = activeLevel.value?.starter_code?.[selectedLang.value] ?? defaultStarter(selectedLang.value)

  // recent history
  const { data: hist } = await $supabase.from('game_history').select('*').eq('user_id', user.id).order('finished_at',{ascending:false}).limit(10)
  recentHistory.value = hist || []

  startTimer()
}

// basic starter templates
const defaultStarter = (lang: string) => {
  if (lang === 'python') return `# Write your solution\nprint("Hello EduCode")`
  if (lang === 'cpp') return `#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout << "Hello EduCode"; return 0; }`
  if (lang === 'java') return `public class Main { public static void main(String[] args) { System.out.println("Hello EduCode"); } }`
  return ''
}

// Timer control
const startTimer = () => {
  clearInterval(intervalRef)
  timeLeft.value = 60
  intervalRef = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(intervalRef)
      feedback.value = '⏰ Time up — attempt recorded as failed.'
      feedbackType.value = 'error'
      recordAttempt(false, 'timeout')
      penalizeFailure()
      loadData() // refresh profile/hearts
    }
  }, 1000)
}
const stopTimer = () => { clearInterval(intervalRef) }

// selecting level (from LadderMap)
const onSelectLevel = (id: number) => {
  const unlocked = profile.value?.current_level ?? 1
  if (id > unlocked) {
    feedback.value = '🔒 This level is locked. Complete previous levels to unlock.'
    feedbackType.value = 'error'
    return
  }
  activeLevel.value = levels.value.find((l:any) => l.id === id) || activeLevel.value
  code.value = activeLevel.value?.starter_code?.[selectedLang.value] ?? defaultStarter(selectedLang.value)
  output.value = ''
  feedback.value = ''
  startTimer()
}

// run code via Piston
const runCode = async () => {
  if (!activeLevel.value) return
  isRunning.value = true
  output.value = 'Running...'
  try {
    const resp = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: selectedLang.value,
      version: '*',
      files: [{ name: `Main.${selectedLang.value}`, content: code.value }],
    }, { timeout: 20000 })
    const result = resp.data
    const runOutput = (result.run?.output ?? '') + (result.run?.stderr ?? '')
    output.value = runOutput.trim()
  } catch (e:any) {
    console.error(e)
    output.value = `Execution failed: ${e?.message ?? 'error'}`
  } finally { isRunning.value = false }
}

// submit attempt: check expected_output vs run output
const submitResult = async () => {
  if (!activeLevel.value) return
  isSubmitting.value = true
  stopTimer()
  try {
    if (!output.value || output.value === 'Running...') {
      await runCode()
    }

    const expected = (activeLevel.value?.expected_output ?? '').toString().trim()
    const userOut = (output.value ?? '').toString().trim()
    const success = expected ? (userOut === expected) : (userOut.length > 0)

    await recordAttempt(success, 'code')
    if (success) {
      await awardSuccess()
      feedback.value = '✅ Correct — level completed!'
      feedbackType.value = 'success'
    } else {
      feedback.value = '❌ Incorrect — try again or skip (lose heart).'
      feedbackType.value = 'error'
      await penalizeFailure()
    }
  } catch (err) {
    console.error(err)
    feedback.value = 'Error during submission.'
    feedbackType.value = 'error'
  } finally {
    isSubmitting.value = false
    await loadData()
    startTimer()
  }
}

// record attempt into game_history
const recordAttempt = async (success:boolean, mode:string) => {
  const { data: userResult } = await $supabase.auth.getUser()
  const user = userResult.user
  if (!user) return router.push('/login')

  const rec = {
    user_id: user.id,
    level: activeLevel.value?.id ?? 0,
    score: success ? (activeLevel.value?.xp_reward ?? 100) : 0,
    status: success ? 'completed' : 'failed',
    started_at: new Date().toISOString(),
    finished_at: new Date().toISOString(),
    output: output.value ?? '',
    mode
  }

const { data, error } = await $supabase
  .from('game_history')
  .insert([rec])
  .select(); // ensures data is returned

if (error) {
  console.error('Save error:', error)
} else if (data && data.length > 0) {
  recentHistory.value.unshift(data[0])
  recentHistory.value = recentHistory.value.slice(0, 10)
}
}

// award success: update profiles and leaderboard
const awardSuccess = async () => {
  const { data: userResult } = await $supabase.auth.getUser()
  const user = userResult.user
  if (!user) return router.push('/login')

  const xpAdd = activeLevel.value?.xp_reward ?? 100
  const newXp = (profile.value?.xp ?? 0) + xpAdd
  const nextLevel = Math.max(profile.value?.current_level ?? 1, (activeLevel.value?.id ?? 1) + 1)

  // update profile
  const { error: uErr } = await $supabase.from('profiles').update({
    xp: newXp,
    current_level: nextLevel,
    updated_at: new Date().toISOString()
  }).eq('id', user.id)
  if (uErr) console.error('Profile update error:', uErr)

  // upsert leaderboard (on user_id unique or replace)
  const { error: lbErr } = await $supabase.from('leaderboard').upsert([{
    user_id: user.id,
    score: newXp,
    level: nextLevel
  }], { onConflict: 'user_id' })
  if (lbErr) console.error('Leaderboard upsert error:', lbErr)
}

// penalize failure: decrease hearts
const penalizeFailure = async () => {
  const { data: userResult } = await $supabase.auth.getUser()
  const user = userResult.user
  if (!user) return

  const newHearts = Math.max((profile.value?.hearts ?? 1) - 1, 0)
  const { error } = await $supabase.from('profiles').update({ hearts: newHearts }).eq('id', user.id)
  if (error) console.error('Hearts update:', error)
}

// skip attempt
const skipAttempt = async () => {
  stopTimer()
  feedback.value = 'You skipped the attempt (heart lost).'
  feedbackType.value = 'error'
  await recordAttempt(false, 'skipped')
  await penalizeFailure()
  await loadData()
  startTimer()
}

// reset editor
const resetEditor = () => {
  code.value = activeLevel.value?.starter_code?.[selectedLang.value] ?? defaultStarter(selectedLang.value)
  output.value = ''
  feedback.value = ''
}

// navigation
const goDashboard = () => router.push('/dashboard')
const logout = async () => {
  await $supabase.auth.signOut()
  router.push('/login')
}

onMounted(async () => { await loadData() })

// reload starter code if lang or activeLevel changes
watch(selectedLang, () => { code.value = activeLevel.value?.starter_code?.[selectedLang.value] ?? defaultStarter(selectedLang.value) })
watch(() => activeLevel.value?.id, () => { code.value = activeLevel.value?.starter_code?.[selectedLang.value] ?? defaultStarter(selectedLang.value); output.value=''; feedback.value=''; startTimer() })
</script>

<style scoped>
.game-page {
  background: radial-gradient(circle at top left, #0b0b0b, #0d0d0d);
  color: #fff;
  min-height: 100vh;
}
.glass-card {
  backdrop-filter: blur(12px);
  background-color: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
}
.sticky-card { position: sticky; top: 84px; }
pre { white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace; color:#dfffe0; }
</style>
