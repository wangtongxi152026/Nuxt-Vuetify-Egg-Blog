<template>
  <div :style="{'height':getTabHeight}">
    <Scroll :data="getlistlen">
      <div>
        <MusicHeader></MusicHeader>
        <v-row v-if="userList.length">
          <v-col cols="4" lg="3" md="4" v-for=" item in userList" :key="item.name">
            <MCard :item="item"></MCard>
          </v-col>
        </v-row>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "~/components/Music/Scroller";
import MCard from "~/components/Music/MusicCard";
import MusicHeader from "~/components/Music/MusicHeader";
import { getUserPlaylist } from "@/api";
import { mapGetters } from "vuex";
import NoData from "~/components/Music/NoData"; import ismdAndUp from '~/components/Mixin/ismdAndUp'
export default {
  name: "music-userlist",
  layout: "music",
  created () {
    this.uid && this._getUserPlaylist(this.uid);
  },
  components: { MCard, NoData, Scroll, MusicHeader },
  data () {
    return {
      list: [] // 列表
    };
  },

  mixins: [ismdAndUp],
  watch: {
    uid (newUid) {
      if (newUid) {
        // this.mmLoadShow = true
        this._getUserPlaylist(newUid);
      } else {
        this.list = [];
      }
    }
  },
  computed: {
    ...mapGetters("music", ["uid"]),
    getlistlen () {
      return this.list.length
    },
    getTabHeight() {
      return this.ismdAndUp
        ? 'calc(100vh - 80px - 44px - 48px)'
        : 'calc(100vh - 80px - 44px - 48px)';
    },
    userList () {
      //歌曲数目>0的歌单
      return this.list.filter(item => item.trackCount > 0);
    },
  },
  methods: {
    _getUserPlaylist (uid) {
      getUserPlaylist(uid).then(res => {
        if (res.data.code === 200) {
          if (res.data.playlist.length === 0) {
            return;
          }
          this.list = res.data.playlist;
          // this._hideLoad()
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  // overflow-x: hidden;
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
  .nores {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
