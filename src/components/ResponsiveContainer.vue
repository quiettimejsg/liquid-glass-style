<template>
  <div class="responsive-container" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const containerStyle = computed(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing, 8px)',
  width: '100%',
  boxSizing: 'border-box'
}));
</script>

<style scoped>
.responsive-container {
  margin: 0 auto;
  padding: 0 8px;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 1200px) {
  .responsive-container {
    max-width: 1200px;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .responsive-container {
    max-width: 90%;
  }
}

@media (max-width: 767px) {
  .responsive-container {
    max-width: 100%;
  }
}
</style>