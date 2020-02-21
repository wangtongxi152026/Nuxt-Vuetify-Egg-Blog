<template>
  <v-list dense nav>
    <v-list-group
      append-icon="mdi-menu-down"
      :color="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)' ? 'white' : 'grey darken-1'"
    >
      <template v-slot:activator class="grey--text">
        <v-list-item-avatar class="align-self-center" color="grey">
          <v-img :src="src" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{userinfo.name}}</v-list-item-title>
        </v-list-item-content>
      </template>

      <template v-for="(item, i) in children">
        <v-list-item
          :key="`item-${i}`"
          nuxt
          :to="item.to"
          @click="item.func"
          active-class=" white--text"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
// https://demos.creative-tim.com/material-dashboard-pro/assets/img/faces/avatar.jpg
export default {
  data() {
    return {
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      children: [
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
  methods: {
    logout() {
      this.$store.commit('blog/logout')
      this.$message.success('退出成功')
    },
    any() {
       console.log('');
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
  }
}
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>