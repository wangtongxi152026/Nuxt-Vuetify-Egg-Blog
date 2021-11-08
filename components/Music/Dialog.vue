<template>
  <v-dialog v-model="Dialog" max-width="290">
    <v-card class="tip-card">
      <v-card-title class="headline">消息提示</v-card-title>
      <v-card-text class="text"> 你确定要{{ msg }}吗 </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="Dialog = false">取消</v-btn>
        <v-btn color="orange" text @click="confirm">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    msg: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Dialog: false
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.Dialog = val;
      }
    },
    Dialog(val, oldval) {
      if (val !== oldval) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    show() {
      this.Dialog = true;
    },
    confirm() {
      this.Dialog = false;
      this.$emit('handleConfirm');
    }
  }
};
</script>

<style scoped>
.tip-card {
  background: transparent;
}
.headline {
  color: orange;
}
.text {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
