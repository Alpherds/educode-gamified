<template>
  <v-app class="dashboard-page">
    <!-- Header / Navigation Bar -->
    <v-app-bar color="transparent" elevate-on-scroll flat>
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-avatar size="40" color="transparent">
            <v-icon color="primary">mdi-code-tags</v-icon>
          </v-avatar>
          <h2 class="ml-2 text-h6 font-weight-bold">
            <span class="text-gradient">EduCode</span> Dashboard
          </h2>
        </div>
        <div class="d-flex align-center">
          <v-btn variant="text" class="mr-2" @click="goHome">Home</v-btn>
          <v-btn variant="text" class="mr-2" @click="goLeaderboard">Leaderboard</v-btn>
          <v-btn variant="outlined" color="error" @click="logout">Logout</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Dashboard -->
    <v-main>
      <v-container class="py-10">
        <div class="text-center mb-8">
          <h1 class="text-h4 font-weight-bold mb-2">Welcome back, {{ userName || 'Explorer' }}!</h1>
          <p class="text-subtitle-1 text-muted">Your coding adventure continues 🚀</p>
        </div>

        <!-- Dashboard Grid -->
        <v-row class="g-6">
          <!-- Profile Card -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="8">
              <div class="d-flex flex-column align-center">
                <v-avatar size="90" class="mb-4" color="primary" variant="tonal">
                  <v-icon size="50">mdi-account</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-1">{{ userName }}</h3>
                <p class="text-caption text-muted mb-4">{{ userEmail }}</p>
                <v-divider class="mb-4"></v-divider>
                <v-btn color="primary" variant="tonal" @click="editProfile">
                  Edit Profile
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- Stats Card -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="8">
              <div class="d-flex flex-column align-center">
                <v-icon size="40" color="amber-darken-2" class="mb-3">mdi-trophy</v-icon>
                <h3 class="text-h6 font-weight-bold mb-2">Current Level</h3>
                <div class="text-h4 mb-2">{{ level }}</div>
                <v-progress-linear
                  :model-value="xpPercent"
                  color="primary"
                  height="8"
                  class="mb-3"
                  rounded
                />
                <p class="text-caption text-muted">{{ xp }}/{{ nextLevelXP }} XP</p>
              </div>
            </v-card>
          </v-col>

          <!-- Lives Card -->
          <v-col cols="12" md="4">
            <v-card class="pa-5 rounded-xl glass-card" elevation="8">
              <div class="d-flex flex-column align-center">
                <v-icon size="40" color="red-accent-3" class="mb-3">mdi-heart</v-icon>
                <h3 class="text-h6 font-weight-bold mb-2">Lives Remaining</h3>
                <div class="text-h4 mb-2">{{ lives }}</div>
                <p class="text-caption text-muted mb-3">Regenerates every 30 mins</p>
                <v-btn color="red-accent-3" variant="tonal" @click="playNow">
                  Play Now
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Recent History -->
        <div class="mt-12">
          <h2 class="text-h5 font-weight-bold mb-4">Recent Activity</h2>
          <v-card class="rounded-xl glass-card" elevation="8">
            <v-table>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in history" :key="i">
                  <td>{{ item.level }}</td>
                  <td>
                    <v-chip :color="item.status === 'completed' ? 'green' : 'red'" size="small" label>
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>{{ item.score }}</td>
                  <td>{{ item.date }}</td>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase

// State
const userName = ref('')
const userEmail = ref('')
const level = ref(1)
const xp = ref(200)
const nextLevelXP = ref(500)
const xpPercent = computed(() => (xp.value / nextLevelXP.value) * 100)
const lives = ref(5)
const history = ref([
  { level: 1, status: 'completed', score: 95, date: '2025-11-03' },
  { level: 2, status: 'failed', score: 60, date: '2025-11-04' },
])

// Fetch Supabase user
onMounted(async () => {
  const { data, error } = await $supabase.auth.getUser()
  if (data.user) {
    userName.value = data.user.user_metadata?.full_name || 'Anonymous'
    userEmail.value = data.user.email || ''
  } else {
    router.push('/login')
  }
})

// Navigation
const goHome = () => router.push('/')
const goLeaderboard = () => router.push('/leaderboard')
const playNow = () => router.push('/game')
const editProfile = () => router.push('/profile')

const logout = async () => {
  await $supabase.auth.signOut()
  router.push('/login')
}
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
</style>
