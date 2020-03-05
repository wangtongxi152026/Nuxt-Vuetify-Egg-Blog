<template>
  <nuxt-link class="card-link" :to="{path:`/article/${article._id}`}
  ">
    <div class="blog-card">
      <!-- <img class="post-image" :src="data.src" /> -->
      <img
        class="post-image elevation-13"
        src="https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302"
      />

      <div class="article-details">
        <!-- <h4 class="post-category">{{article.tags[0].name}}</h4> -->
        <div class="titlepress text-center post-title subtitle-1">{{article.title}}</div>

        <div class="body-2">{{article.desc}}</div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="grey" small text>
            <v-icon left class="iconfont icon-shijian" />
            <span class="caption">{{article.create_time|format}}</span>
          </v-btn>
          <v-spacer />
          <v-btn color="grey" small text>
            <v-icon left>mdi-eye</v-icon>
            <span class="caption">{{article.meta.views}}</span>
          </v-btn>

          <v-btn color="grey" small text>
            <v-icon left class="iconfont icon-pinglun" />
            <span class="caption">{{article.meta.comments}}</span>
          </v-btn>

          <v-btn color="grey" small text>
            <v-icon class="iconfont icon-like" left></v-icon>
            <span class="caption">{{article.meta.likes}}</span>
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
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$border: #ebebeb;
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
    color: #cda95d;
  }
}

.post-image {
  @include transition(opacity 0.3s ease);
  // display: block;
  width: 100%;
  border-radius: 0.7rem;

  // object-fit: cover;
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
  color: #000;
  // color: #26a69a $black;
}

@media (max-width: 40rem) {
  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  .blog-card {
    display: grid;
    grid-template-columns: 5fr 9fr;
    grid-template-rows: 1fr;
  }
  .article-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 0 0 0 25px;
  }

  @media (max-width: 40rem) {
    .article-details {
      max-height: 240px;
      padding: 10px 0 0 0;
    }
    .blog-card {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
  }
}
</style>
