<!-- <template>
  <v-app>
    <v-container class="d-flex align-center justify-center" style="min-height:60vh;">
      <v-card class="pa-6 rounded-xl mx-auto" max-width="420" elevation="10">
        <h3 class="mb-4">Reset password</h3>
        <v-text-field v-model="email" label="Email" variant="outlined" class="mb-4" />
        <v-btn :loading="loading" color="primary" block @click="sendReset">Send reset link</v-btn>
        <div v-if="msg" class="mt-3 text-muted">{{ msg }}</div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'

const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase as SupabaseClient
const email = ref('')
const loading = ref(false)
const msg = ref('')

const sendReset = async () => {
  if (!email.value) { msg.value = 'Please enter your email.'; return }
  loading.value = true
  const { error } = await $supabase.auth.resetPasswordForEmail(email.value, { redirectTo: `${window.location.origin}/auth/reset` })
  loading.value = false
  if (error) msg.value = error.message
  else msg.value = 'Reset link sent — check your email.'
}
</script> -->

<template>
  <v-app class="reset-page">
    <v-container class="d-flex align-center justify-center" style="min-height:60vh;">
      <v-card class="pa-6 rounded-xl mx-auto" max-width="420" elevation="10">
        <h3 class="mb-4">Reset password</h3>
        <v-text-field v-model="email" label="Email" variant="outlined" class="mb-4" />
        <v-btn :loading="loading" color="primary" block @click="sendReset">Send reset link</v-btn>
        <div v-if="msg" class="mt-3 text-muted">{{ msg }}</div>
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

const sendReset = async () => {
  if (!email.value) { msg.value = 'Please enter your email.'; return }
  loading.value = true
  const { error } = await $supabase.auth.resetPasswordForEmail(email.value, { redirectTo: `${window.location.origin}/auth/reset` })
  loading.value = false
  if (error) msg.value = error.message
  else msg.value = 'Reset link sent — check your email.'
}
</script>

<style scoped>
/* keep/reset styles as you want */
</style>

