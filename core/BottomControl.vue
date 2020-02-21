<template>
  <v-bottom-navigation
    :class="{'disable':!songReady||!currentSong.id}"
    app
    min-height="80"
    class="controler"
  >
    <div class="music-bar d-flex justify-space-around">
      <v-icon class="iconfont icon-shangyishou" @click="prev"></v-icon>

      <v-icon :class="getPlayIcon" @click="play"></v-icon>

      <v-icon class="iconfont icon-xiayishou" @click="next"></v-icon>
    </div>

    <div class="progress-wrapper">
      <span class="time time-l">{{currentTime|formatTime}}</span>

      <div class="progress-bar-wrapper">
        <ProgressBar :cachePercent="cache" :percent="percentMusic" @percentChange="changeProgress"></ProgressBar>
      </div>

      <span
        class="time time-r"
        v-if="currentSong.duration"
      >{{ currentSong.duration % 3600 | formatTime }}</span>
      <span class="time time-r" v-else>00:00</span>
    </div>

    <div class="rightIcon d-flex align-center">
      <v-icon
        size="25"
        v-if="$vuetify.breakpoint.smAndDown"
        class="iconfont icon-ci mr-2 mb-1"
        @click="$router.push(`/music/lyric/`)"
      ></v-icon>

      <v-icon
        class="iconfont icon-pinglun"
        @click="$router.push(`/music/comment/${currentSong.id}`)"
      ></v-icon>

      <Volume v-if="$vuetify.breakpoint.smAndUp" @volumeChange="changeVolume"></Volume>
    </div>

    <v-tooltip open-on-click top>
      <template v-slot:activator="{ on }">
        <v-icon class="leftIcon" v-on="on" :class="getModeIcon" @click="modeChange"></v-icon>
      </template>
      <span>{{getModeText}}</span>
    </v-tooltip>
  </v-bottom-navigation>
</template>

<script>
import { playMode } from "~/plugins/config.js";
import { Conveny } from "~/plugins/audioConveny";
import Volume from "~/components/Music/Volume";
import ProgressBar from "~/components/Music/ProgressBar";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { shuffle, debounce } from "~/plugins/util.js";

const LISTLOOP_INDEX = 0;
const SEQUENCE_INDEX = 1;
const LOOP_INDEX = 2;
const RANDOM_INDEX = 3;

export default {
  components: { ProgressBar, Volume },
  mounted() {
    if (process.client) {
      this.$nextTick(() => {
        Conveny.initAudio(this);
        // this.initKeyDown();
        if (!this.currentSong) {
          return;
        } else {
          this.songReady = true;
          this.audio.src = this.currentSong.url;
          this.audio.currentTime = this.currentTime;
        }
        // this.changeVolume(this.volume)
        window.addEventListener("beforeunload", this.renewSong);
      });
    }
  },
  beforeDestroy() {
    this.renewSong();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.renewSong);
  },

  computed: {
    ...mapState("music", [
      "playing",
      "mode",
      "volume",
      "audio",
      "playlist",
      "currentIndex",
      "currentTime",
      "historyList",
      "sequenceList"
    ]),
    ...mapGetters("music", ["currentSong"]),
    // 音乐的进度百分比
    percentMusic() {
      return this.currentTime / this.currentSong.duration;
    },
    // 当前播放模式
    currentMode() {
      return playMode[this.mode];
    },
    // 暂停播放的图标
    getPlayIcon() {
      return this.playing
        ? "Xfont iconfont icon-zanting"
        : "Xfont iconfont icon-bofang";
    },
    // 播放模式的图标
    getModeIcon() {
      return this.currentMode.icon;
    },
    //播放模式的提示
    getModeText() {
      return this.currentMode.name;
    },
    musicPicUrl() {
      return this.currentSong.image
        ? `${this.currentSong.image}?param=150y150`
        : null;
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        // 当在 playlist为空时
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }
      this.noACtsetCurTime(0);
      // this.currentTime = 0
      this.cache = 0;
      this.$nextTick(() => {
        debounce((this.audio.src = newSong.url), 5000);
        this.audio.play();
      });
    },

    playing(newPlaying) {
      this.$nextTick(() => {
        if (newPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
          this.songReady = true;
        }
        // newPlaying ? this.audio.play() : this.audio.pause()
      });
    }
  },
  methods: {
    renewSong() {
      this.setCurrentTime(this.audio.currentTime);
    },
    ...mapMutations("music", {
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENT_INDEX",
      noACtsetCurTime: "SET_CURRENT_Time"
    }),
    ...mapActions("music", [
      "setPlayMode",
      "setPlaylist",
      "setPlayVolume",
      "setPlayHistory",
      "setCurrentTime"
    ]),
    // 通过用户滑动进度条百分比决定 改变currettime改变进度
    changeProgress(percent) {
      this.audio.currentTime = this.currentSong.duration * percent;
    },
    changeVolume(percent) {
      console.log("changeVolume", this.volume);
      percent === 0 ? (this.isMute = true) : (this.isMute = false);
      this.setPlayVolume(percent);
      this.audio.volume = percent;
    },
    initKeyDown() {
      document.onkeydown = e => {
        let v = this.volume;
        let plus = null;
        let reduce = null;
        switch (e.ctrlKey && e.keyCode) {
          case 32: // 播放暂停  空格
            this.play();
            break;
          case 37: // 上一曲 <——
            this.prev();
            break;
          case 39: // 下一曲 ——>
            this.next();
            break;

          case 38: // 音量+  up
            plus = Number((v += 0.1).toFixed(1));
            if (plus > 1) {
              plus = 1;
            }
            this.changeVolume(plus);
            break;
          case 40: // 音量- down
            reduce = Number((v -= 0.1).toFixed(1));
            if (reduce < 0) {
              reduce = 0;
            }
            this.changeVolume(reduce);
            break;
        }
      };
    },
    // 停止与播放
    play() {
      console.log(this.songReady);
      if (!this.songReady) {
        return;
      }
      this.setPlaying(!this.playing);
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      // 如果播放到了第一首&&顺序播放 就暂停（this.playlist.length + 1 === this.currentIndex）判断是不是就一手哥了
      if (
        this.playlist.length + 1 === this.currentIndex &&
        this.mode === playMode[SEQUENCE_INDEX].code
      ) {
        this.setCurrentIndex(-1);
        this.setPlaying(false);
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        // 果然处于暂停，歌曲就绪，就播放
        if (!this.playing) {
          this.setPlaying(true);
        }
        this.songReady = false;
      }
    },
    next() {
      console.log(this.songReady);
      if (!this.songReady) {
        return;
      }
      // 如果播放到了最后一首&&顺序播放 就暂停
      if (
        this.playlist.length - 1 === this.currentIndex &&
        this.mode === playMode[SEQUENCE_INDEX].code
      ) {
        this.setCurrentIndex(-1);
        this.setPlaying(false);
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        // 果然处于暂停，歌曲就绪，就播放
        if (!this.playing) {
          this.setPlaying(true);
        }
        this.songReady = false;
      }
    },
    loop() {
      // 进度归0，执行播放
      console.log(this.mode);
      this.audio.currentTime = 0;
      this.audio.play();
      console.log("setPlaying,loop");
      this.setPlaying(true);
    },
    // 切换播放顺序
    modeChange() {
      const mode = (this.mode + 1) % 4;
      console.log(mode);
      this.setPlayMode(mode);
      if (mode === playMode[LOOP_INDEX].code) {
        return;
      }

      let list = null;
      switch (mode) {
        case playMode[LISTLOOP_INDEX].code:
        case playMode[SEQUENCE_INDEX].code:
          list = this.sequenceList;
          break;
        // 随机模式 将顺序列表重新洗牌 生成无序列表
        case playMode[RANDOM_INDEX].code:
          list = shuffle(this.sequenceList);
          console.log(list);
          break;
      }
      this.resetCurrentIndex(list);
      this.setPlaylist(list);
    },
    // 切换播放模式 当前歌曲不变 在新列表中通过歌曲id选出当前歌曲 修改索引
    resetCurrentIndex(list) {
      const index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    }
  },
  data() {
    return {
      cache: 0, //缓存进度
      songReady: false, // 歌曲准备就绪？
      isMute: false // 是否静音
    };
  }
};
</script>

<style lang="stylus" scoped>
.disable {
  pointer-events: none;
}

.controler {
  background-image: url('~@/assets/image/body.png');
  background-repeat: repeat;
  background-position: top;
  background-attachment: scroll;
  height: 80px;
  color: orange;

  .leftIcon {
    position: absolute;
    bottom: 20%;
    left: 5vh;
  }

  .rightIcon {
    position: absolute;
    bottom: 20%;
    right: 5vh;
  }

  // 进度条
  .progress-wrapper {
    display: flex;
    align-items: flex-start;
    width: 90%;
    margin: 0 auto;

    .time {
      color: white;
      font-size: 12px;
      flex: 0 0 30px;
      line-height: 30px;
      width: 30px;

      &.time-l {
        margin-right: 8px;
      }

      &.time-r {
        margin-left: 8px;
      }
    }

    .progress-bar-wrapper {
      flex: 1;
    }
  }

  // 播放快进暂停
  .music-bar {
    position: absolute;
    bottom: 0px;
    left: calc(48vw - 95px);
    height: 60px;
    width: 190px;
  }

  .iconfont {
    color: orange;
    cursor: pointer;
    font-size: 28px;
  }

  .Xfont {
    font-size: 40px;
  }
}
</style> 
