<template>
  <div class="send-money px-6 py-3 relative flex flex-col items-center">
    <h3 class="text-white font-semibold text-2xl self-start text-left">
      Send Money
    </h3>

    <div
      class="card bg-white w-[80vw] sm:w-[28rem] sm:h-72 mx-auto mt-6 px-4 rounded-sm py-2"
    >
      <div class="top h-1/2 px-8">
        <h6 class="text-ash-1 font-semibold">Enter Amount</h6>

        <div
          class="top__content relative bg-blue flex justify-between items-center py-8"
        >
          <div class="div font-bold flex items-center gap-x-1">
            <span class="unit self-end">
              {{
                senderCurrencyDetails.sender_currency_symbol ||
                senderCurrencyDetails.sender_currency
              }}
            </span>

            <input
              type="number"
              id="userInput"
              step="0.00"
              class="amount font-bold text-xl w-22 focus:outline-primary rounded-lg max-w-[6rem] sm:w-24 px-1 py-1 border-secondary border-2"
              placeholder="0.00"
              v-model="conversionDetails.amount"
            />
          </div>

          <div class="line bg-ash-1"></div>
          <!-- 
<img src="../../assets/icons/nigerian-flag.svg" class="object-contain max-w-full"/> -->
          <sender-currency-select />
        </div>
      </div>

      <div class="bottom h-1/2 px-8">
        <h4 class="text-ash-1 font-semibold">Recipient Gets</h4>

        <div
          class="bottom__content relative flex justify-between items-center py-8"
        >
          <div class="div font-bold flex items-center gap-x-2">
            <span class="unit self-end">{{
              recipientCurrencyDetails.recipient_currency_symbol ||
              recipientCurrencyDetails.recipient_currency
            }}</span>
            <span class="amount text-xl" v-if="amount">
              {{ amount }}
            </span>
            <span class="amount text-xl" v-else>0.00</span>
            <!-- <span class="amount text-xl" >0.00</span> -->
          </div>

          <div class="line bg-ash-1"></div>
          <RecipientCurrencySelect />
        </div>
      </div>
    </div>

    <div
      class="fieldset mx-auto mt-8 rounded-md w-72 px-2 py-1 flex items-center justify-between flex-col bg-white"
    >
      <div
        class="legend flex items-center justify-between w-full"
        @click="remittanceMethod = 'cash'"
      >
        <div
          class="option cursor-pointer flex gap-x-2 flex-row-reverse items-center justify-start text-left"
        >
          <label for="cash">Cash</label>

          <input
            class="focus:outline-primary"
            type="radio"
            name="cash"
            id="cash"
            v-model="remittanceMethod"
            value="cash"
            hidden
          />

          <label
            for="cash"
            class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
          >
            <span
              :class="{
                '!block': remittanceMethod === 'cash',
                hidden: remittanceMethod !== 'cash',
              }"
            >
            </span>
          </label>
        </div>

        <div class="rate font-bold flex gap-x-1">
          <span class="unit self-end">{{
            recipientCurrencyDetails.recipient_currency_symbol ||
            recipientCurrencyDetails.recipient_currency
          }}</span>
          <span class="amount" v-if="cashValue">{{ cashValue }}</span>
          <span class="amount" v-else>0.00</span>
        </div>
      </div>
      <div
        class="legend flex items-center justify-between w-full cursor-pointer"
        @click="remittanceMethod = 'bank'"
      >
        <div
          class="option flex flex-row-reverse gap-x-2 items-center justify-start text-left"
        >
          <label>Bank</label>
          <input
            v-model="remittanceMethod"
            type="radio"
            name="bank"
            id="bank"
            value="bank"
            hidden
          />
          <label
            for="bank"
            class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
          >
            <span
              :class="{
                '!block': remittanceMethod === 'bank',
                hidden: remittanceMethod !== 'bank',
              }"
            ></span>
          </label>
        </div>

        <div class="rate font-bold flex gap-x-1">
          <span class="unit self-end">{{
            recipientCurrencyDetails.recipient_currency_symbol ||
            recipientCurrencyDetails.recipient_currency
          }}</span>
          <span class="amount" v-if="bankValue">{{ bankValue }}</span>
          <span class="amount" v-else>0.00</span>
        </div>
      </div>

      <div
        class="legend cursor-pointer flex items-center justify-between w-full"
        @click="remittanceMethod = 'mobile'"
      >
        <div
          class="option flex flex-row-reverse gap-x-2 items-center justify-start text-left"
        >
          <label for="mobile">Mobile</label>
          <input
            v-model="remittanceMethod.value"
            type="radio"
            name="mobile"
            id="mobile"
            value="mobile"
            hidden
          />

          <label
            for="mobile"
            class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
          >
            <span
              :class="{
                '!block': remittanceMethod === 'mobile',
                hidden: remittanceMethod !== 'mobile',
              }"
            ></span>
          </label>
        </div>

        <div class="rate font-bold flex gap-x-1">
          <span class="unit self-end">{{
            recipientCurrencyDetails.recipient_currency_symbol ||
            recipientCurrencyDetails.recipient_currency
          }}</span>
          <span class="amount" v-if="mobileValue">{{ mobileValue }}</span>
          <span class="amount" v-else>0.00</span>
        </div>
      </div>
    </div>

    <button
      class="btn bg-primary text-whitelike px-4 py-2 rounded-sm mt-2 text-xl"
      @click="handleContinue"
    >
      Continue
    </button>

    <spacer :y="true" :size="4" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";
import { watchDebounced } from "@vueuse/core";

const store = useAppStore();
const {
  getSenderCurrencyDetails: senderCurrencyDetails,
  getRecipientCurrencyDetails: recipientCurrencyDetails,
} = storeToRefs(store);
// console.log(senderCurrencyDetails.value,'sssssss!!!');
// console.log( recipientCurrencyDetails.value,'rrrrrr!!!');
// const { conversionData: {converted_amount: { cash, bank, mobile },
//   best_value} } = useAppStore();

const amount = ref("");

const bestValue = ref({
  cash: {
    initial_amount: "",
    commission: "",
    final_amount: "",
    converted: "",
  },
});
const cashValue = ref("");
const bankValue = ref("");
const mobileValue = ref("");

const conversionData = reactive({
  recipient_currency: "",
  recipient_country: "",
  sender_currency: "",
  sender_country: "",

  conversion_rate: "",

  methods: {
    cash: "",
    bank: "",
    mobile: "",
  },

  converted_amount: {
    cash: {
      initial_amount: "",
      commission: "",
      final_amount: "",
      converted: "",
    },
    bank: {
      initial_amount: "",
      commission: "",
      final_amount: "",
      converted: "",
    },
    mobile: {
      initial_amount: "",
      commission: "",
      final_amount: "",
      converted: "",
    },
  },

  best_value: {
    cash: {
      initial_amount: "",
      commission: "",
      final_amount: "",
      converted: "",
    },
  },
});

const assignConvertedAmount = () => {
  for (const item in bestValue.value) {
    amount.value = bestValue.value[item].converted;
  }
};

useHead({
  title: "Send Money",
});

const {
  public: { TUMA_CLIENT_ID },
} = useRuntimeConfig();

const conversionDetails = reactive({
  amount: "",
  client_id: TUMA_CLIENT_ID,
  recipient_country: recipientCurrencyDetails.value.recipient_country,
  recipient_currency: recipientCurrencyDetails.value.recipient_currency,
  sender_currency: senderCurrencyDetails.value.sender_currency,
  sender_country: senderCurrencyDetails.value.sender_country,
});

const updateMethods = async () => {};

const remittanceMethod = ref("");

const isLoadingCountries = ref(false);

const handleContinue = () => {
  if (conversionDetails.amount !== "" && remittanceMethod.value !== "") {
    useAppStore().setRemittanceMethod(remittanceMethod.value);

    // console.log(conversionDetails,'cDDDDD!!!HEy')
    const data = {
      recipient_currency: conversionDetails.recipient_currency,
      recipient_country: conversionDetails.recipient_country,
    };
    useAppStore().setRecipientCurrencyDetails(data);
    useAppStore().setRestriction(data.recipient_country);
    console.log(remittanceMethod.value, "method");
    navigateTo("/recipient");
  }
};

// const fetchCountries = async () => {
//   const data = await UtilsService.getCountries();
//   // console.log(data.data,'countries');
//   setCountries(data.data);
// };

onMounted(() => {
  remittanceMethod.value = useAppStore().getMethod || "";
});

onBeforeMount(async () => {
  useAppStore().fetchCountries();
});

// onBeforeUnmount(() => {
//   amountInput.removeEventListener("blur", handleTypeBlur);
// });

watchDebounced(
  conversionDetails,
  () => {
    if (conversionDetails.amount !== "") {
      let allowAction = true;
      //  console.log(conversionDetails,'cDDDDD!!!HEy hiii!');

      conversionDetails.recipient_country =
        recipientCurrencyDetails.value.recipient_country;
      conversionDetails.recipient_currency =
        recipientCurrencyDetails.value.recipient_currency;

      conversionDetails.sender_currency =
        senderCurrencyDetails.value.sender_currency;
      conversionDetails.sender_country =
        senderCurrencyDetails.value.sender_country;

      for (const item in conversionDetails) {
        if (conversionDetails[item] === "") {
          allowAction = false;
          return;
        }
      }

      console.log(conversionDetails, "cDDDDD!!!HEy hiii! how far!!!");

      if (allowAction) {
        UtilsService.getConversionRates(conversionDetails).then((response) => {
          const result = response.data;

          // console.log(result, "res");

          const cash = result.converted_amount.cash;
          const bank = result.converted_amount.bank;
          const mobile = result.converted_amount.mobile;
          // console.log(cash,'cash');

          const details = {
            cash,
            mobile,
            bank,
            recipient_currency: result.recipient_currency,
          };

          useAppStore().setConversionData({
            amount:conversionDetails.amount,
          })

          useAppStore().setRemittanceDetails(details);

          cashValue.value = String(cash?.converted);
          bankValue.value = String(bank?.converted);
          mobileValue.value = String(mobile?.converted);

          bestValue.value = { ...result.best_value };

          assignConvertedAmount();
        });
      }
    }
  },
  { debounce: 800, maxWait: 1200 }
);

definePageMeta({
  layout:false,
  middleware:['auth']
})
</script>

<style lang="scss" scoped>
$percent: 75%;
.send-money {
  min-height: calc(100vh - 3rem);
  background-image: linear-gradient(
    180deg,
    #fec02f 1%,
    #fec02f 31%,
    #fec02f 39%,
    #fec02f 44%,
    #fec02f 47%,
    #fec02f 49%,
    hsl(282deg 100% 97%) 50%,
    hsl(282deg 100% 97%) 51%,
    hsl(266deg 100% 97%) 53%,
    hsl(249deg 100% 97%) 56%,
    hsl(235deg 100% 97%) 61%,
    hsl(227deg 63% 97%) 69%,
    hsl(220deg 16% 97%) 99%
  );

  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
  .card {
    // display: inline-block;
    --shadow-color: hsl(0, 0%, 13%);

    --shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.86),
      0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.86),
      2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.86),
      5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.86);
    box-shadow: var(--shadow-elevation-medium);

    -webkit-transform-origin: center;
    -moz-transform-origin: center;
    transform-origin: center;
    -webkit-perspective: 100px;
    -moz-perspective: 100px;
    perspective: 100px;
    -webkit-transform: perspective(5550px) translateZ(300px);
    -moz-transform: perspective(100px);
    transform: perspective(100px);

    .top {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        width: 100%;
        @apply bg-ash-1;
      }
    }
  }

  .line {
    position: absolute;
    top: 50%;
    left: 50%;

    height: 65px;
    width: 1px;

    transform: translate(-50%, -50%);
  }

  .legend {
    @apply px-2 py-1 rounded-sm;
    cursor: pointer;
    &:hover {
      @apply bg-whitelike;
    }
  }
}

label.btn {
  position: relative;

  span {
    display: none;
    // content: "";
    border-radius: 50%;
    top: 50%;
    left: 50%;
    position: absolute;

    transform: translate(-50%, -50%);

    background-color: #fec02f;

    width: $percent;
    height: $percent;
    z-index: 5;
  }
}

input[type="radio"]:focus label.btn {
  &::after {
    display: block;
  }
}

#userInput {
  @apply border-secondary;
  border-style: solid !important;
  border-width: 1.45px !important;
}
</style>
