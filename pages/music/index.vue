<template>
  <div :style="{ height: getTabHeight }">
    <Loading v-if="loading"></Loading>
    <Scroll v-else :data="length">
      <div>
        <div class="headline font-weight-light my-3">云村榜单</div>
        <div class="box">
          <template v-for="item in list">
            <MCard :key="item.name" :item="item"></MCard>
          </template>
        </div>
        <div class="headline font-weight-light my-3">推荐歌单</div>
        <div class="box">
          <template v-for="item in hotList">
            <MCard :key="item.name" :picType="0" :item="item"></MCard>
          </template>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { getToplistDetail, getPersonalized } from '~/api/index';
import Scroll from '~/components/Music/Scroller';
import MCard from '~/components/Music/MusicCard';
import ismdAndUpMixin from '~/components/Mixin/ismdAndUp';
import Loading from '~/components/Music/Loading';
export default {
  components: { MCard, Scroll, Loading },
  layout: 'music',
  created() {
    this._getMusicList();
  },
  methods: {
    async _getMusicList() {
      try {
        this.loading = true;
        let value = await Promise.all([getToplistDetail(), getPersonalized()]);
        for (let index = 0; index < value.length; index++) {
          let res = value[index];
          if (res.data.code === 200) {
            if (index === 0) {
              let list = res.data.list.filter(item => {
                // 将包含前四个的选出来
                if (item.ToplistType) {
                  return item;
                }
              });
              this.list = list;
              this.length += res.data.list.length;
            } else if (index === 1) {
              this.hotList = res.data.result;
              this.length += res.data.result.length;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    }
  },

  mixins: [ismdAndUpMixin],
  computed: {
    getTabHeight() {
      return this.ismdAndUp
        ? 'calc(100vh - 80px - 44px - 48px)'
        : 'calc(100vh - 80px - 44px - 48px)';
    }
  },
  data() {
    return {
      loading: false,
      length: 0,
      list: [], // 云村榜单
      hotList: [] // 热门歌单
    };
  }
};
</script>
<style lang="less" scoped>
.box {
  display: grid;
}
@media only screen and (max-width: 479px) {
  .box {
    grid-gap: 0.8rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media only screen and (min-width: 480px) and (max-width: 767px) {
  .box {
    grid-gap: 0.8rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 768px) and (max-width: 959px) {
  .box {
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 960px) and (max-width: 1199px) {
  .box {
    grid-gap: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 1200px) {
  .box {
    column-gap: 2rem;
    row-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
