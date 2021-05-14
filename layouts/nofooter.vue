<template>
  <v-app>
    <CoreToolbar />
    <CoreDrawer />
    <CoreView />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    CoreToolbar: () => import('~/core/Toolbar'),
    CoreDrawer: () => import('~/core/Drawer'),
    CoreView: () => import('~/core/View'),
  },
};
</script>
