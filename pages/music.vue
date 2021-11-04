<template>
  <div>
    <div style="display: flex" class="px-2 pt-2">
      <v-icon color="orange darken-2"> mdi-arrow-left </v-icon>
      <div class="title">在线播放器Player</div>
    </div>
    <v-container class="music-main">
      <v-row>
        <v-col cols="12" class="pa-0">
          <div class="nav">
            <template v-for="(item, i) in items">
              <div
                :class="[
                  $route.path == item.route ? 'active' : 'normal',
                  'button'
                ]"
                @click="click(item)"
                :key="i"
              >
                <span class="nav-title" v-if="isActive">{{ item.text }}</span>
                <v-icon style="color: inherit" :class="item.icon"></v-icon>
              </div>
            </template>
          </div>
        </v-col>
        <v-col md="8">
          <v-scroll-y-transition mode="out-in">
            <nuxt-child
              keep-alive
              :keep-alive-props="{ exclude: ['Listdetail', 'comment'] }"
            />
          </v-scroll-y-transition>
        </v-col>
        <v-col v-if="ismdAndUp" md="4" class="sliderRight px-0">
          <LyricInfo></LyricInfo>
        </v-col>
      </v-row>
      <CoreControl />
    </v-container>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatTopSongs } from '~/plugins/song';
import LyricInfo from '~/components/Music/LyricInfo';
import MusicHeader from '~/components/Music/MusicHeader';
import ismdAndUp from '~/components/Mixin/ismdAndUp';

export default {
  components: {
    LyricInfo,
    MusicHeader,
    CoreControl: () => import('~/core/BottomControl')
  },
  layout: 'music',
  created() {
    this._getPlaylistDetail(2796821320);
  },
  methods: {
    ...mapActions('music', ['setPlaylist']),
    ...mapMutations('music', {
      setSequenceList: 'SET_SEQUENCE_LIST'
    }),
    async _getPlaylistDetail(id) {
      const res = await this.$axios.get('/musc/playlist/detail', {
        params: {
          id
        }
      });
      if (res.data.code === 200) {
        let list = formatTopSongs(res.data.playlist.tracks);

        this.setSequenceList(list);
        this.setPlaylist(list);
      }
    },
    click(e) {
      this.$router.push({ path: e.route });
    }
  },
  mixins: [ismdAndUp],
  computed: {
    items: () => [
      {
        icon: 'iconfont icon-shijianzhou',
        text: '播放列表',
        route: '/music/playlist'
      },
      {
        icon: 'iconfont icon-tuijian',
        text: '推荐歌单',
        route: '/music'
      },
      {
        icon: 'iconfont icon-login',
        text: '我的歌单',
        route: '/music/userlist'
      },
      {
        icon: 'iconfont icon-history',
        text: '最近播放',
        route: '/music/history'
      },
      {
        icon: 'iconfont icon-sousuo',
        text: '搜歌',
        route: '/music/search'
      }
    ],
    ...mapGetters('music', ['currentSong']),
    isActive() {
      return this.ismdAndUp ? true : false;
    }
  }
};
</script>
<style lang="sass" scoped>
.nav
  height: 48px
  display: grid
  background-color: transparent
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  &-title
    font-size: 12px
    text-align: center

.button
  display: flex
  flex-direction: column-reverse
  position: relative
  height: 48px
  cursor: pointer

.active
  color: #ff9800

.normal
  color: rgba(255, 255, 255, 0.7)

.title
  position: relative
  text-shadow: 0 2px 10px rgb(0 0 0 / 20%)
  line-height: 36px
  font-size: 16px !important
  width: 100%
  text-align: center
  color: orange

.sm-font-size
  font-size: 14px !important

.music-main
  color: #999
  padding: 0 12px

.px-0
  color: #999

.sliderRight
  min-width: 300px
</style>
