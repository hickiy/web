import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web/',
  outDir: '.vitepress/dist',
  title: 'hickey blog',
  head: [['link', { rel: 'icon', href: '/web/favicon.jpg' }]],
  ignoreDeadLinks: true, // 忽略死链接检查
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.jpg',
    siteTitle: 'Hickey',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      { text: '文档', link: '/doc/algorithm/algorithm.md', activeMatch: '/doc/' },
      { text: '实践', link: '/practice/', activeMatch: '/practice/' },
      { text: 'HTML', link: '/html/', activeMatch: '/html/' }
    ],
    sidebar: {
      '/html/': [
        {
          text: 'HTML Index',
          collapsed: false,
          items: [{ text: 'HTML Index', link: '/html/' }]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          collapsed: false,
          items: [
            { text: '精选与入口', link: '/blog/index.md' },
            { text: '内容分类与目录', link: '/blog/collections.md' }
          ]
        }
      ],
      '/doc/': [
        {
          text: '算法',
          collapsed: false,
          items: [
            { text: '算法概述', link: '/doc/algorithm/algorithm.md' },
            { text: '常用函数', link: '/doc/function/common_function.md' },
            { text: '数学符号', link: '/doc/symbol/greek_letter.md' },
            { text: '排序算法', link: '/doc/algorithm/sort/sort.md' },
            { text: '随机选择', link: '/doc/algorithm/order-statistic/randomized-select.md' },
            { text: '确定性选择', link: '/doc/algorithm/order-statistic/deterministic-slect.md' }
          ]
        },
        {
          text: '数据结构',
          collapsed: false,
          items: [
            { text: '哈希表', link: '/doc/data-stract/hash-table.md' },
            { text: 'B树', link: '/doc/data-stract/b-tree.md' },
            { text: '红黑树', link: '/doc/data-stract/red-black-tree.md' },
            { text: '最大堆', link: '/doc/data-stract/max-heap.md' },
            { text: '最小堆', link: '/doc/data-stract/min-heap.md' }
          ]
        },
        {
          text: 'Vue框架',
          collapsed: false,
          items: [
            { text: '初始化实例', link: '/doc/vue2/init-instance.md' },
            { text: '初始化状态', link: '/doc/vue2/init-state.md' },
            { text: '语法风格指南', link: '/doc/vue2/vue.md' }
          ]
        },
        {
          text: 'CSS',
          collapsed: false,
          items: [
            { text: '百分比单位', link: '/doc/css/persentage_unit.md' }
          ]
        },
        {
          text: 'Rust',
          collapsed: false,
          items: [
            { text: '类型系统', link: '/doc/rust/types.md' },
            { text: '语法规则', link: '/doc/rust/rules.md' }
          ]
        },
        {
          text: 'Webpack',
          collapsed: false,
          items: [
            { text: 'Webpack配置', link: '/doc/webpack/index.md' }
          ]
        },
        {
          text: 'Nginx部署',
          collapsed: false,
          items: [
            { text: '路由优先级', link: '/doc/nginx/location.md' },
            { text: '代理示例', link: '/doc/nginx/jsdelivr.md' }
          ]
        },
        {
          text: '其他',
          collapsed: true,
          items: [
            { text: '英语符号', link: '/doc/engilsh/symble_in_english.md' }
          ]
        }
      ],
      '/practice/': [
        {
          text: 'HTML5实践',
          collapsed: false,
          items: [
            { text: 'iframe示例', link: '/practice/HTML5/' }
          ]
        },
        {
          text: 'CSS实践',
          collapsed: false,
          items: [
            { text: 'CSS示例', link: '/practice/CSS/' }
          ]
        },
        {
          text: '可视化',
          collapsed: false,
          items: [
            { text: 'D3.js', link: '/practice/D3/' },
            { text: 'Echarts', link: '/practice/Echarts/' },
            { text: 'SVG', link: '/practice/SVG/' },
            { text: 'Canvas', link: '/practice/Canvas/' }
          ]
        },
        {
          text: '地图应用',
          collapsed: false,
          items: [
            { text: '地图示例', link: '/practice/Map/' }
          ]
        },
        {
          text: '实用工具',
          collapsed: false,
          items: [
            { text: '工具集合', link: '/practice/Tools/' }
          ]
        },
        {
          text: '其他技术',
          collapsed: false,
          items: [
            { text: 'WebRTC', link: '/practice/Web-RTC/' },
            { text: '部署相关', link: '/practice/Deploy/' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickiy' }]
  }
});
