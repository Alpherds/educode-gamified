<!-- <template>
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
</script> -->


<template>
  <v-app-bar flat color="transparent" class="navbar px-6">
    <!-- Logo -->
    <div class="d-flex align-center" style="cursor:pointer" @click="goHome">
      <v-icon color="orange-lighten-1" size="28">mdi-code-tags</v-icon>
      <span class="text-h6 font-weight-bold ms-2">Edu<span class="text-orange-gradient">Code</span></span>
    </div>

    <v-spacer />

    <!-- Desktop Nav -->
    <div class="d-none d-md-flex align-center">
      <v-btn variant="text" class="mx-2 text-white" @click="goAbout">About</v-btn>
      <v-btn variant="text" class="mx-2 text-white" @click="goContact">Contact</v-btn>
      <v-btn variant="outlined" class="mx-2" color="orange-lighten-1" @click="goSignup">Sign Up</v-btn>
      <v-btn color="orange-lighten-1" class="mx-2" @click="goLogin">Login</v-btn>
    </div>

    <!-- Mobile Menu Button -->
    <v-btn icon class="d-md-none" @click="toggleDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Animated Glow Line -->
  <div class="nav-glow-line"></div>

  <!-- Glass Sidebar Drawer -->
  <transition name="slide-fade">
    <div v-if="drawer" class="drawer-overlay" @click.self="toggleDrawer">
      <div class="drawer-glass">
        <v-icon class="close-icon" color="white" size="28" @click="toggleDrawer">mdi-close</v-icon>

        <div class="menu-list mt-8">
          <div class="menu-item" :class="{active: activeItem==='about'}" @click="goAbout">
            <v-icon class="me-2">mdi-information-outline</v-icon> About
          </div>
          <div class="menu-item" :class="{active: activeItem==='contact'}" @click="goContact">
            <v-icon class="me-2">mdi-phone-outline</v-icon> Contact
          </div>
          <div class="menu-item" :class="{active: activeItem==='signup'}" @click="goSignup">
            <v-icon class="me-2">mdi-account-plus-outline</v-icon> Sign Up
          </div>
          <div class="menu-item" :class="{active: activeItem==='login'}" @click="goLogin">
            <v-icon class="me-2">mdi-login</v-icon> Login
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const drawer = ref(false)
const activeItem = ref('')
const router = useRouter()

const toggleDrawer = () => {
  drawer.value = !drawer.value
  document.body.style.overflow = drawer.value ? 'hidden' : 'auto'
}

const goHome = () => router.push('/')
const goAbout = () => { activeItem.value='about'; router.push('/about') }
const goContact = () => { activeItem.value='contact'; router.push('/contact') }
const goSignup = () => { activeItem.value='signup'; router.push('/signup') }
const goLogin = () => { activeItem.value='login'; router.push('/login') }
</script>

<style scoped>
/* Glow Line Under Navbar */
.nav-glow-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,140,0,0.6), transparent);
  box-shadow: 0 0 20px rgba(255,165,0,0.4);
}

/* Text Gradient */
.text-orange-gradient {
  background: linear-gradient(90deg, #ffa726, #ffb74d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Drawer Overlay */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: flex-end;
  z-index: 3000;
  backdrop-filter: blur(6px);
}

/* Frosted Glass Drawer */
.drawer-glass {
  width: 260px;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(25, 28, 45, 0.45);
  backdrop-filter: blur(14px);
  box-shadow: -4px 0 30px rgba(255,165,0,0.1);
  color: white;
  padding: 30px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

/* Close Button */
.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

/* Menu List */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.menu-item {
  display: flex;
  align-items: center;
  font-size: 1.05rem;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  background: rgba(255,255,255,0.05);
}

.menu-item:hover {
  background: rgba(255,165,0,0.15);
  transform: translateX(4px);
}

.menu-item.active {
  background: rgba(255,165,0,0.25);
  border: 1px solid rgba(255,165,0,0.3);
  box-shadow: 0 0 10px rgba(255,165,0,0.3);
}

/* Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

