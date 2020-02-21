
let _storage
if (process.client) {
  _storage = window.localStorage
} else {
  _storage = null
}

const storage = {
  get (key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    } else {
      return null
    }
  },
  set (key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    } else {
      return null
    }
  },
  clear (key) {
    if (_storage) {
      _storage.removeItem(key)
    } else {
      return null
    }
  }
}




/**
 * 播放模式
 * @type    MODE_KEY：key值
 *          HistoryListMAX：最大长度
 */
const MODE_KEY = '__player_mode__'
// 获取播放模式
export function getMode () {
  return Number(storage.get(MODE_KEY, null))
}
// 存储播放模式
export function setMode (mode) {
  storage.set(MODE_KEY, mode)
  return mode
}

/**
 * 网易云用户uid
 * @type UID_KEY：key值
 */
const UID_KEY = '__player_UID__'
// 获取用户uid
export function getUId () {
  return Number(storage.get(UID_KEY, null))
}
// 存储用户uid
export function setUId (uid) {
  storage.set(UID_KEY, uid)
  return uid
}


/**
 * 歌曲时间
 * @type UID_KEY：key值
 */
const curTime_KEY = '__player_curTime__'
// 获取用户uid
export function getcurTime () {
  return Number(storage.get(curTime_KEY, null))
}
// 存储用户uid
export function setcurTime (curTime) {
  storage.set(curTime_KEY, curTime)
  return curTime
}



/**
 * 音量
 * @type VOLUME_KEY：key值
 */
const VOLUME_KEY = '__Player_volume__'
// 获取音量
export function getVolume () {
  const volume = storage.get(VOLUME_KEY, null)
  return Number(volume)
}
// 存储音量
export function setVolume (volume) {
  storage.set(VOLUME_KEY, volume)
  return volume
}

/**
 * 音量
 * @type CURSONG_KEY：key值
 */
const CURSONG_KEY = '__Player_curSong__'
//获取上次音乐
export function getCurSong () {
  const curSong = storage.get(CURSONG_KEY, null)
  return curSong
}
// 存储当前音乐
export function setCurSong (curSong) {
  storage.set(VOLUME_KEY, curSong)
  return curSong
}


/**
 * 播放历史
 * @type    HISTORYLIST_KEY：key值
 *          HistoryListMAX：最大长度
 */
const HISTORYLIST_KEY = '__Player_historyList__'
const HistoryListMAX = 100
// 获取播放历史
export function getHistoryList () {
  return storage.get(HISTORYLIST_KEY)
}
// 更新播放历史
export function setHistoryList (music) {
  let list = storage.get(HISTORYLIST_KEY)
  const index = list.findIndex(item => item.id === music.id)
  // 找到&&与第一位重复，直接返回
  if (index === 0) {
    return list
  }
  // 找到&&不与第一位重复，删除旧的位置
  if (index > 0) {
    list.splice(index, 1)
  }
  // 在第一位添加新的
  list.unshift(music)
  if (HistoryListMAX && list.length > HistoryListMAX) {
    list.pop()
  }
  storage.set(HISTORYLIST_KEY, JSON.stringify(list))
  return list
}

// 删除一条
export function removeOneHistoryList (removedList) {
  storage.set(HISTORYLIST_KEY, JSON.stringify(removedList))
  return removedList
}

// 清空
export function clearHistoryList () {
  storage.clear(HISTORYLIST_KEY)
  return []
}