import { defineConfig } from 'umi'

export default defineConfig({
  // for publication only (won't be used locally)
  base: 'debug-notes',
  publicPath: './',
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/apps/draw', component: '@/pages/index' },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@antv/x6-react-components',
        libraryDirectory: 'es',
        transformToDefaultImport: false,
        style: true,
      },
    ],
  ],
})
