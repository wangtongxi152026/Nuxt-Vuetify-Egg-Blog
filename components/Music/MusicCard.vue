<template>

  <v-card ref="Card" class="card elevation-1" :to="{path:`/music/listdetail/${item.id}`}">
    <v-avatar size='100%' tile>
      <img v-if="picType===1" v-lazy="`${item.coverImgUrl}?param=300y300`" class="img elevation-3" />
      <img v-else v-lazy="`${item.picUrl}?param=300y300`" class="img elevation-3" />
    </v-avatar>
    <v-card-title class="pa-1 caption font-weight-light">{{item.name}}</v-card-title>
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
  },

}
</script>

<style  scoped>
.card {
  /* background-color: #363330 !important; */
  background-color:transparent !important; 
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
}
.card .img {
  border-radius: 0.4rem;
}
.card .caption {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
