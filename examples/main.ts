import { createApp, h } from 'vue';
import App from './App.vue';
import ThemeProvider from '@/components/ThemeProvider.vue';
import LiquidGlassStyle from '../src';

const app = createApp({ render: () => h(ThemeProvider, null, h(App)) });
// 安装组件库
app.use(LiquidGlassStyle);
app.mount('#app');