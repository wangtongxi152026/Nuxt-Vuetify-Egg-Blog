<template>
  <v-app>
    <CoreAppBar />
    <CoreView />
    <audio ref="audio"></audio>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { getPlaylistDetail } from "~/api";
import { formatTopSongs } from "~/plugins/song";

export default {
  name: "App",
  fetch({ store }) {
    store.commit(["music/SET_AUDIO"], this.$refs.audio);
  },

  created() {
    this.$nextTick(() => this.setAudio());
  },
  data() {
    return {};
  },
  components: {
    CoreAppBar: () => import("~/core/onlybody/AppBar"),

    CoreView: () => import("~/core/onlybody/View")
  },
  methods: {
    ...mapMutations("music", {
      setAudio: "SET_AUDIO"
    })
  }
};
</script>
