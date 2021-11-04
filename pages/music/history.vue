<template>
  <div>
    <Musiclist
      :list="historyList"
      :showDelIcon="true"
      @select="selectHistory"
      @delete="deleteOneHistory"
      @clear="clearHistoryList"
      :isHistoryList="true"
    />
    <Dialog ref="Dialog" @handleConfirm="doclear" msg="清空播放历史"></Dialog>
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
  methods: {
    ...mapMutations('music', {
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions('music', [
      'selectPlay',
      'clearHistory',
      'removeOneHistory',
      'insertOnePlay',
      'clearHistory'
    ]),
    // 选择播放
    selectHistory({ item }) {
      this.insertOnePlay({ item });
    },
    // 删除一条历史
    deleteOneHistory({ index }) {
      let list = this.historyList;
      list.splice(index, 1);
      this.removeOneHistory(list);
      // this.$mmToast('删除成功')
    },
    // 清空历史
    clearHistoryList() {
      this.$refs.Dialog.show();
    },
    doclear() {
      this.clearHistory();
      console.log('clearHistory ok');
    }
  }
};
</script>

<style lang="less" scoped></style>
