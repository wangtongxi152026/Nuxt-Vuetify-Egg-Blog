<template>
  <div :style="{ height: getTabHeight }">
    <Loading v-if="length === 0"></Loading>
    <Scroll v-else :data="length">
      <div>
        <div>
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
import { getToplistDetail, getPersonalized } from '~/api/index';
import Scroll from '~/components/Music/Scroller';
import MCard from '~/components/Music/MusicCard';
import ismdAndUp from '~/components/Mixin/ismdAndUp';
import Loading from '~/components/Music/Loading';
export default {
  components: { MCard, Scroll, Loading },
  layout: 'music',
  created() {
    this._getMusicList();
  },
  methods: {
    _getMusicList() {
      Promise.all([getToplistDetail(), getPersonalized()])
        .then(value => {
          for (let index = 0; index < value.length; index++) {
            let res = value[index];
            if (res.data.code === 200) {
              if (index === 0) {
                this.length += res.data.list.length;
                let list = res.data.list.filter(item => {
                  // 将包含前四个的选出来
                  if (item.ToplistType) {
                    return item;
                  }
                });
                this.list = list;
              } else if (index === 1) {
                this.length += res.data.result.length;
                this.hotList = res.data.result;
              }
            }
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    async _getToplistDetail() {
      const res = await getToplistDetail();
      if (res.data.code === 200) {
        let list = res.data.list.filter(item => {
          // 将包含前四个的选出来
          if (item.ToplistType) {
            return item;
          }
        });
        this.list = list;
      }
    },
    async _getPersonalized() {
      const res = await getPersonalized();
      if (res.data.code === 200) {
        this.hotList = res.data.result;
      }
    }
  },

  mixins: [ismdAndUp],
  computed: {
    getTabHeight() {
      return this.ismdAndUp
        ? 'calc(100vh - 80px - 44px - 48px)'
        : 'calc(100vh - 80px - 44px - 48px)';
    }
  },
  data() {
    return {
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
</style>
