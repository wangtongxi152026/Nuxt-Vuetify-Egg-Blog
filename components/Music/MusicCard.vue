<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:03
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-16 15:11:30
-->
<template>
  <div @click="toDetail" class="card pb-1">
    <img
      v-lazy="`${picType === 1 ? item.coverImgUrl : item.picUrl}?param=300y300`"
      class="img"
    />
    <div style="height:40px" class="caption pa-1 font-weight-light">
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
@media only screen and (max-width: 479px) {
  .card {
    height: 160px;
  }
}
@media screen and (min-width: 1200px) {
  .card {
    height: 218px;
  }
}
.card {
  cursor: pointer;
  background-color: transparent !important;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
  // height: auto;
  &:hover > div:last-child {
    color: rgba(255, 255, 255, 0.6);
  }
  .img {
    border-radius: 0.4rem;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  .caption {
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    text-align: center;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
