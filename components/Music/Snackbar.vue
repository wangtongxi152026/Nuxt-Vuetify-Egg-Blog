<template>
  <v-snackbar class="bgc" v-model="snackbar" :timeout="timeout" top>
    {{ msg }}
    <v-btn  text @click="hide">
      <!-- Close -->
      <v-icon left size='25' class='iconfont icon-chahao1'></v-icon>
      <!-- <v-icon class="iconfont icon-chahao1"></v-icon> -->
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: '',
  props: {
    msg: {
      type: String,
      default: '删除成功。'
    },
    timeout: {
      type: Number,
      default: 1500
    },
  },
  methods: {
    show () {
      this.snackbar = true
    },
    hide () {
      this.snackbar = false
    },
  },
  data: () => ({
    snackbar: false,
  }),
}
</script>

<style scoped>
.bgc {
  color: #999;
}
</style>
