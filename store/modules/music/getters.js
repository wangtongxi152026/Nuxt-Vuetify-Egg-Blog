// 当前音乐
import {
  getUId,
  getMode,
  getVolume,
  getHistoryList,
  getcurTime
} from '~/plugins/storage.js';
export const currentSong = state => {
  return state.playlist[state.currentIndex] || state.historyList[0] || {};
};

export const audio = state => state.audio;
export const playing = state => state.playing;
export const playlist = state => state.playlist;
export const sequenceList = state => state.sequenceList;
export const currentIndex = state => state.currentIndex;

export const currentTime = state => getcurTime() || state.currentTime;
export const mode = state => getMode() || state.mode;
export const volume = state => getVolume() || state.volume;
export const historyList = state => getHistoryList() || state.historyList;
export const uid = state => getUId() || state.uid;
