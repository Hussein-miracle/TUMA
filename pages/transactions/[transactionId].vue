<template>
  <div class="transaction-details bg-whitelike">
    <h2 class="bg-white text-secondary font-bold w-full text-center  text-2xl">Transaction Details</h2>


    <div class="transaction-details__content">

    <div class="transaction-details__content--header bg-white flex justify-between w-full px-6 items-center border-y-ash-1 border-y-[0.65px] py-1">
      <div class="left flex items-center gap-x-4">
        <div class="logo bg-ash-1 w-16 h-16 rounded-full flex items-center justify-center">
          <icons-dummy-bank-logo />
        </div>

        <div class="details flex flex-col">
          <h2 class="text-primary">Scott Townsend</h2>
          <h4 class="text-secondary">United States Of America</h4>
        </div>
      </div>

      <div class="right text-secondary">
        200 USD
      </div>
    </div>



    <div class="transaction-details__content--main px-10">

      <div class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start">
        <h2 class="text-secondary mb-2 font-bold">Transaction reference</h2>
        <p class="text-secondary">CF-DAGDAG-201889367972962</p>
      </div>

      <div class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start">
        <h2 class="text-secondary mb-2 font-bold">Transaction status </h2>
        <p class="text-secondary">Awaiting pickup by recipient</p>
      </div>


      <div class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start">
        <h2 class="text-secondary mb-2 font-bold">Time of transaction </h2>
        <p class="text-secondary">10:45 AM GMT</p>
      </div>


      <div class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start">
        <h2 class="text-secondary mb-2 font-bold">Transaction provider </h2>
        <p class="text-secondary">Wester union money transfer</p>
      </div>


    </div>

    </div>


      <button-primary type='submit' :text="'Repeat Transaction'" :disable='isLoading === true' class="font-bold"/>

  </div>
</template>

<script setup>
useHead({
  title:'Transaction Details'
})


const isLoading = ref(false);



</script>

<style  lang='scss' scoped>
.transaction-details{
  height: calc(100vh - 3rem);
}
</style>
