<template>
  <div class="theme-provider" :class="{ 'dark-mode': isDarkMode }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, provide } from 'vue';

const isDarkMode = ref(false);

// 初始化主题模式
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode) {
    isDarkMode.value = savedMode === 'true';
  } else {
    // 默认跟随系统
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  updateDocumentClass();
});

// 提供主题切换方法
provide('toggleTheme', () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value.toString());
  updateDocumentClass();
});
provide('isDarkMode', isDarkMode);

// 更新文档类名
const updateDocumentClass = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
</script>

<style scoped>
.theme-provider {
  min-height: 100%;
  transition: background-color 0.3s ease;
}

.dark-mode {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

:not(.dark-mode) {
  --bg-color: #ffffff;
  --text-color: #000000;
}
</style>