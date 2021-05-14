<template>
  <v-app>
    <CoreToolbar />
    <CoreDrawer />
    <CoreViewMusic />
    <audio ref="audio"></audio>
  </v-app>
</template>

<script>

import { mapMutations } from 'vuex'
export default {
  name: 'music',
  created () {
    this.$nextTick(() => this.setAudio(this.$refs.audio))
  },

  components: {
    CoreToolbar: () => import("~/core/Toolbar"),
    CoreDrawer: () => import("~/core/Drawer"),
    CoreViewMusic: () => import("~/core/ViewMusic"),
  },

  methods: {
    ...mapMutations('music', {
      setAudio: 'SET_AUDIO'
    })
  }
};
</script>
