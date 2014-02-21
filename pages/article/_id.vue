<template>
  <v-container tag="article">
    <ModuleTransition delay="0.16">
      <v-row v-show="recoShowModule">
        <v-col>
          <v-breadcrumbs class="px-0" :items="breadtitle"></v-breadcrumbs>
        </v-col>
      </v-row>
    </ModuleTransition>
    <v-row justify="center">
      <ModuleTransition delay="0.32">
        <v-col v-show="recoShowModule" cols="12" md="8">
          <h1 class="text-center headline py-5">{{ article.title }}</h1>
          <p class="text-center">
            <v-btn color="grey" small text>
              <v-icon left class="iconfont icon-history" />

              <span class="caption">{{ article.create_time | format }}</span>
            </v-btn>

            <v-btn color="grey" small text>
              <v-icon left>mdi-eye</v-icon>
              <span class="caption">{{ article.meta.views }}</span>
            </v-btn>
            <v-btn color="grey" small text>
              <v-icon left class="iconfont icon-pinglun" />
              <span class="caption">{{ article.meta.comments }}</span>
            </v-btn>

            <v-btn @click="handlelike" color="grey" small text>
              <v-icon color="pink" class="iconfont icon-like" left></v-icon>
              <span class="caption">{{ article.meta.likes }}</span>
            </v-btn>
          </p>
          <img
            src="//img.xjh.me/random_img.php?type=bg&ctype=nature&return=302"
            class="elevation-13 articlebg"
          />

          <Markdown
            class="pt=10"
            :initialValue="article.content"
            theme="dark"
            height="100%"
            width="100%"
          />
          <v-divider class="my-3"></v-divider>
          <ArtComment :article_id="article._id" :comments="comments" />
        </v-col>
      </ModuleTransition>
      <!-- 目录 -->
      <v-col v-if="ismdAndUp" class="right-bar" md="4">
        <Anchor :offset-top="160" show-ink class="ml-3">
          <AnchorLink
            v-for="item in $store.state.blog.toc"
            :href="`#${item.anchor}`"
            :title="item.text"
            :key="item.anchor"
          />
        </Anchor>
      </v-col>
    </v-row>
  </v-container>
</template>
    

<script>

import ModuleTransition from '~/components/Transtion/ModuleTransition'
import moduleTransitonMixin from '~/components/Transtion/moduleTransiton'
import AnchorLinks from '~/components/Blog/Anchor/anchorLinks'
import AnchorLink from '~/components/Blog/Anchor/anchorLink'
import Anchor from '~/components/Blog/Anchor/anchor'
import ArtComment from '~/components/Blog/ArtComment'
import { likeArticle, addComment, getCommentList } from '~/api/api'
import Markdown from '~/markdown/preview'
import ismdAndUp from '~/components/Mixin/ismdAndUp'

export default {
  async asyncData({ params, $axios }) {
    const result = await $axios.post('/blog/getArticleDetail', {
      id: params.id
    })
    const result2 = await $axios.post('/blog/getArticleComment', {
      id: params.id
    })
    return { article: result.data.data, comments: result2.data.data.comments }
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.article.keyword },
        { hid: 'description', name: 'description', content: this.article.desc }
      ]
    }
  },

  mixins: [moduleTransitonMixin, ismdAndUp],
  components: {
    Markdown,
    ArtComment,

    Anchor,
    AnchorLink,
    ModuleTransition

  },
  provide() {
    return {
      'refresh': this.refresh
    }
  },
  data() {
    return {
      article: '',
      comments: []
    }
  },
  methods: {
    async refresh() {
      const result = await getCommentList({ id: this.article._id })
      this.comments = result.data.comments
    },
    async handlelike() {
      if (!this.$store.state.blog.userinfo) {
        this.$message.success('登录才能点赞，请先登录！')
        return
      }
      if (!this.article._id) {
        this.$message.err('该文章不存在！')
        return
      }

      let params = {
        id: this.article._id,
        user_id: this.$store.state.blog.userinfo._id
      }
      await likeArticle(params)

      ++this.article.meta.likes
    },
  },
  watch: {},
  computed: {
    breadtitle() {
      return [
        {
          text: '首页',
          disabled: false,
          to: '/'
        },
        {
          text: '文章',
          disabled: true,
        },
        {
          text: this.article.title,
          disabled: true,
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.right-slider
  position: sticky
  right: 0
  top: 300px
.anchor
  display: block
  position: sticky
  top: 213px
.right-bar
  border-radius: 4px
  background-color: #fff
.articlebg
  width: 100%
  border-radius: .618rem
.background
  position: absolute
  border-radius: 7px !important
  width: 100%
  height: 250px
  display: inline-block
  background-size: cover
  background-position: center
  background-image: url('~@/assets/img15.jpg')
.avatar
  display: block
  border-radius: 50% !important
  position: relative
  width: 128px
  overflow: hidden
  top: 64px
  left: calc( 50% - 64px )
.right-side
  position: sticky
  top: 150px
.introduce
  margin-top: 120px
</style>
