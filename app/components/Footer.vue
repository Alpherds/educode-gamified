<template>
  <v-footer padless class="footer-transparent">
    <v-container fluid class="py-6">
      <v-row>
        <v-col class="text-center">
          <div class="text-body-2 mb-0">© {{ year }} EduCode — Reliability and Excellence</div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer-transparent {
  background: transparent !important;
  border-top: 1px solid rgba(255, 255, 255, 0.03); /* subtle divider if you like */
}
</style>
