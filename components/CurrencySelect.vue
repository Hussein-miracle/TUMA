<template>
  <div class="currency-select bg-green-4">
    <button type="button" class="btn w-16 h-16 flex bg-primary justify-between items-center" @click="toggleSelect">
      <div class="options">{{ countries[0]?.name }}</div>

      <icons-select-arrow class="w-6 h-6" :rotate='showSelect' />
    </button>

    <div class="countries isolate absolute top-1/2 left-1/2 z-[99999] bg-black text-primary" :class="{'block': showSelect === true , '!hidden': showSelect === false}"  v-if="countries.length > 0">

        <div
          class="options flex gap-x-2"
          v-for="country in countries"
          :key="country.name"
        >
          <img v-if="country.img_url" :src="country.img_url" />
          <span v-else>{{ country?.name }}</span>
        </div>
        
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import { useAppStore } from "@/store/app/index";

const { getCountriesFromStore } = useAppStore();

const  countries = storeToRefs(getCountriesFromStore);

// console.log(countries,'cg');

const showSelect = ref(false);

const defaultCountry = ref("");

const closeSelect = () => {
  showSelect.value = false;
}


const toggleSelect = () => {
  // console.log('toggle Select',showSelect.value);
  showSelect.value = !showSelect.value;
}

const getRandomCountry = () => {
  const index = Math.floor(Math.random() * (countries.length - 0));

  return index;
};

const props = defineProps(["defaultCountry"]);
</script>

<style lang="scss" scoped>
.currency-select {
}
</style>
