<template>
  <v-main>
    <Navbar />

    <v-container fluid class="landing-page d-flex flex-column align-center justify-center pa-0">
      <v-row class="fill-height align-center">
        <v-col cols="12">
          <HeroSection />
        </v-col>
      </v-row>
    </v-container>

    <Footer />
  </v-main>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import HeroSection from '@/components/HeroSection.vue'
</script>

<style scoped>
/* any page-specific styling */
</style>
