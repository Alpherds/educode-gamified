<template>
  <div class="text-center py-8">
    <v-icon size="64" color="secondary">mdi-code-tags</v-icon>

    <h1 class="display-large font-weight-extrabold my-4">
      Code, Compile, and Have <span class="text-gradient">Fun</span>
    </h1>

    <p class="text-subtitle-1 mb-8">
      Start coding right away with EduCode — your cloud-based interactive IDE built for learning.
    </p>

    <v-btn color="secondary" size="large" rounded="xl" class="px-8" @click="$router.push('/ide')">
      <v-icon left>mdi-arrow-right</v-icon> Start Coding
    </v-btn>

    <div class="mt-10 d-flex flex-wrap justify-center">
      <v-chip
        v-for="lang in langs"
        :key="lang"
        class="ma-2"
        variant="outlined"
      >{{ lang }}</v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
const langs = ['Python', 'JavaScript', 'Java', 'C', 'C++']
</script>

<style scoped>
.display-large {
  font-size: 3.2rem;
  line-height: 1.02;
}
</style>
