<template>
  <div class="contact-us  px-6">
    <h2 class="contact-us__title text-3xl font-bold text-secondary mb-4 mt-4 text-center">
      Contact Us
    </h2>

    <div class="contact-us__content">


      <div class="content flex flex-col items-start text-left p-2  sm:my-6">
        <p class="text-ash-1">We're located at</p>
        <p class="text-black font-semibold">Unit 25,Dalmeyer Road, NW10 2XA</p>
      </div>


      <div class="content flex flex-col items-start text-left p-2  sm:my-6">
        <p class="text-ash-1">Email us on</p>
        <p class="text-black font-semibold">support@dagdag.co</p>
      </div>


      <div class="content flex flex-col items-start text-left p-2  sm:my-6">
        <p class="text-ash-1">Call us on</p>
        <p class="text-black font-semibold">+44 20 8459 9141</p>
      </div>


      <div class="content flex flex-col items-start text-left p-2  sm:my-6">
        <p class="text-ash-1">Website</p>
        <p class="text-black font-semibold">www.dagdag.co</p>
      </div>


      <div class="content flex flex-col items-start text-left p-2  sm:my-6">
        <p class="text-ash-1">Connect with us</p>

        <div class="text-black font-semibold">
          <!-- !TODO ADD ACTUAL ICONS   -->
          <a href="https://facebook.com/dagdagapp" class="f" target="_blank" >facebook</a>
          <a href="https://twitter.com/dagdagapp" class="t" target="_blank" >Twitter</a>
          <a href="https://api.whatsapp.com/send?phone=447946153526" class="w" target="_blank" >whatsapp</a>
        </div>
      </div>








      <p class="p-2  sm:my-6"> <a href="https://www.dagdag.co/terms-condition" target="_blank" class="text-blue-400">Terms & Conditions</a> and <a href="https://www.dagdag.co/privacy" target="_blank" class="text-blue-400">Privacy Policy</a> </p>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware:['auth']
});

</script>

<style lang="scss" scoped>




div > a{
    @apply mx-4;
  }


</style>
