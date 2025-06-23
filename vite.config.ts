import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    // 允许 0.0.0.0 访问
    server: {
      host: '0.0.0.0'
    }
  };

  // 仅在构建库时应用lib配置
  if (command === 'build') {
    // 为 config 对象添加 build 属性类型定义，解决类型错误
    (config as { plugins: import('vite').Plugin[]; resolve: { alias: { '@': string; }; }; build: any; server: { host: string } }).build = {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'LiquidGlassStyle',
        fileName: (format) => `liquid-glass-style.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      },
      outDir: 'dist'
    };
  }

  return config;
});