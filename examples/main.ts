// 尝试从本地安装路径导入，以解决找不到模块的问题
import { createApp, h } from '../node_modules/vue/dist/vue.esm-bundler.js';
import App from './App.vue';
import ThemeProvider from '@/components/ThemeProvider.vue';
import LiquidGlassStyle from '../src';

const app = createApp({ render: () => h(ThemeProvider, null, () => h(App)) });
// 安装组件库
app.use(LiquidGlassStyle);
app.mount('#app');