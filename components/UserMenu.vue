<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-list-item v-on="on" two-line class="mx-4 my-3">
          <v-avatar size="56">
            <img :src="src" />
          </v-avatar>
          <v-list-item-title class="font-weight-regular">
            <span class="ml-8">{{userinfo.name}}</span>
          </v-list-item-title>
        </v-list-item>
        <!-- <v-btn color="primary" dark v-on="on">
          <v-list-item-avatar class="align-self-center" color="grey">
            <v-img
              src="https://demos.creative-tim.com/material-dashboard-pro/assets/img/faces/avatar.jpg"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>wangtongxi</v-list-item-title>
          </v-list-item-content>
        </v-btn>-->
      </template>

      <v-list>
        <template v-for="(item, i) in items">
          <v-list-item :key="`item-${i}`" nuxt @click="item.func" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      items: [
        {
          to: '/',
          icon: 'iconfont icon-login',
          title: '个人中心',
          func: this.any
        },
        {
          icon: 'mdi-exit-to-app',
          title: '退出',
          func: this.logout
        }
      ]
    }
  },
  computed: {
    ...mapState('blog', ['userinfo']),
    src() {
      if (this.userinfo.avatar === 'user' || '') {
        return require('~/assets/avatar.jpg')
      } else {
        return this.userinfo.avatar
      }
    }
  },
  methods: {
    logout() {
      this.$store.commit('blog/logout')
      this.$message.success('退出成功')
    },
    any() {
      console.log('')
    }
  }
}
</script>