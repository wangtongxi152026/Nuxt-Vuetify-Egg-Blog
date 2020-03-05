<template>
  <v-container class="music-main">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-bottom-navigation
          :grow="isActive"
          dark
          color="orange"
          background-color="transparent"
          height="48"
        >
          <template v-for="(item,i) in items">
            <v-btn nuxt :key="i" :to="item.route" height="48">
              <span v-if="isActive">{{item.text}}</span>
              <v-icon :class="item.icon"></v-icon>
            </v-btn>
          </template>
        </v-bottom-navigation>
      </v-col>

      <v-col md="8">
        <v-scroll-y-transition mode="out-in">
          <nuxt-child keep-alive :keep-alive-props="{ exclude: ['Listdetail','comment'] }" />
        </v-scroll-y-transition>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" md="4" class="sliderRight px-0">
        <LyricInfo></LyricInfo>
      </v-col>
    </v-row>
    <CoreControl />
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";




import LyricInfo from "~/components/Music/LyricInfo";
import MusicHeader from "~/components/Music/MusicHeader";
import Controler from "~/components/Music/Controler";
export default {
  components: { LyricInfo, MusicHeader, CoreControl: () => import("~/core/BottomControl") },
  layout: "music",
  created () {


    this._getPlaylistDetail(2796821320);
  },

  data () {
    return {
      items: [
        {
          icon: "iconfont icon-shijianzhou",
          text: "播放列表",
          route: "/music/playlist"
        },
        {
          icon: "iconfont icon-tuijian",
          text: "推荐歌单",
          route: "/music"
        },
        {
          icon: "iconfont icon-login",
          text: "我的歌单",
          route: "/music/userlist"
        },
        {
          icon: "iconfont icon-history",
          text: "最近播放",
          route: "/music/historylist"
        },
        {
          icon: "iconfont icon-sousuo",
          text: "搜歌",
          route: "/music/search"
        }
      ]
    }


  },
  methods: {

    ...mapActions("music", ["_getPlaylistDetail"])
  },
  getTabHeight () {
    return this.$vuetify.breakpoint.smAndDown
      ? "calc(100vh - 80px - 112px)"
      : "calc(100vh - 128px - 144px)";
  },
  computed: {
    ...mapGetters("music", ["currentSong"]),
    isActive () {
      return this.$vuetify.breakpoint.mdAndUp ? true : false;
    },
  }
};
</script>
<style lang='less' scoped>
.music-main {
  color: #999;
  padding: 12px 12px 0px 12px;
}

.px-0 {
  color: #999;
}
.v-tab--active {
  color: #da8e70;
}
.sliderRight {
  min-width: 300px;
}
</style>
