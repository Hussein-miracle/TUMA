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
              {{ conversionDetails.recipient_country_code }}
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
              conversionDetails.recipient_currency
            }}</span>
            <span class="amount text-xl">0.00</span>
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
        @click="conversionDetails.sub_type = 'cash'"
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
            v-model="conversionDetails.sub_type"
            value="cash"
            hidden
          />

          <label
            for="cash"
            class="btn w-4 h-4 rounded-full bg-whitelike border-primary border-2"
          >
            <span
              :class="{
                '!block': conversionDetails.sub_type === 'cash',
                hidden: conversionDetails.sub_type !== 'cash',
              }"
            >
            </span>
          </label>
        </div>

        <div class="rate font-bold flex">
          <span class="unit self-end">$</span>
          <span class="amount">0.00</span>
        </div>
      </div>
      <div
        class="legend flex items-center justify-between w-full cursor-pointer"
        @click="conversionDetails.sub_type = 'bank'"
      >
        <div
          class="option flex flex-row-reverse gap-x-2 items-center justify-start text-left"
        >
          <label>Bank</label>
          <input
            v-model="conversionDetails.sub_type"
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
                '!block': conversionDetails.sub_type === 'bank',
                hidden: conversionDetails.sub_type !== 'bank',
              }"
            ></span>
          </label>
        </div>

        <div class="rate font-bold flex">
          <span class="unit self-end">$</span>
          <span class="amount">0.00</span>
        </div>
      </div>

      <div
        class="legend cursor-pointer flex items-center justify-between w-full"
        @click="conversionDetails.sub_type = 'mobile'"
      >
        <div
          class="option flex flex-row-reverse gap-x-2 items-center justify-start text-left"
        >
          <label for="mobile">Mobile</label>
          <input
            v-model="conversionDetails.sub_type"
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
                '!block': conversionDetails.sub_type === 'mobile',
                hidden: conversionDetails.sub_type !== 'mobile',
              }"
            ></span>
          </label>
        </div>

        <div class="rate font-bold flex">
          <span class="unit self-end">$</span>
          <span class="amount">0.00</span>
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
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";
import { watchDebounced } from "@vueuse/core";

useHead({
  title: "Send Money",
});

const {
  public: { TUMA_CLIENT_ID },
} = useRuntimeConfig();

const conversionDetails = reactive({
  amount: "",
  client_id: TUMA_CLIENT_ID,
  recipient_country_code: "NG",
  recipient_currency: "USD",
  sub_type: "",
});

const remittanceMethod = ref("");

const isLoadingCountries = ref(false);

const handleContinue = () => {
  if (conversionDetails.sub_type !== ""  && conversionDetails.amount !== '') {
    useAppStore().setRemittanceMethod(conversionDetails.sub_type);
    console.log(conversionDetails.sub_type, "method");
    navigateTo("/recipient");
  }
};

// const fetchCountries = async () => {
//   const data = await UtilsService.getCountries();
//   // console.log(data.data,'countries');
//   setCountries(data.data);
// };

let amountInput;

onMounted(() => {
  remittanceMethod.value = useAppStore().getMethod || "";
  // amountInput = document.querySelector("#userInput");
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
    if (!!conversionDetails.amount) {
      useAppStore().fetchConversion(conversionDetails);
    }
  },
  { debounce: 500, maxWait: 1000 }
);
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
