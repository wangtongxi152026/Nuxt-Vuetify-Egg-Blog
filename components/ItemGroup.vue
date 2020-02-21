<template>
  <v-list-group
    :group="group"
    :sub-group="subGroup"
    :prepend-icon="item.icon"
    append-icon="mdi-menu-down"
    :color="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)' ? 'white' : 'grey darken-1'"
  >
    <template v-slot:activator>
      <v-list-item-content class="grey--text">
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in item.children">
      <ItemSupGruop v-if="child.children" :key="`sub-group-${i}`" :item="child" />

      <BaseItem dense v-else :key="`item-${i}`" :item="child" />
    </template>
  </v-list-group>
</template>

<script>
import kebabCase from 'lodash/kebabCase'
import ItemSupGruop from '~/components/ItemSupGruop'
import BaseItem from '~/components/BaseItem'
export default {
  name: 'ItemGroup',
  components: { ItemSupGruop, BaseItem },
  data() {
    return {
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)'
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        group: undefined,
        title: undefined,
        children: []
      })
    },
    subGroup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    children() {
      return this.item.children.map(item => ({
        ...item,
        to: !item.to ? undefined : `${this.item.group}/${item.to}`
      }))
    },

    group() {
      return this.genGroup(this.item.children)
    }
  },

  methods: {
    genGroup(children) {
      return children
        .filter(item => item.to)
        .map(item => {
          const parent = item.group || this.item.group
          let group = `${parent}/${kebabCase(item.to)}`

          if (item.children) {
            group = `${group}|${this.genGroup(item.children)}`
          }

          return group
        })
        .join('|')
    }
  }
}
</script>

<style>
</style>