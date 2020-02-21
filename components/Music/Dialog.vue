<template>
  <div>
    <v-dialog dark v-model="Dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">消息提示</v-card-title>
        <v-card-text>
          小伙子，你确定要{{msg}}吗
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="hide">取消</v-btn>
          <v-btn color="orange" text @click="confirm">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    msg: {
      type: String,
    }
  },
  data () {
    return {
      Dialog: false
    }
  },
  methods: {
    show () {
      this.Dialog = true
    },
    hide () {
      this.Dialog = false
    },
    confirm () {
      this.hide()
      this.$emit('handleConfirm')
    }
  },
}
</script>

<style scoped>
.headline {
  color: orange;
}
</style>
