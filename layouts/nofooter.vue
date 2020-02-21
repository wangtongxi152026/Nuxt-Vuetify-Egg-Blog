<template>

  <v-app>

    <CoreToolbar />

    <CoreDrawer />

    <CoreView></CoreView>

    <audio ref="audio"></audio>

  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { getPlaylistDetail } from '~/api'
import { formatTopSongs } from '~/plugins/song'

export default {
  name: 'App',
  fetch ({ store }) {
    store.commit(['music/SET_AUDIO'], this.$refs.audio)
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

    // CoreTips: () => import('~/components/TipsBox')
  },
  methods: {
    ...mapMutations('music', {
      setAudio: 'SET_AUDIO',
    }),

  },
};
</script>
