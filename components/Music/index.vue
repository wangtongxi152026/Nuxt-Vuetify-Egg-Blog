<template>
  <!-- <v-container> -->
  <Scroll :data="getDatalength">
    <div class="box">
      <v-row>
        <v-col cols="12" class="py-0">
          <div class="font-weight-light mt-1">云村榜单</div>
        </v-col>
        <v-col cols="4" lg="3" md="4" v-for="item in list" :key="item.name">
          <MCard :item="item"></MCard>
        </v-col>
        <v-col cols="12" class="py-0">
          <div class="headline font-weight-light">推荐歌单</div>
        </v-col>
        <v-col cols="4" lg="3" md="4" v-for="item in hotList" :key="item.name">
          <MCard :picType="0" :item="item"></MCard>
        </v-col>
      </v-row>
    </div>
  </Scroll>
  <!-- </v-container> -->
</template>

<script>
import { getToplistDetail, getPersonalized } from "@/api";
import Scroll from "~/components/Music/Scroller";
import MCard from "~/components/Music/MusicCard";
import ismdAndUp from '~/components/Mixin/ismdAndUp'

export default {

  components: { MCard, Scroll },
  mixins: [ismdAndUpMixin],
  created() {
    // 获取前四条数据
    this._getToplistDetail();
    this._getPersonalized();
  },

  methods: {
    _getToplistDetail() {
      getToplistDetail().then(res => {
        if (res.data.code === 200) {
          let list = res.data.list.filter(item => {
            // 将包含前四个的选出来
            if (item.ToplistType) {
              return item;
            }
          });
          this.list = list;
        }
      });
    },
    _getPersonalized() {
      getPersonalized().then(res => {
        if (res.data.code === 200) {
          this.hotList = res.data.result;
        }
      });
    }
  },

  computed: {
    getDatalength() {
      return this.hotList.length + this.list.length;
    },
    getTabHeight() {
      return this.ismdAndUp ? "calc(100vh - 336px)" : "calc(100vh - 80px - 112px)"


    }
  },
  data() {
    return {
      list: [], // 云村榜单
      hotList: [] // 热门歌单
    };
  }
};
</script>
