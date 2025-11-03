<template>
  <v-app class="dashboard-page">
    <!-- Header -->
    <v-app-bar color="transparent" elevate-on-scroll flat>
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logo + Title -->
        <div class="d-flex align-center" style="cursor: pointer" @click="goHome">
          <v-avatar size="40" color="transparent">
            <v-icon color="primary">mdi-code-tags</v-icon>
          </v-avatar>
          <h2 class="ml-2 text-h6 font-weight-bold">
            <span class="text-gradient">EduCode</span> Dashboard
          </h2>
        </div>

        <!-- Desktop Buttons -->
        <div class="d-none d-md-flex align-center">
          <v-btn variant="text" class="mr-2" @click="goLeaderboard">Leaderboard</v-btn>
          <v-btn variant="outlined" color="error" @click="logout">Logout</v-btn>
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
          <h1 class="text-h4 font-weight-bold mb-2">
            Welcome back, {{ userName || 'Explorer' }}!
          </h1>
          <p class="text-subtitle-1 text-muted">Your coding adventure continues 🚀</p>
        </div>

        <!-- Dashboard Cards -->
        <v-row class="g-6">
          <!-- Profile -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="8">
              <div class="d-flex flex-column align-center">
                <v-avatar size="90" class="mb-4" color="primary" variant="tonal">
                  <v-icon size="50">mdi-account</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-1">{{ userName }}</h3>
                <p class="text-caption text-muted mb-4">{{ userEmail }}</p>
                <v-divider class="mb-4"></v-divider>
                <v-btn color="primary" variant="tonal" @click="editProfile">Edit Profile</v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- XP / Level -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="8">
              <div class="d-flex flex-column align-center">
                <v-icon size="40" color="amber-darken-2" class="mb-3">mdi-trophy</v-icon>
                <h3 class="text-h6 font-weight-bold mb-2">Current Level</h3>
                <div class="text-h4 mb-2">{{ level }}</div>
                <v-progress-linear :model-value="xpPercent" color="primary" height="8" class="mb-3" rounded />
                <p class="text-caption text-muted">{{ xp }}/{{ nextLevelXP }} XP</p>
              </div>
            </v-card>
          </v-col>

          <!-- Lives -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="8">
              <div class="d-flex flex-column align-center">
                <v-icon size="40" color="red-accent-3" class="mb-3">mdi-heart</v-icon>
                <h3 class="text-h6 font-weight-bold mb-2">Lives Remaining</h3>
                <div class="text-h4 mb-2">{{ lives }}</div>
                <p class="text-caption text-muted mb-3">Regenerates every 30 mins</p>
                <v-btn color="red-accent-3" variant="tonal" @click="playNow">Play Now</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- 💡 Challenge Mode + IDE -->
        <div class="mt-12">
          <h2 class="text-h5 font-weight-bold mb-4">Challenge Mode 💻</h2>
          <v-card class="glass-card pa-6 rounded-xl" elevation="8">
            <div class="mb-4">
              <h3 class="text-h6 font-weight-bold mb-2">Your Challenge:</h3>
              <p class="text-body-2 mb-4">{{ currentChallenge }}</p>
              <v-btn color="primary" variant="flat" @click="loadChallenge">New Challenge</v-btn>
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
                <v-btn color="primary" variant="flat" @click="runCode" :loading="isRunning">Run Code</v-btn>
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
          <h2 class="text-h5 font-weight-bold mb-4">Code History</h2>
          <v-card class="rounded-xl glass-card" elevation="8">
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

// Mobile drawer
const drawer = ref(false)

// 🧑‍💻 User Data
const userName = ref('')
const userEmail = ref('')
const level = ref(1)
const xp = ref(200)
const nextLevelXP = ref(500)
const xpPercent = computed(() => (xp.value / nextLevelXP.value) * 100)
const lives = ref(5)

// 📜 Code + IDE
const code = ref('print("Hello, EduCode!")')
const language = ref('python')
const output = ref('')
const isRunning = ref(false)
const isSuccess = ref(true)

const languages = ['python', 'cpp', 'java']
const pistonLangMap: Record<string, string> = { python: 'python', cpp: 'cpp', java: 'java' }

// 🧠 Challenges
const challenges = [
  'Write a program that prints the first 10 Fibonacci numbers.',
  'Create a function that checks if a string is a palindrome.',
  'Write a loop that prints all even numbers from 1 to 50.',
  'Given two numbers, find their greatest common divisor (GCD).',
  'Print a pyramid pattern using * in 5 rows.',
]
const currentChallenge = ref<string>(challenges[0] ?? 'No challenge available.')
const loadChallenge = () => {
  if (challenges.length === 0) {
    currentChallenge.value = 'No challenge available.'
    return
  }
  const randomIndex = Math.floor(Math.random() * challenges.length)
  currentChallenge.value = challenges[randomIndex] ?? 'No challenge available.'
}

// 💾 Code History
interface CodeRecord {
  language: string
  timestamp: string
  success: boolean
}
const codeHistory = ref<CodeRecord[]>([])

// ▶️ Run Code
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
    if (result.run && result.run.output) {
      output.value = result.run.output
      isSuccess.value = !result.run.output.toLowerCase().includes('error')
    } else {
      output.value = 'No output received.'
      isSuccess.value = false
    }

    // Save code history
    codeHistory.value.unshift({
      language: language.value,
      timestamp: new Date().toLocaleString(),
      success: isSuccess.value,
    })

    if (isSuccess.value) {
      xp.value += 50
      if (xp.value >= nextLevelXP.value) {
        level.value++
        xp.value = 0
        nextLevelXP.value += 500
      }
    }
  } catch (err: any) {
    output.value = 'Execution failed. Please check your code.'
    isSuccess.value = false
  } finally {
    isRunning.value = false
  }
}

// 🧭 Navigation
const goHome = () => router.push('/')
const goLeaderboard = () => router.push('/leaderboard')
const editProfile = () => router.push('/profile')
const playNow = () => router.push('/game')
const logout = async () => {
  await $supabase.auth.signOut()
  router.push('/login')
}

// 🔑 Auth
onMounted(async () => {
  const { data } = await $supabase.auth.getUser()
  if (data.user) {
    userName.value = data.user.user_metadata?.full_name || 'Anonymous'
    userEmail.value = data.user.email || ''
  } else router.push('/login')
})
</script>

<style scoped>
.dashboard-page {
  background: radial-gradient(circle at top, #1a1a1a, #0d0d0d);
  color: #fff;
  min-height: 100vh;
}
.text-gradient {
  background: linear-gradient(90deg, #e10600, #ff4d4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.glass-card {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.2);
}
.output-container {
  background-color: #0e0e0e;
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

/* Drawer Styling */
.v-navigation-drawer {
  background: rgba(20, 20, 20, 0.95);
  color: white;
  backdrop-filter: blur(10px);
}
.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Responsive Fixes */
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
