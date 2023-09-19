<!--
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:03
 * @LastEditors: wangtongxi
 * @LastEditTime: 2023-09-19 15:45:10
-->
<template>
  <div @click="toDetail" class="card pb-1">
    <span class="play-count">{{ item.playCount | numberFormat }}</span>
    <img
      v-lazy="`${picType === 1 ? item.coverImgUrl : item.picUrl}?param=300y300`"
      class="img"
    />
    <div class="caption pa-1 font-weight-light">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'MCard',
  methods: {
    toDetail() {
      this.$router.push({
        name: 'music-listdetail-id',
        params: { id: this.item.id }
      });
    }
  },
  props: {
    picType: {
      type: Number,
      default: 1
    },
    item: {
      type: Object,
      default: null
    }
  }
};
</script>
<style lang="less" scoped>
.card {
  position: relative;
  cursor: pointer;
  background-color: transparent !important;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  overflow: hidden;
  cursor: pointer;
  &:hover > div:last-child {
    color: rgba(255, 255, 255, 0.6);
  }
  .play-count {
    // position: absolute;
    // padding-left: 0.4rem;
    // padding-right: 0.4rem;
    // text-align: center;
    // width: fit-content;
    // background: #484545;

    position: absolute;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    border-radius: 0.5rem;
    line-height: 1rem;
    font-size: 0.5rem;
    background: #484545;
    opacity: 0.8;
    right: 0.3rem;
    top: 0.3rem;
  }
  .img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: contain;
  }
  .caption {
    color: #999;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    text-align: center;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
@media only screen and (max-width: 479px) {
  .card {
    height: 160px;
  }
  span {
    position: absolute;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    border-radius: 0.5rem;
    line-height: 1rem;
    font-size: 0.5rem;
    background: #484545;
    opacity: 0.8;
    right: 0.3rem;
    top: 0.3rem;
  }
}
@media screen and (min-width: 1200px) {
  .card {
    height: 100%;
  }
}
</style>
