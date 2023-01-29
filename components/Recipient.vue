<template>
  <div
    class="!w-24 !h-32 sm:!w-32 sm:!h-40 sm:pt-4 bg-white cursor-pointer rounded-md text-[#9DA3B4] gap-y-1 py-2 r border-2 hover:border-primary my-2 inline-block mx-2
    "
    :class="{'border-primary':selected}"
  >
    <div
      class="px-2 py-2 w-10 h-10 logo bg-gray-400 flex items-center justify-center rounded-full text-white mx-auto uppercase"
    >
      {{ firstname[0] }}   {{ lastname[0] }}
    </div>

    <div class="mx-auto p text-center">{{firstname}}</div>
    <div class="p mx-auto text-center">{{lastname}}</div>
  </div>
</template>

<script setup>
const props  = defineProps(['firstname','lastname','selected'])
</script>

<style lang="scss" scoped>
.r {
  --shadow-color: 0deg 0% 57%;
  --shadow-elevation-medium: 0.3px 0.5px 0.8px hsl(var(--shadow-color) / 0.24),
    1.1px 2.1px 3.1px -0.5px hsl(var(--shadow-color) / 0.33),
    2.4px 4.8px 6.9px -0.9px hsl(var(--shadow-color) / 0.42),
    5.4px 10.8px 15.6px -1.4px hsl(var(--shadow-color) / 0.51);

  box-shadow: var(--shadow-elevation-medium);
}
</style>
