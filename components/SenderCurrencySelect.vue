<template>
  <div class="inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="rounded-md bg-primary px-4 py-2 text-sm  max-w-[10rem] hover:bg-opacity-20 focus:outline-none flex justify-between truncate gap-x-2 items-center"
    >
      <span
        class="text-whitelike truncate "
        v-if="selectedCountry && selectedCountry?.name"
        >{{ selectedCountry?.name }}</span
      >

      <span v-else class="text-whitelike">Select Currency</span>

      <icons-select-arrow :rotate="isOpen" class="fill-black !w-4 !h-4" />
    </button>

  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex flex-col min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-[60vh] flex flex-col items-center"
            >
              <DialogTitle
                as="h3"
                class="text-lg text-center font-medium leading-6 text-secondary"
              >
                <img
                  v-if="selectedCountry && selectedCountry?.img_url"
                  :src="selectedCountry?.img_url"
                />
                <span v-else-if="selectedCountry?.name">{{
                  selectedCountry?.name
                }}</span>
                <span v-else> Select Currency</span>
              </DialogTitle>
              <div class="mt-2 overflow-y-scroll custom-scroll px-2">
                <template v-if="countries.length > 0">
                  <div
                    class="options flex gap-x-2 items-center cursor-pointer hover:bg-ash-1 px-2 py-1 rounded-sm"
                    @click="selectedCountry = country"
                    v-for="country in countries"
                    :class="{'!bg-ash-1' : country && selectedCountry?.name === country?.name}"
                    :key="country.name"
                  >
                    <img v-if="country.img_url" :src="country.img_url" />
                    <span>{{ country?.name }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="loader w-52 h-52"></div>
                </template>
              </div>

              <div class="mt-4 self-center">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="handleContinue"
                >
                  Continue
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { storeToRefs } from "pinia";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useAppStore } from "@/store/app/index";
import {getRandomIndex} from '@/utils/index';
import UtilsService from "@/services/utils.service";

const isOpen = ref(false);

const appStore = useAppStore();

const countries = computed(() => appStore.getCountriesFromStore);

const index = getRandomIndex(20);
// console.log(index , 'index in sender');
const selectedCountry = ref(countries.value[index]);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

const handleContinue = async () => {
  if(!!selectedCountry.value){
    // console.log(selectedCountry.value,'sel country val');
      useAppStore().setRecipientCurrencyDetails(selectedCountry.value);
    closeModal();
  }
}

onBeforeMount(async () => {
  // await fetchCountries();
});
</script>

<style lang="scss" scoped>
.loader {
  border: 5px solid #fff;
  border-bottom-color: #212121;
  border-radius: 50%;
  // /* display: inline-block; */
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.custom-scroll {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: hsl(220deg, 6%, 91%);
    border: none;
    width: 36px;
    height: 36px;
  }
  &::-webkit-scrollbar-track {
    @apply bg-ash-2;
    // display: none;
    border-radius: 1000px;
    border: none;
    // background-color: transparent;
    height: 6px;
  }

  // &::-webkit-scrollbar-track-piece {
  //   display: none;
  //   border-radius: 1000px;
  //   // background-color: rgb(52, 42, 51);
  //   border: none;
  //   // background-color: transparent;
  //   height: 6px;
  // }
  /*
  Little bonus: on non-Firefox browsers,
  the thumb will light up on hover!
*/
  &::-webkit-scrollbar-thumb:hover {
    background-color: hsl(0, 4%, 65%);
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
