<!--
 * @Descripttion:
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:04
 * @LastEditors: wangtongxi
 * @LastEditTime: 2024-06-30 21:04:37
-->
<template>
  <v-app class="bar">
    <CoreViewMusic />

    <audio ref="audio"></audio>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'music',
  mounted() {
    this.$nextTick(() => {
      window.$audio = this.$refs.audio;
      this.setAudio(this.$refs.audio);
    });
  },

  components: {
    CoreViewMusic: () => import('~/core/ViewMusic')
  },

  methods: {
    ...mapMutations('music', {
      setAudio: 'SET_AUDIO'
    })
  }
};
</script>
<style>
body::-webkit-scrollbar {
  display: none;
}
.bar {
  user-select: none;
  -webkit-user-drag: none;
}
</style>
