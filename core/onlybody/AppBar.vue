<template>
  <v-app-bar absolute color="transparent" flat height="85">
    <div id="nobodybar">
      <v-btn nuxt v-for="(item, i) in items" :key="i" :to="item.to" min-height="48" text>
        <v-icon left size="20" v-text="item.icon" />

        <span v-text="item.text" />
      </v-btn>
    </div>
  </v-app-bar>
</template>
 
<script>
export default {
  data: () => ({
    items: [
      {
        icon: "mdi-home",
        text: "首页",
        to: "/"
      },
      {
        icon: "mdi-account-multiple-plus",
        text: "注册",
        to: "/register"
      },
      {
        icon: "mdi-fingerprint",
        text: "登录",
        to: "/login"
      },
      {
        icon: "mdi-lock-open-outline",
        text: "忘记密码",
        to: "/pages/lock"
      }
      // {
      //   icon: "mdi-currency-usd",
      //   text: "Pricing",
      //   to: "/pages/pricing"
      // },
    ]
  })
};
</script>
<style  scoped>
.nobodybar {
  text-align: center;
}
</style>

