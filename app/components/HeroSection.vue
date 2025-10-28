<template>
  <section class="hero-section">
    <v-icon size="64" color="secondary">mdi-code-tags</v-icon>

    <h1 class="display-large my-4">
      Code, Compile, and Have <span class="text-gradient">Fun</span>
    </h1>

    <p class="text-subtitle-1 mb-8">
      Start coding right away with EduCode — your cloud-based interactive IDE built for learning.
    </p>

    <v-btn color="secondary" size="large" rounded="xl" class="px-8">
      <v-icon left>mdi-arrow-right</v-icon> Start Coding
    </v-btn>

    <div class="mt-10 d-flex flex-wrap justify-center">
      <v-chip v-for="lang in langs" :key="lang" class="ma-2" variant="outlined">{{ lang }}</v-chip>
    </div>


  </section>
</template>

<script setup lang="ts">
const langs = ['Python', 'Java', 'C++']
</script>
