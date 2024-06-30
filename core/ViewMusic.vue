<!--
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:04
 * @LastEditors: wangtongxi
 * @LastEditTime: 2024-06-30 20:43:47
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
  fetch({ store }) {
    debugger
    console.log('fetch store App', { store });
    // store.commit(["music/SET_AUDIO"], this.$refs.audio);
  },
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    debugger
    console.log('asyncData store App', { store });
  },
  computed: {
    ...mapGetters('music', {
      currentSong: 'currentSong'
    }),
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
  opacity: 0.7;
}
</style>
