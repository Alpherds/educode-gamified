<template>
  <v-app class="login-page">
    <!-- Animated glowing balls background -->
    <div class="glow-bg">
      <div class="glow-ball red"></div>
      <div class="glow-ball purple"></div>
    </div>

    <!-- Login Container -->
    <v-container class="d-flex align-center justify-center fill-height px-4">
      <v-card
        class="pa-6 pa-sm-8 rounded-xl login-card mx-auto"
        elevation="10"
      >
        <!-- Logo + Title -->
        <div class="text-center mb-6">
          <v-avatar
            size="64"
            class="mb-3 logo-avatar"
            color="transparent"
            @click="goHome"
          >
            <v-icon size="40" color="primary">mdi-code-tags</v-icon>
          </v-avatar>

          <h2 class="text-h5 font-weight-bold">
            Online IDE <span class="text-gradient">Pro</span>
          </h2>
          <p class="text-subtitle-2 text-muted mt-1">SIGN IN</p>
        </div>

        <!-- OAuth buttons -->
        <div class="d-flex flex-column flex-sm-row justify-space-between mb-4">
          <v-btn
            variant="outlined"
            color="white"
            prepend-icon="mdi-google"
            class="flex-grow-1 mb-2 mb-sm-0 mr-sm-2"
          >
            Google
          </v-btn>
          <v-btn
            variant="outlined"
            color="white"
            prepend-icon="mdi-github"
            class="flex-grow-1 ml-sm-2"
          >
            Github
          </v-btn>
        </div>

        <div class="text-center text-muted mb-4">— or —</div>

        <!-- Email -->
        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        />

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="outlined"
          hide-details
          density="comfortable"
          class="mb-4"
        />

        <!-- Mock Captcha -->
        <v-sheet
          class="d-flex align-center pa-3 mb-4 rounded captcha-box"
          elevation="2"
        >
          <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
          <span>Success!</span>
          <v-spacer />
          <v-img
            src="https://www.cloudflare.com/img/logo-cloudflare-dark.svg"
            contain
            width="100"
          />
        </v-sheet>

        <!-- Remember me / Forgot -->
        <div class="d-flex justify-space-between align-center mb-4 flex-wrap">
          <v-checkbox
            v-model="remember"
            label="Remember me"
            density="compact"
            hide-details
            class="ma-0 pa-0"
          />
          <v-btn variant="text" size="small" class="text-gradient">
            Forgot password?
          </v-btn>
        </div>

        <!-- Sign In Button -->
        <v-btn color="primary" block large class="sign-in-btn" @click="goDashboard">
          Sign In
        </v-btn>

        <!-- Sign up -->
        <div class="text-center mt-4 text-muted">
          Don’t have an account?
          <v-btn
            variant="text"
            size="small"
            class="text-gradient"
            @click="goSignup"
          >
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
const email = ref('')
const password = ref('')
const remember = ref(false)

// navigation
const goHome = () => router.push('/')
const goSignup = () => router.push('/signup')
const goDashboard = () => router.push('/dashboard')
</script>

<style scoped>
/* Background Glow Animation */
.login-page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(circle at top left, #0d0d0d, #000);
  overflow: hidden;
  color: white;
  font-family: 'Inter', sans-serif;
}

/* Floating glow balls */
.glow-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.glow-ball {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.6;
  animation: float 12s ease-in-out infinite alternate;
}

.glow-ball.red {
  width: 350px;
  height: 350px;
  background: var(--brand-red, #e10600);
  top: 20%;
  left: -10%;
  animation-delay: 0s;
}

.glow-ball.purple {
  width: 400px;
  height: 400px;
  background: var(--brand-purple, #8b5cf6);
  bottom: 10%;
  right: -15%;
  animation-delay: 3s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -30px) scale(1.1);
  }
  100% {
    transform: translate(-20px, 20px) scale(1);
  }
}

/* Card styling */
.login-card {
  position: relative;
  z-index: 2;
  width: 400px;
  max-width: 100%;
  background: rgba(20, 18, 26, 0.85) !important;
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
}

/* Text gradient for logo/title */
.text-gradient {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Sign In Button */
.sign-in-btn {
  background: linear-gradient(90deg, var(--brand-red, #e10600), var(--brand-purple, #8b5cf6));
  color: #fff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.sign-in-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

/* Captcha mock style */
.captcha-box {
  background: rgba(255, 255, 255, 0.08);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .login-card {
    width: 100%;
    padding: 1.5rem !important;
  }

  .glow-ball.red {
    width: 250px;
    height: 250px;
    left: -20%;
  }

  .glow-ball.purple {
    width: 300px;
    height: 300px;
    right: -25%;
  }
}
</style>
