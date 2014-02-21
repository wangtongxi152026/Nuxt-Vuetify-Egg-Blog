<template>
  <nuxt-link class="card-link" :to="{path:`/article/${123}`}
  ">
    <div class="blog-card">
      <div class="raduis elevation-13">
        <img class="post-image" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" />
      </div>

      <div class="article-details">
        <v-card-text class="body-2">
          Dui Augue Facilisis Lacus Fringilla Pulvinar Massa Felis Quis
          ulvinar Massa Felis Quis Velit
        </v-card-text>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      defaut: null
    }
  },
  data() {
    return {
      name: "10 Best Things to Do in Seattle",
      category: "Travel",
      image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      author: "Katherine Kato",
      desc: `Seattle is a seaport city on the west coast of the United States...`
    };
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
.raduis {
  border-radius: 0.3rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;

  &:hover .post-title {
    color: #000;
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

@supports (display: grid) {
  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 100px;
  }
  .article-details {
    max-height: 240px;
    padding: 0 0 0 20px;
  }
}
</style>
