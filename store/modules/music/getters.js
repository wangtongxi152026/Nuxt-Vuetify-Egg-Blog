
// 当前音乐

export const currentSong = state => {
  return state.playlist[state.currentIndex] || state.historyList[0] || {}
}

export const playlist = state => state.playlist



