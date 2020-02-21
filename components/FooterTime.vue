<template>
  <div>

    <span class="my-face mx-1 font-weight-regular">(●'◡'●)ﾉ</span>

    <span class="mx-1 body-2">网站稳定运行 :</span>

    <span class="body-2">
      <font class="timeColer">{{daysold}}</font> 天
      <font class="timeColer">{{hrsold}}</font> 时
      <font class="timeColer">{{minsold}}</font> 分
      <font class="timeColer">{{seconds}}</font> 秒
    </span>
  </div>
</template>

<script>
let BirthDay = new Date("11/01/2019 0:0:0");
export default {
  name: '',
  data () {
    return {
      timer: null,
      timeColor: 'orange',
      daysold: '',
      hrsold: '',
      minsold: '',
      seconds: ''
    }
  },
  mounted () {
    this.showAge()
  },
  beforeDestroy () {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    showAge () {
      let today = new Date();
      // 时间戳
      let timeold = (today.getTime() - BirthDay.getTime());

      let msPerDay = 24 * 60 * 60 * 1000
      // 时间戳===>天
      let e_daysold = timeold / msPerDay
      // 天数取整
      this.daysold = Math.floor(e_daysold);
      // 余下天数===>小时
      let e_hrsold = (e_daysold - this.daysold) * 24;
      // 小时取整
      this.hrsold = Math.floor(e_hrsold);
      // 余下天数===>分钟
      let e_minsold = (e_hrsold - this.hrsold) * 60;

      this.minsold = (Math.floor((e_hrsold - this.hrsold) * 60) + '').padStart(2, '0');
      this.seconds = (Math.floor((e_minsold - this.minsold) * 60) + '').padStart(2, '0');

      this.timer = setTimeout(() => {
        this.showAge()
      }, 1000);
    }
  },

}
</script>

<style scoped>
.timeColer {
  color: #7ec699;
}
.my-face {
  color: orange;
  animation: my-face 5s infinite ease-in-out;
  display: inline-block;
}

@keyframes my-face {
  2%,
  24%,
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4%,
  68%,
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  38%,
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8%,
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10%,
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12%,
  64%,
  78%,
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14%,
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18%,
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20%,
  36%,
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  26%,
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30%,
  40%,
  62%,
  76%,
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32%,
  34%,
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44%,
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  48%,
  74%,
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  52%,
  56%,
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0);
  }
}
</style>
