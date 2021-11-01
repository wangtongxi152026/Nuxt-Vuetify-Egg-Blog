<template>
  <v-app-bar
    app
    dark
    id="core-app-bar"
    :elevate-on-scroll="!isSearching"
    :height="extension_height"
  >
    <div style="width: 100%; overflow: hidden; height: 100%">
      <div :class="['top-menu', { translateTop: !isScrollingUp }]">
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
                :class="ismdAndUp ? 'mt-2' : 'mt-1'"
                @click="isSearching = false"
                >$vuetify.close</v-icon
              >
            </template>
          </v-autocomplete>
        </v-container>
        <template v-else>
          <nuxt-link to="/" class="d-flex" tag="div">
            <v-avatar :size="ismdAndUp ? 56 : 40" class="mx-5">
              <img src="../assets/avatar.jpg" class="elevation-2" />
            </v-avatar>
            <v-toolbar-title
              class="display-1 font-weight-medium align-self-center"
              :class="['subtitle-1', { 'px-2': !ismdAndUp }]"
            >
              <div class="font-weight-light">
                <div class="hidden-sm-and-down">WTongxi</div>
                <span class="hidden-md-and-up">WTongxi</span>
                <div class="hidden-sm-and-down">乐享生活</div>
              </div>
            </v-toolbar-title>
          </nuxt-link>
          <v-btn dark class="mx-3" fab small @click="toggleSearchimg">
            <v-icon size="20" class="iconfont icon-sousuo"></v-icon>
          </v-btn>
          <!-- <UserMenu v-if="ismdAndUp && userinfo" /> -->
          <template v-if="ismdAndUp && userinfo">
            <div>
              <v-avatar size="56">
                <img :src="src" />
              </v-avatar>
              <v-btn text depressed n>{{ userinfo.name }}</v-btn>
              <v-btn text depressed @click="logout">
                <v-icon left>mdi-exit-to-app</v-icon>退出
              </v-btn>
            </div>
          </template>
          <template v-else>
            <v-col v-if="ismdAndUp" class="d-flex justify-end">
              <v-btn text depressed nuxt to="/login">
                <v-icon left class="iconfont icon-login"></v-icon>登录
              </v-btn>
              <v-btn class="mx-3" nuxt color="#006064" to="/register">
                <v-icon left class="iconfont icon-zhhuce"></v-icon>注册
              </v-btn>
            </v-col>
          </template>
        </template>
      </div>
      <div :class="['bottom-menu', { translateBottom: !isScrollingUp }]">
        <v-tabs
          background-color="transparent"
          centered
          :height="extension_height"
          class="tabs"
          hide-slider
        >
          <v-app-bar-nav-icon
            v-if="!ismdAndUp"
            class="ml-1 align-self-center"
            color="orange"
            @click="toggleDrawer"
          />

          <template v-else>
            <v-spacer></v-spacer>
            <v-menu
              style="align-items: center"
              open-on-hover
              offset-y
              v-for="item in menuList"
              :key="item.text"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  plain
                  depressed
                  text
                  v-on="on"
                  class="mx-2"
                  :to="item.route"
                >
                  <v-icon class="mr-2">{{ item.icon }}</v-icon>
                  {{ item.text }}
                  <v-icon v-if="item.children">mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list flat nav dense v-if="item.children">
                <v-list-item
                  v-for="e in item.children"
                  :key="e.title"
                  nuxt
                  :to="e.to"
                >
                  <v-list-item-icon>
                    <v-icon v-text="e.icon" />
                  </v-list-item-icon>
                  <v-list-item-title class="caption">
                    {{ e.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
          </template>
        </v-tabs>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
const HEIGHT_MD = 64;
const HEIGHT_SM = 56;
import { mapMutations, mapState } from 'vuex';
import UserMenu from '~/components/UserMenu';
import ismdAndUp from '~/components/Mixin/ismdAndUp';
const PREFIX = 'iconfont icon-';
export default {
  name: 'CoreAppBar',
  mixins: [ismdAndUp],
  data() {
    return {
      previousScroll: 0,
      currentScroll: 0,
      isScrollingUp: 0,
      isSearching: false,
      disabledScroll: false
    };
  },
  methods: {
    ...mapMutations('blog', ['toggleDrawer', 'setDrawer']),
    toggleSearchimg() {
      this.isSearching = !this.isSearching;
    },
    logout() {
      this.$store.commit('blog/logout');
      this.$message.success('退出成功');
    },
    getScroll() {
      if (this.disabledScroll) {
        return;
      }
      this.previousScroll = this.currentScroll;
      this.currentScroll = window.pageYOffset;
      this.isScrollingUp = this.currentScroll < this.previousScroll;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.getScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.getScroll);
  },
  computed: {
    userinfo() {
      return this.$store.state.blog.userinfo;
    },
    src() {
      if (this.userinfo.avatar === 'user' || '') {
        return require('~/assets/avatar.jpg');
      } else {
        return this.userinfo.avatar;
      }
    },
    // 响应式高度
    extension_height() {
      return this.ismdAndUp ? 64 : 56;
    },
    menuList: () => [
      { icon: 'mdi-home', text: '首页', route: '/' },
      {
        icon: 'mdi-music',
        text: '听听音乐',
        route: '/music',
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
      { icon: 'iconfont icon-js', text: '给我留言', route: '/message' }
    ]
  },

  watch: {
    ismdAndUp: {
      handler: function(value) {
        console.log({ ismdAndUp: value });
        if (value) {
          this.$store.commit('blog/setDrawer', false);
        }
      },
      immediate: true
    },
    hasItems(val) {
      if (!val) return;
      this.$refs.drawer.isActive = false;
    },
    async isSearching(val) {
      if (val) {
        this.disabledScroll = true;
      } else {
        this.disabledScroll = false;
        return;
      }
      await this.$nextTick();
      this.$refs.search.focus();
    }
  }
};
</script>

<style scoped>
.top-menu {
  min-height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.bottom-menu {
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.translateBottom {
  transform: translateY(-100%);
}
.translateTop {
  transform: translateY(-100%);
}

#core-app-bar {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url('https://picsum.photos/1920/1080?random');
  background-size: cover;
}
#core-app-bar >>> .v-slide-group__content {
  align-items: center;
}
#core-app-bar >>> .v-toolbar__content {
  padding: 0;
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
