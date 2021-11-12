<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:27:46
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-10 16:40:30
-->
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
import { formatTopSongs } from '~/plugins/song';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'listdetail',
  components: { Musiclist },
  layout: 'music',
  created() {
    // 获取歌单详情
    // this._getPlaylistDetail();
    getPlaylistDetails(this.$route.params.id)
      .then(playlist => {
        this.setLoading(true);

        document.title = playlist.name;
        this.detailList = playlist.tracks;
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
      });
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
