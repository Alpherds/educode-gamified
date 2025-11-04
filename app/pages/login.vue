<template>
  <v-app class="login-page">
    <v-container class="d-flex align-center justify-center px-4">
      <v-card class="pa-6 pa-sm-8 rounded-xl login-card mx-auto" elevation="10">
        <div class="text-center mb-6">
          <v-avatar
            size="64"
            class="mb-3 logo-avatar"
            color="transparent"
            @click="goHome"
            style="cursor:pointer"
          >
            <v-icon size="40" color="orange">mdi-code-tags</v-icon>
          </v-avatar>

          <h2 class="text-h5 font-weight-bold">
            Online IDE <span class="text-gradient">Pro</span>
          </h2>
          <p class="text-subtitle-2 mt-1" style="opacity:0.8">Welcome back</p>
        </div>

        <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>

        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          placeholder="Enter your password"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        >
          <template #append-inner>
            <v-icon color="white" class="cursor-pointer" @click="showPassword = !showPassword">
              {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
          </template>
        </v-text-field>

        <div class="d-flex justify-space-between align-center mb-4 flex-wrap">
          <v-checkbox
            v-model="remember"
            label="Remember me"
            density="compact"
            hide-details
            class="ma-0 pa-0"
          />
          <v-btn variant="text" size="small" class="text-gradient" @click="goReset">
            Forgot password?
          </v-btn>
        </div>

        <v-btn
          :loading="loading"
          color="primary"
          block
          large
          class="login-btn mb-3"
          @click="login"
        >
          Sign In
        </v-btn>

        <div class="text-center mt-4 terms-text">
          Don’t have an account?
          <v-btn variant="text" size="small" class="text-gradient" @click="goSignup">
            Sign up
          </v-btn>
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
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const goHome = () => router.push('/')
const goSignup = () => router.push('/signup')
const goReset = () => router.push('/reset')

const login = async () => {
  errorMsg.value = ''
  loading.value = true
  const { error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (error) {
    errorMsg.value = error.message
    return
  }
  router.push('/dashboard')
}
</script>

<style scoped>
/* -------------------------------
   PAGE LAYOUT
--------------------------------*/
.login-page {
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
.login-page::before {
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
.login-card {
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

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 80px rgba(255, 165, 0, 0.3);
}

/* Gradient Text */
.text-gradient {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Icon Avatar */
.logo-avatar {
  border: 2px solid rgba(255, 165, 0, 0.3);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
  transition: transform 0.3s ease;
}
.logo-avatar:hover {
  transform: rotate(10deg) scale(1.1);
}

/* Input Fields */
.v-text-field {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
.v-text-field input {
  color: #fff !important;
}
.v-field--focused {
  border-color: #ffa500 !important;
}

/* Button */
.login-btn {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}
.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(255, 165, 0, 0.45);
}

/* Terms */
.terms-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
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
  .login-page {
    padding: 1rem;
  }
  .login-card {
    padding: 1.8rem !important;
  }
}
</style>

