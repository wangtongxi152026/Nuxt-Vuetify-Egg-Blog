<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:04
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-04 11:14:12
-->
<template>
  <v-app class="bar">
    <!-- <CoreToolbar />
    <CoreDrawer /> -->
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
    CoreToolbar: () => import('~/core/Toolbar'),
    CoreDrawer: () => import('~/core/Drawer'),
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
