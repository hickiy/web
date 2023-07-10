import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  outDir: '.vitepress/blog',
  title: 'hickey blog',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.jpg',
    siteTitle: 'Hickey',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '部署', link: '/deploy/nginx/location.md', activeMatch: '/deploy/' }
    ],
    sidebar: [
      {
        text: '部署',
        items: [{ text: 'nginx', link: '/deploy/nginx/jsdelivr.md' }]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickeyhub' }]
  }
});
