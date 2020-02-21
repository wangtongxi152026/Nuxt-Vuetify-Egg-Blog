import Vue from 'vue'
import { formatTime } from '~/plugins/util'
import { format } from '~/plugins/util'

// 全局过滤器  （'名字'，函数）
Vue.filter('formatTime', formatTime)
Vue.filter('format', format)