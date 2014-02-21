<template>
  <v-snackbar class="bgc" v-model="snackbar" :timeout="timeout" top>
    {{ msg }}
    <v-btn text @click="hide">
      <v-icon left size="25" class="iconfont icon-chahao1"></v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    msg: {
      type: String,
      default: '删除成功。'
    },
    timeout: {
      type: Number,
      default: 1500
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.snackbar = val;
      }
    },
    snackbar(val, oldval) {
      if (val !== oldval) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    hide() {
      this.snackbar = false;
    }
  },
  data: () => ({
    snackbar: false
  })
};
</script>

<style scoped>
.bgc {
  color: #999;
}
</style>
