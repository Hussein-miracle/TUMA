<template>
  <div class="transaction-logs bg-[#F4F5F7]">
    <transaction-log
      :status="'pending-approval'"
      @click="navigateTo('/transactions/10dmkww2_222edsff_DSafds')"
    />
    <transaction-log
      :status="'awaiting-pickup'"
      @click="navigateTo('/transactions/10d_222sff_DSafds')"
    />
    <transaction-log
      :status="'cancelled'"
      @click="navigateTo('/transactions/gfhjww2_22gfecvdfff_eddsSds')"
    />
    <transaction-log :status="'completed'" />

    <spacer :y="true" :size="4" />
  </div>
</template>

<script setup>
definePageMeta({
  // layout: false,
});
</script>

<style>
.transaction-logs {
  height: calc(100vh - 3rem);
}
</style>
