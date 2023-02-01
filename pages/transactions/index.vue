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
    <transaction-log
      :status="'completed'"
      @click="navigateTo('/transactions/gfhjww2_22gdsfdfff_eSds')"
    />

    <spacer :y="true" :size="6" />
  </div>
</template>

<script setup>
import UtilsService from "@/services/utils.service";

useHead({
  title: "Trasaction Logs",
});

const fetchAllTransactions = async () => {
  UtilsService.getTransactions()
    .then((response) => {
      console.log(response, "res");
    })
    .catch((err) => {
      console.log(err, "err");
    });
};

definePageMeta({
  layout:'default',
    middleware: ["auth"],
});

onBeforeMount(async () => {
  fetchAllTransactions();
});
</script>

<style>
.transaction-logs {
  height: calc(100vh - 3rem);
}
</style>
