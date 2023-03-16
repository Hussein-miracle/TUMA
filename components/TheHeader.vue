<template>
  <header
    class="theheader text-white flex justify-between items-center w-full py-1 px-1 sm:px-2 bg-secondary"
  >
    <NuxtLink
      to="transactions"
      class="custom flex items-center text-sm sm:text-md justify-between gap-0.5 sm:gap-1"
      @click="navigateTo('/transactions')"
    >
      <icons-transactions />
      <span class="sm:ml-1">Transactions Log</span>
    </NuxtLink>
    <NuxtLink
      to="send-money"
      class="custom flex items-center text-sm sm:text-md justify-between gap-0.5 sm:gap-1"
      @click="navigateTo('/send-money')"
    >
      <icons-send />
      <span class="sm:ml-1">Send Money</span>
    </NuxtLink>
    <NuxtLink
      to="profile"
      class="custom flex items-center text-sm sm:text-md justify-between gap-0.5 sm:gap-1"
      @click="navigateTo('/profile')"
    >
      <icons-profile />
      <span class="sm:ml-1">Profile</span>
    </NuxtLink>
  </header>
</template>

<script setup>
// console.log(router,'routes');
const currentRoute = ref("");
onBeforeMount(() => {
  const router = useRouter();
  currentRoute.value = router.currentRoute.value.name;
});
</script>

<style lang="scss" scoped>
a.custom.router-link-active,
a.custom.router-link-exact-active {
  @apply text-primary;
  position: relative;

  // &::after {
  //   @apply bg-primary;
  //   content: "";
  //   width: 100%;
  //   height: pxToRem(3);
  //   position: absolute;
  //   bottom: pxToRem(-16);
  //   left: 0;
  // }

  svg {
    // display: none;
    // stroke: #fec02f !important;

    // g path,
    // g circle {
    //   stroke: #fec02f !important;
    //   fill: #feffef;
    // }
  }
}

.theheader {
  height: 3rem;
  width: 100%;
}
</style>
