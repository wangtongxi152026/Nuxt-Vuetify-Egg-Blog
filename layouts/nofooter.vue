<template>
  <v-app>
    <CoreToolbar />

    <CoreDrawer />

    <CoreView></CoreView>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { getPlaylistDetail } from '~/api'
import { formatTopSongs } from '~/plugins/song'

export default {
  name: 'App',

  components: {
    CoreToolbar: () => import('~/core/Toolbar'),
    CoreDrawer: () => import('~/core/Drawer'),
    CoreView: () => import('~/core/View'),


  },

};
</script>
