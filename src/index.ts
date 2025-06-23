export * from './components';


// 导出库版本信息
import packageJson from '../package.json';
export const version = packageJson.version;

// 导出安装函数（用于Vue插件形式安装）
import type { App } from 'vue';
import * as components from './components';

export const install = (app: App): void => {
  Object.entries(components).forEach(([name, component]) => {
    if ('install' in component) {
      app.use(component as any);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });
};

export default {
  version,
  install,
  ...components
};