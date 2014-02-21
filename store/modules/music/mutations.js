/*
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:27:47
 * @LastEditors: wangtongxi
 * @LastEditTime: 2022-12-02 14:02:05
 */
import * as types from './mutation_types';

const mutations = {
  // 修改播放模式
  [types.SET_AUDIO](state, audio) {
    state.audio = audio;
  },
  // 修改播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing;
  },
  // 修改播放模式
  [types.SET_PLAYMODE](state, mode) {
    state.mode = mode;
  },
  // 修改音量
  [types.SET_VOLUME](state, volume) {
    state.volume = volume;
  },

  // 修改播放列表  组件，actions中调用
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist;
  },
  // 修改顺序列表  actions中调用
  [types.SET_SEQUENCE_LIST](state, sequenceList) {
    state.sequenceList = sequenceList;
  },
  // 修改历史歌单  actions中调用
  [types.SET_HISTORY_LIST](state, historyList) {
    state.historyList = historyList;
  },

  // 修改当前歌曲的索引
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex;
  },
  [types.SET_CURRENT_Time](state, currentTime) {
    state.currentTime = currentTime;
  },
  // 修改uid
  [types.SET_UID](state, uid) {
    state.uid = uid;
  },
  // 修改uid
  [types.SET_MUSICBG](state, payload) {
    state.musicBG = payload;
  },
  [types.SET_LOADING](state, payload) {
    state.loading = payload;
  },
  SetDeviceType(state, payload) {
    state.deviceType = payload;
  }
};

export default mutations;
