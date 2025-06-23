<template>
  <div
    class="lg-card"
    :class="[cardType, cardSize, cardVariant]"
    :style="cardStyle"
    @mousemove="handleMouseMove"
    @mouseleave="resetLightEffect"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'glass';
  bordered?: boolean;
  shadow?: boolean;
}>();

const lightPosition = ref({ x: 0, y: 0 });
const intensity = ref(0);

const cardType = computed(() => `lg-card--${props.type || 'default'}`);
const cardSize = computed(() => `lg-card--${props.size || 'medium'}`);
const cardVariant = computed(() => `lg-card--${props.variant || 'glass'}`);

const cardStyle = computed(() => ({
  '--light-x': lightPosition.value.x,
  '--light-y': lightPosition.value.y,
  '--intensity': intensity.value
}));

const handleMouseMove = (e: MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  lightPosition.value.x = (e.clientX - rect.left) / rect.width;
  lightPosition.value.y = (e.clientY - rect.top) / rect.height;
  intensity.value = 1;
};

const resetLightEffect = () => {
  intensity.value = 0;
};
</script>

<style scoped lang="scss">
.lg-card {
  position: relative;
  border-radius: 12px;
  padding: 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at calc(var(--light-x, 0.5) * 100%) calc(var(--light-y, 0.5) * 100%),
      rgba(255, 255, 255, calc(0.2 * var(--intensity, 0))),
      transparent 70%
    );
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(10px);
    z-index: -1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
  }
}

.lg-card--small {
  padding: 12px;
  border-radius: 8px;
}

.lg-card--medium {
  padding: 16px;
  border-radius: 12px;
}

.lg-card--large {
  padding: 24px;
  border-radius: 16px;
}

.lg-card--glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.lg-card--filled {
  background: var(--color-primary);
  color: white;
}

.lg-card--outlined {
  background: transparent;
  border: 1px solid var(--color-primary);
}

.lg-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}
</style>