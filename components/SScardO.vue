<template>
  <nuxt-link class="card-link" :to="{path:`/article/${123}`}
  ">
    <div class="blog-card">
      <div class="raduis elevation-13">
        <img class="post-image" :src="data.src" />
      </div>

      <div class="article-details">
        <h4 class="post-category">{{ category }}</h4>
        <div class="titlepress text-center post-title font-weight-bold subtitle-1">{{article.title}}</div>

        <v-card-text
          class="body-2"
        >{{}}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="grey" small text>
            <v-icon left class="iconfont icon-history" />
            <span class="caption">2019-12-02</span>
          </v-btn>
          <v-spacer />
          <v-btn color="grey" small text>
            <v-icon left>mdi-eye</v-icon>
            <span class="caption">12</span>
          </v-btn>

          <v-btn color="grey" small text>
            <v-icon left class="iconfont icon-pinglun" />
            <span class="caption">123</span>
          </v-btn>

          <v-btn color="grey" small text>
            <v-icon class="iconfont icon-dianzan" left></v-icon>
            <span class="caption">33</span>
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: {
      defaut: null
    }
  },

  data() {
    return {
      name: '10 Best Things to Do in Seattle',
      category: 'Travel',
      image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
      author: 'Katherine Kato',
      desc: `Seattle is a seaport city on the west coast of the United States...`
    }
  }
}
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
  border-radius: 0.7rem;
  overflow: hidden;
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
  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 5fr 7fr;
    grid-template-rows: 1fr;
  }
  .article-details {
    max-height: 240px;
    padding: 0 0 0 25px;
  }

  @media (max-width: 40rem) {
    .article-details {
      max-height: 240px;
      padding: 10px 0 0 0;
    }
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
// .titlepress:after {
//     content: "";
//     position: absolute;
//     width: 100%;
//     height: 2px;
//     bottom: 0;
//     left: 0;
//     background-color: #3eaf7c;
//     visibility: hidden;
//     -webkit-transform: scaleX(0);
//     transform: scaleX(0);
//     -webkit-transition: .3s ease-in-out;
//     transition: .3s ease-in-out;
// }
</style>
