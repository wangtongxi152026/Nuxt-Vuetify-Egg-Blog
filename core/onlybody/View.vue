<template>
  <v-content id="pages">
    <!-- <v-img :src="src" gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)" min-height="100%"> -->
    <v-img :src="src" gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)" height="100vh">
      <nuxt keep-alive />
    </v-img>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    srcs: {
      "/login": "login.jpg",
      "/register": "register.jpg"
    }
  }),

  computed: {
    src () {
      let url = "";

      if (this.$vuetify.breakpoint.mdAndup) {
        console.log('smAnddown');
        const _route = this.$route.path;
        if (
          _route.indexOf("/login") !== -1 ||
          _route.indexOf("/register") !== -1
        ) {
          url = require(`~/assets/${this.srcs[_route]}`);
        }
      }
      return url;
    }
  }
};
</script>
 
