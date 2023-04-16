<template>
  <div class="tac-wrapper">
    <h2
      class="contact-us__title text-3xl font-bold text-secondary mb-4 mt-4 text-center"
    >
      Terms and Conditions
    </h2>

    <div class="skeleton px-1 flex flex-col items-start justify-between pt-1 gap-4" v-if="isFetching === true">
      <div class="w-full">
        <span
          class="skeleton__text-1 rounded-sm"
          v-for="i in 5"
          :key="i"
        ></span>
      </div>
      <div class="w-full">
        <span
          class="skeleton__text-1 rounded-sm"
          v-for="i in 5"
          :key="i"
        ></span>
      </div>
      <div class="w-full">
        <span
          class="skeleton__text-1 rounded-sm"
          v-for="i in 5"
          :key="i"
        ></span>
      </div>
      <div class="w-full">
        <span
          class="skeleton__text-1 rounded-sm"
          v-for="i in 5"
          :key="i"
        ></span>
      </div>
      <div class="w-full">
        <span
          class="skeleton__text-1 rounded-sm"
          v-for="i in 5"
          :key="i"
        ></span>
      </div>

      <!-- <span class="skeleton__text-2 rounded" v-for="i in 2" :key="i"></span> -->
    </div>
    <div
      v-else
      v-dompurify-html="htmlcode"
      class="content px-1.5 py-2 flex flex-col gap-3 justify-between items-start text-secondary"
    ></div>
  </div>
</template>

<script setup>
import UtilsService from "@/services/utils.service";

const isFetching = ref(false);
const htmlcode = ref("");

const getTAC = async () => {
  isFetching.value = true;
  UtilsService.getTAC()
    .then((res) => {
      // console.log(res.data,'policy rdata')
      const result = res.data;
      // const sanitizedResult = DOMPurify(window).satinize(result,{ALLOWED_TAGS: ['p']});
      // htmlcode.value = sanitizedResult;
      htmlcode.value = result;
      // console.log(result, "code sent from server tac");
      isFetching.value = false;
    })
    .catch((err) => {
      isFetching.value = false;
      console.log(err, "err getting tac details");
    });
};
onMounted(async () => {
  getTAC();
});

useHead({
    title:'Terms and Conditions'
})
definePageMeta({
  layout:false,

});
</script>

<style lang="scss" scoped>
p {
  // color: #212746;
  // padding-inline: 6px;
  // padding-block: 6px;
  // margin-inline: 5px;
  // margin-block: 25px !important;
}

.skeleton {
  // display: block;
  // position: relative;
  width: 100%;
 // height: 85vh;
  //background-color: goldenrod;
}

.skeleton__text-1 {
  height: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  // background-position: 0 0;
  animation: shine 1s infinite;
}
.skeleton__text-2 {
  height: 0.8rem;
  margin-bottom: 0.5rem;
  // margin-inline: 5px;
  width: 100%;
  display: block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 250px;
  // background-position: 0 0;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>
