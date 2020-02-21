<template>
  <v-container class="my4">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-bottom-navigation
          :grow="isActive"
          dark
          color="orange"
          background-color="transparent"
          height="48"
        >
          <v-btn v-for="(item,i) in items" :key="i" :to="item.route" height="48">
            <span v-if="isActive">{{item.text}}</span>
            <v-icon :class="item.icon"></v-icon>
          </v-btn>
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
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import LyricInfo from "~/components/Music/LyricInfo";
import MusicHeader from "~/components/Music/MusicHeader";
import Controler from "~/components/Music/Controler";
export default {
  components: { LyricInfo, MusicHeader },
  layout: "music",
  created(){
      console.log(this.$vuetify.application, 'top') 
  },
  data() {
    return {
      items: [
        {
          icon: " iconfont icon-bofangliebiao",
          text: "播放列表",
          route: "/music/playlist"
        },
        {
          icon: " iconfont icon-tuijian",
          text: "推荐歌单",
          route: "/music"
        },
        {
          icon: " iconfont icon-login",
          text: "我的歌单",
          route: "/music/userlist"
        },
        {
          icon: " iconfont icon-history",
          text: "最近播放",
          route: "/music/historylist"
        },
        {
          icon: " iconfont icon-sousuo",
          text: "搜歌",
          route: "/music/search"
        }
      ]
    };
  },

  created() {
    this._getPlaylistDetail(2796821320);
  },
  methods: {
    ...mapActions("music", ["_getPlaylistDetail"])
  },
  computed: {
    ...mapState("music", ["musicBG"]),
    ...mapGetters("music", ["currentSong"]),
    isActive() {
      return this.$vuetify.breakpoint.mdAndUp ? true : false;
    }
  }
};
</script>
<style lang='less' scoped>
.my4 {
  color: #999;
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
