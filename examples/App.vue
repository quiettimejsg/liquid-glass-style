<template>
  <ThemeProvider>
    <div class="app-container">
        <!-- 移除 flex 布局，因为 flex 布局下 <br> 标签不会生效 -->
        <div>
          <h1>Liquid Glass Style 组件示例</h1>
          <!-- 若需要间距，可使用 margin 替代 <br> -->
          <!-- 增加按钮所在 div 的上外边距，扩大按钮和下面元素的间距 -->
          <div style="margin-top: 2rem;">
            <ResponsiveContainer> <!-- 添加 ResponsiveContainer -->
              <lg-button @click="toggleDarkMode" variant="glass" size="small">
                {{ isDark ? '切换到浅色模式' : '切换到深色模式' }}
              </lg-button>
            </ResponsiveContainer> <!-- 闭合 ResponsiveContainer -->
          </div>
        </div>
    
    <section class="example-section">
      <h2>基础玻璃态按钮</h2>
      <ResponsiveContainer>
        <div class="button-group">
        <lg-button>默认按钮</lg-button>
        <lg-button type="success">成功按钮</lg-button>
        <lg-button type="warning">警告按钮</lg-button>
        <lg-button type="danger">危险按钮</lg-button>
        <lg-button type="info">信息按钮</lg-button>
      </div>
      </ResponsiveContainer>

    </section>

    <section class="example-section">
      <h2>不同尺寸</h2>
      <ResponsiveContainer>
        <div class="button-group">
        <lg-button size="small">小型按钮</lg-button>
        <lg-button size="medium">中型按钮</lg-button>
        <lg-button size="large">大型按钮</lg-button>
      </div>
      </ResponsiveContainer>

    </section>

    <section class="example-section">
      <h2>不同变体</h2>
      <ResponsiveContainer>
        <div class="button-group">
        <lg-button variant="glass">玻璃态</lg-button>
        <lg-button variant="filled">填充式</lg-button>
        <lg-button variant="outlined">描边式</lg-button>
        <lg-button variant="text">文本式</lg-button>
      </div>
      </ResponsiveContainer>
    </section>

    <section class="example-section">
      <h2>禁用状态</h2>
      <ResponsiveContainer>
        <div class="button-group">
        <lg-button disabled>禁用按钮</lg-button>
        <lg-button type="success" disabled>禁用成功按钮</lg-button>
      </div>
      </ResponsiveContainer>
    </section>

    <section class="example-section">
      <h2>玻璃态卡片组件示例</h2>
      <div class="card-grid">
        <LgCard variant="glass" class="example-card">
          <h3>默认玻璃态卡片</h3>
          <p>这是一个默认样式的玻璃态卡片组件，具有悬停光效和毛玻璃背景。</p>
        </LgCard>

        <LgCard variant="glass" size="small" class="example-card">
          <h3>小型玻璃态卡片</h3>
          <p>小型尺寸的玻璃态卡片，适合紧凑布局。</p>
        </LgCard>

        <LgCard variant="glass" size="large" class="example-card">
          <h3>大型玻璃态卡片</h3>
          <p>大型尺寸的玻璃态卡片，适合展示更多内容。</p>
        </LgCard>

        <LgCard variant="filled" type="primary" class="example-card">
          <h3>填充式卡片</h3>
          <p>使用主色调填充的卡片样式。</p>
        </LgCard>

        <LgCard variant="outlined" type="success" class="example-card">
          <h3>描边式卡片</h3>
          <p>仅显示边框的卡片样式。</p>
        </LgCard>

        <LgCard variant="glass" type="warning" class="example-card">
          <h3>警告类型卡片</h3>
          <p>带有警告色调的玻璃态卡片。</p>
          <LgButton type="warning" size="small" style="margin-top: 10px;">操作按钮</LgButton>
        </LgCard>
      </div>
    </section>
  </div>
  </ThemeProvider>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject , computed } from 'vue';
import LgButton from '@/components/button/Button.vue';
import LgCard from '@/components/card/Card.vue';
import ResponsiveContainer from '@/components/ResponsiveContainer.vue';
import ThemeProvider from '@/components/ThemeProvider.vue';
import { calculateLightRefraction } from '@/services/optical-calculator';



// 主题切换相关
const toggleTheme = inject<() => void>('toggleTheme', () => {});
const isDarkMode = inject<Ref<boolean>>('isDarkMode', ref(false));
const isDark = computed(() => isDarkMode?.value || false);

const toggleDarkMode = () => {
  if (toggleTheme) {
    toggleTheme();
  }
};

// 滑块引用
const intensitySlider = ref<HTMLInputElement | null>(null);

// 更新滑块渐变背景
const updateSliderValue = () => {
  if (intensitySlider.value) {
    const percentage = ((lightIntensity.value - 0.1) / (2.0 - 0.1)) * 100;
    intensitySlider.value.style.setProperty('--value', `${percentage}%`);
  }
};

// 初始化滑块样式
onMounted(() => {
  updateSliderValue();
});

// 光学计算相关状态
const mousePosition = ref({ x: 0, y: 0 });
const lightIntensity = ref(1.0);
const calculationResult = ref<any>(null);
const isCalculating = ref(false);
const errorMessage = ref('');

// 处理鼠标移动事件，更新位置
const handleMouseMove = (e: MouseEvent) => {
  const rect = e.target as HTMLElement;
  const x = e.clientX - rect.getBoundingClientRect().left;
  const y = e.clientY - rect.getBoundingClientRect().top;
  mousePosition.value = { x, y };
};

// 调用光学计算API
const calculateOptics = () => {
  if (!mousePosition.value.x || !mousePosition.value.y) {
    errorMessage.value = '请移动鼠标获取位置参数';
    return;
  }

  isCalculating.value = true;
  errorMessage.value = '';
  calculationResult.value = null;

  try {
    // 使用前端本地光学计算函数
    const result = calculateLightRefraction(
      mousePosition.value,
      {
        refractiveIndex: 1.5,
        roughness: 0.2,
        curvature: 0.8
      },
      lightIntensity.value
    );

    // 模拟计算延迟以展示加载状态
    setTimeout(() => {
      calculationResult.value = result;
      isCalculating.value = false;
    }, 600);
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : '计算过程发生错误';
    isCalculating.value = false;
  }
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.example-section {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 光学计算区域样式 */
.calculator-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 20px;
  border-radius: 12px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: all 0.3s ease;
}

.calculator-container:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.slider-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider-group input {
  flex-grow: 1;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, var(--color-primary), var(--color-primary)) no-repeat,
              rgba(255, 255, 255, 0.15);
  background-size: var(--value, 50%) 100%;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  transition: background-size 0.15s ease;
}

.slider-group input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider-group input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(64, 158, 255, 0.8);
}

.result-area {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  min-height: 100px;
  backdrop-filter: blur(10px);
}

.result-area pre {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
}

.error-message {
  color: var(--color-danger);
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  background: rgba(245, 108, 108, 0.1);
  border: 1px solid rgba(245, 108, 108, 0.3);
}

/* 卡片示例样式 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.example-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.example-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.example-card h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
  opacity: 0.9;
}

.example-card p {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.95rem;
}
</style>