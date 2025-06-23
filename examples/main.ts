import { createApp } from 'vue';
import App from './App.vue';
import LiquidGlassStyle from '../src';

const app = createApp(App);
// 安装组件库
app.use(LiquidGlassStyle);
app.mount('#app');