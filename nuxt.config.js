const colors = require('vuetify/es5/util/colors').default;
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'zh'
    },
    title: 'wangtongxi | 关注前端技术及互联网的个人网站',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no'
      },

      { name: 'author', content: 'wangtongxi|王同喜|1520268401@qq.com|tony' },

      {
        hid: 'keywords',
        name: 'keywords',
        content:
          '王同喜的个人网站,wangtongxi,开源网站,博客,个人网站,前后端分离,音乐,前端技术,vue ssr,nodejs项目,react,egg,1520268401,nuxt，听歌'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '王同喜的个人网站,包含音乐推荐,用于分享、记录、交流和学习，基于nuxt ssr首屏服务器端渲染 ⚡,希望可以帮助到小伙伴们。'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1486900_qbztft3ujyf.css'
      },

      {
        rel: 'stylesheet',
        href:
          '//cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
      }
    ]
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  // router: {
  //   middleware: 'auth'
  //   // middleware: 'axiosMiddle'
  // },
  loading: { color: '#80bd01' },
  plugins: [
    // { src: '~/plugins/axios' },
    {
      src: '~/plugins/message',
      ssr: false
    },
    '~plugins/filters',
    { src: '~plugins/vue-lazyload', ssr: false },
    { src: '~plugins/fastclick', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */

  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  axios: {
    proxy: true // 表示开启代理
  },
  modules: ['@nuxtjs/axios'],
  proxy: {
    '/musc': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/musc': '' }
    },
    '/blog': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/blog': '' }
    }
  },

  env: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],

    theme: {
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  server: {
    port: 3002, // default: 3000,修改为了3002
    host: 'localhost' // default: localhost
  },
  // other configs,其他的配置,没有做任何的变化

  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    // 开启打包分析
    analyze: true,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
};
