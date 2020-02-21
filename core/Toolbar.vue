<template>
  <!-- :src="require('~/assets/image/default.png')" -->
  <v-app-bar
    app
    dark
    id="core-app-bar"
    :elevate-on-scroll="!isSearching"
    hide-on-scroll
    :height="top_height"
    :style="`height: ${$vuetify.breakpoint.mdAndUp ? 144 : 112}px`"
    :extension-height="extension_height"
  >
    <nuxt-link to="/" class="d-flex" tag="div">
      <v-avatar
        :size="$vuetify.breakpoint.mdAndUp ? 60 : 40"
        :class="$vuetify.breakpoint.smAndDown ? 'justify: center' : 'mx-5'"
      >
        <img src="../assets/logo.jpg" />
      </v-avatar>

      <v-toolbar-title
        class="display-1 font-weight-medium align-self-center"
        :class="
          `${$vuetify.breakpoint.mdAndUp ? 'subtitle-1' : 'px-2 subtitle-1'}`
        "
      >
        <div class="font-weight-light">
          <div class="hidden-sm-and-down">WTongxi</div>
          <span class="hidden-md-and-up">WTongxi</span>
          <div class="hidden-sm-and-down">乐享生活</div>
        </div>
      </v-toolbar-title>
    </nuxt-link>

    <v-spacer></v-spacer>

    <template v-if="$vuetify.breakpoint.mdAndUp">
      <UserMenu v-if="$store.state.blog.userinfo" />

      <template v-else>
        <v-col class="d-flex justify-end">
          <v-btn class="mx-3" color="primary" fab x-small @click="isSearching = !isSearching">
            <v-icon size="15" class="iconfont icon-sousuo"></v-icon>
          </v-btn>
          <v-btn text depressed nuxt to="/login">
            <v-icon left class="iconfont icon-login"></v-icon>登录
          </v-btn>
          <v-btn class="mx-3" nuxt color="#006064" to="/register">
            <v-icon left class="iconfont icon-zhhuce"></v-icon>加入组织
          </v-btn>
        </v-col>
      </template>
    </template>

    <v-btn v-else class="mx-3" fab small @click="isSearching = !isSearching">
      <v-icon size="20" class="iconfont icon-sousuo"></v-icon>
    </v-btn>

    <template v-slot:extension>
      <v-tabs centered class="tabs" hide-slider>
        <v-container fluid v-if="isSearching" class="white pa-0">
          <v-autocomplete
            ref="search"
            rounded
            append-icon
            append-outer-icon="$vuetify.close"
            flat
            :height="extension_height"
            hide-no-data
            label="输入你想搜索的内容"
            light
            solo
          >
            <template v-slot:append-outer>
              <v-icon
                class="mr-2"
                :class="$vuetify.breakpoint.mdAndUp ? 'mt-2' : 'mt-1'"
                @click="isSearching = false"
              >$vuetify.close</v-icon>
            </template>
          </v-autocomplete>
        </v-container>

        <v-app-bar-nav-icon
          v-else-if="$vuetify.breakpoint.smAndDown"
          class="ml-1 align-self-center"
          color="orange"
          @click="toggleDrawer"
        />

        <template v-else>
          <v-spacer></v-spacer>
          <v-menu open-on-hover offset-y v-for="item in items" :key="item.text">
            <template v-slot:activator="{ on }">
              <v-tab v-on="on" class="body" :to="item.route">
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.text }}
                <v-icon>mdi-menu-down</v-icon>
              </v-tab>
            </template>
            <v-list v-if="item.children">
              <v-list-item v-for=" e in item.children" :key="e.title" nuxt :to="e.to">
                <v-list-item-icon>
                  <v-icon v-text="e.icon" />
                </v-list-item-icon>

                <v-list-item-title class="caption">{{ e.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>
        </template>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'
import { getUserInfo } from '~/api/api'
import UserMenu from '~/components/UserMenu'
const PREFIX = 'iconfont icon-'
export default {
  name: 'CoreAppBar',
  async mounted () {
    const result = await getUserInfo()
    if (result.code === 0) {
      this.$store.commit('blog/set_user_info', result.data)
    }
  },

  components: { UserMenu },
  data () {
    return {
      isSearching: false,

      items: [
        { icon: 'mdi-clock', text: 'Dashboard', route: '/' },
        {
          icon: 'mdi-music',
          text: '听听音乐',
          children: [
            { icon: PREFIX + 'tuijian', title: '推荐音乐', to: '/music' },
            {
              icon: PREFIX + 'login',
              title: '我的音乐',
              to: '/music/userlist'
            },
            { icon: PREFIX + 'sousuo', title: '搜索音乐', to: '/music/search' },
            {
              icon: PREFIX + 'history',
              title: '刚刚听过',
              to: '/music/history'
            },
            {
              icon: PREFIX + 'bofangliebiao',
              title: '播放列表',
              to: '/music/playlist'
            }
          ]
        },
        { icon: 'iconfont icon-login', text: '关于本站', route: '/timeline' },
        { icon: 'mdi-flag', text: '给我留言', route: '/message' }
      ]
    }
  },
  methods: {
    ...mapMutations('blog', ['toggleDrawer', 'setDrawer'])
  },

  computed: {
    // 响应式高度
    top_height () {
      return this.$vuetify.breakpoint.mdAndUp ? 80 : 56
    },
    // tab栏高度
    extension_height () {
      return this.$vuetify.breakpoint.mdAndUp ? 64 : 56
    }
  },

  watch: {
    '$vuetify.breakpoint.mdAndUp' () {
      this.$store.state.blog.drawer = false
    },
    hasItems (val) {
      if (!val) return

      this.$refs.drawer.isActive = false
    },
    async isSearching (val) {
      if (!val) return
      await this.$nextTick()
      this.$refs.search.focus()
    }
  }
}
</script>

<style lang="less" scoped>
#core-app-bar {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url('~@/assets/trend_tit.jpg');

  background-size: cover;
}
@keyframes move {
  16.65% {
    -webkit-transform: translateY(8px);
    transform: translateY(15px);
  }

  33.3% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }

  49.95% {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
  }

  66.6% {
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
  }

  83.25% {
    -webkit-transform: translateY(1px);
    transform: translateY(1px);
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
.v-toolbar__extension {
  background: inherit !important;
}
.v-menu__content {
  animation: move 0.8s ease-in-out;
}
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: inherit;
}
</style>
