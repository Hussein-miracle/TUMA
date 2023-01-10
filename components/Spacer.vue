<template>
  <div :class="{ 'my-2': !!y , 'mx-2': !!x}" v-if="size === 2">
    &nbsp;
  </div>
  <div :class="{ 'my-4': !!y , 'mx-4': !!x}" v-if="size === 4">
    &nbsp;
  </div>
  <div :class="{ 'my-6': !!y , 'mx-6': !!x}" v-if="size === 6">
    &nbsp;
  </div>
  <div :class="{ 'my-8': !!y , 'mx-8': !!x}" v-if="size === 8">
    &nbsp;
  </div>
  <div :class="{ 'my-10': !!y , 'mx-10': !!x}" v-if="size === 10">
    &nbsp;
  </div>
  <div :class="{ 'my-12': !!y , 'mx-12': !!x}" v-if="size === 12">
    &nbsp;
  </div>
  <div :class="{ 'my-14': !!y , 'mx-14': !!x}" v-if="size === 14">
    &nbsp;
  </div>
</template>

<script setup>

const props = defineProps({
  x:{
    type:Boolean,
  },
  y:{
    type:Boolean
  },
  size:{
    type:Number,
    default:4,
  }
})

</script>

<style scoped>

</style>