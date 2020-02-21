<template>
  <div>
    <Musiclist
      :list="playlist"
      :showDelIcon="true"
      @select="selectOne"
      @delete="deleteOne"
      @clear="clearPList"
    ></Musiclist>
    <Dialog ref="Dialog" @handleConfirm="doclear" msg="清空播放列表"></Dialog>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Musiclist from "~/components/Music/Musiclist";
import Dialog from "~/components/Music/Dialog";
export default {
  name: "music-Playlist",
 
  components: { Musiclist, Dialog },
 layout: "music",
  computed: {
    ...mapGetters("music", ["currentSong", "playlist"])
  },

  methods: {
    ...mapMutations("music", {
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlaying: "SET_PLAYING"
    }),
    ...mapActions("music", ["removeOnePlaylist", "clearPlayList"]),

    selectOne({ item, index }) {
      if (item.id !== this.currentSong.id) {
        this.setCurrentIndex(index);
        this.setPlaying(true);
      }
    },
    deleteOne({ item }) {
      this.removeOnePlaylist(item);
    },
    clearPList() {
      this.$refs.Dialog.show();
    },
    doclear() {
      this.clearPlayList();
      // this.$mmToast('列表清空成功')
    }
  }
};
</script>

<style lang="less" scoped>
</style>
