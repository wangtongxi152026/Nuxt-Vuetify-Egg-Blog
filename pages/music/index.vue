<template>
  <div :style="{ height: getTabHeight }">
    <Scroll :data="hotList.length + list.length">
      <div>
        <Loading v-if="!hotList.length"></Loading>
        <div v-else>
          <div class="headline font-weight-light py-3">云村榜单</div>
          <div class="box">
            <template v-for="item in list">
              <MCard :key="item.name" :item="item"></MCard>
            </template>
          </div>
          <div class="headline font-weight-light py-3">推荐歌单</div>
          <div class="box">
            <template v-for="item in hotList">
              <MCard :key="item.name" :picType="0" :item="item"></MCard>
            </template>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getToplistDetail, getPersonalized } from "~/api/index";
import Scroll from "~/components/Music/Scroller";
import MCard from "~/components/Music/MusicCard";
import ismdAndUp from '~/components/Mixin/ismdAndUp'
import Loading from "~/components/Music/Loading";
export default {
  components: { MCard, Scroll, Loading },
  layout: "music",
  created() {
    this._getToplistDetail();
    this._getPersonalized();
  },
  methods: {
    async _getToplistDetail() {
      const res = await getToplistDetail()
      if (res.data.code === 200) {
        let list = res.data.list.filter(item => { // 将包含前四个的选出来
          if (item.ToplistType) {
            return item
          }
        })
        this.list = list
      }
    },
    async _getPersonalized() {
      const res = await getPersonalized()
      if (res.data.code === 200) {
        console.log(res.data.result, '_getToplistDetail');
        this.hotList = res.data.result
      }
    },
  },


  mixins: [ismdAndUp],
  computed: {
    getDatalength() {
      return [...this.hotList, ...this.list].length;
    },
    getTabHeight() {
      return this.ismdAndUp
        ? "calc(100vh - 100px - 124px)"
        : "calc(100vh - 80px - 112px)";
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
<style lang="less" scoped>
.box {
  display: grid;
  grid-gap: 0.8rem;
}
@media (min-width: 600px) {
  .box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (min-width: 960px) {
  .box {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (min-width: 1264px) {
  .box {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>>
 