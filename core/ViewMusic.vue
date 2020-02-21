<template>
  <v-content id="pages">
    <div class="blur" :style="{'background-image':`url(${musicPicUrl})`}"></div>
    <nuxt />
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("music", ["currentSong"]),

    musicPicUrl() {
      return this.currentSong.image
        ? `${this.currentSong.image}?param=150y150`
        : "https://cdn.vuetifyjs.com/images/carousel/sky.jpg";
    }
  }
};
</script>
<style lang='less' scoped>
#pages {
  background-color: #eee;
}
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
