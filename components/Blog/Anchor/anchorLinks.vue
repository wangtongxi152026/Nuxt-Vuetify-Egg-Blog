<template>
  <div>
    <template v-for="child in item">
      <AnchorLink :href="`#${child.anchor}`" :title="child.text" :key="child.anchor">
        <template v-if="child.children">
          <AnchorLinks :item="child.children"></AnchorLinks>
        </template>
      </AnchorLink>
    </template>
  </div>
</template>
            
</div>
  
</template>
<script>
import AnchorLink from './anchorLink'
import AnchorLinks from './anchorLinks'
export default {
  mounted() {
    console.log(this.item, 'links')
  },
  name: 'AnchorLink',
  components: { AnchorLink, AnchorLinks },
  props: {
    item:null
  }
}
</script>
<style lang="less" scoped>
@import './anchor.less';
</style>