const { resolve, join, dirname } = require("path")
const fs = require("fs")
const sidebar = []
const root = join(__dirname, "../")
function resolveSidebar1(sidebar, path) {
  const files = fs.readdirSync(path)
  for (const file of files) {
    console.log(file)
    if (!/^\w+/.test(file) || /node_module/.test(file)) {
      continue
    }
    const side = {}
    const name = file.split(".")[0]
    side.title = name
    if (
      name.toLowerCase().includes("readme") ||
      name.toLowerCase().includes("index")
    ) {
      side.path = path.replace(root, "") + "/"
    } else {
      side.path = path.replace(root, "") + "/" + name
    }
    if (fs.lstatSync(path + "/" + file).isDirectory() && /^\w+/.test(file)) {
      console.log(sidebar)
      resolveSidebar1((side.children = []), path + "/" + file)
    }
    sidebar.push(side)
  }
}

function resolveSidebar(path) {
  const files = fs.readdirSync(path)
  for (const file of files) {
    if (!/^\w+/.test(file) || /node_module/.test(file)) {
      continue
    }
    if (fs.lstatSync(path + "/" + file).isDirectory() && /^\w+/.test(file)) {
      resolveSidebar(path + "/" + file)
    } else {
      const side = {}
      const name = file.split(".")[0]
      side.title = name
      if (
        name.toLowerCase().includes("readme") ||
        name.toLowerCase().includes("index")
      ) {
        sidebar.push(path.replace(root, "") + "/")
      } else {
        sidebar.push(path.replace(root, "") + "/" + name)
      }
      if (fs.lstatSync(path + "/" + file).isDirectory() && /^\w+/.test(file)) {
        resolveSidebar(path + "/" + file)
      }
    }
  }
}

resolveSidebar(root)

// const sidebar = [
//   '/',
//   '/api/',
//   '/guide/',
//   '/guide/one',
// ];

module.exports = {
  base: "/react-source-read/",
  title: "React 源码阅读",
  description: "React 源码阅读",
  // dest: './dist',
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
      const { alias = {} } = config.resolve
      config.resolve.alias = {
        ...alias,
        "@img": resolve(__dirname, "public/img")
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
    // sidebar: 'auto',
    // sidebar: ["/", "/guide/one", ["/api", "React API"]],
    repo: "daixiongsheng/react-source-read",
    repoLabel: "查看源码",
    lastUpdated: "Last Updated"
    // locales: {
    //   "/": {
    //     selectText: "选择语言",
    //     label: "简体中文",
    //     smoothScroll: true,
    //     // Service Worker 的配置
    //     serviceWorker: {
    //       updatePopup: {
    //         message: "发现新内容可用.",
    //         buttonText: "刷新"
    //       }
    //     },
    //     nav: [
    //       {
    //         text: 'Guide',
    //         link: '/guide/'
    //       },
    //       {
    //         text: 'Migrating from v14',
    //         link: '/migrating.md'
    //       }
    //     ],
    //     sidebar: [
    //       '/',
    //       '/guide/',
    //       '/guide/one',
    //       '/api/'
    //     ]
    //   },
    //   "/en/": {
    //     selectText: "Languages",
    //     label: "English",
    //     ariaLabel: "Languages",
    //     editLinkText: "Edit this page on GitHub",
    //     serviceWorker: {
    //       updatePopup: {
    //         message: "New content is available.",
    //         buttonText: "Refresh"
    //       }
    //     },
    //     algolia: {},
    //     nav: [{ text: "Nested", link: "/nested/", ariaLabel: "Nested" }],
    //     sidebar: {
    //       "/": [
    //         /* ... */
    //       ],
    //       "/nested/": [
    //         /* ... */
    //       ]
    //     }
    //   }
    // }
  }
  // locales: {
  //   // 键名是该语言所属的子路径
  //   // 作为特例，默认语言可以使用 '/' 作为其路径。
  //   "/": {
  //     lang: "zh-CN", // 将会被设置为 <html> 的 lang 属性
  //     title: "react 源码阅读",
  //     description: "react 源码阅读"
  //   },
  //   "/en/": {
  //     lang: "en-US",
  //     title: "react source code read",
  //     description: "react source code read"
  //   }
  // }
}
