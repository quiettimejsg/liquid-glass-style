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
}
</style>