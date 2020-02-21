<template>

  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" max-width="400" :elevation="hover ? 4: 13">
      <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">

        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn x-small color="success">
          <v-icon left>mdi-account-outline</v-icon> javascript
        </v-btn>
        <v-btn x-small color="info">
          <v-icon left>mdi-account-outline</v-icon> ES6
        </v-btn>
        <v-spacer />

        <v-spacer></v-spacer>
        <v-btn color="orange" text>阅读全文</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>

</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
