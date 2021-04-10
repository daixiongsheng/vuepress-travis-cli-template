const { resolve, join, dirname } = require("path")

const sidebar = [
  '/',
  '/guide/',
];

module.exports = {
  base: "/template/",
  title: "template",
  description: "template",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  configureWebpack: (config, isServer) => {
    return {
      resolve: {
        alias: {
          '@img': resolve(__dirname, 'public/img'),
        }
      }
    }
  },
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
  },
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: "/img/logo.png",
    sidebar,
    repo: "template",
    repoLabel: "查看源码",
    lastUpdated: "Last Updated"
  }
}
