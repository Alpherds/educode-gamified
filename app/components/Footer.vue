<!-- <template>
   <div class="footer-glow"></div>
  <footer class="footer-transparent">
   
    <p>© {{ year }} EduCode — Reliability and Excellence</p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script> -->


<template>
  <footer class="footer">
    © {{ year }} EduCode — Empowering Developers
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  color: #aaa;
  background: #0b0d15;
  border-top: 1px solid rgba(255,255,255,0.05);
}
</style>




