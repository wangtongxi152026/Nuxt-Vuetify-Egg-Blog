<template>
  <div>
    <!--  <Carousel></Carousel>-->
    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="header">
        <img class="carousel" :src="require('~/assets/image/sky.webp')" alt="sky" />
      </div>
    </ModuleTransition>

    <v-container tag="article">
      <ModuleTransition delay="0.24">
        <v-row v-show="recoShowModule">
          <v-col cols="12" md="8">
            <SSCard
              class="mb-5"
              v-for=" article  in article.list"
              :key="article._id"
              :article="article"
            ></SSCard>

            <v-pagination
              v-model="page"
              :length="pagelen"
              @next="page+1"
              @previous="page-1"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>
          </v-col>
          <!-- <v-col class="my-8" cols="12" lg="8" v-for="person in team" :key="person.name">
        <RSCard :data="person"></RSCard>
          </v-col>-->
          <!-- <SCard class="my-3"></SCard> -->

          <v-col v-if="ismdAndUp" class="right" cols="12" md="4">
            <SliderBar :total="article.count" />

            <!-- <SmCard class="my-12" v-for="person in team" :key="person.name" :data="person"></SmCard>
            <XSCard class="my-12" v-for="person in team" :key="person.name" :data="person"></XSCard>-->
          </v-col>
        </v-row>
      </ModuleTransition>
    </v-container>
  </div>
</template>
<script>

import ModuleTransition from '~/components/Transtion/ModuleTransition'
import moduleTransitonMixin from '~/components/Transtion/moduleTransiton'
import SCard from '~/components/Card'
import RSCard from '~/components/RSCard'
import SSCard from '~/components/SScard'
import XSCard from '~/components/XSCard'
import SmCard from '~/components/SmCard'
import Carousel from '~/components/Carousel'
import SliderBar from '~/components/Blog/sliderBar'
import ismdAndUp from '~/components/Mixin/ismdAndUp'


export default {
  mixins: [moduleTransitonMixin, ismdAndUp],
  async asyncData ({ $axios }) {
    const params = {
      keyword: "",
      likes: "", // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      article: '',//是否按年归档
      tag_id: "",
      category_id: "",
      pageNum: 1,
      pageSize: 10
    };
    const result = await $axios.get('blog/getArticleList', { params })
    return { article: result.data.data }
  },
  components: { SCard, SSCard, SmCard, XSCard, RSCard, Carousel, ModuleTransition, SliderBar },
  computed: {
    pagelen () {
      return Math.ceil(this.article.count / 10)
    }
  },
  methods: {
    async changePage () {
      const params = {
        keyword: "",
        likes: "", // 是否是热门文章
        state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
        article: '',//是否按年归档
        tag_id: "",
        category_id: "",
        pageNum: this.page,
        pageSize: 10
      };
      const result = await this.$axios.get('blog/getArticleList', { params })
      this.article = result.data.data
    }
  },
  watch: {
    page () {
      this.changePage()
    }
  },
  data () {
    return {
      page: 1,
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  max-width: 100%
  width: 100%
  margin-right: auto
  margin-left: auto
.carousel
  // background-image: url('~@/assets/image/javascript.gif')
  // background-position: center
  // background-size: cover
  width: 100%
  height: 350px 
  transform: translateY(-40px)
</style>
