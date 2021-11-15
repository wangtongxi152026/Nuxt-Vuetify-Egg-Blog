<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:04
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-12 10:30:49
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
  created() {
    this.$nextTick(() => this.setAudio(this.$refs.audio));
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
</style>
