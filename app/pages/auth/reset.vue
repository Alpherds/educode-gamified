<template>
  <v-app>
    <v-container class="d-flex align-center justify-center" style="min-height:60vh;">
      <v-card class="pa-6 rounded-xl mx-auto" max-width="420" elevation="10">
        <div class="text-center mb-4">
          <h3 class="text-h5 font-weight-bold mb-2">Set New Password</h3>
          <p class="text-subtitle-2 text-muted">Enter your new password below</p>
        </div>

        <v-alert v-if="errorMsg" type="error" dense class="mb-3">{{ errorMsg }}</v-alert>
        <v-alert v-if="infoMsg" type="success" dense class="mb-3">{{ infoMsg }}</v-alert>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="New Password"
          variant="outlined"
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
          class="mb-4"
        >
          <template #append-inner>
            <v-icon class="cursor-pointer" @click="showConPassword = !showConPassword">
              {{ showConPassword ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
          </template>
        </v-text-field>

        <v-btn :loading="loading" color="primary" block @click="updatePassword">
          Update Password
        </v-btn>

        <div v-if="infoMsg" class="text-center mt-3 text-muted">
          <v-btn variant="text" size="small" @click="goLogin">Back to Login</v-btn>
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
.text-muted {
  color: rgba(255, 255, 255, 0.6);
}
</style>
