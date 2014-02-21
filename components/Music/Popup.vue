<!--
 * @Descripttion: 
 * @Author: wangtongxi
 * @Date: 2020-02-10 19:28:03
 * @LastEditors: wangtongxi
 * @LastEditTime: 2021-11-12 15:26:33
-->
<template>
  <v-dialog dark v-model="dialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn text color="info" class="ml-10" v-on="on">UID登录</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline info--text">网易云UID登录</span>
      </v-card-title>
      <v-card-text class="pb-0 mt-2">
        <div class="mb-1 subtitle-1">登录帮助:</div>
        <div class="mb-1">1. 在网易云音乐播放任意一首歌。</div>
        <div class="mb-1">2. 点击分享，然后点击“复制链接”</div>
        <div class="mb-1">3. 粘贴到记事本查看。</div>
        <div>4.地址 &userid=后面的数字（网易云UID）</div>

        <v-form ref="form">
          <form>
            <v-text-field
              @keyup.enter="login"
              class="px-2 error--text"
              :rules="UIDRules"
              :counter="9"
              v-model="uid"
              label="请输入您的网易云UID"
              required
            >
            </v-text-field>
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
</template>

<script>
import { getUserPlaylist } from '@/api';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Popup',
  data() {
    return {
      uid: '',
      user: {}, //头像，名称
      dialog: false,
      UIDRules: [
        v => !!v || '不可以为空~',
        v => {
          let num = /^[1-9]\d*$/;
          return num.test(v) || 'UID必须是数字格式~';
        }
      ]
    };
  },
  methods: {
    ...mapActions('music', ['setUseruid']),
    _getUserPlaylist(uid) {
      getUserPlaylist(uid).then(res => {
        if (res.data.code === 200) {
          this.uid = '';
          if (res.data.playlist.length === 0 || !res.data.playlist[0].creator) {
            console.log(`未查询找 UID 为 ${uid} 的用户信息`);
            this.$message.error(`未查询找 UID 为 ${uid} 的用户信息`);
            return;
          }
          this.setUseruid(uid);
          this.user = res.data.playlist[0].creator;
        }
      });
    },

    login() {
      if (this.$refs.form.validate()) {
        console.log(this.uid);
        _getUserPlaylist(this.uid);
      }
    }
  }
};
</script>
<style lang="stylus" scoped></style>
