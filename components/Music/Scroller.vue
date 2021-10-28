<template>
  <div class="scroller" ref="scroller">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"
import MouseWheel from "@better-scroll/mouse-wheel"
import Pullup from '@better-scroll/pull-up'
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
BScroll.use(Pullup)

const defaultOpt = {
  mouseWheel: true,
  click: true,
  scrollY: true,
  probeType: 3,
  slide: {
    loop: true,
    threshold: 100
  },
  // scrollX: true,
  // scrollY: false,
  // momentum: false,
  // bounce: false,
  // stopPropagation: true,

  pullUpLoad: {
    threshold: -50, // 当上拉距离超过90px时触发 pullingUp 事件
  },
  scrollbar: {
    interactive: true,
    fade: true
  }
}
export default {
  name: 'Scroller',
  mounted() {
    this.$nextTick(() => {
      if (!this.scroller) {
        this.scroller = new BScroll(this.$refs.scroller,
          Object.assign({}, defaultOpt, this.options)
        )
        this.$emit("init", this.scroller)
      }
    })
  },
  props: {
    data: { default: null },
    options: { type: Object, default: () => ({}) }
  },
  methods: {
    goTop() {
      this.scroller.scrollTo(0, 0)
    },
    getScroller() {
      return this.scroller
    },
    refresh() {
      this.$nextTick(() => {
        this.scroller.refresh()
      })
    },
  },
  watch: {
    'data': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log('Scroll组件,data:', newValue, oldValue);
          this.refresh()
        }
      }
    },
  }
}
</script>

<style lang="scss" >
.scroller {
  position: relative;
  overflow: hidden;
  height: 100%;
  .bscroll-indicator {
    width: 70% !important;
    border: none !important;
    background: inherit;
  }
}
</style>

