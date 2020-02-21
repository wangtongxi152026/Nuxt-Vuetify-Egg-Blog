import * as types from './mutation_types'
import { playMode } from '~/plugins/config.js'
import { shuffle } from '~/plugins/util.js'

// import * as apis from '~/api'
import { formatTopSongs } from '~/plugins/song'
import {
  setMode,
  setVolume,
  setUId,
  setcurTime,
  setHistoryList,
  removeOneHistoryList,
  clearHistoryList
} from '~/plugins/storage'


const RANDOM_INDEX = 3

// 设置播放模式
export const setPlayMode = ({ commit }, mode) => {
  commit(types.SET_PLAYMODE, setMode(mode))
}
// 设置音量
export const setPlayVolume = ({ commit }, volume) => {
  commit(types.SET_VOLUME, setVolume(volume))
}
// 设置播放列表
export const setPlaylist = ({ commit }, list) => {
  console.log(list);
  commit(types.SET_PLAYLIST, list)
  // commit(types.SET_SEQUENCE_LIST, list)
}
// 移除一条播放列表
export const removeOnePlaylist = ({ commit, state }, item) => {

  let currentIndex = state.currentIndex

  // 镜像一份播放列表和顺序列表

  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()

  // 拿到需要删除歌曲 在（播放列表和顺序列表）中索引位置

  let pIndex = findIndex(playlist, item)
  let sIndex = findIndex(sequenceList, item)

  // 通过索引在从各自列表中删除

  playlist.splice(pIndex, 1)
  sequenceList.splice(sIndex, 1)

  // 重新设置播放列表和顺序列表

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }

}
// 设置历史列表
export const setPlayHistory = function ({ commit }, currentSong) {
  commit(types.SET_HISTORY_LIST, setHistoryList(currentSong))
}
// 移除一条播放历史
export const removeOneHistory = ({ commit }, removedHistoryList) => {
  commit(types.SET_HISTORY_LIST, removeOneHistoryList(removedHistoryList))
}
// 清空播放历史
export const clearHistory = function ({ commit }) {
  commit(types.SET_HISTORY_LIST, clearHistoryList())
}


function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
// 选择播放（会更新整个播放列表）
export const selectPlay = function ({ commit, state }, { list, index }) {

  commit(types.SET_SEQUENCE_LIST, list)

  if (state.mode === playMode[RANDOM_INDEX].code) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
}

// 设置Uid
export const setUseruid = ({ commit }, uid) => {
  commit(types.SET_UID, setUId(uid))
}

// 设置歌曲时间
export const setCurrentTime = ({ commit }, currentTime) => {
  commit(types.SET_CURRENT_Time, setcurTime(currentTime))
}
// 插入一条播放记录
export const insertOnePlay = ({ commit, state, getters }, { item }) => {

  // 镜像一份播放列表和顺序列表
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  //记录当前歌曲
  let currentSong = getters.currentSong

  // 在playlist中正在播放歌曲的索引
  let PlayCurIndex = state.currentIndex
  // 在sequence表中正在播放歌曲的索引
  let SeqCurIndex = findIndex(sequenceList, currentSong)

  // 查找当前列表中是否包含待插入的歌曲并返回其索引
  let pIndex = findIndex(playlist, item)
  let sIndex = findIndex(sequenceList, item)
  console.log('insertOnePlay:',item);
  // 如果在playlist中已经包含了这首歌
  if (pIndex > -1) {
    commit(types.SET_CURRENT_INDEX, pIndex)
  } else {
    PlayCurIndex++
    playlist.splice(PlayCurIndex, 0, item)
    commit(types.SET_CURRENT_INDEX, PlayCurIndex)
    commit(types.SET_PLAYLIST, playlist)
  }
  commit(types.SET_PLAYING, true)

  // 如果在在sequence中已经包含了这首歌
  if (sIndex > -1) {
    return
  } else {
    sequenceList.splice(SeqCurIndex + 1, 0, item)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
  }

}

// 清空播放列表
export const clearPlayList = function ({ commit }) {
  commit(types.SET_PLAYING, false)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
}


// api
// 歌单详情 客服端
export const _getPlaylistDetail = async function ({ commit }, id) {

  const res = await this.$axios.$get('/playlist/detail', { params: { id } })
  const list = formatTopSongs(res.playlist.tracks)

  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)

}

// 排行榜列表 
export async function getToplistDetail () {
  return await this.$axios.$get('/toplist/detail')

}


// 推荐歌单 
export async function getPersonalized () {
  return await this.$axios.$get('/personalized')
}
// 热搜 asyncdata
export async function searchHot () {
  return await this.$axios.$get('/search/hot')
}