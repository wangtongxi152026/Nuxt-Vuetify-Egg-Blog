<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:04
 * @LastEditors: wangtongxi
 * @LastEditTime: 2022-11-21 14:19:27
-->
<template>
  <v-app class="bar">
    <CoreViewMusic />
    <!-- <v-icon @click="back" class="back" color="orange darken-2">
      mdi-arrow-left
    </v-icon> -->
    <audio ref="audio"></audio>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'music',
  fetch({ store }) {
    console.log({ store }, 'store App');
    // store.commit(["music/SET_AUDIO"], this.$refs.audio);
  },
  created() {
    this.$nextTick(() => this.setAudio(this.$refs.audio));
  },

  components: {
    CoreViewMusic: () => import('~/core/ViewMusic')
  },

  methods: {
    ...mapMutations('music', {
      setAudio: 'SET_AUDIO'
    }),
    back() {
      this.$router.push('/');
    }
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
.back {
  position: fixed !important;
  top: 10vh;
  left: 5vw;
}
</style>
