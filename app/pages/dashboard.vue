<template>
  <v-app>
    <v-container class="py-8">
      <h1>Dashboard — Welcome</h1>
      <p>This is a protected page. Only accessible when signed-in.</p>
      <div class="mt-4">
        <v-btn color="error" @click="signOut">Sign out</v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { SupabaseClient } from '@supabase/supabase-js'

const router = useRouter()
const nuxtApp = useNuxtApp()
const $supabase = nuxtApp.$supabase as SupabaseClient

onMounted(async () => {
  const { data } = await $supabase.auth.getSession()
  const user = data?.session?.user
  if (!user) {
    // Not signed-in — redirect to login
    router.push('/login')
  }
})

const signOut = async () => {
  await $supabase.auth.signOut()
  router.push('/login')
}
</script>
