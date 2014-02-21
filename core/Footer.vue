<template>
  <v-footer id="core-footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="5" lg="3">
          <strong class="subtitle-2">关于本站</strong>
          <div
            class="body-2 mt-2"
          >wangtongxi | 关注前端技术及互联网的个人网站， 基于nuxt ssr首屏服务器端渲染 ⚡， 并合并了酷炫音乐推荐，可以在线听音乐，网站宗旨：希望每一个来访的朋友都能有所收获！</div>
        </v-col>
        <v-col class="tags" cols="12" md="7" lg="9">
          <v-row>
            <v-col v-for="(section, i) in sections" :key="i" cols="6" md="4">
              <div v-for="(child, j) in section.children" :key="j" class="mb-2">
                <v-icon size="16px" :class="`${child.icon} grey--text`" />
                <nuxt-link
                  :to="child.to"
                  class="text-capitalize"
                  rel="noopener"
                  v-text="child.title"
                ></nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider class="my-2" />

        <v-col class="foottime" cols="12">
          Copyright &copy;&nbsp; {{ date }}&nbsp;
          <span>WTongxi网站</span>&nbsp;皖ICP备19024039号
        </v-col>
        <v-divider class="my-2" />
        <!-- 网站总计时长 -->
        <v-col class="foottime" cols="12">
          <FooterTime></FooterTime>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
const PREFIX = 'iconfont icon-'
import FooterTime from '~/components/FooterTime'
export default {
  name: 'CoreFooter',
  components: { FooterTime },
  computed: {
    date: () => new Date().getFullYear(),
    sections () {
      return [
        {
          children: [
            { icon: PREFIX + 'tuijian', title: '推荐音乐', to: '/music' },
            { icon: PREFIX + 'login', title: '我的音乐', to: '/music/userlist' },
            { icon: PREFIX + 'sousuo', title: '搜索音乐', to: '/music/search' },
            { icon: PREFIX + 'history', title: '刚刚听过', to: '/music/history' },
            { icon: PREFIX + 'bofangliebiao', title: '播放列表', to: '/music/playlist' }
          ],
        },
        {
          children: [
            { icon: PREFIX + 'tuijian', title: '推荐音乐', to: '/music' },
            { icon: PREFIX + 'login', title: '我的音乐', to: '/music/userlist' },
            { icon: PREFIX + 'sousuo', title: '搜索音乐', to: '/music/search' },
            { icon: PREFIX + 'history', title: '刚刚听过', to: '/music/history' },
            { icon: PREFIX + 'bofangliebiao', title: '播放列表', to: '/music/playlist' }
          ],
        },
        {
          children: [
            { icon: PREFIX + 'shouyex', title: '首页', to: '/' },
            { icon: PREFIX + 'shijianzhou', title: '关于本站', to: '/timeline' },
            { icon: PREFIX + 'js', title: '给我留言', to: '/message' },
          ],
        },


      ]
    },
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@media (min-width: 1904px) {
  max-width: 1785px;
}

.foottime {
  text-align: center;
}

#core-footer {
  background: #000;
  color: #b3b3b3;
  font-size: 14px;

  a {
    color: #b3b3b3;
    text-decoration: none;
  }
}
</style>
