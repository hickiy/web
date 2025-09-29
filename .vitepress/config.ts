import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web/',
  outDir: '.vitepress/dist',
  title: 'hickey blog',
  head: [['link', { rel: 'icon', href: '/web/favicon.jpg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/web/favicon.jpg',
    siteTitle: 'Hickey',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '部署', link: '/doc/nginx/location.md', activeMatch: '/doc/nginx' },
      { text: '框架', link: '/doc/vue2/init-instance.md', activeMatch: '/doc/vue2' }
    ],
    sidebar: {
      '/doc/nginx': [
        {
          text: 'nginx',
          items: [
            { text: '路由优先级', link: '/doc/nginx/location.md' },
            { text: '代理示例', link: '/doc/nginx/jsdelivr.md' }
          ]
        }
      ],
      '/doc/vue2': [
        {
          text: 'vue2',
          items: [
            { text: '初始化实例', link: '/doc/vue2/init-instance.md' },
            { text: '初始化状态', link: '/doc/vue2/init-state.md' },
            { text: '语法风格指南', link: '/doc/vue2/vue.md' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickiy' }]
  }
});
