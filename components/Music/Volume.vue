<template>
  <div class="d-flex">
    <v-icon :class="getVolumeIcon" class="mx-3" @click="toggleVolume"></v-icon>
    <div style="width:100px" v-if="ismdAndUp">
      <PorgressBar
        :percent="percentVolume"
        @percentChange="handleVolumeChange"
      ></PorgressBar>
    </div>
  </div>
</template>

<script>
import PorgressBar from '~/components/Music/ProgressBar';
import { mapGetters } from 'vuex';
import ismdAndUpMixin from '~/components/Mixin/ismdAndUp';

export default {
  name: 'Volume',
  components: { PorgressBar },
  mixins: [ismdAndUpMixin],
  data() {
    return {
      lastVol: 0
    };
  },
  computed: {
    // 决定音量进度条===>>state中volume对应的百分比
    percentVolume() {
      return this.$store.state.music.volume;
    },
    // 获得音量图标
    getVolumeIcon() {
      return this.percentVolume === 0
        ? 'iconfont icon-jingyin1'
        : 'iconfont icon-yinliang';
    }
  },
  methods: {
    toggleVolume() {
      if (this.percentVolume) {
        this.lastVol = this.percentVolume;
        this.handleVolumeChange(0);
      } else {
        this.handleVolumeChange(this.lastVol);
      }
    },
    handleVolumeChange(percent) {
      this.$emit('changeVolume', percent);
    }
  }
};
</script>

<style scoped>
.iconfont {
  color: orange !important;
  cursor: pointer;
  font-size: 20px;
}
</style>
