<template>
  <v-container tag="section">
    <ModuleTransition delay="0.16">
      <v-row v-show="recoShowModule">
        <v-col>
          <v-breadcrumbs class="px-0" :items="items"></v-breadcrumbs>
        </v-col>
      </v-row>
    </ModuleTransition>
    <ModuleTransition delay="0.24">
      <v-row v-show="recoShowModule" justify="center" md="8">
        <v-col cols="12" md="8">
          <h1 class="text-center headline py-5">给我留言</h1>
          <!-- <img :src="require('~/assets/img14.jpg')" class="articlebg" /> -->
          <img
            src="https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302"
            class="articlebg"
          />
        </v-col>
        <v-col cols="12" md="8">
          <v-form ref="form" lazy-validation>
            <v-textarea
              height="115"
              no-resize
              class="textarea"
              outlined
              label="给我留言吧"
              v-model="content"
            />
            <template v-if="!$store.state.blog.userinfo">
              <v-text-field v-model="name" :counter="20" :rules="nameRules" label="昵称" required></v-text-field>

              <v-text-field v-model="email" :rules="emailRules" label="邮箱" required></v-text-field>

              <v-text-field v-model="phone" label="手机号"></v-text-field>
            </template>

            <v-btn block :loading="loading" color="success" @click="submit">确定</v-btn>
          </v-form>
        </v-col>
        <!-- <v-divider class="my-5"></v-divider> -->
        <!-- <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title>全部评论:10</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          
        </v-col>-->
      </v-row>
    </ModuleTransition>
  </v-container>
</template>
<script>
import ArtComment from '~/components/Blog/ArtComment'
import { addMessage } from '~/api/api'

import ModuleTransition from '~/components/Transtion/ModuleTransition'
import moduleTransitonMixin from '~/components/Transtion/moduleTransiton'

export default {
  components: { ArtComment, ModuleTransition },
  mixins: [moduleTransitonMixin],
  data () {
    return {
      name: this.$store.state.blog.userinfo.name || '',
      phone: this.$store.state.blog.userinfo.phone || '',
      email: this.$store.state.blog.userinfo.email || '',
      content: '',
      // qq: '',
      loading: false,
      nameRules: [
        v => !!v || '昵称不可以为空',
        v => (v && v.length <= 20) || '昵称长度小于20'
      ],
      // phoneRules: [
      //   v => !!v || '手机号不可以为空',
      //   v => {
      //     const pattern = /^1[3456789]\d{9}$/
      //     return pattern.test(v) || '手机号式不正确'
      //   }
      // ],
      // qqRules: [
      //   v => !!v || 'qq不可以为空',
      //   v => {
      //     const pattern = /^[1-9]\d{4,9}$/
      //     return pattern.test(v) || 'qq格式不正确'
      //   }
      // ],
      emailRules: [
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || '请输入正确邮箱格式~'
        }
      ],

    }
  },
  computed: {
    items: () => [
      {
        text: '首页',
        disabled: false,
        href: '/'
      },
      {
        text: '给我留言',
        disabled: true,
      }
    ],

  },
  methods: {

    async  submit () {
      this.loading = true;
      if (!this.$refs.form.validate()) {
        return
      }
      const params = {
        user_id: this.$store.state.blog.userinfo._id || '',
        email: this.email,
        phone: this.phone,
        name: this.name,
        content: this.content,
      };
      await addMessage(params)

      this.$message.success("感谢您的留言");
      this.content = "";
      this.loading = false;
    },

  }
}
</script>


<style lang="sass" scoped>
section
  background-color: #fff
.articlebg
  width: 100%
  height: 70%
  // border-radius: .618rem
.textarea
  background-image: url(https://cuijiahua.com/wp-content/uploads/2018/10/comment.gif)
  background-repeat: no-repeat
  background-size: 35%
  background-position: 100% 60%

.avatar
  display: block
  border-radius: 50% !important
  position: relative
  width: 128px
  overflow: hidden
  top: 64px
  left: calc(  50% - 64px  )

.name 
  color: #b77171
 
.content,
.time 
  color: #333

.introduce
  margin-top: 120px
</style>
 
