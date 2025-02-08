<template>
  <div class="app-container">
    <Header />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header/index.vue'
</script>

<style scoped>
.app-container {
  height: 100vh;
}
</style>