<template>
  <div class="select-card">
    <h2 class="text-center text-secondary text-3xl font-bold">Select Card</h2>

    <div class="select-card__card-container bg-green-800 w-full">
      <div class="card-wrapper relative bg-amber-800 h-[25rem] w-full">


        <div
          class="absolute left-1/2 -translate-x-1/2 z-[500] card card-front bg-secondary flex flex-col gap-y-6"
        >
          <div
            class="logo uppercase text-whitelike self-end text-3xl font-semibold"
          >
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

          <div
            class="flex justify-between items-center uppercase text-whitelike"
          >
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
<!-- 
        <div
          class="z-[450] absolute bottom-[10%] left-[48%] -translate-x-1/2 card card-back bg-primary text-secondary flex flex-col gap-y-6"
        >
          <div
            class="logo uppercase text-secondary self-end text-3xl font-semibold"
          >
            VISA
          </div>

          <div
            class="chip-back mt-4 bg-ash-3 w-20 h-14 rounded-lg self-start grid grid-cols-2 grid-rows-3"
          >

            <span></span>

            <span></span>

            <span></span>

            <span></span>

            <span></span>

            <span></span>

          </div>

          <p
            class="p text-secondary flex justify-between items-center text-xl font-bold"
          >

            <span>4550</span>

            <span>••••</span>

            <span>••••</span>

            <span>1234</span>

          </p>

          <div
            class="flex justify-between items-center uppercase text-secondary"
          >
            <div class="flex flex-col items-start">
              <small class="font-extralight text-xs">CARDHOLDER</small>
              <p class="font-bold text-lg">ISMAIL NNAMDI</p>
            </div>
            <div class="flex flex-col items-end">
              <small class="font-extralight text-xs">EXPIRES</small>
              <p class="font-bold text-lg">14/2019</p>
            </div>
          </div>
        </div> -->


      </div>
    </div>

    <spacer :y="true" :size="8" />
  </div>
</template>

<script setup>
definePageMeta({
  // layout: false,
});
</script>

<style lang="scss" scoped>
.select-card {
  min-height: calc(100vh - 3rem);
}

.card-wrapper {
  .card {
    @apply w-[80vw] sm:w-[28rem]  h-64 sm:h-72 mx-auto mt-6  rounded-3xl py-2 px-6;

    &.card-front {
      .chip-front{
        & > * {
          cursor: pointer;
          @apply rounded-sm;
          background-color: goldenrod !important;
          border: 1px solid saddlebrown !important;
        }
      }
    }

    &.card-back {
      .chip-back {
        span {
          @apply rounded-sm;
          background-color: #f2f2f2;
          border: 1px solid #212121;
        }
      }
    }
  }
}
</style>
