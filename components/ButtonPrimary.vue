<template>
  <button  class="btn bg-primary text-secondary rounded-md my-1 md:my-2 mx-auto  md:w-80">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps(["text",'type']);
</script>

<style lang="scss" scoped>
@use "sass:math";
@function pxToRem($px) {
  @return math.div($px, 16) + rem;
}
.btn {
  max-width: pxToRem(375);
    padding: 6px 10px;
  height: 3rem;
  text-transform: uppercase;
  // background-color: transparent;
  outline: none;
  border: none;
  display: block;

  &:focus {
    outline: none;
    border: none;
  }
}
</style>
