<template>
  <div class="transaction-log bg-white flex justify-between items-center   my-4   md:my-2 mx-auto max-w-[90%] md:max-w-[80%]  rounded-lg px-2 py-1 h-fit  cursor-pointer">
    <div class="account-name flex gap-x-2 items-center  h-full">


      <div class="account-name-logo text-secondary flex items-center justify-center font-bold w-12 h-12 sm:w-16 sm:h-16 ">
        SF
      </div>

      <div class="flex flex-col items-start text-left gap-3">
        <div class="p">Scott Forest</div>
        <div class="p text-ash-1 ">United States Of America</div>
      </div>


    </div>



    <div class="details flex flex-col items-start sm:w-[30%]  h-full self-end">
      <div class="text-secondary">200  USD</div>
      <transaction-status :status='status' />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['status'])
</script>

<style lang='scss' scoped>
.transaction-log{
  .account-name{
    &-logo{
      @apply bg-ash-1;
      border-radius: 50%;
    }
  }
}
</style>