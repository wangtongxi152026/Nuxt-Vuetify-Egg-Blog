<template>
  <v-container tag="section">
    <v-row>
      <v-col>
        <div class="pm-card">
          <div class="logowrap">
            <img class="logo elevation-2" src="~/assets/avatar.jpg" />
          </div>

          <div class="heading mb-12">
            <span class="headline float-left font-weight-bold info--text">登录</span>
            <div class="float-right">
              <v-btn color="#f26b3a" to="/register" class="px-0" text>创建账号</v-btn>
            </div>
          </div>

          <v-form ref="form">
            <div class="pm-form-group my-4">
              <label for="email" class="pm-form-label">邮箱</label>
              <v-text-field dense single-line outlined v-model="email" :rules="emailRules"></v-text-field>
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
            </div>

            <div class="pm-form-group">
              <nuxt-link to="/trouble">忘记密码?</nuxt-link>
            </div>
            <div class="pm-form-group">
              <v-btn dark color="#f26b3a" block @click="submit" :loading="loading">登录</v-btn>
            </div>
          </v-form>

          <div class="pm-awesome-divider-div">
            <div class="pm-awesome-divider" data-label="or"></div>
          </div>

          <v-btn color="info" :loading="loading2" @click="loginOAuth" block>
            <v-icon class="iconfont icon-github" left />Githup授权登录
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { getUserInfo, login, currentUser, getUser } from '~/api/api'
import config from '~/util/config'
export default {
  layout: 'onlybody',

  mounted () {
    if (this.$route.query.code) {
      this.getOAuthUser(this.$route.query.code)
    }
  },
  data () {
    return {
      email: '',
      password: '',
      show: false,
      loading: false,
      loading2: false,
      inputRules: [
        v => {
          let reg = /(^\s+)|(\s+$)/g
          return reg.test(v) ? '不可以为空~' : true
        },
        v => v.length >= 6 || '字符长度为6-15位之间',
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
    async getOAuthUser (code) {
      try {
        const result = await getUser({ code })

        if (result.code === 0) {
          const { token, id } = result.data
          this.$store.commit('blog/set_user_id', id)
          this.$store.commit('blog/set_token', token)
          this.$message.success(result.message)
          this.$router.push('/')
          // let preventHistory = JSON.parse(window.sessionStorage.preventHistory)
          // if (preventHistory) {
          //   this.$router.push({
          //     path: preventHistory.name,
          //     query: preventHistory.query
          //   })
          // }
        } else {
          this.$message.err(result.message)
        }
      } catch (error) {
        console.log(error)
        this.$message.err('授权失败')
      }
    },
    loginOAuth () {

      let preventHistory = {
        pathname: window.location.pathname,
        search: window.location.search
      }
      window.sessionStorage.preventHistory = JSON.stringify(preventHistory)
      this.loading2 = true
      window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`
    },

    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true
      const pramas = {
        email: this.email,
        password: this.password
      }

      const result = await login(pramas)
      if (result.code === 0) {
        const { token, id } = result.data
        this.$store.commit('blog/set_user_id', id)
        this.$store.commit('blog/set_token', token)
        this.$message.success(result.message)
        // 获取域名
        let hostName = this.$route.query.redirect
        if (hostName === hostName) {
          this.$router.go(-1)
        } else {
          this.$router.repalce('/')
        }
      } else {
        this.$message.err(result.message)
      }
      this.loading = false
    }
  },
  components: {}
}
</script>

<style scoped>
@import '~/assets/style.min.css';

.pm-card {
  border-radius: 0.5rem;
  max-width: 400px;
  margin: 60px auto 0 auto;
  background-color: #fff;
}
.logowrap {
  text-align: center;
}
.logo {
  width: 104px;
  border-radius: 50%;
}

.reauth-banner {
  width: 392px;
  background: rgba(255, 180, 0, 0.1);
  margin: 16px auto;
  border-radius: 3px;
  padding: 10px;
  font-size: 12px;
  color: #505050;
  position: relative;
  padding-left: 48px;
}

.reauth-banner svg {
  position: absolute;
  left: 16px;
}
</style>

