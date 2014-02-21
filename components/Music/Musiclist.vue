<template>
  <v-card :height="height" max-width="100vw" class="body-2">
    <Loading v-if="$store.state.music.loading"></Loading>
    <Scroll v-else :data="list.length || getTabHeight">
      <v-list-item-group>
        <v-list-item>
          <v-row class="d-flex align-center">
            <v-col align="center" cols="2">
              <v-icon
                v-if="showDelIcon"
                size="20"
                :disabled="!list.length"
                class="iconfont icon-shanchu1"
                @click.stop="clearAll"
              ></v-icon>
            </v-col>
            <v-col cols="8" md="5">歌曲</v-col>
            <v-col align="center" cols="4" v-if="isTimeshow">时长</v-col>
          </v-row>
        </v-list-item>
        <template v-if="list.length">
          <v-list-item
            v-for="(item, index) in list"
            :key="index"
            :class="{ wave: playing && currentSong.id === item.id }"
            color="info"
            @click="selectItem(item, index)"
          >
            <v-row
              class="d-flex align-center"
              :class="{ rowHeight: ismdAndUp }"
              cols="12"
            >
              <v-col cols="2" align="center" class="num index">{{
                index + 1
              }}</v-col>
              <!-- 歌曲 -->
              <v-col cols="8" md="5" justify-self="center">
                <span class="songname">
                  {{ item.name }}
                  <span class="overline">-{{ item.singer }}</span>
                </span>
              </v-col>
              <!-- 播放* -->
              <v-col cols="1" align="center" v-if="ismdAndUp">
                <v-icon
                  class="go"
                  :class="getPlayIcon(item.id)"
                  @click.stop="selectItem(item, index)"
                ></v-icon>
              </v-col>
              <!-- 时间 **-->
              <v-col cols="2" align="center" v-if="isTimeshow">
                <span style="" :class="{ durationTime: showDelIcon }">{{
                  item.duration | formatTime
                }}</span>
              </v-col>
              <!-- 删除按钮 -->
              <v-col cols="2" align="center" v-if="showDelIcon">
                <v-icon
                  class="iconfont icon-chahao1"
                  @click.stop="deleteItem(index, item)"
                ></v-icon>
              </v-col>
            </v-row>
          </v-list-item>
        </template>
        <p style="text-align: center;color:#999;margin-top:30%" v-else>
          没有历史记录哦
        </p>
      </v-list-item-group>
    </Scroll>
    <Snackbar v-model="isShow"></Snackbar>
  </v-card>
</template>

<script>
import Scroll from '~/components/Music/Scroller';
import Snackbar from '~/components/Music/Snackbar';
import { mapState, mapGetters, mapMutations } from 'vuex';
import Loading from '~/components/Music/Loading';
import ismdAndUpMixin from '~/components/Mixin/ismdAndUp';
export default {
  name: 'Musiclist',
  // asyncData({store}) {
  //   console.log({store})
  //   return {ismdAndUdpee:false}

  // },
  components: { Loading, Scroll, Snackbar },
  props: {
    // 歌单列表
    list: {
      type: Array,
      default: () => []
    },
    // 删除按钮
    showDelIcon: {
      type: Boolean,
      default: true
    },
    height: {
      type: String || Number,
      default: 'calc(100vh - 80px - 44px - 48px)'
    }
  },
  mixins: [ismdAndUpMixin],
  methods: {
    ...mapMutations('music', {
      setPlaying: 'SET_PLAYING'
    }),
    // 如果当前出去播放状态&&选中的id和在播放的id相同  图标不变
    getPlayIcon(itemId) {
      const id = this.currentSong.id;
      return this.playing && id === itemId
        ? 'Xfont iconfont icon-zanting'
        : 'Xfont iconfont icon-play_icon';
    },
    // 选中歌曲
    selectItem(item, index, e) {
      if (item.id === this.currentSong.id) {
        // 点击的歌曲id 和正在播放的歌曲相同 视为暂停 return
        console.log(
          'item.id, this.currentSong.id',
          item.id,
          this.currentSong.id
        );
        this.setPlaying(!this.playing);
        return;
      }
      this.$emit('select', { item, index });
    },
    // 删除事件
    deleteItem(index, item) {
      this.$emit('delete', { index, item }); // 触发删除事件
      this.isShow = true;
    },
    // 清空
    clearAll() {
      this.$emit('clear');
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState('music', ['playing']),
    ...mapGetters('music', ['currentSong']),
    getTabHeight() {
      return this.ismdAndUp
        ? 'calc(100vh - 80px - 44px - 48px)'
        : 'calc(100vh - 80px - 44px - 48px)';
    },
    // 歌曲时长的显示
    isTimeshow() {
      return !this.ismdAndUp ? false : true;
    }
  }
};
</script>

<style lang="less" scoped>
@textColor: rgba(255, 255, 255, 0.7);
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: @textColor !important;
}
.v-card {
  color: @textColor;
  box-shadow: none;
  background: transparent;
  .rowHeight {
    height: 55px;
  }
  .wave {
    .num {
      font-size: 0;
      background: url('../../assets/image/wave.gif') no-repeat center;
    }
  }
  .songname,
  .singer {
    color: @textColor;
    // 1行显示溢出隐藏
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .overline {
    color: #c1c1c1;
  }
  .iconfont {
    color: @textColor;
    font-size: 28px;
  }
  .icon-chahao1 {
    color: #000;
  }
  .icon-chahao1:hover {
    color: #7e7e7e;
  }
  .go {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
  .row:hover {
    .go {
      display: block;
    }
  }
}
</style>
