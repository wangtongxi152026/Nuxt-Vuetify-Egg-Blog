<template>
  <v-app>
    <CoreToolbar></CoreToolbar>

    <CoreDrawer></CoreDrawer>

    <CoreView></CoreView>

    <CoreFooter></CoreFooter>

    <audio ref="audio"></audio>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  mounted() {
    if (!this.$store.state.music.audio) {
      this.$nextTick(() => this.setAudio());
    }
  },
  components: {
    CoreToolbar: () => import('~/core/Toolbar'),
    CoreDrawer: () => import('~/core/Drawer'),
    CoreView: () => import('~/core/View'),
    CoreFooter: () => import('~/core/Footer')
  },
  methods: {
    ...mapMutations('music', {
      setAudio: 'SET_AUDIO'
    })
  }
};
</script>
