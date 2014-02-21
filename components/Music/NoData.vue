<template>
  <div class="none">
    <p class="headline">{{text}}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.none {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
