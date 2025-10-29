<template>
  <v-app class="dashboard-page">
    <!-- Background Glow -->
    <div class="glow-bg">
      <div class="glow-ball red"></div>
      <div class="glow-ball purple"></div>
    </div>

    <!-- Top Navbar -->
    <v-app-bar flat color="transparent" class="px-4 d-flex align-center justify-space-between">
      <div class="d-flex align-center gap-2">
        <v-icon color="primary" size="28">mdi-code-tags</v-icon>
        <h2 class="font-weight-bold text-gradient cursor-pointer" @click="goHome">EduCode</h2>
      </div>

      <div class="d-flex align-center gap-3">
        <div class="xp-bar">
          <v-progress-linear
            :model-value="xpPercent"
            color="purple"
            height="10"
            rounded
          ></v-progress-linear>
          <small class="text-muted">{{ userXP }} XP</small>
        </div>

        <div class="hearts">
          <v-icon v-for="n in hearts" :key="n" color="red">mdi-heart</v-icon>
        </div>

        <v-avatar size="40" class="cursor-pointer" color="purple" @click="goProfile">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </div>
    </v-app-bar>

    <!-- Main Dashboard Content -->
    <v-container class="mt-10 mb-8">
      <v-row>
        <!-- LEFT: Progress -->
        <v-col cols="12" md="3">
          <v-card class="dashboard-card">
            <h3 class="mb-2">Your Progress</h3>
            <p>Level {{ userLevel }}</p>
            <v-progress-circular
              :model-value="xpPercent"
              size="100"
              width="10"
              color="purple"
              class="my-3"
            >
              <span>{{ userLevel }}</span>
            </v-progress-circular>
            <v-divider class="my-3"></v-divider>
            <h4>Badges</h4>
            <div class="badge-list">
              <v-chip color="amber" class="mr-1 mb-1">🥉 Rookie</v-chip>
              <v-chip color="blue" class="mr-1 mb-1">🥈 Syntax Explorer</v-chip>
              <v-chip color="purple" class="mr-1 mb-1">🥇 Logic Master</v-chip>
            </div>
          </v-card>
        </v-col>

        <!-- CENTER: Continue Learning -->
        <v-col cols="12" md="6">
          <v-card class="dashboard-card text-center">
            <h2 class="font-weight-bold mb-2">Welcome back, {{ username }} 👋</h2>
            <p class="text-muted mb-5">
              Keep up the great work! You’re only {{ 200 - (userXP % 200) }} XP away from your next badge.
            </p>
            <v-btn
              size="large"
              class="gradient-btn mb-3"
              @click="startChallenge"
            >
              🚀 Continue Learning
            </v-btn>
            <v-btn
              variant="outlined"
              color="white"
              @click="openIDE"
            >
              Open IDE
            </v-btn>
          </v-card>
        </v-col>

        <!-- RIGHT: Leaderboard -->
        <v-col cols="12" md="3">
          <v-card class="dashboard-card">
            <h3>Leaderboard</h3>
            <v-list dense>
              <v-list-item
                v-for="(player, index) in leaderboard"
                :key="player.name"
              >
                <v-list-item-title>
                  #{{ index + 1 }} {{ player.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ player.xp }} XP</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <div class="text-center mt-3 text-muted">Your Rank: #{{ userRank }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <footer class="text-center mt-auto py-4 text-muted">
      <v-divider class="mb-3 glow-line"></v-divider>
      © 2025 EduCode — Reliability and Excellence
    </footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('Mark')
const userXP = ref(860)
const userLevel = ref(4)
const hearts = ref(5)
const leaderboard = ref([
  { name: 'Elena', xp: 1400 },
  { name: 'Jace', xp: 1200 },
  { name: 'Mia', xp: 1000 },
  { name: 'Mark', xp: 860 },
])
const userRank = ref(4)

const xpPercent = computed(() => (userXP.value % 1000) / 10)

const goHome = () => router.push('/')
const goProfile = () => router.push('/profile')
const startChallenge = () => router.push('/challenge')
const openIDE = () => router.push('/ide')
</script>

<style scoped>
.dashboard-page {
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
  color: white;
  font-family: 'Inter', sans-serif;
}

/* Glowing background */
.glow-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.glow-ball {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
  animation: float 12s ease-in-out infinite alternate;
}

.glow-ball.red {
  width: 400px;
  height: 400px;
  background: var(--brand-red, #e10600);
  top: 10%;
  left: -15%;
}

.glow-ball.purple {
  width: 450px;
  height: 450px;
  background: var(--brand-purple, #8b5cf6);
  bottom: 0;
  right: -20%;
  animation-delay: 2s;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -30px);
  }
  100% {
    transform: translate(-20px, 20px);
  }
}

/* Cards */
.dashboard-card {
  position: relative;
  z-index: 2;
  background: rgba(20, 20, 25, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
}

/* Gradient Button */
.gradient-btn {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  color: white;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}
.gradient-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* XP Bar */
.xp-bar {
  width: 120px;
  text-align: center;
}

/* Divider glow line */
.glow-line {
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-card {
    margin-bottom: 1rem;
  }
  .xp-bar {
    display: none;
  }
}
</style>
