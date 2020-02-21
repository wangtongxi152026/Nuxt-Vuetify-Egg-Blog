<template>
  <div>
    <template v-if="item.children">
      
      <AnchorLinks v-for="item in item.children" :key="item.anchor" :item="item.children"></AnchorLinks>
    </template>
    <AnchorLink :key="item.anchor" v-else :href="`#${item.anchor}`" :title="item.text"></AnchorLink>
  </div>
</template>
<script>
import AnchorLink from './anchor-link'
export default {
  name: 'AnchorLink',

  props: {
    item: ''
  }
}
</script>
<style lang="less" scoped>
// @import './anchor.less';
</style>