<!-- <template>
  <section class="hero-section">
    <v-icon size="64" color="secondary">mdi-code-tags</v-icon>

    <h1 class="display-large my-4">
      Code, Compile, and Have <span class="text-gradient">Fun</span>
    </h1>

    <p class="text-subtitle-1 mb-8">
      Start coding right away with EduCode — your cloud-based interactive IDE built for learning.
    </p>

    <v-btn color="secondary" size="large" rounded="xl" class="px-8" @click="goLogin">
      <v-icon left>mdi-arrow-right</v-icon> Start Coding
    </v-btn>

    <div class="mt-10 d-flex flex-wrap justify-center">
      <v-chip v-for="lang in langs" :key="lang" class="ma-2" variant="outlined">{{ lang }}</v-chip>
    </div>


  </section>
</template>

<script setup lang="ts">
const langs = ['Python', 'Java', 'C++']
const router = useRouter()
const goLogin = () => router.push('/login')
</script> -->


<template>
  <section class="hero-section d-flex flex-column flex-md-row align-center justify-space-between">
    <div class="hero-left d-flex justify-center ">
      <img src="/monitor.png" alt="Monitor" class="hero-monitor" />
    </div>

    <div class="hero-right text-center text-md-start">
      <h1 class="hero-title">
        Learn to <span class="text-orange-gradient">Code</span><br />the Fun Way!
      </h1>
      <p class="text-subtitle-1 hero-subtitle">
        Build, test, and grow with EduCode — <br></br>
        your interactive cloud IDE for hands-on learning.
      </p>
      <v-btn color="orange-lighten-1" size="large" rounded="xl" class="px-8 glow-btn" @click="goLogin">
        Start Coding
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()
const goLogin = () => router.push('/login')
</script>

<style scoped>
.hero-section {
  min-height: 10vh;
  padding: 120px 80px;
  background: radial-gradient(circle at 80% 20%, rgba(255,165,0,0.08), transparent 70%), #0d0f1a;
  color: white;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

.hero-left {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 40px;
}

.hero-right {
  flex: 1;
  max-width: 500px;
}

.hero-monitor {
  width: 100%;
  max-width: 680px;
  height: auto;
  filter: drop-shadow(0 0 40px rgba(255,165,0,0.2));
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.2rem;
}

@media (max-width: 960px) {
  .hero-section {
    padding: 100px 30px 80px;
    text-align: center;
  }

  .hero-left, .hero-right {
    flex: 1 1 100%;
    justify-content: center;
    padding-left: 0;
  }

  .hero-monitor {
    max-width: 320px;
    margin-bottom: 30px;
  }

  .hero-title {
    font-size: 2.4rem;
  }
}

.text-orange-gradient {
  background: linear-gradient(90deg, #ffa726, #ffb74d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  color: rgba(255,255,255,0.8);
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.glow-btn {
  box-shadow: 0 0 20px rgba(255,165,0,0.3);
  transition: box-shadow 0.3s ease;
}
.glow-btn:hover {
  box-shadow: 0 0 35px rgba(255,165,0,0.6);
}
</style>
