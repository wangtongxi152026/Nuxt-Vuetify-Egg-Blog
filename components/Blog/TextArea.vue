<template>
  <v-textarea
    height="115"
    no-resize
    class="textarea"
    outlined
    :label="label"
    :value="content"
  />
</template>
<script>

export default {
  props: {
    label: {
      default: ""
    }
  },
  data() {
    return {
      content: "",
      dialog: false
    };
  },
  methods: {
    open() {
      this.dialog = true;
    }
  }
};
</script>


<style lang="sass" scoped>
 
</style>
 
