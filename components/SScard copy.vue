<template>
  <!--  卡片组 鼠标经过阴影设置--
  <! :elevation="hover ? 3: 9"-->
  <v-card class="text-xs-center ma-3">
    <div id="blog-card">
      <a class="card-link">
        <div></div>
        <div class="blog-card">
          <v-hover v-slot:default="{ hover }">
            <v-card>
            <img class="post-image" :elevation="hover ? null: 5" :src="image" />
            </v-card>
          </v-hover>
          <div class="article-details">
            <h4 class="post-category">{{ category }}</h4>
            <h3 class="post-title">{{ article.title }}</h3>
            <p class="post-description">{{ data.role }}</p>
            <p class="post-author">By {{ author }}</p>

            <v-card-actions>
              <v-btn color="grey" small depressed>
                <v-icon left>mdi-account-circle</v-icon>
                <span class="caption">By Person</span>
              </v-btn>

              <v-chip small color="info darken-1">
                <v-icon left>mdi-fire</v-icon>es6
              </v-chip>
              <v-spacer />

              <v-btn color="orange" text :to="{path:'/detail',query:{id:data.id} }">阅读全文</v-btn>
            </v-card-actions>
          </div>
        </div>
      </a>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
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

<style  rel="stylesheet/scss" lang="scss" scoped>
$bg: #eedfcc;
$text: #777;
$black: #121212;
$red: #e04f62;
$border: #ebebeb;
$shadow: rgba(0, 0, 0, 0.2);

@mixin transition($args...) {
  transition: $args;
}

.blog-card {
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.5rem;
  // overflow: hidden;
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
  // &:hover .post-image {
  //   @include transition(opacity 0.3s ease);
  //   opacity: 0.9;
  // }
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
  object-fit: cover;
}

.article-details {
  padding: 1.5rem;
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
  font-size: 1.125rem;
  line-height: 1.4;
  color: $black;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid $border;
}

@media (max-width: 40rem) {
   

  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 5fr 7fr;
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
