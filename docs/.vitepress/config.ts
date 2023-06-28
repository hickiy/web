import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hickey",
  description: "A interesting personal blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '样例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '样例',
        items: [
          { text: 'Markdown 样例', link: '/markdown-examples' },
          { text: '运行时的API', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/love596310898/love596310898.github.io.git' }
    ]
  }
})
