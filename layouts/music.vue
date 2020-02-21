<template>
  <v-app>
    <CoreDrawer />

    <CoreToolbar />
    <CoreControl />
    <CoreViewMusic />

    <audio ref="audio"></audio>


  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name:'music',
  created() {
    this.$nextTick(() => {
      this.setAudio(this.$refs.audio);
    });
  },

  components: {
    CoreToolbar: () => import("~/core/Toolbar"),
    CoreDrawer: () => import("~/core/Drawer"),
    CoreViewMusic: () => import("~/core/ViewMusic"),
    CoreControl: () => import("~/core/BottomControl")
  },
  methods: {
    ...mapMutations("music", {
      setAudio: "SET_AUDIO"
    })
  }
};
</script>
