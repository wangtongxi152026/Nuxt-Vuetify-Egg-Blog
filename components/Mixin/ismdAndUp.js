export default {
  props: {
    mdAndUp: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      reloaded: false
    };
  },
  mounted() {
    this.$nextTick(() => (this.reloaded = true));
  },
  computed: {
    ismdAndUp() {
      return this.reloaded
        ? this.$vuetify.breakpoint.mdAndUp && this.mdAndUp
        : this.mdAndUp;
    }
  }
};
