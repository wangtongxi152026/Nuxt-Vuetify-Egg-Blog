<template>
  <a class="card-link" :to="{ path: '/detail', query: { id: data.id } }">
    <div class="blog-card">
      <div :class="articleSty">
        <h4 class="post-category">{{ category }}</h4>
        <h4 class="text-center post-title font-weight-bold subtitle-1">Cozy 5 Stars Apartment</h4>

        <v-card-text
          class="body-2"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, illo corporis reiciendis expedita, magnam explicabo animi tempore quidem ducimus id, provident iure quod aut mollitia placeat. Mollitia, magnam placeat.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="grey" small depressed>
            <v-icon left>mdi-account-circle</v-icon>
            <span class="caption">By Person</span>
          </v-btn>

          <v-chip small color="info darken-1">
            <v-icon left>mdi-fire</v-icon>es6
          </v-chip>
          <v-spacer />
        </v-card-actions>
      </div>
      <v-card class="raduis" :elevation="13">
        <img class="post-image" :src="data.src" />
      </v-card>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    data: {
      defaut: null
    }
  },

  data () {
    return {
      name: "10 Best Things to Do in Seattle",
      category: "Travel",
      image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      author: "Katherine Kato",
      desc: `Seattle is a seaport city on the west coast of the United States...`
    };
  },
  computed: {
    articleSty () {
      return this.$vuetify.breakpoint.smAndUp
        ? "article-details"
        : "sm-article-details";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #eedfcc;
$text: #777;
$black: #121212;
$red: #e04f62;
$border: #ebebeb;
$shadow: rgba(0, 0, 0, 0.2);

@mixin transition($args...) {
  transition: $args;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
  &:hover .post-title {
    @include transition(color 0.3s ease);
    color: $red;
  }
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
  object-fit: cover;
}

.article-details {
  max-height: 240px;
  padding: 0 0 0 30px;
}

.sm-article-details {
  max-height: 240px;
  padding: 10px 0 0 0;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid $border;
}

.post-title {
  @include transition(color 0.3s ease);
  color: #26a69a $black;
}

@media (max-width: 40rem) {
  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  .blog-card {
    display: grid;
    grid-template-columns: 7fr 5fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
