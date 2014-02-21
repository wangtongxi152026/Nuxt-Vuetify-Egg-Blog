<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">回复{{to_user.name}}:</span>
      </v-card-title>

      <v-col>
        <v-textarea height="115" no-resize class="textarea" outlined v-model="content" />
      </v-col>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false;">关闭</v-btn>
        <v-btn color="blue darken-1" text @click="submit">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { addThirdComment } from '~/api/api'

export default {
  data () {
    return {
      content: '',
      dialog: false,
      cacheTime: 0, // 缓存时间
      times: 0 // 留言次数
    }
  },
  props: {
    comment_id: '',
    article_id: '',
    to_user: {}
  },
  inject: ['refresh'],
  methods: {
    async submit () {
      if (!this.article_id) {
        this.$message.err('该文章不存在！')
        return
      }

      if (this.times > 2) {
        this.$message.err('您今天评论的次数已经用完，明天再来评论吧！')
        return
      }

      let now = new Date()
      let nowTime = now.getTime()
      if (nowTime - this.cacheTime < 4000) {
        this.$message('您评论太过频繁，1 分钟后再来评论吧！')
        return
      }

      if (!this.content) {
        this.$message.err('请填写评论内容')
        return
      }
      this.loading = true
      await addThirdComment({
        article_id: this.article_id,
        comment_id: this.comment_id,
        user_id: this.$store.state.blog.userinfo._id,
        to_user: this.to_user,
        content: this.content
      })
      this.loading = false
      this.times++

      this.cacheTime = nowTime
      this.content = ''
      this.dialog = false
      this.refresh()
      this.$message.success('操作成功')
    }
  }
}
</script>


<style lang="sass" scoped>
 
</style>
 
