<template>
  <ItemGroup :item="item" sub-group/>
</template>

<script>
import ItemGroup from "~/components/ItemGroup";
export default {
  name: "ItemSubGroup",
  components: { ItemGroup },

  props: {
    item: {
      type: Object,
      default: () => ({
        group: undefined,
        title: undefined,
        children: []
      })
    }
  }
};
</script>
