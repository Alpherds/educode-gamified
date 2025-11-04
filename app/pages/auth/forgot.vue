<!-- <template>
  <v-app class="forgot-page">
    <v-container class="d-flex flex-column align-center justify-center px-4 py-10">
      <v-card class="pa-6 pa-sm-8 rounded-xl signup-card mx-auto" elevation="10">
        <div class="text-center mb-6">
          <v-icon size="48" color="primary" class="mb-2">mdi-lock-reset</v-icon>
          <h2 class="text-h5 font-weight-bold">Reset your password</h2>
          <p class="text-subtitle-2 text-muted mt-1">Enter your email to receive a reset link</p>
        </div>

        <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>
        <v-alert v-if="infoMsg" type="info" dense class="mb-4">{{ infoMsg }}</v-alert>

        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        />

        <v-btn
          :loading="loading"
          color="primary"
          block
          class="signup-btn"
          @click="resetPassword"
        >
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
import type { SupabaseClient } from '@supabase/supabase-js'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase as SupabaseClient

const email = ref('')
const loading = ref(false)
const errorMsg = ref('')
const infoMsg = ref('')

const goLogin = () => router.push('/login')

const resetPassword = async () => {
  errorMsg.value = ''
  infoMsg.value = ''

  if (!email.value) {
    errorMsg.value = 'Please enter your email.'
    return
  }

  loading.value = true
  const { error } = await $supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/reset`,
  })
  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  infoMsg.value = 'Password reset link sent! Check your inbox.'
}
</script>

<style scoped>
/* Reuse your signup page styles for consistency */
.forgot-page {
  position: relative;
  background: radial-gradient(circle at top left, #0d0d0d, #000);
  color: white;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}
.signup-card {
  background: rgba(20, 18, 26, 0.85) !important;
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
  width: 100%;
  max-width: 420px;
}
.text-gradient {
  background: linear-gradient(90deg, #e10600, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style> -->


<template>
  <v-app class="forgot-page">
    <v-container class="d-flex align-center justify-center flex-column">
      <v-card class="pa-6 pa-sm-8 rounded-xl forgot-card mx-auto" elevation="10">
        <div class="text-center mb-6">
          <v-avatar size="64" class="mb-3 forgot-avatar" color="transparent">
            <v-icon size="40" color="primary">mdi-lock-reset</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold text-gradient">Forgot Password</h2>
          <p class="text-subtitle-2 text-muted mt-1">
            Enter your email to receive a password reset link
          </p>
        </div>

        <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>
        <v-alert v-if="infoMsg" type="success" dense class="mb-4">{{ infoMsg }}</v-alert>

        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        />

        <v-btn
          :loading="loading"
          block
          large
          class="forgot-btn mb-3"
          @click="resetPassword"
        >
          Send Reset Link
        </v-btn>

        <div class="text-center mt-2 text-muted">
          Remembered your password?
          <v-btn variant="text" size="small" class="text-gradient" @click="goLogin">
            Back to Login
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { SupabaseClient } from '@supabase/supabase-js'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase as SupabaseClient

const email = ref('')
const loading = ref(false)
const errorMsg = ref('')
const infoMsg = ref('')

const goLogin = () => router.push('/login')

const resetPassword = async () => {
  errorMsg.value = ''
  infoMsg.value = ''

  if (!email.value) {
    errorMsg.value = 'Please enter your email.'
    return
  }

  loading.value = true
  const { error } = await $supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/reset`,
  })
  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  infoMsg.value = 'Password reset link sent! Check your inbox.'
}
</script>

<style scoped>
/* -------------------------------
   PAGE LAYOUT
--------------------------------*/
.forgot-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #0b0c14 0%, #05060a 100%);
  overflow: hidden;
  color: #fff;
  font-family: "Inter", sans-serif;
  position: relative;
}

/* Background Glow */
.forgot-page::before {
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
.forgot-card {
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

.forgot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 80px rgba(255, 165, 0, 0.3);
}

/* Avatar Icon */
.forgot-avatar {
  border: 2px solid rgba(255, 165, 0, 0.3);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}

/* Gradient Text */
.text-gradient {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Button */
.forgot-btn {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}
.forgot-btn:hover {
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
  .forgot-page {
    padding: 1rem;
  }
  .forgot-card {
    padding: 1.8rem !important;
  }
}
</style>
