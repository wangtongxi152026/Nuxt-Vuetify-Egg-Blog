/*
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2022-11-14 15:19:40
 * @LastEditors: wangtongxi
 * @LastEditTime: 2022-11-14 15:28:19
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
