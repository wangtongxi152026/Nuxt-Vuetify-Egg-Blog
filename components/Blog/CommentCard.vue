<template>
  <div>
    <template v-for="(e, i) in list">
      <v-card outlined :key="e._id" class="elevation-1">
        <v-list-item class="px-3" three-line>
          <v-list-item-avatar tile class="mr-4 avatar" size="50">
            <img :src="src(i)" />
          </v-list-item-avatar>
          <v-list-item-content class="pb-0">
            <div class="subtitle-2 name">
              {{e.user.name}}
              {{e.user.type === 0 ? '(作者)' : ''}}
            </div>
            <div class="caption time">{{ e.create_time|format}}</div>
            <span class="body-2">
              {{'回复@' + e.to_user.name}}
              {{e.to_user.type === 0 ? '(作者)' : ''}}：{{e.content}}
            </span>
            <v-btn @click="reply(item_id, item_user, e.user)" text>
              <v-icon class="iconfont icon-pinglun"></v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
  </div>
</template>
<script>
import Reply from '~/components/Blog/Reply'
import ArtCommentcopy from '~/components/Blog/ArtCommentcopy'
export default {
  components: { ArtCommentcopy, Reply },
  props: {
    list: [],
    article_id: '',
    item_id: '',
    item_user: ''
  },
  data () {
    return {
      comment_id: '',
      to_user: ''
    }
  },
  methods: {
    src (i) {
      if (this.list[i].user.avatar === 'user' || '') {
        return require('~/assets/avatar.jpg')
      } else {
        return this.list[i].user.avatar
      }
    },

    reply (commentId, user, secondUser) {
      if (!this.$store.state.blog.userinfo) {
        this.$message.success('请先登录才可以评论~')
        return
      }

      // 添加三级评论
      if (secondUser) {
        this.comment_id = commentId
        this.to_user = user
      } else {
        // 添加二级评论

        this.comment_id = commentId
        this.to_user = user
      }
      this.$refs.dialog.dialog = true
    }
  }
}
</script>
<style lang="sass" scoped>
.avatar
  border-radius: 4px 
.name 
  color: #b77171
.content,
.time 
  color: #333
</style>
 
