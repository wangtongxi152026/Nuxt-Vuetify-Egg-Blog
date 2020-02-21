const colors = require('vuetify/es5/util/colors').default;
const config = require('./config/api.config');
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1486900_hcwcfgwjxhv.css'
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1397212_iliqnod70q.css'
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
  //   middleware: 'axiosMiddle'
  // },
  loading: { color: '#80bd01' },
  plugins: [
    { src: '~/plugins/axios' },
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
