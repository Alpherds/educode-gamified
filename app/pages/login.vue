<!-- <template>
  <v-app class="login-page">
    <div class="login-scroll-wrapper">
      <v-container class="d-flex flex-column align-center justify-center px-4 py-10">
        <v-card class="pa-6 pa-sm-8 rounded-xl login-card mx-auto" elevation="10">
          <div class="text-center mb-6">
            <v-avatar size="64" class="mb-3 logo-avatar" color="transparent" @click="goHome" style="cursor:pointer">
              <v-icon size="40" color="primary">mdi-code-tags</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold">EduCode</h2>
            <p class="text-subtitle-2 text-muted mt-1">Sign in to continue</p>
          </div>

          <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>

          <v-text-field v-model="email" label="Email" placeholder="Enter your email" variant="outlined" hide-details density="comfortable" class="mb-4" />
          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password" placeholder="Enter password" variant="outlined" hide-details density="comfortable" class="mb-4">
            <template #append-inner>
              <v-icon class="cursor-pointer" @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <div class="d-flex justify-space-between align-center mb-4 flex-wrap">
            <v-checkbox v-model="remember" label="Remember me" density="compact" hide-details class="ma-0 pa-0" />
            <v-btn variant="text" size="small" class="text-gradient" @click="goReset">Forgot password?</v-btn>
          </div>

          <v-btn :loading="loading" color="primary" block large class="sign-in-btn mb-3" @click="signIn">Sign In</v-btn>

          <div class="text-center mt-4 text-muted">Don’t have an account?
            <v-btn variant="text" size="small" class="text-gradient" @click="goSignup">Sign up</v-btn>
          </div>
        </v-card>
      </v-container>
    </div>
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
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const goHome = () => router.push('/')
const goSignup = () => router.push('/signup')
const goReset = () => router.push('/reset')
const goDashboard = () => router.push('/dashboard')

const signIn = async () => {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = 'Please enter email and password.'
    return
  }
  loading.value = true
  const { error } = await $supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  loading.value = false
  if (error) {
    errorMsg.value = error.message
    return
  }
  goDashboard()
}
</script>


<style scoped>
/* -------------------------------
   BACKGROUND
--------------------------------*/
.login-page {
  position: relative;
  background: radial-gradient(circle at top left, #0d0d0d, #000);
  color: white;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  min-height: 100vh;
}

/* Scrollable Wrapper */
.login-scroll-wrapper {
  position: relative;
  z-index: 2;
  overflow-y: auto;
  min-height: 100vh;
  max-height: 100%;
  scroll-behavior: smooth;
}

/* Floating Glow */
.glow-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.glow-ball {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.6;
  animation: float 2s ease-in-out infinite alternate;
}

.glow-ball.red {
  width: 300px;
  height: 300px;
  background: var(--brand-red, #e10600);
  top: 20%;
  left: -15%;
}

.glow-ball.purple {
  width: 360px;
  height: 360px;
  background: var(--brand-purple, #8b5cf6);
  bottom: 10%;
  right: -20%;
  animation-delay: 1s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(25px, -25px) scale(1.05);
  }
  100% {
    transform: translate(-20px, 20px) scale(1);
  }
}

/* -------------------------------
   LOGIN CARD
--------------------------------*/
.login-card {
  background: rgba(20, 18, 26, 0.85) !important;
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Sign In Button */
.sign-in-btn {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  color: white;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.sign-in-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* -------------------------------
   RESPONSIVE
--------------------------------*/
@media (max-width: 480px) {
  .login-card {
    padding: 1.25rem !important;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .glow-ball.red {
    width: 180px;
    height: 180px;
    left: -25%;
  }

  .glow-ball.purple {
    width: 220px;
    height: 220px;
    right: -25%;
  }
}
</style> -->


<template>
  <v-app class="login-page">
    <div class="login-scroll-wrapper">
      <v-container class="d-flex flex-column align-center justify-center px-4 py-10">
        <v-card class="pa-6 pa-sm-8 rounded-xl login-card mx-auto" elevation="10">
          <div class="text-center mb-6">
            <v-avatar size="64" class="mb-3 logo-avatar" color="transparent" @click="goHome" style="cursor:pointer">
              <v-icon size="40" color="primary">mdi-code-tags</v-icon>
            </v-avatar>

            <h2 class="text-h5 font-weight-bold">
              Online IDE <span class="text-gradient">Pro</span>
            </h2>
            <p class="text-subtitle-2 text-muted mt-1">SIGN IN</p>
          </div>

          <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>

          <v-text-field v-model="email" label="Email" placeholder="Enter your email" variant="outlined" hide-details density="comfortable" class="mb-4" />

          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password" placeholder="Enter your password" variant="outlined" hide-details density="comfortable" class="mb-4">
            <template #append-inner>
              <v-icon color="white" class="cursor-pointer" @click="showPassword = !showPassword">
                {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>

          <div class="d-flex justify-space-between align-center mb-4 flex-wrap">
            <v-checkbox v-model="remember" label="Remember me" density="compact" hide-details class="ma-0 pa-0" />
            <v-btn variant="text" size="small" class="text-gradient" @click="goReset">Forgot password?</v-btn>
          </div>

          <v-btn :loading="loading" color="primary" block large class="sign-in-btn" @click="login">Sign In</v-btn>

          <div class="text-center mt-4 text-muted">
            Don’t have an account?
            <v-btn variant="text" size="small" class="text-gradient" @click="goSignup">Sign up</v-btn>
          </div>
        </v-card>
      </v-container>
    </div>
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
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  // success -> go to dashboard
  router.push('/dashboard')
}
</script>


<style scoped>
/* -------------------------------
   BACKGROUND
--------------------------------*/
.login-page {
  position: relative;
  background: radial-gradient(circle at top left, #0d0d0d, #000);
  color: white;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  min-height: 100vh;
}

/* Scrollable Wrapper */
.login-scroll-wrapper {
  position: relative;
  z-index: 2;
  overflow-y: auto;
  min-height: 100vh;
  max-height: 100%;
  scroll-behavior: smooth;
}

/* Floating Glow */
.glow-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.glow-ball {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.6;
  animation: float 2s ease-in-out infinite alternate;
}

.glow-ball.red {
  width: 300px;
  height: 300px;
  background: var(--brand-red, #e10600);
  top: 20%;
  left: -15%;
}

.glow-ball.purple {
  width: 360px;
  height: 360px;
  background: var(--brand-purple, #8b5cf6);
  bottom: 10%;
  right: -20%;
  animation-delay: 1s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(25px, -25px) scale(1.05);
  }
  100% {
    transform: translate(-20px, 20px) scale(1);
  }
}

/* -------------------------------
   LOGIN CARD
--------------------------------*/
.login-card {
  background: rgba(20, 18, 26, 0.85) !important;
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Sign In Button */
.sign-in-btn {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  color: white;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.sign-in-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* -------------------------------
   RESPONSIVE
--------------------------------*/
@media (max-width: 480px) {
  .login-card {
    padding: 1.25rem !important;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .glow-ball.red {
    width: 180px;
    height: 180px;
    left: -25%;
  }

  .glow-ball.purple {
    width: 220px;
    height: 220px;
    right: -25%;
  }
}
</style> 

