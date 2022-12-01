import Vue from 'vue';
import { formatTime, format, numberFormat } from '~/plugins/util';

// 全局过滤器  （'名字'，函数）
Vue.filter('formatTime', formatTime);
Vue.filter('format', format);
Vue.filter('numberFormat', numberFormat);
