import { playMode } from '~/plugins/config.js'





import { getUId, getMode, getVolume, getHistoryList, getcurTime } from '~/plugins/storage.js'

const LISTLOOP_INDEX = 0

const state = {

  audio: null,//播放器
  playing: false,//播放状态
  playlist: [],//播放列表
  sequenceList: [],//顺序列表
  currentIndex: -1, // 当前音乐索引
  currentTime: getcurTime() || 0, // 当前音乐时间
  mode: getMode() || playMode[LISTLOOP_INDEX].code, //默认 列表循环 播放
  volume: getVolume() || 0.2,
  historyList: getHistoryList() || [],
  uid: getUId() || '' // 网易云用户UID

}
export default state
