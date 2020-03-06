<template>
  <v-container class="comment pb-0" :style="{'height':getTabHeight}">
    <Scroll ref="Scroll" :data=" getListLength || getTabHeight" @init="pullUp">
      <div>
        <v-row>
          <v-col cols="12">
            <div class="title">
              精彩评论
              <v-icon color="orange" class="iconfont icon-qingzhu1 mb-2"></v-icon>
            </div>
            <div v-for="item in hotComments" :key="item.commentId">
              <CommentCard :item="item"></CommentCard>
            </div>
          </v-col>

          <v-col cols="12" class="py-0">
            <div class="title">
              最新评论
              <v-icon small color="info" class="iconfont icon-zuixinnewchunse"></v-icon>
            </div>
            <div v-for="item in newComments" :key="item.commentId">
              <CommentCard :item="item"></CommentCard>
            </div>
          </v-col>
        </v-row>
      </div>
    </Scroll>
  </v-container>
</template>

<script>
import { getComment } from '@/api'
import { mapGetters } from 'vuex'
import Scroll from '~/components/Music/Scroller'
import CommentCard from '~/components/Music/CommentCard'
import ismdAndUp from '~/components/Mixin/ismdAndUp'

export default {
  name: 'comment',
  components: { Scroll, CommentCard }, mixins: [ismdAndUp],
  created () {
    this._getComment()
  },
  layout: "music",
  // beforeRouteUpdate (to, from, next) {
  //   this.$nextTick(() => this._getComment(), this.$refs.Scroll.goTop())
  //   next()
  // },
  watch: {
    'currentSong.id' () {
      this.page = 0
      this.$router.push(`/music/comment/${this.currentSong.id}`)
      // this.$nextTick(() => this._getComment(), this.$refs.Scroll.goTop())
    }
  },
  data () {
    return {
      page: 0, // 分页
      hotComments: [], // 精彩评论
      newComments: [], // 最新评论
    }
  },
  computed: {
    ...mapGetters('music', ['currentSong']),
    getTabHeight () {
      return this.ismdAndUp ? 'calc(100vh - 336px)' : 'calc(100vh - 80px - 112px)'
    },
    getListLength () {
      return this.hotComments.length + this.newComments.length
    }
  },
  methods: {
    _getComment () {
      getComment(this.currentSong.id, this.page).then(res => {
        if (res.data.code === 200) {
          this.hotComments = res.data.hotComments.slice(0, 10)
          this.newComments = res.data.comments
          // this.lockUp = true
          // this._hideLoad()
        }
      })
    },
    pullUp (scroller) {
      scroller.on('pullingUp', () => {
        this.page += 1
        getComment(this.currentSong.id, this.page).then(res => {
          if (res.data.code === 200) {
            this.newComments = [...this.newComments, ...res.data.comments]
            console.log('到底', this.newComments.length);
          }
        })
        scroller.finishPullUp()
      })
    }
    // listScroll (e) {
    //   let { scrollHeight, clientHeight, scrollTop } = e.target
    //   // console.log('offsetHeight:', e.target.offsetHeight);
    //   if (scrollTop + clientHeight >= scrollHeight) {
    //     console.log('到底');
    //     this.page += 1
    //     this.pullUp() // 触发滚动加载事件
    //   }
    // },
    // 滚动请求最新评论

  }
}
</script>

<style lang="less" scoped>
.comment {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
