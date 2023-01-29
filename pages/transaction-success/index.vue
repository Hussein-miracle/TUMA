<template>
  <div class="transaction-success">
    <h2 class="text-secondary text-3xl my-2 text-center">
      Transaction Successful
    </h2>

    <div class="my-10 flex items-center justify-center relative w-72 h-72 mx-auto">
      <div
        class="relative w-full h-full flex items-center justify-center my-4"
      >
        <icons-transaction-success class="absolute sm:scale-150" />
        <icons-transact-check-first class="absolute sm:scale-125" />
        <icons-transact-check-second class="absolute sm:scale-110" />
        <icons-transact-check-third class="absolute sm:scale-105" />
        <icons-check-mark class="absolute sm:scale-105" />
      </div>
    </div>

    <p class="text-center mt-2 font-semibold max-w-md mx-auto">One more step,click the button below to upload your details.</p>

    <button-primary
      :type="'button'"
      :text="'Upload'"
      class="uppercase !text-secondary font-semibold text-xl"
      @click="handleUpload"
    />
  </div>
</template>

<script setup>

const handleUpload = async () => {
  localStorage.setItem("progged", JSON.stringify(true));
  navigateTo("/upload");
};
</script>

<style lang="scss" scoped></style>
