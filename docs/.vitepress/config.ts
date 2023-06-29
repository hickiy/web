import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.jpg',
    siteTitle: 'Hickey',
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: 'web', link: '/markdown-examples' },
      { text: '算法', link: '/markdown-examples' },
      { text: '编译器', link: '/markdown-examples' },
      { text: '框架', link: '/markdown-examples' },
      { text: '语言', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'web',
        items: [
          { text: 'HTML5', link: '/markdown-examples' },
          { text: 'CSS', link: '/markdown-examples1' },
          { text: '新兴API', link: '/api-examples2' },
          { text: 'HTTP', link: '/api-examples3' },
          { text: '部分用例', link: '/api-examples4' },
          { text: '部分特效页面', link: '/api-examples5' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/love596310898/love596310898.github.io.git' }
    ]
  }
})
