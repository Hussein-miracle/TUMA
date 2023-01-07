<template>
  <button class="btn rounded-md my-1 md:my-2 mx-auto  md:w-80" :class="{'text-secondary bg-white': type === 'white' , 'text-white bg-secondary': type === 'blue'}">
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
  height: 3rem;
  padding: 6px 10px;
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
