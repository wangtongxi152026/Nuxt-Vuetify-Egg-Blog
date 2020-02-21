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
import { mapMutations, mapActions, mapState } from 'vuex'
import { getPlaylistDetail } from '~/api'
import { formatTopSongs } from '~/plugins/song'

export default {
  name: 'App',
  fetch ({store}) {
    store.commit(['music/SET_AUDIO'],this.$refs.audio)
  },
  
  // created () {
  //   this.$nextTick(() => this.setAudio())
  // },
  data () {
    return {

    }
  },
  components: {
    CoreToolbar: () => import('~/core/Toolbar'),
    CoreDrawer: () => import('~/core/Drawer'),
    CoreView: () => import('~/core/View'),
    CoreFooter: () => import('~/core/Footer'),
    
  },
  methods: {
    ...mapMutations('music', {
      setAudio: 'SET_AUDIO',
    }),

  },
};
</script>
