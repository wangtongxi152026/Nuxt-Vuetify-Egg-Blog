/*
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:27:47
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-10 10:16:25
 */
import { playMode } from '~/plugins/config.js';
import { getHistoryList } from '~/plugins/storage.js';
const LISTLOOP_INDEX = 0;

const state = () => ({
  loading: false, //播放器
  audio: null, //播放器
  playing: false, //播放状态
  playlist: [], //播放列表
  sequenceList: [], //顺序列表
  currentIndex: -1, // 当前音乐索引
  currentTime: 0, // 当前音乐时间
  mode: playMode[LISTLOOP_INDEX].code, //默认 列表循环 播放
  volume: 0.2,
  historyList: [],
  uid: '' // 网易云用户UID
});
export default state;
