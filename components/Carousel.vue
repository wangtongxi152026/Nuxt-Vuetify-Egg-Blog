<template>

    <!-- <v-carousel class="carousel" cycle hide-delimiter-background>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition">
      </v-carousel-item>
    </v-carousel> -->
    <v-carousel class="carousel" cycle hide-delimiter-background>
      <v-carousel-item   :src="require('~/assets/image/javascript.gif')" >
      </v-carousel-item>
    </v-carousel>


</template>

<script>
export default {
  name: '',
  components: {},
  computed: {

  },
  methods: {
    touch1 () {
      console.log('touch');
    }
  },
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carousel {
  overflow: hidden;
}
</style>
