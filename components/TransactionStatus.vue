<template>
  <div class="transaction-status flex gap-x-2 items-center">
    <icons-pending v-if="status === 'pending'" />
    <icons-cancelled v-show="status === 'cancelled' || status === 'failed'" />
    <icons-awaiting-pickup v-show="status === 'awaiting'" />
    <icons-completed v-show="status === 'completed'" />

    <div
      class="status-text"
      :class="{
        'text-primary': status === 'pending',
        'text-ash-1': status === 'awaiting',
        'text-cancelled': status === 'cancelled',
        'text-cancelled': status === 'failed',
        'text-greenlike': status === 'completed',
      }"
    >
      <span v-if="status === 'pending'"> pending-approval </span>
      <span v-else-if="status === 'awaiting'"> awaiting-pickup </span>
      <span v-else>
        {{ status }}
      </span>
    </div>
  </div>
</template>

<script setup>
import AwaitingPickup from "./icons/AwaitingPickup.vue";

const props = defineProps(["status"]);
</script>

<style lang="scss" scoped>
.transaction-status {
  svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>
