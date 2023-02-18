<template>
  <div class="onboarding relative">
    <onboarding-item
      :imgUrl="details1.imgUrl"
      :title="details1.title"
      :description="details1.description"
      :index="index"
      v-if="index === 1"
      :setIndexVal="setIndexVal"
    />
    <onboarding-item
      :setIndexVal="setIndexVal"
      :imgUrl="details2.imgUrl"
      :index="index"
      :title="details2.title"
      :description="details2.description"
      v-if="index === 2"
    />
    <onboarding-item
      :setIndexVal="setIndexVal"
      :index="index"
      :imgUrl="details3.imgUrl"
      :title="details3.title"
      :description="details3.description"
      v-if="index === 3"
    />
  </div>
</template>
<script setup>
import { useUserStore } from "@/store/auth/index";
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";
import data from "@/data/onboarding";
import { assets } from "@/utils/index";

const { logout } = useUserStore();
const { setCountries } = useAppStore();
const index = ref(1);
const [details1, details2, details3] = data;

const setIndexVal = (val) => {
  index.value = val;
};

const modifyIndex = () => {
  if (index.value > 0 && index.value < data.length) {
    index.value++;
  } else if (index.value === data.length) {
    index.value = 1;
  }
};

useHead({
  title: "Onboarding",

  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});

definePageMeta({
  layout: false,
  // middleware: "initialmount",
});

let interval;

// const fetchCountries = async () => {
//   const data = await UtilsService.getCountries();
//   setCountries(data.data);
// };

onMounted(() => {
  interval = setInterval(() => {
    // if(!hovered.value){
    modifyIndex();
    // }
  }, 5500);
});

// onBeforeMount(() => {
//   fetchCountries();
// })

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
<style lang="scss" scoped>
.onboarding {
  // background-color: goldenrod;
  height: 100vh;

  // background: -moz-linear-gradient(
  //   -90deg,
  //   url(var(--backgroundImage)),
  //   hsla(42, 99%, 59%, 0.102) 5%,
  //   hsla(42, 99%, 59%, 1) 62%
  // );

  // background: -webkit-linear-gradient(
  //   -90deg,
  //   url(var(--img)),
  //   hsla(42, 99%, 59%, 0.102) 5%,
  //   hsla(42, 99%, 59%, 1) 62%
  // );

  &__img {
  }
}
</style>
