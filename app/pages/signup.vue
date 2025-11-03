<!-- <template>
  <v-app class="signup-page">
    <div class="signup-scroll-wrapper">
      <v-container class="d-flex flex-column align-center justify-center px-4 py-10">
        <v-card class="pa-6 pa-sm-8 rounded-xl signup-card mx-auto" elevation="10">
          <div class="text-center mb-6">
            <v-avatar size="64" class="mb-3 logo-avatar" color="transparent" @click="goHome" style="cursor:pointer">
              <v-icon size="40" color="primary">mdi-code-tags</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold">Create your <span class="text-gradient">EduCode</span> account</h2>
            <p class="text-subtitle-2 text-muted mt-1">Join the learning adventure</p>
          </div>

          <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>
          <v-alert v-if="infoMsg" type="info" dense class="mb-4">{{ infoMsg }}</v-alert>

          <v-text-field v-model="name" label="Full Name" variant="outlined" hide-details density="comfortable" class="mb-3" />
          <v-text-field v-model="email" label="Email" variant="outlined" hide-details density="comfortable" class="mb-3" />
          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password" variant="outlined" hide-details density="comfortable" class="mb-3">
            <template #append-inner>
              <v-icon class="cursor-pointer" @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <v-text-field v-model="confirmPassword" :type="showConPassword ? 'text' : 'password'" label="Confirm Password" variant="outlined" hide-details density="comfortable" class="mb-3">
            <template #append-inner>
              <v-icon class="cursor-pointer" @click="showConPassword = !showConPassword">{{ showConPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <v-checkbox density="compact" v-model="agree" class="mb-4">
            <template #label>
              <span class="terms-text">
                I agree to the <a href="#" class="terms-link">Terms</a> and <a href="#" class="terms-link">Privacy</a>
              </span>
            </template>
          </v-checkbox>

          <v-btn :loading="loading" color="primary" block class="signup-btn" @click="createAccount">Create Account</v-btn>

          <div class="text-center mt-4 text-muted">
            Already have an account?
            <v-btn variant="text" size="small" class="text-gradient" @click="goLogin">Sign in</v-btn>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)
const showPassword = ref(false)
const showConPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const infoMsg = ref('')

const goHome = () => router.push('/')
const goLogin = () => router.push('/login')

const createAccount = async () => {
  errorMsg.value = ''
  infoMsg.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'Please complete all fields.'
    return
  }
  if (password.value.length < 8) {
    errorMsg.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.'
    return
  }
  if (!agree.value) {
    errorMsg.value = 'You must agree to the Terms.'
    return
  }

  loading.value = true
  const { data, error } = await $supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
      data: { full_name: name.value }
    }
  })
  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  infoMsg.value = 'Confirmation email sent. Check your inbox.'
  // Wait 2 seconds then go to login page
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
</script>


<style scoped>
/* -------------------------------
   BACKGROUND
--------------------------------*/
.signup-page {
  position: relative;
  background: radial-gradient(circle at top left, #0d0d0d, #000);
  color: white;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  min-height: 100vh;
}

/* Scrollable container */
.signup-scroll-wrapper {
  position: relative;
  z-index: 2;
  overflow-y: auto;
  min-height: 100vh;
  scroll-behavior: smooth;
}

/* Glow background */
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
  top: 15%;
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
   CARD
--------------------------------*/
.signup-card {
  background: rgba(20, 18, 26, 0.85) !important;
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
}

.signup-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Buttons */
.signup-btn {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  color: #fff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.signup-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Terms checkbox refinement */
.terms-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.terms-text {
  font-size: 0.75rem; /* smaller */
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.8);
  white-space: normal;
}

.terms-link {
  color: var(--brand-purple, #8b5cf6);
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

/* -------------------------------
   RESPONSIVE
--------------------------------*/
@media (max-width: 480px) {
  .signup-card {
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
  <v-app class="signup-page">
    <div class="signup-scroll-wrapper">
      <v-container class="d-flex flex-column align-center justify-center px-4 py-10">
        <v-card class="pa-6 pa-sm-8 rounded-xl signup-card mx-auto" elevation="10">
          <div class="text-center mb-6">
            <v-avatar size="64" class="mb-3 logo-avatar" color="transparent" @click="goHome" style="cursor:pointer">
              <v-icon size="40" color="primary">mdi-code-tags</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold">Create your <span class="text-gradient">EduCode</span> account</h2>
            <p class="text-subtitle-2 text-muted mt-1">Join the learning adventure</p>
          </div>

          <v-alert v-if="errorMsg" type="error" dense class="mb-4">{{ errorMsg }}</v-alert>
          <v-alert v-if="infoMsg" type="info" dense class="mb-4">{{ infoMsg }}</v-alert>

          <v-text-field v-model="name" label="Full Name" variant="outlined" hide-details density="comfortable" class="mb-3" />
          <v-text-field v-model="email" label="Email" variant="outlined" hide-details density="comfortable" class="mb-3" />
          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password" variant="outlined" hide-details density="comfortable" class="mb-3">
            <template #append-inner>
              <v-icon class="cursor-pointer" @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <v-text-field v-model="confirmPassword" :type="showConPassword ? 'text' : 'password'" label="Confirm Password" variant="outlined" hide-details density="comfortable" class="mb-3">
            <template #append-inner>
              <v-icon class="cursor-pointer" @click="showConPassword = !showConPassword">{{ showConPassword ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </template>
          </v-text-field>

          <v-checkbox density="compact" v-model="agree" class="mb-4">
            <template #label>
              <span class="terms-text">I agree to the <a href="#" class="terms-link">Terms</a> and <a href="#" class="terms-link">Privacy</a></span>
            </template>
          </v-checkbox>

          <v-btn :loading="loading" color="primary" block class="signup-btn" @click="createAccount">Create Account</v-btn>

          <div class="text-center mt-4 text-muted">Already have an account?
            <v-btn variant="text" size="small" class="text-gradient" @click="goLogin">Sign in</v-btn>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)
const showPassword = ref(false)
const showConPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const infoMsg = ref('')

const goHome = () => router.push('/')
const goLogin = () => router.push('/login')

const createAccount = async () => {
  errorMsg.value = ''
  infoMsg.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'Please complete all fields.'
    return
  }
  if (password.value.length < 8) {
    errorMsg.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.'
    return
  }
  if (!agree.value) {
    errorMsg.value = 'You must agree to Terms.'
    return
  }

  loading.value = true
  const { data, error } = await $supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${window.location.origin}/login`, // after confirm go to login
      data: { full_name: name.value }
    }
  })
  loading.value = false

  if (error) {
    errorMsg.value = error.message
    return
  }

  infoMsg.value = 'Confirmation email sent. Check your inbox.'
  // redirect to login page; user will confirm via email
  router.push('/login')
}
</script>

<style scoped>
/* -------------------------------
   BACKGROUND
--------------------------------*/
.signup-page {
  position: relative;
  background: radial-gradient(circle at top left, #0d0d0d, #000);
  color: white;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  min-height: 100vh;
}

/* Scrollable container */
.signup-scroll-wrapper {
  position: relative;
  z-index: 2;
  overflow-y: auto;
  min-height: 100vh;
  scroll-behavior: smooth;
}

/* Glow background */
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
  top: 15%;
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
   CARD
--------------------------------*/
.signup-card {
  background: rgba(20, 18, 26, 0.85) !important;
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
}

.signup-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Buttons */
.signup-btn {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  color: #fff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.signup-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Terms checkbox refinement */
.terms-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.terms-text {
  font-size: 0.75rem; /* smaller */
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.8);
  white-space: normal;
}

.terms-link {
  color: var(--brand-purple, #8b5cf6);
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

/* -------------------------------
   RESPONSIVE
--------------------------------*/
@media (max-width: 480px) {
  .signup-card {
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

