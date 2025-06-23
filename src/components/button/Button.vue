<template>
  <button
  class="lg-button"
  :class="[typeClass, sizeClass, disabledClass, variantClass, { 'is-loading': loading }]"
  :disabled="disabled || loading"
  @click="handleClick"
  @mousemove="handleMouseMove"
  @mouseleave="resetLightEffect"
  :style="{ ...lightStyle, ...rootStyle }"
>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'LgButton'
};
</script>

<script lang="ts" setup>
import { computed, PropType , ref , watch } from 'vue';

const props = defineProps({
  /**
   * 按钮类型
   */
  type: {
    type: String as PropType<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'custom'>,
    default: 'primary'
  },
  /**
   * 自定义颜色（仅当type为'custom'时生效）
   */
  customColor: {
    type: String,
    default: ''
  },
  /**
   * 按钮尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 按钮变体
   */
  variant: {
    type: String as PropType<'filled' | 'outlined' | 'text' | 'glass'>,
    default: 'glass'
  },
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const lightStyle = ref<Record<string, string>>({});
const rootStyle = ref<Record<string, string>>({});

// 监听自定义颜色变化
watch([() => props.type, () => props.customColor], ([type, color]) => {
  if (type === 'custom' && color) {
    // 将十六进制颜色转换为RGB
    const rgb = hexToRgb(color);
    if (rgb) {
      rootStyle.value = {
        '--custom-color': color,
        '--custom-color-rgb': `${rgb.r}, ${rgb.g}, ${rgb.b}`
      };
    }
  } else {
    rootStyle.value = {};
  }
}, { immediate: true });

// 十六进制转RGB辅助函数
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  // 移除#号
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const handleClick = (e: MouseEvent) => {
  emit('click', e);
};

const handleMouseMove = (e: MouseEvent) => {
  if (props.disabled) return;
  const button = e.currentTarget as HTMLButtonElement;
  const rect = button.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width; // 0-1
  const y = (e.clientY - rect.top) / rect.height; // 0-1

  // 计算光线角度和强度
  const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
  const distance = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
  const intensity = 1 - Math.min(distance * 2, 1);

  // 更新CSS变量
  lightStyle.value = {
    '--light-x': x.toString(),
    '--light-y': y.toString(),
    '--intensity': intensity.toString(),
    '--angle': angle.toString()
  };
};

const resetLightEffect = () => {
  if (props.disabled) return;
  lightStyle.value = {};
};

const typeClass = computed(() => `lg-button--${props.type}`);
const sizeClass = computed(() => `lg-button--${props.size}`);
const disabledClass = computed(() => props.disabled ? 'lg-button--disabled' : '');
const variantClass = computed(() => `lg-button--${props.variant}`);
</script>

<style lang="scss" scoped>
.lg-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(123, 173, 255, 0.5);
  }
}

// 尺寸样式
.lg-button--small {
  padding: 6px 12px;
  font-size: 12px;
}

.lg-button--medium {
  padding: 8px 16px;
  font-size: 14px;
}

.lg-button--large {
  padding: 10px 20px;
  font-size: 16px;
}

// 禁用样式
.lg-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none !important;
}

// 变体样式 - 玻璃态
.lg-button--glass {
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-color: rgba(var(--button-color-rgb), 0.3);
  color: rgba(var(--button-color-rgb), 0.9);
  overflow: hidden;
  transition: all 0.15s ease-out;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.5);
    transition: box-shadow 0.15s ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    backdrop-filter: blur(15px);
    z-index: -1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
  }

  /* 动态光效层 */
  &::before {
    background: radial-gradient(
      circle at calc(var(--light-x, 0.5) * 100%) calc(var(--light-y, 0.5) * 100%),
      rgba(255, 255, 255, calc(0.2 * var(--intensity, 0.5))),
      transparent 70%
    );
    box-shadow: 
      inset calc(var(--light-x, 0.5) * -20px) calc(var(--light-y, 0.5) * -20px) 20px -15px rgba(255, 255, 255, calc(0.3 * var(--intensity, 0.5))),
      inset calc(var(--light-x, 0.5) * 20px) calc(var(--light-y, 0.5) * 20px) 20px -15px rgba(0, 0, 0, calc(0.1 * var(--intensity, 0.5)));
  }

  &:hover:not(.lg-button--disabled) {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.12),
      0 0 30px rgba(255, 255, 255, 0.1) inset;
  }

  &:active:not(.lg-button--disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &.is-loading {
    position: relative;
    pointer-events: none;
  }

  &.is-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 25%;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }

  &.is-loading .lg-button__content {
    margin-left: 24px;
  }
}

// 填充式按钮
.lg-button--filled {
  background: var(--button-color);
  color: #fff;
  transition: all 0.3s ease;

  &:hover:not(.lg-button--disabled) {
    background: rgba(var(--button-color-rgb), 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--button-color-rgb), 0.2);
  }

  &:active:not(.lg-button--disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(var(--button-color-rgb), 0.2);
  }
}

// 描边式按钮
.lg-button--outlined {
  background: transparent;
  border: 1px solid var(--button-color);
  color: var(--button-color);
  transition: all 0.3s ease;

  &:hover:not(.lg-button--disabled) {
    background: rgba(var(--button-color-rgb), 0.1);
    border-color: rgba(var(--button-color-rgb), 0.8);
    transform: translateY(-2px);
  }

  &:active:not(.lg-button--disabled) {
    transform: translateY(0);
    background: rgba(var(--button-color-rgb), 0.2);
  }
}

// 文本式按钮
.lg-button--text {
  background: transparent;
  color: var(--button-color);
  transition: all 0.3s ease;
  padding: 6px 12px;
  border: none;

  &:hover:not(.lg-button--disabled) {
    background: rgba(var(--button-color-rgb), 0.1);
    transform: translateY(-2px);
    text-decoration: underline;
  }

  &:active:not(.lg-button--disabled) {
    transform: translateY(0);
    background: rgba(var(--button-color-rgb), 0.2);
  }
}

// 颜色变量定义
:root {
  --color-primary: #409eff;
  --color-success: #67c23a;
  --color-warning: #e6a23c;
  --color-danger: #f56c6c;
  --color-info: #909399;
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-hover-bg: rgba(255, 255, 255, 0.25);
  --custom-color: #000000;
  --custom-color-rgb: 0, 0, 0;
}

// 类型颜色映射
.lg-button--primary {
  --button-color: var(--color-primary);
  --button-color-rgb: 64, 158, 255;
}

.lg-button--custom {
  --button-color: var(--custom-color);
  --button-color-rgb: var(--custom-color-rgb);
}

.lg-button--success {
  --button-color: var(--color-success);
  --button-color-rgb: 103, 194, 58;
}

.lg-button--warning {
  --button-color: var(--color-warning);
  --button-color-rgb: 230, 162, 60;
}

.lg-button--danger {
  --button-color: var(--color-danger);
  --button-color-rgb: 245, 108, 108;
}

.lg-button--info {
  --button-color: var(--color-info);
  --button-color-rgb: 144, 147, 153;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>