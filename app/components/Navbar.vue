<template>
  <v-app-bar flat color="transparent" elevation="0" class="px-4">
    <!-- Left: Logo (maximizes left side) -->
    <div class="d-flex align-center logo-wrap" @click="goHome" role="button" style="cursor:pointer">
      <v-icon size="28" color="secondary" class="me-2">mdi-code-tags</v-icon>
      <div class="d-flex flex-column">
        <span class="text-h6 font-weight-bold">Edu<span class="text-gradient">Code</span></span>
      </div>
    </div>

    <v-spacer />

    <!-- Right: Desktop actions -->
    <div class="d-none d-md-flex align-center">
      <v-btn variant="text" class="mx-2" @click="goLogin">Login</v-btn>
      <v-btn elevation="2" class="mx-2" color="white" style="color:#000" @click="goSignup">Sign Up</v-btn>
    </div>

    <!-- Right: Mobile hamburger -->
    <div class="d-flex d-md-none">
      <v-menu location="bottom right" offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" aria-label="menu">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goLogin">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goSignup">
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
const router = useRouter()
function goHome() { router.push('/') }
function goLogin() { router.push('/login') }
function goSignup() { router.push('/login') }
</script>

<style scoped>
.logo-wrap {
  min-width: 220px; /* ensures logo area keeps space on left; adjust as needed */
  gap: 8px;
  align-items: center;
}

@media (max-width: 768px) {
  .logo-wrap {
    min-width: auto;
  }
}
</style>

