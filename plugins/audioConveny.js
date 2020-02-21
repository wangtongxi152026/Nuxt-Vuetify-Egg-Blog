
import { playMode } from '~/plugins/config.js'
import { debounce } from '~/plugins/util.js'
const LOOP_INDEX = 2

export const Conveny = {
  initAudio (that) {
    let e = that.audio
    // 音频缓冲事件
    console.log(e,'onprogress');
    e.onprogress = () => {
      if (e.buffered.length > 0) {
        const duration = that.currentSong.duration
        let buffered = 0
        e.buffered.end(0)
        buffered = e.buffered.end(0) > duration ? duration : e.buffered.end(0)
        that.cache = buffered / duration
      }
    }
    e.onplay = () => {
      that.songReady = true
      if (that.historyList.length === 0 || that.currentSong.id !== that.historyList[0].id) {
        that.setPlayHistory(that.currentSong)
      }
    }
    // 监听当目前的播放位置已更改时 
    e.ontimeupdate = () => {
      that.noACtsetCurTime(e.currentTime)
      // that.currentTime = e.currentTime
    }
    // 音乐进度拖动大于加载时重载音乐
    e.onstalled = () => {
      console.log('debounce')
      e.load()
      that.setPlaying(false)
      debounce(that.setPlaying(true), 10)

    }
    // 当前音乐播放结束是触发
    e.onended = () => {
      console.log(that.mode);
      console.log('onended');
      if (that.mode === playMode[LOOP_INDEX].code) {
        console.log('loop');
        that.loop()
      } else {
        console.log('next');
        that.next()
      }
    }
    // 播放器暂停播放
  }
}