<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:03
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-05 09:25:20
-->
<template>
  <v-card
    class="card elevation-1"
    :to="{ path: `/music/listdetail/${item.id}` }"
  >
    <v-avatar size="100%" tile>
      <img
        v-lazy="
          `${picType === 1 ? item.coverImgUrl : item.picUrl}?param=300y300`
        "
        class="img"
      />
    </v-avatar>
    <v-card-title class="pa-1 caption font-weight-light">{{
      item.name
    }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'MCard',

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

<style scoped>
.card {
  background-color: transparent !important;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
  height: fit-content;
}
.card .img {
  border-radius: 0.4rem;
}
.card .caption {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-align: center;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
