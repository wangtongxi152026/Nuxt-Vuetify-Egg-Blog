<template>
  <v-container fill-height tag="section">
    <v-row justify="center" class="pm-main-sign-up">
      <v-col id="max-width" v-if="ismdAndUp" cols="6">
        <div class="left-section">
          <v-list-item class="mt-6">
            <v-avatar size="56">
              <img class="elevation-2" src="~/assets/avatar.jpg" />
            </v-avatar>
            <span class="font-weight-regular headline white--text ml-4">WTONGXI</span>
          </v-list-item>
        </div>
      </v-col>

      <v-col class="right-section" id="max-width" cols="12" md="6">
        <div class="heading">
          <span class="headline font-weight-bold info--text">欢迎注册!</span>
          <div class="float-right">
            <v-btn nuxt color="#f26b3a" to="/login" class="px-0" text>账号登录</v-btn>
          </div>
        </div>

        <div id="notification-div" class="notify-failure notification-container">
          <span id="notification-message"></span>
        </div>

        <v-form ref="form">
          <div class="pm-form-group">
            <label for="email" class="pm-form-label">邮箱</label>
            <v-text-field dense single-line outlined v-model="email" :rules="emailRules"></v-text-field>
          </div>

          <div class="pm-form-group">
            <label for="username" class="pm-form-label">用户名</label>

            <v-text-field dense single-line outlined v-model="username" :rules="inputRules"></v-text-field>
          </div>

          <div class="pm-form-group">
            <label for="password" class="pm-form-label">密码</label>
            <v-text-field
              dense
              single-line
              outlined
              v-model="password"
              :rules="inputRules"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
            ></v-text-field>

            <div class="pm-password-strength-indicator">
              <div class="pm-password-strength-pointer"></div>
              <div class="pm-password-strength">
                <div class="pm-password-strength-content">
                  <div class="strength-title">密码强度:</div>
                  <div class="strength-text" id="password-strength-text"></div>
                  <svg class="strength-progress" width="210px" height="10px">
                    <line
                      x1="0"
                      y1="5"
                      x2="210"
                      y2="5"
                      stroke-width="4px"
                      stroke-linecap="round"
                      class="strength-progress-background"
                    />
                    <line
                      x1="0"
                      y1="5"
                      x2="210"
                      y2="5"
                      stroke-width="4px"
                      stroke-linecap="round"
                      class="strength-progress-foreground"
                      id="password-strength-progress-foreground"
                    />
                  </svg>
                  <div class="strength-description">密码至少6位字符. 建议使用数字和符号字母组合.</div>
                </div>
              </div>
            </div>
          </div>

          <v-btn class="mb-1" :loading="loading" block color="#f26b3a" @click="submit" dark>注册</v-btn>
        </v-form>

        <div class="pm-awesome-divider-div">
          <div class="pm-awesome-divider" data-label="or"></div>
        </div>

        <v-btn class="mb-10" block color="info" @click="handleOAuth" dark>
          <v-icon class="iconfont icon-github" left />Githup授权登录
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { register } from '~/api/api'
import { getUserInfo, currentUser, getUser } from '~/api/api'
import config from '~/util/config'
import ismdAndUpMixin from '~/components/Mixin/ismdAndUp'

export default {
  layout: 'onlybody', mixins: [ismdAndUpMixin],
  components: {
    // Stars
  },
  data () {
    return {
      show: false,
      loading: false,
      email: '',
      username: '',
      password: '',
      inputRules: [
        v => {
          let reg = /(^\s+)|(\s+$)/g
          return reg.test(v) ? '不可以为空~' : true
        },
        v => 6 <= v.length || '字符长度为6-15位之间',
        v => (v || '').length <= 15 || '字符长度为6-15位之间'
      ],
      emailRules: [
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || '请输入正确邮箱格式~'
        }
      ]
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const params = {
          email: this.email,
          name: this.username,
          password: this.password
        }
        const result = await register(params)
        this.loading = false
        if (result.code === 0) {
          this.$message.success(result.message)
          let hostName = this.$route.query.redirect // 获取域名
          if (hostName === hostName) {
            // 判断如果域名是你项目域名，说明是从本网站内部跳转过来的，
            this.$router.go(-1) // 登录成功后，返回上次进入的页面；
          } else {
            this.$$router.repalce('/')
          }
        } else {
          this.$message.err(result.message)
        }
      }
    },
    handleOAuth () {
      // 保存授权前的页面链接内容
      let preventHistory = {
        name: this.$route.name,
        query: this.$route.query
      };
      window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
      window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
    }

  }
}
</script>

<style  scoped>
@import '~/assets/style.min.css';

#max-width {
  max-width: 400px;
}

.pm-main-sign-up .left-section {
  height: 100%;
  text-align: center;
  background: linear-gradient(
    145deg,
    #e49f52,
    #8e393e,
    #623552,
    #08082c,
    #08082c
  );
  border-radius: 0.6rem;
  overflow: hidden;
}

.pm-main-sign-up .left-section .mt-6 {
  padding-left: 27%;
  width: 56xp;
}

.pm-main-sign-up .left-section .text-container h2 {
  font-weight: 300;
  color: black;
  font-size: 40px;
  line-height: 36px;
}

.pm-main-sign-up .left-section .text-container h4 {
  position: relative;
  margin: 35px auto 15px;
  font-weight: 300;
  color: black;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  padding: 0 45px;
}

.pm-main-sign-up .left-section .text-container h4 ul {
  list-style-type: disc;
}

.pm-main-sign-up .right-section .heading {
  margin-bottom: 20px;
}
</style>

