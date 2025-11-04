<template>
  <v-app class="reset-pass-page">
    <v-container class="d-flex align-center justify-center reset-container">
      <v-card class="pa-6 pa-sm-8 rounded-xl reset-pass-card mx-auto" elevation="10">
        <div class="text-center mb-6">
          <v-avatar size="64" class="mb-3 lock-avatar" color="transparent">
            <v-icon size="40" color="orange">mdi-lock-check</v-icon>
          </v-avatar>

          <h2 class="text-h5 font-weight-bold text-gradient">Set New Password</h2>
          <p class="text-subtitle-2 text-muted mt-1">Enter your new password below</p>
        </div>

        <v-alert v-if="errorMsg" type="error" dense class="mb-3">{{ errorMsg }}</v-alert>
        <v-alert v-if="infoMsg" type="success" dense class="mb-3">{{ infoMsg }}</v-alert>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="New Password"
          variant="outlined"
          density="comfortable"
          hide-details
          class="mb-3"
        >
          <template #append-inner>
            <v-icon class="cursor-pointer" @click="showPassword = !showPassword">
              {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
          </template>
        </v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :type="showConPassword ? 'text' : 'password'"
          label="Confirm Password"
          variant="outlined"
          density="comfortable"
          hide-details
          class="mb-4"
        >
          <template #append-inner>
            <v-icon class="cursor-pointer" @click="showConPassword = !showConPassword">
              {{ showConPassword ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
          </template>
        </v-text-field>

        <v-btn :loading="loading" block large class="update-btn mb-3" @click="updatePassword">
          Update Password
        </v-btn>

        <div v-if="infoMsg" class="text-center mt-4 text-muted">
          <v-btn variant="text" size="small" class="text-gradient" @click="goLogin">Back to Login</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { SupabaseClient } from '@supabase/supabase-js'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase as SupabaseClient

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const infoMsg = ref('')

onMounted(async () => {
  const { data, error } = await $supabase.auth.getSession()
  if (error || !data.session) {
    errorMsg.value = 'Invalid or expired reset link.'
  }
})

const updatePassword = async () => {
  errorMsg.value = ''
  infoMsg.value = ''

  if (!password.value || password.value.length < 8) {
    errorMsg.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  const { error } = await $supabase.auth.updateUser({ password: password.value })
  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  infoMsg.value = 'Password updated successfully! Redirecting to login...'
  setTimeout(() => router.push('/login'), 2000)
}

const goLogin = () => router.push('/login')
</script>

<style scoped>
/* -------------------------------
   PAGE LAYOUT
--------------------------------*/
.reset-pass-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at 25% 20%, #0b0c14 0%, #05060a 100%);
  overflow: hidden;
  color: #fff;
  font-family: "Inter", sans-serif;
  position: relative;
}

/* Background Glow */
.reset-pass-page::before {
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
.reset-pass-card {
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
}

.reset-pass-card:hover {
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
.lock-avatar {
  border: 2px solid rgba(255, 165, 0, 0.3);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}

/* Button */
.update-btn {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}
.update-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(255, 165, 0, 0.45);
}

/* Muted Text */
.text-muted {
  color: rgba(255, 255, 255, 0.6);
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

/* Responsive */
@media (max-width: 960px) {
  .reset-pass-page {
    padding: 1rem;
  }
  .reset-pass-card {
    padding: 1.8rem !important;
  }
}
</style>
