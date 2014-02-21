<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-scroll" ref="slide">
        <div class="slide-banner-wrapper">

          <div v-for="(item,i) in items" :key='i' class="slide-item page1"
            :style='`backgroundImage:url("${item.src}")`'>
          </div>
          <!-- <div class="slide-item page2">page 2</div>
          <div class="slide-item page3">page 3</div>
          <div class="slide-item page4">page 4</div> -->
        </div>
      </div>
      <div class="docs-wrapper">
        <span class="doc" v-for="(item, index) in 4" :key="index"
          :class="{'active': currentPageIndex === index}"></span>
      </div>
    </div>

    <div class="next" @click="nextPage">
      <v-btn dark icon>
        <v-icon size='36'>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <div class="prev" @click="prePage">
      <v-btn dark icon>
        <v-icon size='36'>mdi-chevron-left</v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)

export default {
  data () {
    return {
      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    clearTimeout(this.playTimer)
    this.slide.destroy()
  },
  methods: {
    init () {
      clearTimeout(this.playTimer)
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,//设置可以横向滚动
        scrollY: false,//竖向滚动 
        slide: {
          loop: true,//是否自动播放
          threshold: 100
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
        probeType: 2
      })
      this.slide.on('scrollEnd', this._onScrollEnd)

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer)
      })
      // user touched the slide done
      this.slide.on('scrollEnd', () => {
        this.autoGoNext()
      })
      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
      this.autoGoNext()
    },
    nextPage () {
      this.slide.next()
    },
    prePage () {
      this.slide.prev()
    },
    _onScrollEnd () {
      this.autoGoNext()
    },
    autoGoNext () {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        this.nextPage()
      }, 4000)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.slide-banner
  position relative
  &:hover .docs-wrapper
    display block
  .banner-wrapper

    position relative
  .slide-banner-scroll
    min-height 1px
    overflow hidden
  .slide-banner-wrapper
    // height 200px
    
    border-radius 0.6rem

    white-space nowrap
    font-size 0
    .slide-item
      display inline-block
      height 500px
      width 100%
      line-height 200px
      text-align center
      font-size 26px
      &.page1
        background-position center center
        background-size cover
  .docs-wrapper
    display none
    position absolute
    bottom 4px
    left 50%
    transform translateX(-50%)
  .doc
    display inline-block
    margin 0 4px
    width 8px
    height 8px
    border-radius 50%
    background #eee
    &.active
      width 20px
      border-radius 5px
  .prev, .next
    background rgba(0, 0, 0, 0.3)
    border-radius 50%
    position absolute
    margin 0 16px
    top calc(50% - 20px)
    z-index 1
  .next
    right 0
</style>


