import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('music', ['deviceType']),
    ismdAndUp() {
      console.log({ Minx_deviceType: this.deviceType });
      return this.deviceType === 'pc';
    }
  },
};
