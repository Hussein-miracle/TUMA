<template>
  <header
    class="theheader flex justify-evenly items-center w-full py-1 bg-secondary"
  >
    <NuxtLink to="transactions" class="custom flex items-center">
      <!-- <icons-transactions :v2="currentRoute === 'transactions' " :v1="currentRoute !== 'transactions' "/> -->
      <span class="mx-2">Transaction Logs</span>
    </NuxtLink>
    <NuxtLink to="send-money" class="custom flex items-center">
      <!-- <icons-send />  -->
      <span class="mx-2">Send Money</span>
    </NuxtLink>
    <NuxtLink to="profile" class="custom flex items-center">
      <!-- <icons-profile :v2="currentRoute === 'profile' " /> -->
      <span class="mx-2">Profile</span>
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

  &::after {
    @apply bg-primary;
    content: "";
    width: 100%;
    height: pxToRem(3);
    position: absolute;
    bottom: pxToRem(-16);
    left: 0;
  }

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
}
</style>
