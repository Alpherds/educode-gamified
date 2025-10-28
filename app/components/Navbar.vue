<template>
  <div class="navbar-wrapper">
    <v-app-bar flat color="transparent" elevation="0" class="px-4">
      <div class="d-flex align-center logo-wrap" @click="goHome" style="cursor:pointer">
        <v-icon size="28" color="secondary" class="me-2">mdi-code-tags</v-icon>
        <span class="text-h6 font-weight-bold">Edu<span class="text-gradient">Code</span></span>
      </div>

      <v-spacer />

      <div class="d-none d-md-flex align-center">
        <v-btn variant="text" class="mx-2 login-btn" @click="goLogin">Login</v-btn>
        <v-btn elevation="2" class="mx-2 signup-btn" color="white" style="color:#000" @click="goSignup">Sign Up</v-btn>
      </div>

      <div class="d-flex d-md-none">
        <v-menu location="bottom right" offset-y>
          <template #activator="{ props }">
            <v-btn icon v-bind="props"><v-icon>mdi-menu</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-item @click="goLogin"><v-list-item-title>Login</v-list-item-title></v-list-item>
            <v-list-item @click="goSignup"><v-list-item-title>Sign Up</v-list-item-title></v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

  </div>

  <div>
        <div class="navbar-glow"></div>
  </div>

</template>

<script setup lang="ts">
const router = useRouter()
const goHome = () => router.push('/')
const goLogin = () => router.push('/login')
const goSignup = () => router.push('/signup')
</script>
