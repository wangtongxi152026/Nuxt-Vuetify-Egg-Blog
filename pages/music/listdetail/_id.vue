<template>
  <Musiclist
    :list="detailList"
    :showDelIcon="false"
    @select="selectItem"
  ></Musiclist>
</template>

<script>
// 歌单表单
import Musiclist from '~/components/Music/Musiclist';
import { getPlaylistDetail } from '~/api';
import { formatTopSongs } from '~/plugins/song';
import { mapActions } from 'vuex';

export default {
  name: 'listdetail',
  components: { Musiclist },
  layout: 'music',
  created() {
    // 获取歌单详情
    this._getPlaylistDetail();
  },
  computed: {
    // 歌单id
    getListID() {
      return this.$route.params.id;
    }
  },

  data() {
    return {
      detailList: []
    };
  },
  methods: {
    ...mapActions('music', ['selectPlay']),
    // 获取歌单详情
    _getPlaylistDetail() {
      getPlaylistDetail(this.getListID).then(res => {
        if (res.data.code === 200) {
          this.detailList = formatTopSongs(res.data.playlist.tracks);
          document.title = res.data.playlist.name;
        }
      });
    },
    selectItem({ index }) {
      this.selectPlay({
        list: this.detailList,
        index
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
