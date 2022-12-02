// 当前音乐
import {
  getUId,
  getMode,
  getVolume,
  getHistoryList,
  getcurTime
} from '~/plugins/storage.js';
const _getHistory = () => {
  return getHistoryList() ?? [];
};
export const audio = state => state.audio;
export const playing = state => state.playing;
export const playlist = state => state.playlist;
export const sequenceList = state => state.sequenceList;
export const currentIndex = state => state.currentIndex;
export function mode(state) {
  const mode = getMode();
  // debugger;
  console.log(mode, state.mode);
  return mode || state.mode;
}

export const currentSong = state => {
  if (state.currentIndex !== -1 && state.playlist.length) {
    return state.playlist[state.currentIndex];
  }
  return _getHistory()[0] || {};
};
export const currentTime = state => getcurTime() || state.currentTime;

export const volume = state => {
  const volume = getVolume();
  return volume || state.volume;
};

export const historyList = state => {
  if (!!state.historyList.length) {
    return state.historyList;
  }
  return _getHistory();
};
export const uid = state => getUId() || state.uid;
