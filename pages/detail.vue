<template>
  <v-container>
    <div>deatail数据</div>
    <div>{{msg}}</div>
  </v-container>

</template>

<script>
export default {
  layout: 'nobody',
  mounted () {
    this.getMsg()
  },
  components: {},
  methods: {
    getMsg () {
      this.msg = this.$route.query.id
      console.log(this.$route.query.id)
    }
  },
  watch: {
    '$route' (to, from) { //监听路由是否变化
      if (this.$route.query.id) {// 判断条件1  判断传递值的变化
        console.log('watch被执行');
        this.getMsg()
      }
    }
  },
  data () {
    return {
      msg: null
    }
  }
}
</script>

<style scoped>
</style>
