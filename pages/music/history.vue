<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:27:46
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-16 11:24:29
-->
<template>
  <div>
    <Musiclist
      :list="historyList"
      :showDelIcon="true"
      @select="selectHistory"
      @delete="deleteOneHistory"
      @clear="clearHistoryList"
    />
    <Dialog
      v-model="showDialog"
      @handleConfirm="doclear"
      msg="清空播放历史"
    ></Dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Musiclist from '~/components/Music/Musiclist';
import Dialog from '~/components/Music/Dialog';

export default {
  name: 'music-history',
  layout: 'music',
  components: { Musiclist, Dialog },
  computed: {
    ...mapGetters('music', ['historyList'])
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    ...mapMutations('music', {
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions('music', [
      'clearHistory',
      'removeOneHistory',
      'insertOnePlay'
    ]),
    // 选择播放
    selectHistory({ item }) {
      this.insertOnePlay({ item });
    },
    // 删除一条历史
    deleteOneHistory({ index }) {
      let list = [...this.historyList];
      list.splice(index, 1);
      this.removeOneHistory(list);
      // this.$mmToast('删除成功')
    },
    // 清空历史
    clearHistoryList() {
      this.showDialog = true;
    },
    doclear() {
      this.clearHistory();
      console.log('clearHistory ok');
    }
  }
};
</script>

<style lang="less" scoped></style>
