<template>
  <div class="select-card">
    <h2 class="text-center text-secondary text-xl sm:text-3xl font-bold">
      Select Card
    </h2>
    <TransitionRoot appear :show="showConfirmDelete" as="template">
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
            class="flex min-h-full items-center justify-center p-4 text-center"
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
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="sm:text-lg font-medium leading-6 text-secondary text-center"
                >
                  Are you sure,you want to delete this card?
                </DialogTitle>

                <div class="text-bold text-md">
                  This is a destructive action and you won't be able to use it
                  until you add it again.
                </div>

                <div
                  class="mt-4 w-full mx-auto flex items-center justify-between"
                >
                  <button
                    type="button"
                    class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center"
                    @click="initDeleteCard"
                    :disabled="isDeleting"
                    :class="{
                      'opacity-50 cursor-not-allowed': isDeleting === true,
                    }"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    class="inline-flex mx-auto justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-secondary hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 self-center"
                    @click="closeConfirmDelete"
                    :disabled="isDeleting"
                    :class="{
                      'opacity-50 cursor-not-allowed': isDeleting === true,
                    }"
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div
      class="select-card__card-container max-w-full mx-auto w-[98%] sm:w-[90%] flex flex-col items-center"
    >
      <div class="card-wrapper relative sm:h-[20rem] w-full">
        <div
          class="z-[500] h-full card card-front bg-secondary flex flex-col gap-y-6"
        >
          <div
            class="logo uppercase text-whitelike self-end text-lg sm:text-3xl font-semibold text-skeleton-lg"
          >
            {{ selectedCard.payment_type_description }}
          </div>

          <div
            class="chip-front mt-4 bg-ash-2 w-20 h-14 rounded-lg self-start grid grid-cols-2 grid-rows-3"
          >
            <span class=""></span>
            <span></span>

            <span></span>
            <span></span>

            <span></span>
            <span></span>
          </div>

          <p
            class="p text-whitelike flex justify-between items-center text-xl font-bold"
          >
            <span class="text-skeleton">{{
              selectedCard.masked_card.substring(0, 4)
            }}</span>
            <span>••••</span>
            <span>••••</span>
            <span class="text-skeleton">{{
              selectedCard.masked_card.substring(
                selectedCard.masked_card.length - 4
              )
            }}</span>
          </p>

          <div
            class="flex justify-between items-center uppercase text-whitelike"
          >
            <div class="flex flex-col items-start">
              <small class="font-extralight text-xs">CARDHOLDER</small>

              <p class="font-bold text-lg text-skeleton">
                {{ selectedCard.name_on_card }}
              </p>
            </div>
            <div class="flex flex-col items-end">
              <small class="font-extralight text-xs">EXPIRES</small>
              <p class="font-bold text-lg text-skeleton">
                {{ selectedCard.expiry_date }}
              </p>
              <!-- <p class="font-bold text-xs" v-else>Select To see expiry date</p> -->
            </div>
          </div>
        </div>
        <!-- 
        <div
          class="z-[450] absolute bottom-[10%] left-[48%] -translate-x-1/2 card card-back bg-primary text-secondary flex flex-col gap-y-6"
        >
          <div
            class="logo uppercase text-secondary self-end text-3xl font-semibold"
          >
            VISA
          </div>

          <div
            class="chip-back mt-4 bg-ash-3 w-20 h-14 rounded-lg self-start grid grid-cols-2 grid-rows-3"
          >

            <span></span>

            <span></span>

            <span></span>

            <span></span>

            <span></span>

            <span></span>

          </div>

          <p
            class="p text-secondary flex justify-between items-center text-xl font-bold"
          >

            <span>4550</span>

            <span>••••</span>

            <span>••••</span>

            <span>1234</span>

          </p>

          <div
            class="flex justify-between items-center uppercase text-secondary"
          >
            <div class="flex flex-col items-start">
              <small class="font-extralight text-xs">CARDHOLDER</small>
              <p class="font-bold text-lg">ISMAIL NNAMDI</p>
            </div>
            <div class="flex flex-col items-end">
              <small class="font-extralight text-xs">EXPIRES</small>
              <p class="font-bold text-lg">14/2019</p>
            </div>
          </div>
        </div> -->
      </div>

      <div
        class="card-numbers w-full sm:w-[80%] mx-auto flex flex-col gap-y-1 items-center mt-4 sm:mt-0"
        v-if="fetching === false && cards.length > 0"
      >
        <div
          class="card-numbers__item flex justify-between bg-whitelike max-h-12 text-center h-8 sm:h-12 w-[85%] sm:w-full items-center cursor-pointer my-1 rounded-md"
          v-for="card in cards"
          :key="card.cuid"
        >
          <div
            class="flex gap-x-1 items-center sm:gap-x-2"
            @click="handleSelectCard(card)"
          >
            <div class="check-box flex items-center justify-center">
              <span class="w-8 h-8 rounded-sm"></span>
              <icons-check
                v-if="selectedCard.cuid === card.cuid"
                class="cursor-pointer"
              />
              <div
                class="box w-3 sm:w-5 h-3 sm:h-5 rounded-sm bg-ash-3 cursor-pointer"
                v-else
              ></div>
            </div>

            <div class="card-type-logo">
              {{ card.payment_type_description }}
            </div>

            <p class="font-normal text-secondary ml-2">
              {{ card.masked_card.substring(0, 4) }} **** ****
              {{ card.masked_card.substring(card.masked_card.length - 4) }}
            </p>
          </div>

          <button
            class="bg-black text-white hover:bg-red-600 duration-450 hover:text-black flex items-center justify-center border-none outline-none focus:outline-none focus:border-none px-1.5 py-1 rounded-md justify-self-end mr-2 sm:mr-6"
            @click="confirmDelete(card.cuid)"
          >
            <span>Delete Card</span>
          </button>
        </div>

        <div class="flex gap-x-2 items-center ml-8 my-1">
          <icons-check
            v-if="accepted === true"
            @click="accepted = false"
            class="cursor-pointer"
          />
          <div
            class="box sm:w-5 w-3 h-3 sm:h-5 rounded-sm bg-ash-3 cursor-pointer"
            @click="accepted = true"
            v-else
          ></div>


          <p class="text-xs sm:text-md">
            I have read and agree to the Terms & Conditions and Privacy Policy
          </p>

        </div>

                  <button-primary
            :text="'Pay now'"
            class="text-secondary font-bold"
            type="button"
            @click="handlePay"
            :class="{
              'opacity-75 cursor-not-allowed':
                submitting === true ||
                fetching === true ||
                accepted === false ||
                isDeleting === true,
            }"
            :disabled="
              submitting === true ||
              fetching === true ||
              accepted === false ||
              isDeleting === true
            "
          />
      </div>
      <div
        class="card-numbers w-full sm:w-[80%] mx-auto flex flex-col gap-y-1 items-center mt-4 sm:mt-0"
        v-else-if="fetching === false && cards.length <= 0"
      >
        <p>You don't have any cards currently,click add card to add a card</p>
      </div>

      <button-primary
        :text="'Add New Card'"
        class="!bg-secondary !text-primary font-bold"
        type="button"
        @click="navigateTo('/add-card')"
        :class="{
          'opacity-75 cursor-not-allowed':
            submitting === true || fetching === true || isDeleting === true,
        }"
        :disabled="
          submitting === true || fetching === true || isDeleting === true
        "
      />
    </div>

    <spacer :y="true" :size="8" />
  </div>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import { storeToRefs } from "pinia";

import { useAppStore } from "@/store/app/index";
import { useUserStore } from "@/store/auth/index";
import useToggle from "@/composables_/useToggle";
import UtilsService from "@/services/utils.service";

const authstore = useUserStore();
const { user } = storeToRefs(authstore);
const toast = useNuxtApp().$toast;

// console.log(user, "user hiss");

const {
  show: showConfirmDelete,
  setShowFalse: closeConfirmDelete,
  setShowTrue: openConfirmDelete,
} = useToggle();

const fetching = ref(false);
const submitting = ref(false);
const accepted = ref(false);
const isDeleting = ref(false);

const cards = ref([]);
const cardForDelete = ref("");
const selectedCard = reactive({
  cuid: "",
  masked_card: "",
  name_on_card: "",
  payment_type_description: "",
  expiry_date: "",
});

const checkSelect = () => {
  for (const item in selectedCard) {
    if (selectedCard[item] === "") {
      submitting.value = false;
    }
  }
};

const confirmDelete = (cuid) => {
  cardForDelete.value = cuid;
  openConfirmDelete();
};

const fetchCards = async () => {
  fetching.value = true;
  UtilsService.getCards()
    .then((response) => {
      const data = response;

      //console.log(data, " data for get cards");
      cards.value = data;
      if (data.length <= 0) {
        return navigateTo("/add-card");
      }


      fetching.value = false;
    })
    .catch((err) => {
      fetching.value = false;
      // console.log(err, "err");
      toast.error("Error fetching card details..");
    });
};

const initDeleteCard = async () => {
  isDeleting.value = true;

  const newcards = cards.value.filter(
    (card) => card.cuid !== cardForDelete.value
  );

  // console.log(newcards, "newC");
  UtilsService.deleteCard(cardForDelete.value)
    .then((response) => {
      isDeleting.value = !true;
      // console.log(response,'response');

      cards.value = newcards;

      return response;
    })
    .then((res) => {
      closeConfirmDelete();
    })
    .catch((err) => {
      isDeleting.value = !true;
      // console.log(err, "err");
      toast.error("Error deleting card.");
    });
};

const handlePay = async () => {
  submitting.value = true;
  if (!!selectedCard.cuid) {
    useAppStore().setCuid(selectedCard.cuid);
    navigateTo("/pay-now");
  }
};
const handleSelectCard = (card) => {
  selectedCard.cuid = card.cuid;
  selectedCard.masked_card = card.masked_card;
  selectedCard.name_on_card = card.name_on_card;
  selectedCard.expiry_date = card.expiry_date;
  selectedCard.payment_type_description = card.payment_type_description;
  submitting.value = false;
};

useHead({
  title: "Select Card",
});
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
onMounted(() => {
  checkSelect();
});
onBeforeMount(async () => {
  await fetchCards();
});
</script>

<style lang="scss" scoped>
.select-card {
  min-height: calc(100vh - 3rem);
  height: calc(100vh - 3rem);
}

.card-wrapper {
  .card {
    @apply w-[80vw] sm:w-[28rem]  h-64 sm:h-72 mx-auto mt-6  rounded-3xl py-2 px-6;

    &.card-front {
      .chip-front {
        & > * {
          cursor: pointer;
          @apply rounded-sm;
          background-color: goldenrod !important;
          border: 1px solid saddlebrown !important;
        }
      }
    }

    &.card-back {
      .chip-back {
        span {
          @apply rounded-sm;
          background-color: #f2f2f2;
          border: 1px solid #212121;
        }
      }
    }
  }
}

.check-box {
  span {
  }
}

.text-skeleton-lg:empty {
  width: 8rem;
  height: 2rem;
  display: inline-block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;

  @media screen and (max-width: 640px) {
    width: 4rem;
    height: 1.25rem;
  }
}

.text-skeleton:empty {
  width: 6rem;
  height: 22px;
  display: inline-block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
  @media screen and (max-width: 640px) {
    width: 2rem;
    height: 12px;
  }
}

@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>
