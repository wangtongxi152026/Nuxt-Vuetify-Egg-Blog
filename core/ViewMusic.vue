<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:04
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-23 18:03:25
-->
<template>
  <v-content>
    <div class="blur" :style="{ 'background-image': `url(${musicPicUrl})` }" />
    <nuxt-child />
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex';
import coreMusciCover from './core-musci-cover.jpg';
export default {
  computed: {
    ...mapGetters('music', ['currentSong']),
    musicPicUrl() {
      return this.currentSong.image
        ? `${this.currentSong.image}?param=150y150`
        : coreMusciCover;
    }
  }
};
</script>
<style lang="less" scoped>
.blur {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background-attachment: scroll;
  transition: all 0.8s;
  filter: blur(10px) brightness(0.5);
  transform: scale(1.1);
  opacity: 0.7;
}
</style>
