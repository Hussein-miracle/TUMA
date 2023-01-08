<template>
  <div class="transaction-log flex justify-between items-center">
    <div class="account-name flex gap-x-2">


      <div class="account-name-logo text-secondary flex items-center justify-center font-bold ">
        SF
      </div>

      <div class="flex flex-col items-start text-left justify-between ">
        <div class="p">Scott Forest</div>
        <div class="p text-ash-1">United States Of America</div>
      </div>


    </div>



    <div class="details flex flex-col ">
      <div class="text-secondary">200</div>
      <div class="status">
        <span class="icon">&rarr;</span>
        <span class="">&rarr;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang='scss' scoped>
.transaction-log{
  .account-name{
    &-logo{
      @apply bg-ash-1;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;

    }
  }
}
</style>