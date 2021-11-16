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
import { getPlaylistDetails } from '~/api';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'listdetail',
  components: { Musiclist },
  layout: 'music',
  async created() {
    // 获取歌单详情

    try {
      this.setLoading(true);
      let playlist = await getPlaylistDetails(this.getListID);
      document.title = playlist.name;
      this.detailList = playlist.tracks;
    } catch (error) {
      console.log(error);
    }

    this.setLoading(false);
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
    ...mapMutations('music', {
      setLoading: 'SET_LOADING'
    }),
    // 获取歌单详情
    // _getPlaylistDetail() {
    //   getPlaylistDetail(this.getListID).then(res => {
    //     this.setLoading(true);
    //     if (res.data.code === 200) {
    //       this.detailList = formatTopSongs(res.data.playlist.tracks);
    //       document.title = res.data.playlist.name;
    //       this.setLoading(false);
    //     }
    //   });
    // },
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
