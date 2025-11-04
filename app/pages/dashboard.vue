<template>
  <v-app class="dashboard-page">
    <!-- Header -->
    <v-app-bar color="transparent" elevate-on-scroll flat>
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logo + Title -->
        <div class="d-flex align-center" style="cursor: pointer" @click="goHome">
          <v-avatar size="40" color="transparent">
            <v-icon color="orange">mdi-code-tags</v-icon>
          </v-avatar>
          <h2 class="ml-2 text-h6 font-weight-bold text-gradient">
            EduCode Dashboard
          </h2>
        </div>

        <!-- Desktop Buttons -->
        <div class="d-none d-md-flex align-center">
          <v-btn class="gradient-btn mr-2" @click="goLeaderboard">
            <v-icon left size="18">mdi-trophy</v-icon> Leaderboard
          </v-btn>
          <v-btn class="gradient-outline-btn" @click="logout">
            <v-icon left size="18">mdi-logout</v-icon> Logout
          </v-btn>
        </div>

        <!-- Mobile Hamburger -->
        <div class="d-flex d-md-none">
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary right>
      <v-list nav dense>
        <v-list-item @click="goLeaderboard">
          <v-list-item-icon><v-icon>mdi-trophy</v-icon></v-list-item-icon>
          <v-list-item-title>Leaderboard</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-icon><v-icon color="error">mdi-logout</v-icon></v-list-item-icon>
          <v-list-item-title class="text-error">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Dashboard -->
    <v-main>
      <v-container class="py-10">
        <!-- Welcome -->
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold mb-2 text-gradient">
            Welcome back, {{ userName || 'Explorer' }}!
          </h1>
          <p class="text-subtitle-1 text-muted">Your coding adventure continues 🚀</p>
        </div>

        <!-- Dashboard Cards -->
        <v-row class="g-6">
          <!-- Profile -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="10">
              <div class="d-flex flex-column align-center">
                <v-avatar size="90" class="mb-4 gradient-avatar">
                  <v-icon size="50">mdi-account</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-1">{{ userName }}</h3>
                <p class="text-caption text-muted mb-4">{{ userEmail }}</p>
                <v-divider class="mb-4"></v-divider>
                <v-btn class="gradient-btn" @click="editProfile">Edit Profile</v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- XP / Level -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="10">
              <div class="d-flex flex-column align-center">
                <v-icon size="40" color="amber-darken-2" class="mb-3">mdi-trophy</v-icon>
                <h3 class="text-h6 font-weight-bold mb-2">Current Level</h3>
                <div class="text-h4 mb-2">{{ level }}</div>
                <v-progress-linear :model-value="xpPercent" color="orange" height="8" class="mb-3" rounded />
                <p class="text-caption text-muted">{{ xp }}/{{ nextLevelXP }} XP</p>
              </div>
            </v-card>
          </v-col>

          <!-- Lives -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="10">
              <div class="d-flex flex-column align-center">
                <v-icon size="40" color="red-accent-3" class="mb-3">mdi-heart</v-icon>
                <h3 class="text-h6 font-weight-bold mb-2">Lives Remaining</h3>
                <div class="text-h4 mb-2">{{ lives }}</div>
                <p class="text-caption text-muted mb-3">Regenerates every 30 mins</p>
                <v-btn class="gradient-btn" @click="playNow">Play Now</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- 💡 Challenge Mode + IDE -->
        <div class="mt-12">
          <h2 class="text-h5 font-weight-bold mb-4 text-gradient">Challenge Mode 💻</h2>
          <v-card class="glass-card pa-6 rounded-xl" elevation="10">
            <div class="mb-4">
              <h3 class="text-h6 font-weight-bold mb-2">Your Challenge:</h3>
              <p class="text-body-2 mb-4">{{ currentChallenge }}</p>
              <v-btn class="gradient-btn" @click="loadChallenge">New Challenge</v-btn>
            </div>

            <v-row align="center" class="mb-4">
              <v-col cols="12" sm="4" md="3">
                <v-select
                  v-model="language"
                  :items="languages"
                  label="Language"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="8" md="9" class="text-right">
                <v-btn class="gradient-btn" @click="runCode" :loading="isRunning">Run Code</v-btn>
              </v-col>
            </v-row>

            <!-- IDE -->
            <client-only>
              <ClientOnlyEditor v-model="code" :language="language" />
            </client-only>

            <!-- Output -->
            <div class="mt-6 pa-4 rounded text-sm font-mono overflow-auto output-container" style="min-height: 140px">
              <strong>Output:</strong>
              <pre :class="{'text-success': isSuccess, 'text-error': !isSuccess}">
{{ output || 'Type some code and click Run' }}
              </pre>
            </div>
          </v-card>
        </div>

        <!-- 📜 Code History -->
        <div class="mt-12">
          <h2 class="text-h5 font-weight-bold mb-4 text-gradient">Code History</h2>
          <v-card class="rounded-xl glass-card" elevation="10">
            <v-table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in codeHistory" :key="i">
                  <td>{{ item.language }}</td>
                  <td>{{ item.timestamp }}</td>
                  <td>
                    <v-chip :color="item.success ? 'green' : 'red'" size="small" label>
                      {{ item.success ? 'Success' : 'Error' }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ClientOnlyEditor from '~/components/ClientOnlyEditor.vue'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase

const drawer = ref(false)
const userName = ref('')
const userEmail = ref('')
const level = ref(1)
const xp = ref(200)
const nextLevelXP = ref(500)
const xpPercent = computed(() => (xp.value / nextLevelXP.value) * 100)
const lives = ref(5)
const code = ref('print("Hello, EduCode!")')
const language = ref('python')
const output = ref('')
const isRunning = ref(false)
const isSuccess = ref(true)

const languages = ['python', 'cpp', 'java']
const pistonLangMap: Record<string, string> = { python: 'python', cpp: 'cpp', java: 'java' }

const challenges = [
  'Write a program that prints the first 10 Fibonacci numbers.',
  'Create a function that checks if a string is a palindrome.',
  'Write a loop that prints all even numbers from 1 to 50.',
  'Given two numbers, find their greatest common divisor (GCD).',
  'Print a pyramid pattern using * in 5 rows.',
]
const currentChallenge = ref(challenges[0])
const loadChallenge = () => {
  const randomIndex = Math.floor(Math.random() * challenges.length)
  currentChallenge.value = challenges[randomIndex]
}

interface CodeRecord {
  language: string
  timestamp: string
  success: boolean
}
const codeHistory = ref<CodeRecord[]>([])

const runCode = async () => {
  isRunning.value = true
  output.value = 'Running code...'
  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: pistonLangMap[language.value],
      version: '*',
      files: [{ name: `main.${language.value}`, content: code.value }],
    })
    const result = response.data
    output.value = result.run?.output || 'No output received.'
    isSuccess.value = !output.value.toLowerCase().includes('error')
    codeHistory.value.unshift({
      language: language.value,
      timestamp: new Date().toLocaleString(),
      success: isSuccess.value,
    })
  } catch {
    output.value = 'Execution failed. Please check your code.'
    isSuccess.value = false
  } finally {
    isRunning.value = false
  }
}

const goHome = () => router.push('/')
const goLeaderboard = () => router.push('/leaderboard')
const editProfile = () => router.push('/profile')
const playNow = () => router.push('/game')
const logout = async () => {
  await $supabase.auth.signOut()
  router.push('/login')
}

onMounted(async () => {
  const { data } = await $supabase.auth.getUser()
  if (data.user) {
    userName.value = data.user.user_metadata?.full_name || 'Anonymous'
    userEmail.value = data.user.email || ''
  } else router.push('/login')
})
</script>

<style scoped>
/* Reset Vuetify default */
.v-application,
.v-application--wrap,
.v-main,
.v-main__wrap {
  background: none !important;
}

/* --- 🌌 Glowing Animated Background --- */
.dashboard-page {
  position: relative;
  min-height: 100vh;
  color: #fff;
  font-family: 'Inter', sans-serif;
  /* overflow hidden removed to allow scroll */
}

.dashboard-page::before {
  content: "";
  position: fixed; /* fixed so background doesn't scroll */
  inset: 0;
  background: radial-gradient(circle at 20% 30%, #ff6a00, transparent 40%),
              radial-gradient(circle at 80% 70%, #ffb700, transparent 50%),
              radial-gradient(circle at 50% 100%, #ff9100, transparent 40%);
  filter: blur(120px);
  opacity: 0.4;
  animation: glowMove 15s infinite alternate ease-in-out;
  z-index: 0;
}

@keyframes glowMove {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.05); }
  100% { transform: translateY(10px) scale(1); }
}

/* Keep content above glow */
.v-main,
.v-container,
.v-app-bar,
.v-navigation-drawer,
.glass-card {
  position: relative;
  z-index: 1;
}

/* Make main content scrollable */
.v-main {
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

/* --- Navbar/Header --- */
.v-app-bar {
  background: rgba(20, 18, 26, 0.6) !important;
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* --- Text Gradient --- */
.text-gradient {
  background: linear-gradient(90deg, #ff6a00, #ffb700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- Buttons --- */
.gradient-btn {
  background: linear-gradient(90deg, #ff6a00, #ffb700);
  color: #fff !important;
  font-weight: 600;
  border-radius: 10px;
  text-transform: none;
  box-shadow: 0 0 20px rgba(255, 150, 0, 0.3);
  transition: 0.3s ease;
}
.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 35px rgba(255, 150, 0, 0.5);
}

.gradient-outline-btn {
  border: 2px solid #ff6a00 !important;
  color: #ffb700 !important;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.3s ease;
}
.gradient-outline-btn:hover {
  background: linear-gradient(90deg, #ff6a00, #ffb700);
  color: #fff !important;
  box-shadow: 0 0 25px rgba(255, 150, 0, 0.4);
}

/* --- Avatar --- */
.gradient-avatar {
  background: linear-gradient(135deg, #ff6a00, #ffb700);
  color: white;
}

/* --- Cards --- */
.glass-card {
  background: rgba(20, 18, 26, 0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 25px rgba(255, 150, 0, 0.25);
  border-radius: 16px;
  transition: 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(255, 150, 0, 0.45);
}

/* --- Output Console --- */
.output-container {
  background-color: rgba(14, 14, 14, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  white-space: pre-wrap;
}
.text-success {
  color: #00ff88;
}
.text-error {
  color: #ff5c5c;
}

/* --- Drawer --- */
.v-navigation-drawer {
  background: rgba(20, 18, 26, 0.9);
  backdrop-filter: blur(12px);
  color: white;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}
.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* --- Responsive Tweaks --- */
@media (max-width: 960px) {
  .v-app-bar h2 {
    font-size: 1rem;
  }
  .glass-card {
    padding: 1.5rem !important;
  }
  .text-h4 {
    font-size: 1.4rem !important;
  }
  .text-h5 {
    font-size: 1.2rem !important;
  }
}
</style>




