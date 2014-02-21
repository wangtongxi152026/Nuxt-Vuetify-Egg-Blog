<template>
  <v-snackbar class="messageBox" v-model="show" :color="getColor" :timeout="2500" top>
    {{ message }}
    <v-btn dark text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
const typeClass = {
  success: "#4CAF50",
  err: "#FF6E40"
};
export default {
  data: () => ({
    show: false,
    color: "success",
    message: ""
  }),
  computed: {
    getColor() {
      return typeClass[this.color];
    }
  }
};
</script>