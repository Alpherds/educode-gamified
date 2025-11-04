<template>
  <v-app class="reset-page">
    <v-container class="d-flex align-center justify-center reset-container">
      <v-card class="pa-6 pa-sm-8 rounded-xl reset-card mx-auto" elevation="10">
        <div class="text-center mb-6">
          <v-avatar size="64" class="mb-3 logo-avatar" color="transparent" @click="goHome" style="cursor:pointer">
            <v-icon size="40" color="orange">mdi-lock-reset</v-icon>
          </v-avatar>

          <h2 class="text-h5 font-weight-bold text-gradient">Password Reset</h2>
          <p class="text-subtitle-2 text-muted mt-1">We’ll send a reset link to your email</p>
        </div>

        <v-alert v-if="msg" :type="msgType" dense class="mb-4">{{ msg }}</v-alert>

        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Enter your registered email"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        />

        <v-btn :loading="loading" block large class="reset-btn mb-3" @click="sendReset">
          Send Reset Link
        </v-btn>

        <div class="text-center mt-4 text-muted">
          Remembered your password?
          <v-btn variant="text" size="small" class="text-gradient" @click="goLogin">Back to Login</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase

const email = ref('')
const loading = ref(false)
const msg = ref('')
const msgType = ref<'success' | 'error'>('success')

const goHome = () => router.push('/')
const goLogin = () => router.push('/login')

const sendReset = async () => {
  msg.value = ''
  if (!email.value) {
    msg.value = 'Please enter your email.'
    msgType.value = 'error'
    return
  }

  loading.value = true
  const { error } = await $supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/reset`
  })
  loading.value = false

  if (error) {
    msg.value = error.message
    msgType.value = 'error'
  } else {
    msg.value = 'Reset link sent — check your email.'
    msgType.value = 'success'
  }
}
</script>

<style scoped>
/* -------------------------------
   PAGE LAYOUT
--------------------------------*/
.reset-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #0b0c14 0%, #05060a 100%);
  overflow: hidden;
  font-family: "Inter", sans-serif;
  color: #fff;
  position: relative;
}

/* Background Glow */
.reset-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at top left, rgba(255, 136, 0, 0.15), transparent 60%),
    radial-gradient(circle at bottom right, rgba(255, 102, 0, 0.12), transparent 60%);
  filter: blur(90px);
  z-index: 0;
}

/* -------------------------------
   CARD DESIGN
--------------------------------*/
.reset-card {
  background: rgba(20, 22, 30, 0.85) !important;
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 60px rgba(255, 140, 0, 0.25);
  border-radius: 18px;
  padding: 2.5rem !important;
  width: 100%;
  max-width: 420px;
  z-index: 3;
  animation: fadeUp 0.6s ease-out;
  position: relative;
}

.reset-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 80px rgba(255, 165, 0, 0.3);
}

/* Gradient Text */
.text-gradient {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Avatar Icon */
.logo-avatar {
  border: 2px solid rgba(255, 165, 0, 0.3);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
  transition: transform 0.3s ease;
}
.logo-avatar:hover {
  transform: rotate(10deg) scale(1.1);
}

/* Button */
.reset-btn {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}
.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(255, 165, 0, 0.45);
}

/* Animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* -------------------------------
   RESPONSIVE
--------------------------------*/
@media (max-width: 960px) {
  .reset-page {
    padding: 1rem;
  }
  .reset-card {
    padding: 1.8rem !important;
  }
}
</style>
