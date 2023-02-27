<template>
  <div class="transaction-details bg-whitelike">
    <h2 class="bg-white text-secondary font-bold w-full text-center text-2xl">
      Transaction Details
    </h2>

    <div class="transaction-details__content">
      <div
        class="transaction-details__content--header bg-white flex justify-between w-full px-6 items-center border-y-ash-1 border-y-[0.65px] py-1"
      >
        <div class="left flex items-center gap-x-4">
          <div
            class="logo bg-ash-1 w-16 h-16 rounded-full flex items-center justify-center uppercase"
          >
            <!-- <icons-dummy-bank-logo /> -->
                        {{ transaction.transaction_provider }}

          </div>

          <div class="details flex flex-col">
            <h2 class="text-primary">
              {{ transactionData.first_name }} {{ transactionData.last_name }}
            </h2>
            <h4 class="text-secondary">{{ transactionData.address }}</h4>
          </div>
        </div>


        <div class='right flex flex-col items-start'>
                  <div
          class="right text-secondary text-skeleton"
          v-if="isLoading === true"
        ></div>
        <div class="right text-secondary text-skeleton" v-else>
          <span v-money>{{ transaction.amount }}</span>
          {{ transaction.from_currency }}
        </div>
        <div
          class="right text-secondary text-skeleton"
          v-if="isLoading === true"
        ></div>
        <div class="right text-secondary text-skeleton" v-else>
          <span v-money>{{ transaction.converted_amount }}</span>
          {{ transaction.to_currency }}
        </div>
        </div>
      </div>

      <div class="transaction-details__content--main px-10">
        <div
          class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start"
        >
          <h2 class="text-secondary mb-2 font-bold">Transaction reference</h2>
          <p class="text-secondary text-skeleton" v-if="isLoading === true"></p>
          <p class="text-secondary text-skeleton" v-else>
            {{ transaction.reference }}
          </p>
        </div>

        <div
          class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start"
        >
          <h2 class="text-secondary mb-2 font-bold">Transaction status</h2>
          <p class="text-secondary text-skeleton" v-if="isLoading === true"></p>
          <p class="text-secondary text-skeleton" v-else>
            {{ transaction.message }}
          </p>
        </div>

        <div
          class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start"
        >
          <h2 class="text-secondary mb-2 font-bold">Time of transaction</h2>
          <p class="text-secondary text-skeleton" v-if="isLoading === true"></p>
          <p class="text-secondary" v-else>
            {{ transaction.trans_date }}
          </p>
        </div>

        <div
          class="reference border-b-ash-1 border-b-[0.65px] mt-2 mb-1 h-20 flex flex-col items-start"
        >
          <h2 class="text-secondary mb-2 font-bold">Transaction provider</h2>
          <p class="text-secondary text-skeleton" v-if="isLoading === true"></p>
          <p class="text-secondary text-skeleton" v-else>
            {{ transaction.transaction_provider }}
          </p>
        </div>
      </div>
    </div>

    <button-primary
      @click="handleRepeatTransaction"
      type="button"
      :text="'Repeat Transaction'"
      :disabled="isLoading === true || repeatingTransaction === true"
      class="font-bold"
      :class="{
        'opacity-80 cursor-not-allowed':
          isLoading === true || repeatingTransaction === true,
      }"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import UtilsService from "@/services/utils.service";
import { useAppStore } from "@/store/app/index";

useHead({
  title: "Transaction Reference",
});
definePageMeta({
  layout: "default",
  middleware: ["auth", "checkroute"],
});
const currentTransact = useAppStore();
// console.log(currentTransaction, "tC");
const { currentTransaction: transactionData } = storeToRefs(currentTransact);

// console.log(transactionData ,'TDDD');

const route = useRoute();
const isLoading = ref(false);
const repeatingTransaction = ref(false);
const isForSub = ref(false);
const reference = route.params.transactionId;
const transaction = reactive({
  amount: "",
  transaction_provider: "",
  from_currency: "",
  reference: "",
  trans_date: "",
  message: "",
  status: "",
  to_currency: "",
  converted_amount: "",
});

// console.log(reference,'reffffff')

const repeatForm = reactive({
  to_user: "",
  from_currency: "",
  amount: "",
  to_currency: "",
  reason_id: "",
});

const handleRepeatTransaction = async () => {
  // console.log(repeatForm, "refForm");
  const needs = transactionData.value;

  //console.log(needs ,'needs');

  const result = {
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  };
  for (const item in needs) {
    if (item in result) {
      result[item] = needs[item];
    }
  }
  isLoading.value = true;

  const paymentSummary = {
    result: {
      ...repeatForm,
      ...result,
    },
    reasonId: repeatForm.reason_id,
  };

  if (!!paymentSummary.reasonId) {
    // UtilsService.getConversionRates(conversionDetails).then((response) => {
    //       const result = response.data;
    //       // console.log(result, "res");
    //       const converted_amount = result.converted_amount;
    //       // console.log(converted_amount,'conved amout')
    //       const cash = converted_amount.cash;
    //       const bank = converted_amount.bank;
    //       const mobile = converted_amount.mobile;
    //       // console.log(cash,'cash');
    //       useAppStore().setPaymentSummary(converted_amount);
    //       const details = {
    //         cash,
    //         mobile,
    //         bank,
    //         recipient_currency: result.recipient_currency,
    //         conversion_rate: result.conversion_rate,
    //       };
    //       useAppStore().setConversionData({
    //         amount:conversionDetails.amount,
    //       })
    //       useAppStore().setRemittanceDetails(details);
    //       cashValue.value = String(cash?.converted);
    //       bankValue.value = String(bank?.converted);
    //       mobileValue.value = String(mobile?.converted);
    //       bestValue.value = { ...result.best_value };
    //       assignConvertedAmount();
    //   }
  }
  //console.log(paymentSummary,'ps');

  localStorage.setItem("progged", JSON.stringify(true));

  // TODO Add this to pinia store;
  localStorage.setItem("payS", JSON.stringify(paymentSummary));

  isLoading.value = false;

  navigateTo("/payment-summary");
};

const fetchTransaction = async () => {
  isLoading.value = true;
  UtilsService.getTransaction(reference)
    .then((response) => {
      console.log(response, "r");
      repeatForm.to_user = response.ruid;
      repeatForm.from_currency = response.from_currency;
      repeatForm.to_currency = response.to_currency;
      repeatForm.amount = response.amount;
      repeatForm.reason_id = response.reason_id;

      for (const item in response) {
        if (item in transaction) {
          transaction[item] = response[item];
        }
      }
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err, "err");
    });
};

onMounted(() => {
  // const {currentTransaction} = useAppStore();
  // console.log(currentTransaction,'cT');
  // transactionData.value = currentTransaction;
  // console.log(transactionData,'ddTd')
});
onBeforeMount(async () => {
  await fetchTransaction();
});
</script>

<style lang="scss" scoped>
.transaction-details {
  height: calc(100vh - 3rem);
  min-height: calc(100vh - 3rem);
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
}

@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>
