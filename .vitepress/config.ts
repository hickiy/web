import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web/',
  outDir: '.vitepress/dist',
  title: 'hickey blog',
  head: [['link', { rel: 'icon', href: '/web/favicon.jpg' }]],
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
      { text: '框架', link: '/frame/vue/source.md', activeMatch: '/frame/' }
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
            { text: '源码理解', link: '/frame/vue/source.md' },
            { text: '语法风格指南', link: '/frame/vue/vue.md' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickiy' }]
  }
});
