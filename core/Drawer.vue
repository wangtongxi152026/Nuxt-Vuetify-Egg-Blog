<template>
  <v-navigation-drawer id="core-navigation-drawer" v-model="$store.state.blog.drawer" app dark>
    <v-list-item two-line class="mx-4 my-3 logo">
      <v-avatar size="56">
        <img src="~/assets/avatar.jpg" />
      </v-avatar>
      <v-list-item-title class="font-weight-regular">
        <span class="ml-8">WTongxi</span>
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mb-1" />

    <Avatar v-if="$store.state.blog.userinfo" />

    <v-list v-else nuxt dense nav>
      <v-list-item-group>
        <v-list-item nuxt to="/login">
          <v-list-item-icon>
            <v-icon left class="iconfont icon-login"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登录/注册</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <template v-for="(item, i) in computedItems">
        <ItemGroup v-if="item.children" :key="`group-${i}`" :item="item"></ItemGroup>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BaseItem from '~/components/BaseItem'
import ItemGroup from '~/components/ItemGroup'
import Avatar from '~/components/Avatar'
const PREFIX = 'iconfont icon-'
export default {
  components: { Avatar, ItemGroup, BaseItem },
  data: () => ({
    items: [
      {
        icon: 'mdi-home',
        title: '首页',
        to: '/'
      },
      {
        group: '/music',
        icon: 'mdi-music',
        title: '音乐',
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
      {
        group: '/components',
        icon: 'mdi-view-comfy',
        title: 'components',
        children: [
          {
            title: 'multi',
            group: '',
            children: [
              {
                title: 'example',
                href: '#'
              }
            ]
          },
          {
            title: 'buttons',
            to: 'buttons'
          },
          {
            title: 'grid',
            to: 'grid-system'
          },
          {
            title: 'tabs',
            to: 'tabs'
          },
          {
            title: 'notifications',
            to: 'notifications'
          },
          {
            title: 'icons',
            to: 'icons'
          },
          {
            title: 'typography',
            to: 'typography'
          }
        ]
      },
      {
        group: '/forms',
        icon: 'mdi-clipboard-outline',
        title: 'forms',
        children: [
          {
            title: 'rforms',
            to: 'regular'
          },
          {
            title: 'eforms',
            to: 'extended'
          },
          {
            title: 'vforms',
            to: 'validation'
          },
          {
            title: 'wizard',
            to: 'wizard'
          }
        ]
      },
      {
        group: '/tables',
        icon: 'mdi-grid',
        title: 'tables',
        children: [
          {
            title: 'rtables',
            to: 'regular-tables'
          },
          {
            title: 'etables',
            to: 'extended-tables'
          },
          {
            title: 'dtables',
            to: 'data-tables'
          }
        ]
      },
      {
        icon: 'mdi-widgets',
        title: 'widgets',
        to: '/widgets'
      },
      {
        icon: 'mdi-chart-timeline-variant',
        title: 'charts',
        to: '/charts'
      },
      {
        icon: 'mdi-calendar-range',
        title: 'calendar',
        to: '/calendar'
      }
    ]
    // childrens: [
    //   {
    //     // group: "/pages",
    //     icon: "mdi-image",
    //     title: "关于本站",
    //     children: [
    //       {
    //         title: "pricing",
    //         to: "/timeline",
    //         icon: "mdi-image"
    //       }
    //     ]
    //   },

    //   {
    //     group: "/forms",
    //     icon: "mdi-clipboard-outline",
    //     title: "B",
    //     to: "/timeline"
    //   },

    //   {
    //     group: "/music",
    //     icon: "mdi-music",
    //     title: "听听音乐",
    //     children: [
    //       {
    //         title: "网易",
    //         to: "/music",
    //         icon: "mdi-image"
    //       },
    //       {
    //         title: "fullscreen",
    //         icon: "mdi-image"
    //       }
    //     ]
    //   },
    //   {
    //     icon: "mdi-widgets",
    //     title: "JS",
    //     to: "/music"
    //   },
    //   {
    //     icon: "mdi-chart-timeline-variant",
    //     title: "Vue",
    //     to: "/timeline"
    //   },
    //   {
    //     icon: "mdi-calendar-range",
    //     title: "X",
    //     to: "/music"
    //   }
    // ]
  }),

  computed: {
    drawer: {
      get(){
        return this.$store.state.blog.drawer
      },
      set(){
        
      }
    },
    computedItems() {
      return this.items.map(this.mapItem)
    }
  },
watch:{
  '$vuetify.breakpoint.mdAndDown'() {
     
       
      this.$store.state.blog.drawer=false
    },
},
  methods: {
    ...mapMutations('blog', ['setDrawer']),
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: item.title
      }
    }
  }
}
</script>
<style lang="less">
#core-navigation-drawer {
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-3.jpg);
  background-position: center;
  .logo {
    height: 72px;
  }
}

.theme--dark.v-navigation-drawer .v-divider {
  background-color: hsla(0, 0%, 71%, 0.2);
  border-color: hsla(0, 0%, 71%, 0.1);
  width: calc(100% - 30px);
  margin-left: 15px;
}
</style>
