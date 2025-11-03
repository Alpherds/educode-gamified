<template>
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
</style>
