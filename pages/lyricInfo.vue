<template>
  <!-- <div :style="{'height':getTabHeight}"> -->
  <div>
    <div class="musicCd">
      <!-- 支架 -->
      <img class="play-bar-support" src="~/assets/image/play-bar-support.png" />
      <img :class="{playing}" class="play-bar" src="~/assets/image/play-bar.png" />
      <div class="img-outer-border" ref="disc">
        <div :class="{paused: !playing}" class="img-outer elevation-1" ref="discRotate">
          <v-avatar class="img-wrap" size="130">
            <img :src="musicPicUrl" />
          </v-avatar>
        </div>
      </div>
    </div>

    <v-row>
      <v-col cols="12">
        <div
          ref="musicLyric"
          class="lyric"
          :class="$vuetify.breakpoint.smAndDown?'smHeight':'lgHeight'"
        >
          <Scroll :data="lyric.length" ref="musicScroll">
            <div class="lyric-items body-2">
              <template v-if="lyric.length">
                <p
                  :class="{activeLyric:lyricIndex===index}"
                  v-for="(item,index) in lyric"
                  :key="index"
                  ref="lyrics"
                >{{ item.text }}</p>
              </template>
              <p class="align" v-else-if="!currentSong.id">没有在播放音乐哦</p>
              <p class="align" v-else-if="nolyric">该歌曲没有歌词~</p>
              <p class="align" v-else>歌词出现了惜败。。。</p>
            </div>
          </Scroll>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Scroll from "~/components/Music/Scroller";
import { mapState, mapGetters } from "vuex";
import { getLyric } from "@/api";
import { parseLyric } from "~/plugins/util.js";

export default {
  components: { Scroll },
  data() {
    return {
      lyric: [], //歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      top: 0 // 歌词居中
    };
  },
  mounted() {
    // 开局加载歌词
    this._getLyric(this.currentSong.id);
    // window.addEventListener('resize', () => {
    //   clearTimeout(this.resizeTimer)
    //   this.resizeTimer = setTimeout(() => this.clacTop(), 60)
    // })
    // this.$nextTick(() => this.clacTop())
  },
  computed: {
    ...mapState("music", ["playing", "currentTime"]),
    ...mapGetters("music", ["currentSong"]),

    getTabHeight() {
      return this.$vuetify.breakpoint.smAndDown
        ? "calc(100vh - 80px - 112px)"
        : "calc(100vh - 336px)";
    },
    musicPicUrl() {
      return this.currentSong.image
        ? `${this.currentSong.image}?param=150y150`
        : require("~/assets/image/player_cover.png");
    }
  },
  watch: {
    // 获取lyricIndex
    currentTime(newTime) {
      if (this.nolyric) {
        return;
      }
      let lyricIndex = 0;
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndex = i;
        }
      }
      this.lyricIndex = lyricIndex;
      // 时间干煸
    },
    lyricIndex(newIndex, oldIndex) {
      if (newIndex !== oldIndex) {
        this.scrollToCurLyric();
      }
    },
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        // 当在 playlist为空时，无歌词
        return;
      }
      if (newSong.id === oldSong.id) {
        // 当单曲循环时，歌词不变化
        return;
      }
      this.lyric = [];
      this.$nextTick(() => this._getLyric(newSong.id));
    }
  },

  methods: {
    scrollToCurLyric() {
      if (this.lyricIndex) {
        const { lyrics, musicScroll } = this.$refs;
        if (lyrics && lyrics[this.lyricIndex]) {
          this.$nextTick(() => {
            musicScroll
              .getScroller()
              .scrollToElement(lyrics[this.lyricIndex], 600, 0, true);
          });
        }
      }
    },
    // 计算歌词居中的 top值
    clacTop() {
      const dom = this.$refs.musicLyric;
      if (window.getComputedStyle(dom).display === "none") {
        return;
      }
      // 歌词半瓶时的高度
      this.top = Math.floor(dom.offsetHeight / 36 / 2);
    },

    _getLyric(id) {
      getLyric(id).then(res => {
        if (res.status === 200) {
          if (res.data.nolyric) {
            this.nolyric = true;
          } else {
            this.nolyric = false;
            this.lyric = parseLyric(res.data.lrc.lyric);
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.smHeight {
  height: calc(100vh - 80px - 64px - 250px);
}
.lgHeight {
  height: calc(100vh - 224px - 64px - 250px);
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
.musicCd {
  position: relative;
  padding-top: 50px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  .play-bar-support {
    position: absolute;
    left: 50%;
    top: -10px;
    width: 20px;
    height: 20px;
    z-index: 2;
  }
  .play-bar {
    width: 70px;
    height: 105px;
    position: absolute;
    top: 0;
    left: calc(50% + 6px);

    z-index: 1;
    transform-origin: 0 0;
    transform: rotate(-30deg);

    transition: all 0.3s;
    &.playing {
      transform: rotate(3deg);
    }
  }

  .img-outer-border {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 8px solid hsla(0, 0%, 100%, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    .img-outer {
      width: 185px;
      height: 185px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url(~@/assets/image/boder.png) no-repeat;
      background-position: -7px;
      animation: rotate 20s linear infinite;
      &.paused {
        animation-play-state: paused;
      }
    }
  }
}
.lyric {
  overflow: hidden;
  text-align: center;
  -webkit-mask-image: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0) 0,
    hsla(0, 0%, 100%, 0.6) 15%,
    #fff 25%,
    #fff 75%,
    hsla(0, 0%, 100%, 0.6) 85%,
    hsla(0, 0%, 100%, 0)
  );
  .lyric-items {
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s linear;
    .align {
      margin-top: 50%;
    }
    .activeLyric {
      color: orange;
    }
  }
}
</style>
