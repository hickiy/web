import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web/blog/',
  outDir: '.vitepress/dist',
  title: 'hickey blog',
  head: [['link', { rel: 'icon', href: '/web/blog/favicon.jpg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.jpg',
    siteTitle: 'Hickey',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '部署', link: '/deploy/nginx/location.md', activeMatch: '/deploy/' },
      { text: '框架', link: '/frame/vue2/init-instance.md', activeMatch: '/frame/' }
    ],
    sidebar: {
      '/deploy/': [
        {
          text: 'nginx',
          items: [
            { text: '路由优先级', link: '/deploy/nginx/location.md' },
            { text: '代理示例', link: '/deploy/nginx/jsdelivr.md' }
          ]
        }
      ],
      '/frame/': [
        {
          text: 'vue',
          items: [
            { text: '初始化实例', link: '/frame/vue2/init-instance.md' },
            { text: '初始化状态', link: '/frame/vue2/init-state.md' },
            { text: '语法风格指南', link: '/frame/vue2/vue.md' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickiy' }]
  }
});
