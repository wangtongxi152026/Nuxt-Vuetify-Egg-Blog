import { playMode } from '~/plugins/config.js';
import { debounce, throttle } from '~/plugins/util.js';

const LOOP_INDEX = 2;
const setCurTime = that => {
  that.noACtsetCurTime(that.audio.currentTime);
};
class Conveny {
  constructor(that) {
    this.audio = that.audio;
    if (this.audio) {
      // 音频缓冲事件
      console.log(this.audio, 'onprogress');
      this.audio.onprogress = () => {
        if (this.audio.buffered.length > 0) {
          const duration = that.currentSong.duration;
          let buffered = 0;
          this.audio.buffered.end(0);
          buffered =
            this.audio.buffered.end(0) > duration
              ? duration
              : this.audio.buffered.end(0);
          that.cache = buffered / duration;
        }
      };
      this.audio.onplay = () => {
        that.songReady = true;
        if (
          that.historyList.length === 0 ||
          that.currentSong.id !== that.historyList[0].id
        ) {
          that.setPlayHistory(that.currentSong);
        }
      };
      // 监听当目前的播放位置已更改时
      that.audio.addEventListener(
        'timeupdate',
        throttle(setCurTime.bind(that, that), 1000)
      );
      // 音乐进度拖动大于加载时重载音乐
      this.audio.onstalled = () => {
        console.log('debounce');
        this.audio.load();
        that.setPlaying(false);
        debounce(that.setPlaying(true), 10);
      };
      // 当前音乐播放结束是触发
      this.audio.onended = () => {
        console.log(that.mode);
        console.log('onended');
        if (that.mode === playMode[LOOP_INDEX].code) {
          console.log('loop');
          that.loop();
        } else {
          console.log('next');
          that.next();
        }
      };
      // 播放器暂停播放
    }
  }
}
export default class DellConveny extends Conveny {
  static instance;

  static getInstance(that) {
    if (!DellConveny.instance) {
      DellConveny.instance = new DellConveny(that);
    }
    return DellConveny.instance;
  }
  constructor(that) {
    super(that);
  }
}
