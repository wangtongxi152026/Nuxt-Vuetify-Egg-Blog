<template>
  <v-footer  id="core-footer" class="grey--text text--lighten-1" inset>
    <v-container class="px-0">

      <v-row>
        <v-col cols="12" md="5" lg='3'>
          <strong class="mb-2  d-block subtitle-2">关于本站</strong>

          <div class="body-2">
            　　WTongxi 网站目前是人练手项目的音乐网站，本站不会修改任何音频文件，只提供查询服务，请勿用作商业用途！网站宗旨：希望每一个来访的朋友都能有所收获！
          </div>
        </v-col>

        <v-col cols="12" md="7" lg='9'>
          <v-row>
            <v-col v-for="(section, i) in sections" :key="i" cols="6" md="3">
              <strong class="d-block mb-3" v-text="section.heading" />
              <div v-for="(child, j) in section.children" :key="j" class="body-2 mb-2">

                <div v-if="child.to" class="text-capitalize" v-text="child.text"></div>
                <!-- <router-link v-if="child.to" :to="child.to" class="text-capitalize" v-text="child.text" /> -->

                <a v-else :href="child.href" class="text-capitalize" target="_blank" rel="noopener"
                  v-text="child.text" />
              </div>
            </v-col>
          </v-row>
        </v-col>

      </v-row>

      <v-divider class="mb-3 " />

      <v-row justify='center'>
        Copyright &copy;&nbsp; {{ date }}&nbsp;
        <span>WTongxi网站</span>&nbsp; All Rights Reserved
      </v-row>
      <v-divider class="my-2" />
      <!-- 网站总计时长 -->
      <v-row justify='center'>
        <FooterTime></FooterTime>
      </v-row>

    </v-container>
  </v-footer>
</template>

<script>
// Utilities
// import {
//   sync,
// } from 'vuex-pathify'
import FooterTime from '~/components/FooterTime'
export default {
  name: 'CoreFooter',

  data: () => ({
    date: (new Date()).getFullYear(),
  }),
  methods: {

  },
  computed: {
    // socialMedia: sync('app/socialMedia'),
    // collections () {
    //   const collections = sync('collections/collections').get.call(this) || []

    //   return collections.filter(collection => {
    //     return ![
    //       process.env.VUE_APP_SHOPIFY_DEFAULT_COLLECTION,
    //       process.env.VUE_APP_SHOPIFY_COLLECTION_FEATURED_PRODUCTS,
    //     ].includes(collection.handle)
    //   }).sort((a, b) => {
    //     if (a.title > b.title) return 1
    //     if (a.title < b.title) return -1
    //     return 0
    //   })
    // },
    sections () {
      return [
        {
          heading: 'General',
          children: [
            { to: { name: 'About' }, text: 'About Vuetify' },
            { to: { name: 'Contact' }, text: 'Contact Us' },
            { to: { name: 'ThankYou' }, text: 'Thank You' },
            { href: 'https://vuetifyjs.com/', text: 'Vuetify Documentation' },
          ],
        },
        {
          heading: 'Legal',
          children: [
            { to: { name: 'Licenses' }, text: 'Licenses' },
            { to: { name: 'Privacy' }, text: 'Privacy Policy' },
            { to: { name: 'Refund' }, text: 'Refund Policy' },
            { to: { name: 'Terms' }, text: 'Terms of Service' },
          ],
        },
        {
          heading: 'Product Collections',
          children: (this.collections || []).map(collection => ({
            text: collection.title,
            to: {
              name: 'Collections',
              params: { handle: collection.handle },
            },
          })),
        },
        {
          heading: 'Social',
          children: [
            { href: 'https://community.vuetifyjs.com', text: 'Community' },
            // ...this.socialMedia,
          ],
        },
      ]
    },
  },
  components: { FooterTime }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@media (min-width: 1904px)
  .container
    background-color #414141
    max-width 1785px
#core-footer
  background #414141
  a
    color #b3b3b3
    text-decoration none
</style>
