<template>
  <v-col cols="12" class="py-0">
    <v-form ref="form">
      <form>
        <v-text-field
          class="pt-2"
          v-model="searchValue"
          :rules="rules"
          @keydown.enter.prevent="doSearch"
        >
          <!-- 外部搜索按钮 -->
          <template v-slot:append-outer>
            <v-icon
              class="searchicon"
              color="info"
              @mouseover="searchIcon"
              @mouseout="musicIcon"
              @click="doSearch"
              :class="icon"
            ></v-icon>
          </template>
          <!-- 内部清空按钮 -->
          <template v-if="searchValue" v-slot:append>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon @click="clear" class="iconfont icon-chahao1"></v-icon>
            </v-slide-x-reverse-transition>
          </template>
        </v-text-field>
      </form>
    </v-form>
    <MusicList
      v-if="list.length"
      class="mt--1"
      :list="list"
      :showDelIcon="false"
      @select="selectSearch"
    ></MusicList>
    <!-- loading组件 -->
    <Loading v-else-if="lodingShow"></Loading>
    <!-- 热搜 -->
    <v-btn
      v-else
      color="grey mr-4 mb-4"
      small
      depressed
      v-for="(item,index) in Artists.slice(0,10)"
      :key="index"
      @click="selectHot(item.first)"
    >
      <v-icon color="red" left>mdi-fire</v-icon>
      <span class="caption">{{ item.first }}</span>
    </v-btn>
  </v-col>
</template>

<script>
import { search, searchHot, getMusicDetail } from "@/api";
import { formatSongs } from "~/plugins/song";
import MusicList from "~/components/Music/Musiclist";
import Loading from "~/components/Music/Loading";
import { mapActions } from "vuex";
export default {
  name: "music-serach",
  async asyncData({ store }) {
    const res = await store.dispatch("music/searchHot");
    return { Artists: res.result.hots };
  },
 layout: "music",
  data() {
    return {
      rules: [
        v => {
          let reg = /(^\s+)|(\s+$)/g;
          return reg.test(v) ? "" : true;
        }
      ],
      lodingShow: false,
      searchValue: null, // 搜索关键词
      Artists: [], // 热搜数组
      list: [], // 搜索数组
      page: 0, // 分页
      icon: "iconfont icon-yinle"
    };
  },
  components: { MusicList, Loading },
  computed: {
    getTabHeight() {
      return this.$vuetify.breakpoint.smAndDown
        ? "calc(100vh - 80px - 112px - 58px )"
        : "calc(100vh - 336px - 58px)";
    }
  },
  methods: {
    ...mapActions("music", ["insertOnePlay"]),
    doSearch() {
      this.lodingShow = true;
      if (this.$refs.form.validate()) {
        search(this.searchValue).then(res => {
          if (res.data.code === 200) {
            this.list = formatSongs(res.data.result.songs);
            this.lodingShow = false;
          }
        });
      }
    },
    // 索索结果中选择播放
    async selectSearch({ item }) {
      let image = await this._getSearchImg(item.id);
      item.image = image;
      this.insertOnePlay({ item });
    },
    searchIcon() {
      this.icon = "iconfont icon-search";
    },
    musicIcon() {
      this.icon = "iconfont icon-yinle";
    },
    clear() {
      this.searchValue = null;
      this.list = [];
    },
    // 点击热搜
    selectHot(v) {
      this.searchValue = v;
      this.doSearch();
    },
    // 获取歌曲图片
    _getSearchImg(id) {
      return getMusicDetail(id).then(res => {
        if (res.data.code === 200) {
          return res.data.songs[0].al.picUrl;
        }
      });
    }
  }
};
</script>
<style scoped>
.mt--1 {
  margin-top: -1.5vh;
}
.searchicon {
  z-index: 0;
}
</style>
