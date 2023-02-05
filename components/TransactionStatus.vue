<template>
  <div class="transaction-status flex gap-x-2 items-center">

      <icons-pending v-if="status === 'pending' " />
      <icons-cancelled v-show="status === 'cancelled'  "/>
      <icons-awaiting-pickup v-show="status  === 'awaiting-pickup' " />
      <icons-completed v-show="status === 'completed' " />


      <div class="status-text" :class="{'text-primary': status === 'pending' , 'text-ash-1' : status === 'awaiting-pickup' , 'text-cancelled': status === 'cancelled','text-greenlike': status === 'completed'}"  >
        {{status}}
      </div>
  </div>
</template>

<script setup>
import AwaitingPickup from "./icons/AwaitingPickup.vue";


const props = defineProps(['status'])

</script>

<style lang='scss' scoped>
.transaction-status{
  svg{
    width: 1rem;
    height: 1rem;
  }
}
</style>