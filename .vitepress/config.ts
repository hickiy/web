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
      { text: '文档', link: '/doc/algorithm/algorithm.md', activeMatch: '/doc/' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          collapsed: false,
          items: [
            { text: '精选与入口', link: '/blog/index.md' },
            { text: '内容分类与目录', link: '/blog/collections.md' },
            { text: '实践项目', link: '/blog/practice.md' }
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
            {
              text: '排序算法',
              collapsed: false,
              items: [
                { text: '排序概览', link: '/doc/algorithm/sort/sort' },
                { text: '冒泡排序', link: '/doc/algorithm/sort/bubble' },
                { text: '选择排序', link: '/doc/algorithm/sort/select' },
                { text: '插入排序', link: '/doc/algorithm/sort/insert' },
                { text: '归并排序', link: '/doc/algorithm/sort/merge' },
                { text: '快速排序', link: '/doc/algorithm/sort/quick' },
                { text: '计数排序', link: '/doc/algorithm/sort/counting' },
                { text: '基数排序', link: '/doc/algorithm/sort/redix' },
                { text: '桶排序', link: '/doc/algorithm/sort/buket' },
                { text: '堆排序', link: '/doc/algorithm/sort/heap' }
              ]
            },
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
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickiy' }]
  }
});
