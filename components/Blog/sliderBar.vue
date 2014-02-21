<template>
  <v-card outlined>
    <div class="background"></div>
    <img :src="require('~/assets/avatar.jpg')" class="elevation-13 avatar" />
    <v-card-text class="text-center introduce">
      <h6 class="mb-1">写博客、记日志、听听音乐、鼓捣技术</h6>
      <h4 class="body-1 font-weight-light mb-3 black--text">把最实用的经验，分享给最需要的读者，希望每一位来访的朋友都能有所收获！</h4>

      <v-card-actions class="d-flex justify-center">
        <v-tooltip open-on-click top v-for="tip in tips" :key="tip.color">
          <template v-slot:activator="{ on }">
            <v-btn class="ml-2" v-on="on" small :color="tip.color" fab>
              <v-icon :class="tip.icon" />
            </v-btn>
          </template>
          <span>{{tip.text}}</span>
        </v-tooltip>
      </v-card-actions>
    </v-card-text>

    <v-card-actions>
      <v-btn text x-large font-weight-blod>评论112</v-btn>
      <v-spacer />
      <v-btn text x-large>文章{{total}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    total: 0
  },
  computed: {
    tips: () => [
      { color: '#ffeb3b', text: 'wangtongxi', icon: 'iconfont icon-google' },
      { color: '#4caf50', text: 'wz1520268401', icon: 'iconfont icon-weixin' },
      { color: '#a7ffeb', text: 'QQ:2661241813', icon: 'iconfont icon-qq' },
      { color: '#848f9a', text: 'https://github.com/wangtongxi152026', icon: 'iconfont icon-github' }
    ]
  },
}

</script>

<style lang="sass" scoped>
 
.background
  position: absolute
  border-radius: 7px 7px 0 0 !important
  width: 100%
  height: 220px
  display: inline-block
  background-size: cover
  background-position: center
  background-image: url('~@/assets/img15.jpg')
.avatar
  display: block
  border-radius: 50% !important
  position: relative
  width: 100px
  overflow: hidden
  top: 64px
  left: calc(  50% - 50px  )
.right
  // max-width: 360px
.introduce
  margin-top: 120px
 
</style>
