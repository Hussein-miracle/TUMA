<template>
  <div
    class="absolute left-1/2 -translate-x-1/2 z-[500] card card-front bg-secondary flex flex-col gap-y-6"
  >
    <div class="logo uppercase text-whitelike self-end text-3xl font-semibold">
      VISA
    </div>

    <div
      class="chip-front mt-4 bg-ash-2 w-20 h-14 rounded-lg self-start grid grid-cols-2 grid-rows-3"
    >
      <span class=""></span>
      <span></span>

      <span></span>
      <span></span>

      <span></span>
      <span></span>
    </div>

    <p
      class="p text-whitelike flex justify-between items-center text-xl font-bold"
    >
      <span>4550</span>
      <span>••••</span>
      <span>••••</span>
      <span>1234</span>
    </p>

    <div class="flex justify-between items-center uppercase text-whitelike">
      <div class="flex flex-col items-start">
        <small class="font-extralight text-xs">CARDHOLDER</small>
        <p class="font-bold text-lg">ISMAIL NNAMDI</p>
      </div>
      <div class="flex flex-col items-end">
        <small class="font-extralight text-xs">EXPIRES</small>
        <p class="font-bold text-lg">14/2019</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
