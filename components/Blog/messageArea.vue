<template outlined >
  <div>
    <v-card class="comment-total" outlined>
      <!-- <v-card-title>全部评论:{{comments.length}}</v-card-title> -->
      <v-card-title>全部评论:10</v-card-title>
    </v-card>

    <v-divider class="my-3"></v-divider>

    <template v-if="comments.length">
      <v-card :key="item._id" v-for="(item, i) in comments" class="elevation-1 my-1">
        <v-list-item class="px-3" three-line>
          <v-list-item-avatar tile class="mr-4 avatar" size="50">
            <img :src="src(i)" />
          </v-list-item-avatar>
          <v-list-item-content class="pb-0">
            <div class="subtitle-2 name">
              {{item.user.name}}
              {{item.user.type === 0 ? 'Admin' : ''}}
            </div>
            <div class="caption time">{{ item.create_time|format}}</div>
            <span class="body-2">{{item.content}}</span>
            <v-btn @click="reply(item._id, item.user)" text>
              <v-icon class="iconfont icon-pinglun"></v-icon>
            </v-btn>

            <template v-if="item.other_comments">
              <ArtCommentcopy
                :item_id="item._id"
                :item_user="item.user"
                :list="item.other_comments"
                :article_id="article_id"
              />
              <!-- <ArtCommentcopy v-for="e in item.other_comments" :key="e._id" /> -->
            </template>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
    <!-- 评论框 -->
    <Reply ref="dialog" :article_id="article_id" :comment_id="comment_id" :to_user="to_user" />
  </div>
</template>
<script>
import ArtCommentcopy from '~/components/Blog/ArtCommentcopy'
import Reply from '~/components/Blog/Reply'
import { likeArticle, addComment, getCommentList } from '~/api/api'
export default {
  components: { ArtCommentcopy, Reply },
  data () {
    return {

      comment_id: '',
      to_user: '',

      content: '',
      Loading: false,
    }
  },
  props: {
    article_id: '',
    comments: {
      type: Array,
      default: null
    }

  },
  inject: ['refresh'],
  methods: {
    // 一级评论
    async submit () {
      if (!this.$store.state.blog.userinfo) {
        this.$message.err('登录才能评论，请先登录！')
        return
      }
      if (!this.$route.params.id) {
        this.$message.success('该文章不存在！')
        return
      }

      if (!this.content) {
        this.$message.err('评论不可以为空!')
        return
      }
      // if (times > 2) {
      //   this.$message.success('您今天评论的次数已经用完，明天再来评论吧！')
      //   return
      // }

      // let now = new Date()
      // let nowTime = now.getTime()

      // if (nowTime - this.cacheTime < 4000) {
      //   this.$message.success('您评论太过频繁，1 分钟后再来留言吧！')
      //   return
      // }
      const user_id = this.$store.state.blog.userinfo._id

      this.Loading = true
      const result = await addComment({
        article_id: this.$route.params.id,
        user_id,
        content: this.content
      })
      this.Loading = false
      // this.times++
      // this.cacheTime = nowTime
      this.content = ''
      this.$message.success('评论成功')
      this.refresh()
    },
    src (i) {
      if (this.comments[i].user.avatar === 'user' || '') {
        return require('~/assets/avatar.jpg')
      } else {
        return this.comments[i].user.avatar
      }
    },
    reply (commentId, user) {
      if (!this.$store.state.blog.userinfo) {
        this.$message.success('请先登录才可以评论~')
        return
      }
      // 添加二级评论
      this.comment_id = commentId
      this.to_user = user

      this.$refs.dialog.dialog = true
    }
  }
}
</script>

<style lang="sass" scoped>
.textarea
  background-image: url(https://cuijiahua.com/wp-content/uploads/2018/10/comment.gif)
  background-repeat: no-repeat
  background-size: 35%
  background-position: 100% 60%
.comment-total
  border-left: 4px solid orange !important
.avatar
  border-radius: 4px 
.name 
  color: #b77171
.content,
.time 
  color: #333
</style>
 
