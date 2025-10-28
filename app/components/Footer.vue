<template>
   <div class="footer-glow"></div>
  <footer class="footer-transparent">
   
    <p>© {{ year }} EduCode — Reliability and Excellence</p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
