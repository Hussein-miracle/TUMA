<template>
  <svg :class="{'rotate-180 duration-500 transition-all' : rotate === true}" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144"/></svg>
</template>

<script setup>
const props = defineProps(['rotate']);
</script>

<style lang='scss' scoped>

</style>