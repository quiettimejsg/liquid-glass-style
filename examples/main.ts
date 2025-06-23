// 尝试从本地安装路径导入，以解决找不到模块的问题
import { createApp } from 'vue';
import Root from './Root.vue';
import LiquidGlassStyle from '../src';

const app = createApp(Root);
// 安装组件库
app.use(LiquidGlassStyle);
app.mount('#app');