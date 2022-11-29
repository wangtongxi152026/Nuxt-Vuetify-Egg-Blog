<template>
  <div class="progress-bar" ref="progressBar" @click="barClick">
    <!--总进度-->
    <div class="bar-inner">
      <!-- 进度值1（歌曲播放进度） -->
      <div class="progress" ref="progress"></div>
      <!-- 进度值2（歌曲缓冲进度） -->
      <div ref="cacheProgress" class="cacheProgress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="dotStart"
        @touchmove="dotMove"
        @touchend="dotEnd"
        @mousedown="dotStart"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const DOT_WIDTH = 15;
export default {
  name: 'ProgressBar',
  props: {
    // 音乐进度
    percent: {
      type: Number,
      default: 0
    },
    // 缓存进度
    cachePercent: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addEvents();
      const barWidth = this.$refs.progressBar.clientWidth - DOT_WIDTH;
      const offsetWidth = this.percent * barWidth;
      this._doMove(offsetWidth);
    });
  },
  beforeDestroy() {
    this.removeEvents();
  },
  watch: {
    percent(newPercent) {
      if (newPercent > 1) {
        newPercent = 1;
      }
      if (newPercent >= 0 && !this.touch.status) {
        // 总宽度
        const barWidth = this.$refs.progressBar.clientWidth - DOT_WIDTH;
        const offsetWidth = newPercent * barWidth;
        this._doMove(offsetWidth);
      }
    },
    // 进度值二（歌曲缓冲进度用）
    cachePercent(newValue) {
      const offsetWidth = this.$refs.progressBar.clientWidth * newValue;
      this.$refs.cacheProgress.style.width = `${offsetWidth}px`;
    }
  },
  methods: {
    // 添加绑定事件
    addEvents() {
      document.addEventListener('mousemove', this.dotMove);
      document.addEventListener('mouseup', this.dotEnd);
    },
    // 移除绑定事件
    removeEvents() {
      document.removeEventListener('mousemove', this.dotMove);
      document.removeEventListener('mouseup', this.dotEnd);
    },
    barClick(e) {
      // 相对于视口的左上角位置而言的。
      const DOMReact = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - DOMReact.left;
      this._doMove(offsetWidth);
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._commitPercentChange();
    },
    dotStart(e) {
      this.touch.status = true;
      this.touch.startX = e.clientX || e.touches[0].pageX;
      //
      this.touch.left = this.$refs.progress.clientWidth;
    },
    dotMove(e) {
      if (!this.touch.status) {
        return;
      }
      e.preventDefault();
      let endX = e.clientX || e.touches[0].pageX;
      let dist = endX - this.touch.startX;
      // 运动距离
      let offsetWidth = Math.min(
        // 进度条总长-按钮尺寸
        this.$refs.progressBar.clientWidth - DOT_WIDTH,
        Math.max(0, this.touch.left + dist)
      );
      // 开始运动
      this._doMove(offsetWidth);
      this._commitPercentChange();
    },
    dotEnd() {
      // 拖动结束执行播放 或者 音量改变
      this.touch.status = false;
    },
    //运动函数
    _doMove(offsetWidth) {
      // 进度条宽度变化
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
    },
    // 修改percent
    _commitPercentChange() {
      const barWidth = this.$refs.progressBar.clientWidth - DOT_WIDTH;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('percentChange', percent);
    }
  },
  data() {
    return {
      touch: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的X坐标
        left: 0 // 记录当前已经移动的距离
      }
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// @import '~common/stylus/variable'
.progress-bar
  height 30px
  cursor pointer
  .bar-inner
    position relative
    top 13px
    height 4px
    border-radius 3px
    background hsla(0, 0%, 100%, 0.6)
    .progress
      position absolute
      height 100%
      border-radius 3px
      background #FF9800
      z-index 1
    .cacheProgress
      position absolute
      height 100%
      border-radius 3px
      background #525252
    .progress-btn-wrapper
      position absolute
      left 0px
      top -13px
      width 30px
      height 30px
      transition: all 0.5s
      .progress-btn
        position relative
        top 7.5px
        width 15px
        height 15px
        border 5px solid hsla(0, 0%, 100%, 0.5)
        border-radius 50%
        background orange
</style>
