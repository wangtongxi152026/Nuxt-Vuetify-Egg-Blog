<template>
  <div>
    <v-col
      v-if="user.userId"
      class="py-0"
      justify="space-between"
      align="center"
    >
      <nuxt-link to="/music/userlist" tag="span">
        <v-avatar size="40">
          <v-img :src="`${user.avatarUrl}?param=40y40`"></v-img>
        </v-avatar>

        <v-chip color="#7e7e7e" outlined>{{ user.nickname }}</v-chip>
        <v-btn class="pb-1" text color="#7e7e7e" @click.stop="logout"
          >退出</v-btn
        >
      </nuxt-link>

      <Dialog
        v-model="showDialog"
        @handleConfirm="dologout"
        msg="退出当前用户"
      ></Dialog>
    </v-col>

    <div v-else>
      <v-dialog dark v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            color="info"
            class="ml-10"
            @click.stop="dialog = true"
            v-on="on"
            >UID登录</v-btn
          >
        </template>
        <v-card class='login-card'>
          <v-card-title>
            <span class="headline info--text">网易云UID登录</span>
          </v-card-title>
          <v-card-text class="pb-0 mt-2">
            <div class="mb-1 subtitle-1">登录帮助:</div>
            <div class="mb-1">1. 在网易云音乐播放任意一首歌。</div>
            <div class="mb-1">2. 点击分享，然后点击“复制链接”</div>
            <div class="mb-1">3. 粘贴到任意位置查看。</div>
            <div>4.地址 &userid=后面的数字（网易云UID）</div>
            <v-form ref="form" class="mt-5">
              <form>
                <v-text-field
                  @keyup.enter="login"
                  class="px-2 error--text"
                  :rules="UIDRules"
                  :counter="9"
                  v-model="inputUid"
                  label="请输入您的网易云UID"
                  required
                ></v-text-field>
              </form>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" text @click="dialog = false">取消</v-btn>
            <v-btn color="success" text @click="login">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { getUserPlaylist } from '@/api';
import { mapGetters, mapActions } from 'vuex';
import Dialog from '~/components/Music/Dialog';
export default {
  data() {
    return {
      inputUid: '',
      user: {}, //头像名称
      dialog: false,
      showDialog: false,
      UIDRules: [
        v => {
          let reg = /(^\s+)|(\s+$)/g;
          return reg.test(v) ? '不可以为空~' : true;
        },
        v => {
          let num = /^[1-9]\d*$/;
          return num.test(v) || 'UID必须是数字格式~';
        }
      ]
    };
  },
  components: { Dialog },
  created() {
    this.uid && this._getUserPlaylist(this.uid);
  },
  computed: { ...mapGetters('music', ['uid']) },
  methods: {
    ...mapActions('music', ['setUseruid']),
    _getUserPlaylist(uid) {
      getUserPlaylist(uid).then(res => {
        if (res.data.code === 200) {
          this.inputUid = '';
          if (res.data.playlist.length === 0 || !res.data.playlist[0].creator) {
            alert(`未查询找 UID 为 ${uid} 的用户信息`);
            // this.$mmToast(`未查询找 UID 为 ${uid} 的用户信息`)
            return;
          }
          this.setUseruid(uid);
          this.user = res.data.playlist[0].creator;
          //  setTimeout(() => {
          //   this.$mmToast(`${this.user.nickname} 欢迎使用 mmPlayer`)
          // }, 200)
        }
      });
    },

    login() {
      if (this.$refs.form.validate()) {
        this._getUserPlaylist(this.inputUid);
        // 关闭登录窗口
        this.dialog = false;
      }
    },
    // 退出登录
    logout() {
      this.showDialog = true;
    },
    dologout() {
      this.user = {};
      this.setUseruid(null);
    }
  }
};
</script>
<style scoped>
.login-card{
  background: transparent;
}
.display-2 {
  z-index: 0;
}

.iconfont {
  color: orange !important;
  font-size: 28px;
  z-index: 0;
}
</style>
