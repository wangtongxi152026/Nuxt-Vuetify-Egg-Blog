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
  mounted() {
    // 还原上次音量
    debugger;
    this.$nextTick(() => {
      this.handleVolumeChange(this.volume);
    });
  },
  computed: {
    ...mapGetters('music', ['volume']),
    // 决定音量进度条===>>state中volume对应的百分比
    percentVolume() {
      return this.volume;
    },
    // 获得音量图标
    getVolumeIcon() {
      return this.isMute ? 'iconfont icon-jingyin1' : 'iconfont icon-yinliang';
    },
    isMute: {
      get() {
        return this.percentVolume === 0;
      },
      set(newMute) {
        const volume = newMute ? 0 : this.lastVolume;
        if (newMute) {
          this.lastVolume = this.percentVolume;
        }
        this.handleVolumeChange(volume);
      }
    }
  },
  methods: {
    toggleVolume() {
      console.log(this.isMute, 'this.isMute');
      this.isMute = !this.isMute;
    },
    handleVolumeChange(percent) {
      debugger
      this.$emit('volumeChange', percent);
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
