<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="showDrower"
    app
    dark
  >
    <v-list-item two-line class="mx-4 my-3 logo">
      <v-avatar size="56">
        <img src="~/assets/avatar.jpg" />
      </v-avatar>
      <v-list-item-title class="font-weight-regular">
        <span class="ml-8">WTongxi</span>
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mb-1" />

    <Avatar v-if="$store.state.blog.userinfo" />

    <v-list v-else nuxt dense nav>
      <v-list-item-group>
        <v-list-item nuxt to="/login">
          <v-list-item-icon>
            <v-icon left class="iconfont icon-login"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登录/注册</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <template v-for="(item, i) in computedItems">
        <ItemGroup
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        ></ItemGroup>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex';
import { menusData } from '~/plugins/config';
import BaseItem from '~/components/BaseItem';
import ItemGroup from '~/components/ItemGroup';
import Avatar from '~/components/Avatar';
import ismdAndUpMixin from '~/components/Mixin/ismdAndUp';

export default {
  components: { Avatar, ItemGroup, BaseItem },
  mixins: [ismdAndUpMixin],
  data() {
    return {
      showDrower: false
    };
  },
  computed: {
    computedItems() {
      const menus = menusData();
      return menus.map(this.mapItem);
    }
  },
  watch: {
    ismdAndUp: {
      handler: function(value) {
        if (value) {
          this.$store.commit('blog/setDrawer', false);
        }
      },
      immediate: true
    },
    '$store.state.blog.drawer': {
      handler: function(val, oldValue) {
        if (val !== oldValue) {
          this.showDrower = val;
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('blog', ['setDrawer']),
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: item.title
      };
    },
    inputHandle(val) {
      if (!val) {
        this.showDrower = false;
        this.setDrawer(false);
      }
    }
  }
};
</script>
<style lang="less">
#core-navigation-drawer {
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-3.jpg);
  background-position: center;
  .logo {
    height: 72px;
  }
}

.theme--dark.v-navigation-drawer .v-divider {
  background-color: hsla(0, 0%, 71%, 0.2);
  border-color: hsla(0, 0%, 71%, 0.1);
  width: calc(100% - 30px);
  margin-left: 15px;
}
</style>
