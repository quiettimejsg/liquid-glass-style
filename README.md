# Liquid Glass Style 使用指南

## 组件类名说明

### 布局容器类
- **.app-container**: 应用主容器，设置最大宽度、居中对齐和内边距
- **.example-section**: 示例区块容器，包含各类组件示例，设置背景玻璃态效果
- **.button-group**: 按钮组容器，使用flex布局实现按钮水平排列
- **.calculator-container**: 光学计算区域容器，包含控制项和结果展示
- **.card-grid**: 卡片网格容器，使用grid布局实现卡片自动排列
- **.responsive-container**: 响应式容器，实现按钮组的自适应布局和屏幕边缘检测换行
- **.theme-provider**: 主题提供器容器，提供深色/浅色模式切换支持

### 按钮组件(LgButton)相关类
- **.lg-button**: 按钮基础类
- **.lg-button--primary**: 主色调按钮
- **.lg-button--success**: 成功色调按钮
- **.lg-button--warning**: 警告色调按钮
- **.lg-button--danger**: 危险色调按钮
- **.lg-button--info**: 信息色调按钮
- **.lg-button--small**: 小型按钮
- **.lg-button--medium**: 中型按钮
- **.lg-button--large**: 大型按钮
- **.lg-button--glass**: 玻璃态按钮变体
- **.lg-button--filled**: 填充式按钮变体
- **.lg-button--outlined**: 描边式按钮变体
- **.lg-button--text**: 文本式按钮变体
- **.lg-button--custom**: 自定义颜色按钮
- **.is-loading**: 按钮加载状态类

### 卡片组件(LgCard)相关类
- **.lg-card**: 卡片基础类
- **.lg-card--primary**: 主色调卡片
- **.lg-card--success**: 成功色调卡片
- **.lg-card--warning**: 警告色调卡片
- **.lg-card--danger**: 危险色调卡片
- **.lg-card--info**: 信息色调卡片
- **.lg-card--small**: 小型卡片
- **.lg-card--medium**: 中型卡片
- **.lg-card--large**: 大型卡片
- **.lg-card--glass**: 玻璃态卡片变体
- **.lg-card--filled**: 填充式卡片变体
- **.lg-card--outlined**: 描边式卡片变体
- **.example-card**: 示例页面中的卡片样式类

## 组件调用方法

### 1. 按钮组件(LgButton)
```vue
<!-- 基础用法 -->
<lg-button>默认按钮</lg-button>

<!-- 带类型的按钮 -->
<lg-button type="success">成功按钮</lg-button>
<lg-button type="warning">警告按钮</lg-button>
<lg-button type="danger">危险按钮</lg-button>
<lg-button type="info">信息按钮</lg-button>

<!-- 不同尺寸 -->
<lg-button size="small">小型按钮</lg-button>
<lg-button size="medium">中型按钮</lg-button>
<lg-button size="large">大型按钮</lg-button>

<!-- 不同变体 -->
<lg-button variant="glass">玻璃态</lg-button>
<lg-button variant="filled">填充式</lg-button>
<lg-button variant="outlined">描边式</lg-button>
<lg-button variant="text">文本式</lg-button>

<!-- 禁用状态 -->
<lg-button disabled>禁用按钮</lg-button>

<!-- 加载状态 -->
<lg-button :loading="isLoading">加载中按钮</lg-button>

<!-- 自定义颜色按钮 -->
<lg-button type="custom" customColor="#ff5733" variant="filled">自定义红色按钮</lg-button>
<lg-button type="custom" customColor="#33ff57" variant="outlined">自定义绿色按钮</lg-button>
<lg-button type="custom" customColor="#3357ff" variant="text">自定义蓝色按钮</lg-button>
```

### 2. 卡片组件(LgCard)
```vue
<!-- 默认玻璃态卡片 -->
<LgCard variant="glass" class="example-card">
  <h3>默认玻璃态卡片</h3>
  <p>这是一个默认样式的玻璃态卡片组件，具有悬停光效和毛玻璃背景。</p>
</LgCard>

<!-- 不同尺寸 -->
<LgCard variant="glass" size="small" class="example-card">
  <h3>小型玻璃态卡片</h3>
  <p>小型尺寸的玻璃态卡片，适合紧凑布局。</p>
</LgCard>

<LgCard variant="glass" size="large" class="example-card">
  <h3>大型玻璃态卡片</h3>
  <p>大型尺寸的玻璃态卡片，适合展示更多内容。</p>
</LgCard>

<!-- 不同类型和变体 -->
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
```

### 3. 响应式容器(ResponsiveContainer)
```vue
<ResponsiveContainer>
  <div class="button-group">
    <lg-button>按钮1</lg-button>
    <lg-button>按钮2</lg-button>
    <lg-button>按钮3</lg-button>
    <lg-button>按钮4</lg-button>
    <lg-button>按钮5</lg-button>
  </div>
</ResponsiveContainer>
```

### 4. 主题提供器(ThemeProvider)
```vue
<ThemeProvider>
  <div class="app-container">
    <!-- 应用内容 -->
    <lg-button @click="toggleDarkMode" variant="filled" size="small">
      {{ isDark ? '切换到浅色模式' : '切换到深色模式' }}
    </lg-button>
  </div>
</ThemeProvider>

<script setup>
import { inject, computed } from 'vue';

const toggleTheme = inject<() => void>('toggleTheme');
const isDarkMode = inject<Ref<boolean>>('isDarkMode');
const isDark = computed(() => isDarkMode?.value || false);

const toggleDarkMode = () => {
  if (toggleTheme) {
    toggleTheme();
  }
};
</script>

### 5. 光学计算功能
```typescript
// 导入光学计算函数
import { calculateLightRefraction } from '@/services/optical-calculator';

// 调用光学计算示例
const calculateOptics = () => {
  // 鼠标位置信息
  const mousePosition = { x: 100, y: 200 };
  
  // 表面参数配置
  const surfaceParams = {
    refractiveIndex: 1.5,  // 折射率
    roughness: 0.2,        // 粗糙度
    curvature: 0.8         // 曲率
  };
  
  // 光线强度
  const lightIntensity = 1.0;
  
  // 执行计算
  const result = calculateLightRefraction(mousePosition, surfaceParams, lightIntensity);
  
  // 计算结果包含:
  // - refractionAngle: 折射角
  // - reflectionIntensity: 反射强度
  // - highlightPosition: 高光位置
  // - shadowParams: 阴影参数
  // - intensity: 光线强度
};
```

## 样式变量说明
所有组件均使用CSS变量实现样式定制，主要变量包括：
- **--glass-bg**: 玻璃态背景色
- **--glass-border**: 玻璃态边框色
- **--color-primary**: 主色调
- **--color-success**: 成功色调
- **--color-warning**: 警告色调
- **--color-danger**: 危险色调
- **--color-info**: 信息色调
- **--light-x**: 光线X轴位置
- **--light-y**: 光线Y轴位置
- **--intensity**: 光线强度
- **--custom-color**: 自定义颜色
- **--custom-color-rgb**: 自定义颜色的RGB值
- **--bg-color**: 背景色（深色/浅色模式自适应）
- **--text-color**: 文本色（深色/浅色模式自适应）