<template>
  <div
    class="transaction-log bg-white flex justify-between items-center my-4 md:my-2 mx-auto max-w-[90%] md:max-w-[80%] rounded-lg px-2 py-1 h-fit cursor-pointer"
  >
    <div class="account-name flex gap-x-2 items-center h-full">
      <div
        class="account-name-logo text-secondary flex items-center justify-center font-bold w-12 h-12 sm:w-16 sm:h-16 uppercase"
      >
        {{ first_name[0] }} {{ last_name[0] }}
      </div>

      <div class="flex flex-col items-start text-left gap-3">
        <div class="p">{{ first_name }} {{ last_name }}</div>
        <div class="p text-ash-1">{{ address }}</div>
      </div>
    </div>

    <div
      class="details flex flex-col items-start sm:w-[30%] h-full self-end text-sm sm:text-base"
    >
      <div class="text-secondary flex gap-x-0.5 sm:gap-x-1">
        <span v-money>{{ amount }}</span>
        <span>{{ from_currency }}</span>
      </div>
      <div class="text-secondary flex gap-x-0.5 sm:gap-x-1">
        <span>{{ recipient_currency_symbol }}</span>
        <span v-money>{{ converted_amount }}</span>
        <!-- <span>{{ to_currency }}</span> -->
      </div>

      <transaction-status :status="status" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "status",
  "amount",
  "from_currency",
  "first_name",
  "last_name",
  "address",
  "to_currency",
  "converted_amount",
  "recipient_currency_symbol",
]);
</script>

<style lang="scss" scoped>
.transaction-log {
  .account-name {
    &-logo {
      @apply bg-ash-1;
      border-radius: 50%;
    }
  }
}
</style>
