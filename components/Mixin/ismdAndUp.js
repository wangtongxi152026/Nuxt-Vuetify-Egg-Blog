import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('music', ['deviceType']),
    ismdAndUp() {
      console.log({ deviceTypeStore: this.deviceType });
      return this.deviceType === 'pc';
    }
  },
};
