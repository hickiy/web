import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web/',
  outDir: '.vitepress/dist',
  srcExclude: ["practice/**", "public/**"],
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
      { text: 'home', link: '/' },
      { text: 'blog', link: '/blog/algorithm/algorithm.md', activeMatch: '/blog/' },
    ],
    sidebar: {
      '/blog/': [
        {
          text: '算法',
          collapsed: false,
          items: [
            { text: '算法概述', link: '/blog/algorithm/algorithm.md' },
            { text: '常用函数', link: '/blog/function/common_function.md' },
            { text: '数学符号', link: '/blog/symbol/greek_letter.md' },
            {
              text: '排序算法',
              collapsed: false,
              items: [
                { text: '排序概览', link: '/blog/algorithm/sort/sort.md' },
                { text: '冒泡排序', link: '/blog/algorithm/sort/bubble.md' },
                { text: '选择排序', link: '/blog/algorithm/sort/select.md' },
                { text: '插入排序', link: '/blog/algorithm/sort/insert.md' },
                { text: '归并排序', link: '/blog/algorithm/sort/merge.md' },
                { text: '快速排序', link: '/blog/algorithm/sort/quick.md' },
                { text: '计数排序', link: '/blog/algorithm/sort/counting.md' },
                { text: '基数排序', link: '/blog/algorithm/sort/redix.md' },
                { text: '桶排序', link: '/blog/algorithm/sort/buket.md' },
                { text: '堆排序', link: '/blog/algorithm/sort/heap.md' }
              ]
            },
            { text: '随机选择', link: '/blog/algorithm/order-statistic/randomized-select.md' },
            { text: '确定性选择', link: '/blog/algorithm/order-statistic/deterministic-slect.md' }
          ]
        },
        {
          text: '数据结构',
          collapsed: false,
          items: [
            { text: '哈希表', link: '/blog/data-stract/hash-table.md' },
            { text: 'B树', link: '/blog/data-stract/b-tree.md' },
            { text: '红黑树', link: '/blog/data-stract/red-black-tree.md' },
            { text: '最大堆', link: '/blog/data-stract/max-heap.md' },
            { text: '最小堆', link: '/blog/data-stract/min-heap.md' }
          ]
        },
        {
          text: 'Vue框架',
          collapsed: false,
          items: [
            { text: '初始化实例', link: '/blog/vue2/init-instance.md' },
            { text: '初始化状态', link: '/blog/vue2/init-state.md' },
            { text: '语法风格指南', link: '/blog/vue2/vue.md' }
          ]
        },
        {
          text: 'CSS',
          collapsed: false,
          items: [
            { text: '百分比单位', link: '/blog/css/persentage_unit.md' },
            { text: 'CSS3', link: '/blog/css/css3.md' },
            { text: '字体族', link: '/blog/css/font-family.md' },
            { text: '选择器优先级', link: '/blog/css/selector-priority-value.md' }
          ]
        },
        {
          text: 'Rust',
          collapsed: false,
          items: [
            { text: '类型系统', link: '/blog/rust/types.md' },
            { text: '语法规则', link: '/blog/rust/rules.md' }
          ]
        },
        {
          text: 'Webpack',
          collapsed: false,
          items: [
            { text: 'Webpack配置', link: '/blog/webpack/index.md' }
          ]
        },
        {
          text: 'Nginx部署',
          collapsed: false,
          items: [
            { text: '路由优先级', link: '/blog/nginx/location.md' },
            { text: '代理示例', link: '/blog/nginx/jsdelivr.md' }
          ]
        },
        {
          text: '其他',
          collapsed: true,
          items: [
            { text: '练习用例', link: '/blog/practice.md' },
            { text: '希腊字母', link: '/blog/symbol/greek_letter.md' },
            { text: '英语符号', link: '/blog/symbol/english_symbols.md' }
          ]
        }
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hickiy' }]
  }
});
