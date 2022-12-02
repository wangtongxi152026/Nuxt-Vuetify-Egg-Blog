/*
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2022-11-14 15:19:40
 * @LastEditors: wangtongxi
 * @LastEditTime: 2022-12-02 17:34:39
 */
const prefix = 'iconfont icon-';
export const items = () => [
  {
    icon: prefix + 'shijianzhou',
    text: '播放列表',
    route: '/music/playlist'
  },
  {
    icon: prefix + 'tuijian',
    text: '推荐歌单',
    route: '/music'
  },
  {
    icon: prefix + 'login',
    text: '我的歌单',
    route: '/music/userlist'
  },
  {
    icon: prefix + 'history',
    text: '最近播放',
    route: '/music/history'
  },
  {
    icon: prefix + 'sousuo',
    text: '搜歌',
    route: '/music/search'
  }
];
export const menusData = () => [
  {
    icon: 'mdi-home',
    title: '首页',
    to: '/'
  },
  {
    group: '/music',
    icon: 'mdi-music',
    title: '音乐',
    children: [
      { icon: prefix + 'tuijian', title: '推荐音乐', to: '/music' },
      {
        icon: prefix + 'login',
        title: '我的音乐',
        to: '/music/userlist'
      },
      { icon: prefix + 'sousuo', title: '搜索音乐', to: '/music/search' },
      {
        icon: prefix + 'history',
        title: '刚刚听过',
        to: '/music/history'
      },
      {
        icon: prefix + 'bofangliebiao',
        title: '播放列表',
        to: '/music/playlist'
      }
    ]
  },
  {
    icon: 'mdi-chart-timeline-variant',
    title: '关于本站',
    to: '/timeline'
  },
  {
    icon: 'mdi-calendar-range',
    title: '给我留言',
    to: '/message'
  }
];
export const LISTLOOP_INDEX = 0;
export const SEQUENCE_INDEX = 1;
export const LOOP_INDEX = 2;
export const RANDOM_INDEX = 3;
// 默认分页数量
export const defaultLimit = 30;
/**
 *
 * 播放模式
 * listLoop: 列表循环
 * sequsence：顺序
 * loop: 单曲循环
 * random: 随机
 */
export const playMode = [
  {
    code: 0,
    icon: 'iconfont icon-icon-',
    name: '列表循环'
  },
  {
    code: 1,
    icon: 'iconfont icon-shunxu',
    name: '顺序播放'
  },
  {
    code: 2,
    icon: 'iconfont icon-danquxunhuan',
    name: '单曲循环'
  },
  {
    code: 3,
    icon: 'iconfont icon-suijibofang',
    name: '随机播放'
  }
];
