<template>
  <v-app class="signup-page">
    <div class="signup-scroll-wrapper">
      <v-container class="d-flex flex-column align-center justify-center px-4 py-10">
        <v-card class="pa-6 pa-sm-8 rounded-xl signup-card mx-auto" elevation="10">
          <div class="text-center mb-6">
            <v-avatar size="64" class="mb-3 logo-avatar" color="transparent" @click="goHome" style="cursor:pointer">
              <v-icon size="40" color="orange">mdi-code-tags</v-icon>
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
/* ---------------------------------
   PAGE LAYOUT
--------------------------------- */
.signup-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #0b0c14 0%, #05060a 100%);
  font-family: "Inter", sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* Background Glow */
.signup-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at top left, rgba(255, 136, 0, 0.2), transparent 60%),
    radial-gradient(circle at bottom right, rgba(255, 102, 0, 0.18), transparent 60%);
  filter: blur(100px);
  z-index: 0;
}

/* Card */
.signup-card {
  background: rgba(20, 22, 30, 0.85);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 50px rgba(255, 140, 0, 0.25);
  border-radius: 18px;
  padding: 2.5rem !important;
  width: 100%;
  max-width: 420px;
  z-index: 3;
  animation: fadeUp 0.6s ease-out;
  position: relative;
  transition: all 0.3s ease;
}
.signup-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 80px rgba(255, 165, 0, 0.3);
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Icon Avatar */
.logo-avatar {
  border: 2px solid rgba(255, 165, 0, 0.25);
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.3);
  transition: transform 0.3s ease;
}
.logo-avatar:hover {
  transform: rotate(10deg) scale(1.1);
}

/* Inputs */
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
.signup-btn {
  background: linear-gradient(90deg, #ffa500, #ff6700);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.25);
}
.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(255, 165, 0, 0.45);
}

/* Terms */
.terms-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}
.terms-link {
  color: #ffa500;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
}
.terms-link:hover {
  text-decoration: underline;
}

/* Animations */
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
  .signup-page {
    padding: 1rem;
  }
  .signup-card {
    padding: 2rem !important;
  }
}
</style>