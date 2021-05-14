<template>
  <v-content>
    <div class="blur" :style="{'background-image':`url(${musicPicUrl})`}"></div>
    <nuxt />
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import coreMusciCover from './core-musci-cover.jpg'
export default {
  computed: {
    ...mapGetters("music", ["currentSong"]),
    musicPicUrl () {
      return this.currentSong.image
        ? `${this.currentSong.image}?param=150y150`
        : coreMusciCover;
    }
  }
};
</script>
<style lang='less' scoped>
.blur {
  width: 100vw;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-attachment: scroll;

  -webkit-filter: blur(10px);
  transition: all 0.8s;
  filter: blur(10px) brightness(0.35);
}
</style>
