import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
// 图片懒加载

Vue.use(VueLazyload, {
  preLoad: 1,//预加载的宽高比
  attempt: 1,//图片加载失败时使用的图片源
  loading: require('~/assets/image/default.png'),//图片加载的路径
  error: require('~/assets/image/default.png'),//尝试加载次数
})