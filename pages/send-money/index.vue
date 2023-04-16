<template>
  <div class="send-money px-6 py-3 relative flex flex-col items-center">
    <h5 class="text-secondary font-semibold text-xl self-start text-left">
      Welcome {{ user.fname }}.
    </h5>
    <h3 class="text-white font-semibold text-2xl self-start text-left">
      Send Money
    </h3>

    <div
      class="card bg-white w-[80vw] sm:w-[28rem] sm:h-72 mx-auto mt-6 px-4 rounded-sm py-2 relative"
    >
      <div
        class="spinner bg-secondary absolute right-1 top-1"
        v-if="loading"
      ></div>
      <div class="top h-1/2 px-8">
        <h6 class="text-ash-1 font-semibold">Enter Amount</h6>

        <div
          class="top__content relative bg-blue flex justify-between items-center py-8"
        >
          <div class="div font-bold flex items-center gap-x-1">
            <span class="unit self-end">
              {{ selectedSenderCountry.currency_symbol }}
            </span>

            <input
              type="number"
              id="userInput"
              step="0.00"
              v-money-input
              class="amount font-bold text-xl w-22 sm:w-28 focus:outline-primary rounded-lg max-w-[6rem] px-1 py-1 border-secondary border-2"
              placeholder="0.00"
              v-model="changeDetails.forwardAmount"
              :disabled="
                !selectedRecipientCountry.currency_symbol ||
                !selectedSenderCountry.currency_symbol
              "
              @focus="handleForward(conversionDetails)"
              @change="handleFetchForward"
              @keyup="keyUpForward"
            />
          </div>

          <div class="line bg-ash-1"></div>

          <!-- <sender-currency-select /> -->

          <div class="inset-0 flex items-center justify-center">
            <button
              type="button"
              @click="openSenderModal"
              class="rounded-md bg-primary px-2 py-2 text-sm max-w-[10rem] hover:bg-opacity-20 focus:outline-none flex justify-between truncate gap-x-1 items-center"
            >
              <div
                class="text-whitelike mx-auto flex gap-x-1 items-center"
                v-if="
                  selectedSenderCountry && selectedSenderCountry?.currency_code
                "
              >
                <img
                  v-if="selectedSenderCountry && !!selectedSenderCountry.flag"
                  :src="selectedSenderCountry?.flag"
                  class="object-contain w-4 h-4"
                />

                <span>{{ selectedSenderCountry?.currency_code }}</span>
              </div>

              <span v-else class="text-whitelike mx-auto">Select Currency</span>
              <icons-select-arrow
                :rotate="isSenderOpen"
                class="fill-black !w-4 !h-4"
              />
            </button>
          </div>
          <TransitionRoot appear :show="isSenderOpen" as="template">
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
                      class="max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all sm:h-[40vh] sm:w-[30vw] flex flex-col items-center"
                    >
                      <DialogTitle
                        as="h3"
                        class="text-lg text-center font-medium leading-6 text-secondary flex gap-x-2 items-center"
                      >
                        <img
                          v-if="
                            selectedSenderCountry &&
                            !!selectedSenderCountry?.flag
                          "
                          :src="selectedSenderCountry?.flag"
                          class="object-contain w-4 h-4"
                        />
                        <span v-if="selectedSenderCountry?.currency_code">{{
                          selectedSenderCountry?.currency_code
                        }}</span>
                        <span v-else> Select Sender Currency</span>
                      </DialogTitle>
                      <div
                        class="mt-2 overflow-y-scroll custom-scroll px-2 w-full h-4/5"
                      >
                        <template v-if="defaultCurrencies.length > 0">
                          <div
                            class="options flex gap-x-2 items-center cursor-pointer hover:bg-ash-1 px-2 py-1 rounded-sm"
                            @click="handleSelectSenderCountry(country)"
                            v-for="country in defaultCurrencies"
                            :class="{
                              '!bg-ash-1':
                                country &&
                                selectedSenderCountry?.currency_code ===
                                  country?.currency_code,
                            }"
                            :key="country.name"
                          >
                            <img
                              v-if="country.flag"
                              :src="country.flag"
                              class="object-contain w-4 h-4"
                            />
                            <span>{{ country?.currency_code }}</span>
                          </div>
                        </template>
                        <template v-else>
                          <div class="loader w-3/5 h-3/5"></div>
                        </template>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
          <!-- <sender-currency-select /> -->
        </div>
      </div>

      <div class="bottom h-1/2 px-8">
        <h4 class="text-ash-1 font-semibold">Recipient Gets</h4>

        <div
          class="bottom__content relative flex justify-between items-center py-8"
        >
          <div class="div font-bold flex items-center gap-x-2">
            <span class="unit self-end">{{
              selectedRecipientCountry.currency_symbol
            }}</span>
            <input
              v-moneyInput
              type="number"
              id="userInput2"
              step="0.00"
              class="amount font-bold text-xl w-22 focus:outline-primary rounded-lg max-w-[6rem] sm:w-28 px-1 py-1 border-secondary border-2"
              placeholder="0.00"
              v-model="changeDetails.reverseAmount"
              :disabled="
                !selectedRecipientCountry.currency_symbol ||
                !selectedSenderCountry.currency_symbol
              "
              @focus="handleBackward(conversionDetails)"
              @change="handleFetchBackward"
              @keyup="keyUpBackward"
            />
          </div>

          <div class="line bg-ash-1"></div>
          <!-- <RecipientCurrencySelect /> start -->
          <div class="inset-0 flex items-center justify-center">
            <button
              type="button"
              @click="openRecipientModal"
              class="rounded-md bg-primary px-2 py-2 text-sm font-medium hover:bg-opacity-20 focus:outline-none flex gap-x-1 items-center"
            >
              <div
                class="text-whitelike mx-auto flex gap-x-1 items-center"
                v-if="
                  selectedRecipientCountry && selectedRecipientCountry?.name
                "
              >
                <img
                  v-if="
                    selectedRecipientCountry && !!selectedRecipientCountry.flag
                  "
                  :src="selectedRecipientCountry?.flag"
                  class="object-contain w-4 h-4"
                />
                <span>{{ selectedRecipientCountry?.name }}</span>
              </div>

              <span v-else class="text-whitelike mx-auto">Select Currency</span>

              <icons-select-arrow
                :rotate="isRecipientOpen"
                class="fill-black !w-4 !h-4 mx-auto"
              />
            </button>
          </div>
          <TransitionRoot appear :show="isRecipientOpen" as="template">
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
                      class="max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-[60vh] flex flex-col items-center sm:h-[40vh] sm:w-[30vw]"
                    >
                      <DialogTitle
                        as="h3"
                        class="text-lg text-center font-medium leading-6 text-secondary flex gap-x-2 items-center"
                      >
                        <img
                          v-if="
                            selectedRecipientCountry &&
                            !!selectedRecipientCountry.flag
                          "
                          :src="selectedRecipientCountry?.flag"
                          class="object-contain w-4 h-4"
                        />
                        <span v-if="selectedRecipientCountry?.name">{{
                          selectedRecipientCountry?.name
                        }}</span>
                        <span v-else> Select Recipient Country</span>
                      </DialogTitle>
                      <div
                        class="mt-2 overflow-y-scroll custom-scroll px-2 w-full h-4/5"
                      >
                        <template v-if="countries.length > 0">
                          <div
                            class="options flex gap-x-2 items-center cursor-pointer hover:bg-ash-1 px-2 py-1 rounded-sm"
                            @click="handleSelectRecipientCountry(country)"
                            v-for="country in countries"
                            :class="{
                              '!bg-ash-1':
                                country &&
                                selectedRecipientCountryDetails.recipient_country ===
                                  country?.name,
                            }"
                            :key="country.name"
                          >
                            <img
                              v-if="country.flag"
                              :src="country.flag"
                              class="object-contain w-4 h-4"
                            />
                            <span>{{ country?.name }}</span>
                          </div>
                        </template>
                        <template v-else>
                          <div class="loader w-3/5 h-3/5"></div>
                        </template>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
          <!-- <RecipientCurrencySelect /> end -->
        </div>
      </div>
    </div>

    <div
      class="marketplace w-64 sm:w-96 h-64 bg-white my-4 rounded-sm flex flex-col items-center justify-center"
    >
      <div class="loading" v-if="loading === true">
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
      </div>
      <ul
        class="!w-full !h-full px-1 py-2 overflow-y-scroll whitespace-pre"
        v-else
      >
        <li
          class="client !h-20 rounded-md !w-full my-1.5 overflow-hidden flex items-center cursor-pointer bg-whitelike hover:bg-ash-1 duration-350 transistion-all"
          v-for="client in marketPlace"
          @click="handleClickClient(client)"
          :key="client.uuid"
          :class="{
            '!bg-ash-2': conversionDetails.client_id === client.uuid,
            hidden: !client.best_value_identifier,
          }"
        >
          <div class="w-full h-full text-black flex items-center">
            <img
              :src="client.logo"
              :alt="client.name"
              v-if="client.logo"
              class="w-12 h-12 object-cover"
            />
            <span
              class="uppercase rounded-full w-12 h-12 text-primary font-bold flex items-center justify-center mx-1 bg-secondary"
              v-else
            >
              {{ client.name[0] }}
            </span>
            <span class="font-bold mr-1 sm:mr-2">{{ client.name }}</span>

            <icons-mobile
              v-if="client.best_value_identifier.toLowerCase() === 'mobile'"
            />
            <icons-bank
              v-else-if="client.best_value_identifier.toLowerCase() === 'bank'"
            />
            <icons-cash
              v-else-if="client.best_value_identifier.toLowerCase() === 'cash'"
            />
          </div>

          <div class="flex items-center gap-x-1 p-1 text-tumablack">
            <span>{{ selectedRecipientCountry.currency_symbol }}</span>
            <span v-if="client.best_value_identifier">{{
              client.rate.best_value[client.best_value_identifier]
                .converted_forward
            }}</span>
            <span>Commission</span>
          </div>
        </li>
      </ul>
    </div>

    <div
      class="fieldset mx-auto mt-2 sm:mt-4 rounded-md w-64 sm:w-72 px-1 sm:px-2 py-1 flex items-center justify-between flex-col bg-white gap-y-2"
    >
      <div
        class="legend flex items-center justify-between w-full"
        @click="remittanceMethod = 'cash'"
        :class="{ 'text-primary': remittanceMethod === 'cash' }"
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

          <icons-cash />

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
            selectedRecipientCountry.currency_symbol
          }}</span>
          <span class="amount" v-if="cashValue">{{ cashValue }}</span>
          <span class="amount" v-else>0.00</span>
        </div>
      </div>
      <div
        class="legend flex items-center justify-between w-full cursor-pointer"
        @click="remittanceMethod = 'bank'"
        :class="{ 'text-primary': remittanceMethod === 'bank' }"
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
          <icons-bank />
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
            selectedRecipientCountry.currency_symbol
          }}</span>
          <span class="amount" v-if="bankValue">{{ bankValue }}</span>
          <span class="amount" v-else>0.00</span>
        </div>
      </div>

      <div
        class="legend cursor-pointer flex items-center justify-between w-full"
        @click="remittanceMethod = 'mobile'"
        :class="{ 'text-primary': remittanceMethod === 'mobile' }"
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
          <icons-mobile />
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
            selectedRecipientCountry.currency_symbol
          }}</span>
          <!-- <span
            class="unit self-end"
   
            >{{ selectedSenderCountry.currency_symbol }}</span
          > -->
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
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app/index";
import { useUserStore } from "@/store/auth/index";
import UtilsService from "@/services/utils.service";
import { formatStringToMoney } from "../../utils/index";
import { watchDebounced } from "@vueuse/core";

const router = useRouter();
const store = useAppStore();
const authstore = useUserStore();

const loading = ref(false);
let touched = useState("touched", () => !true);

const {
  getSenderCurrencyDetails: senderCurrencyDetails,
  getRecipientCurrencyDetails: recipientCurrencyDetails,
  defaultSendingDetails,
  defaultAmount,
  defaultRecipientCountry,
} = storeToRefs(store);

const marketPlace = ref([]);
// console.log(defaultSendingDetails, "DSD");

// const sender_currencies =
const countries = computed(() => store.getCountriesFromStore);

const defaultCurrencies = computed(() => store.defaultAvailableCurrencies);

// console.log(defaultCurrencies, "Default currs");
const { user } = storeToRefs(authstore);
// console.log(user,'authRefs');
// console.log(senderCurrencyDetails.value,'sssssss!!!');
// console.log( recipientCurrencyDetails.value,'rrrrrr!!!');
// console.log( defaultAmount.value,'rrdefaultAmount!!!');

// CONVERSION UTILS
const changeDetails = reactive({
  reverseAmount: "0.00",
  forwardAmount: defaultAmount.value || "0.00",
});

const Amount = ref(null);

const conversionDetails = reactive({
  amount: "",
  client_id: import.meta.env.VITE_APP_TUMA_CLIENT_ID,
  sender_currency: "",
  conversion_type: "forward",
  sender_currency: "",
  recipient_country_code: "",
});

const handleClickClient = async (clientDetails) => {
  // console.log(clientDetails,'cdetails');
  const id = clientDetails.best_value_identifier;
  const rate = clientDetails.rate.best_value;
  const best_value = rate[id];

  console.log(best_value, "bvss");

  // if (conversionDetails.conversion_type === "forward") {
  //   changeDetails.reverseAmount = parseFloat(best_value.replaceAll(",", ""));
  // } 
  // else if (conversionDetails.conversion_type === "reverse") {
  //   changeDetails.forwardAmount = parseFloat(best_value.replaceAll(",", ""));
  // }

  conversionDetails.client_id = clientDetails.uuid;
  // await initialFetch();
};

const handleForward = (conversionDetails) => {
  const type = "forward";
  // console.log('forward!!!',conversionDetails)
  conversionDetails.conversion_type = type;
  conversionDetails.amount = changeDetails.forwardAmount;
  // conversionDetails.amount = forwardAmount;
  // console.log('forward!!!',conversionDetails)
  touched = true;
};

const handleBackward = (conversionDetails) => {
  const type = "reverse";
  // console.log('backward!!!',conversionDetails)
  conversionDetails.conversion_type = type;
  conversionDetails.amount = changeDetails.reverseAmount;
  // conversionDetails.amount = reverseAmount.value;
  // console.log('backward!!!',conversionDetails)
  touched = true;
};

const handleFetchBackward = async () => {
  await initialFetch();
};
const handleFetchForward = async () => {
  await initialFetch();
};

const keyUpForward = async () => {
  // console.log("up sender");
  await handleFetchForward();
};
const keyUpBackward = async () => {
  await handleFetchBackward();
  // console.log('up recipient')
};

// SENDER
const isSenderOpen = ref(false);

const getDefaultSender = (codePassed = "") => {
  const defaultCountry = defaultCurrencies?.value?.find((item) => {
    if (!!codePassed && item.currency_code === codePassed) {
      return item;
    } else if (item.default === true) {
      return item;
    }
  });
  // console.log(defaultCountry,'Dc');

  const sender_country = countries.value?.find(
    (c) => c.currency_code === defaultCountry.currency_code
  );
  // console.log(sender_country,'sc');
  const sample = {
    sender_currency: defaultCountry.currency_code,
    sender_currency_symbol: defaultCountry.symbol,
    sender_country: sender_country?.name,
  };

  useAppStore().setSenderCurrencyDetails(sample);

  return sender_country;
};

const selectedSenderCountry = ref(getDefaultSender());

const selectedSenderCountryDetails = reactive({
  sender_currency: "",
  sender_currency_symbol: "",
  sender_country: "",
});

function closeSenderModal() {
  isSenderOpen.value = false;
}
function openSenderModal() {
  isSenderOpen.value = true;
}

const handleContinueSender = async () => {
  let allowSubmit = true;
  for (const item in selectedSenderCountryDetails) {
    if (!selectedSenderCountryDetails[item]) {
      allowSubmit = false;
      return;
    }
  }

  if (allowSubmit === true) {
    useAppStore().setSenderCurrencyDetails(selectedSenderCountryDetails);
    closeSenderModal();
  }
};

const handleSelectSenderCountry = async (curr) => {
  //console.log(curr,'curr');
  const sender_country = countries.value?.find(
    (c) => c.currency_code === curr.currency_code
  );

  const sample = {
    sender_currency: curr.currency_code,
    sender_currency_symbol: curr.symbol,
    sender_country: sender_country?.name ?? "  ",
  };

  selectedSenderCountryDetails.sender_currency = curr.currency_code;
  selectedSenderCountryDetails.sender_country = sender_country?.name ?? " ";
  selectedSenderCountryDetails.sender_currency_symbol = curr.symbol;
  // selectedSenderCountryDetails.currency_symbol = curr.symbol;

  const value = {
    currency_symbol: curr.symbol,
    flag: curr.flag,
    currency_code: curr.currency_code,
  };

  selectedSenderCountry.value = value;

  handleContinueSender();
  await initialFetch();
};

// RECIPIENT START
const isRecipientOpen = ref(false);
const getDefaultRecipient = (codePassed = "") => {
  const code = codePassed || defaultRecipientCountry.value;
  // console.log(code, "code givevn");
  const defaultCountry = countries?.value?.find((item) => item.code === code);
  // console.log(defaultCountry,'dc');

  const initialSample = {
    recipient_currency: defaultCountry.currency_code,
    recipient_currency_symbol: defaultCountry.currency_symbol,
    recipient_country: defaultCountry.name,
    recipient_country_code: defaultCountry.code,
  };

  useAppStore().setRecipientCurrencyDetails(initialSample);
  return defaultCountry;
};

const selectedRecipientCountry = ref(getDefaultRecipient());

const selectedRecipientCountryDetails = reactive({
  recipient_currency: "",
  recipient_currency_symbol: "",
  recipient_country: "",
  recipient_country_code: "",
});

function closeRecipientModal() {
  isRecipientOpen.value = false;
}

function openRecipientModal() {
  isRecipientOpen.value = true;
}

const handleContinueRecipient = async () => {
  let allowSubmit = true;
  for (const item in selectedRecipientCountryDetails) {
    if (selectedRecipientCountryDetails[item] === "") {
      allowSubmit = false;
      return;
    }
  }

  if (allowSubmit === true) {
    useAppStore().setRecipientCurrencyDetails(selectedRecipientCountryDetails);
    closeRecipientModal();
  }
};

const handleSelectRecipientCountry = async (country) => {
  // console.log(country,'country');
  selectedRecipientCountryDetails.recipient_currency = country.currency_code;

  selectedRecipientCountryDetails.recipient_country = country.name;

  selectedRecipientCountryDetails.recipient_currency_symbol =
    country.currency_symbol;
  selectedRecipientCountryDetails.recipient_country_code = country.code;

  selectedRecipientCountry.value = country;

  handleContinueRecipient();

  await initialFetch();
};

// RECIPIENT END

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

const updateMarketPlace = async (marketP) => {
  const mp = [...marketP];
  //console.log(mp, "heheh mp");
  const transformedMp = [];
  marketPlace.value = [];
};

const remittanceMethod = ref("");

const isLoadingCountries = ref(false);

const handleContinue = () => {
  if (!!conversionDetails.amount && !!remittanceMethod.value) {
    useAppStore().setRemittanceMethod(remittanceMethod.value);

    useAppStore().setPaymentSummary(Amount.value);

    //console.log(Amount.value,'cDDDDD!!!HEy Amount.value...');

    // con sole.log(conversionDetails,'cDDDDD!!!HEy');

    if (conversionDetails.conversion_type === "forward") {
      const country = countries?.value.find(
        (country) => country?.code === conversionDetails?.recipient_country_code
      );
      // console.log(country , 'RCCCC')

      const data = {
        recipient_currency: country.currency_code,
        recipient_currency_symbol: country.currency_symbol,
        recipient_country: country.name,
        recipient_country_code: country.code,
      };

      useAppStore().setRecipientCurrencyDetails(data);

      useAppStore().setRestriction(data.recipient_country);
    }

    // localStorage.setItem("progged", JSON.stringify(true));
    navigateTo("/recipient");
  }
};

// const fetchCountries = async () => {
//   const data = await UtilsService.getCountries();
//   // console.log(data.data,'countries');
//   setCountries(data.data);
// };
const initialFetch = async () => {
  // conversionDetails

  if (conversionDetails.conversion_type === "forward") {
    conversionDetails.amount = changeDetails.forwardAmount;
    // conversionDetails.amount = forwardAmount.value;
  }
  if (conversionDetails.conversion_type === "reverse") {
    conversionDetails.amount = changeDetails.reverseAmount;
    // conversionDetails.amount = reverseAmount.value;
  }

  conversionDetails.sender_currency = selectedSenderCountry.value.currency_code;
  conversionDetails.recipient_country_code =
    selectedRecipientCountry.value.code;

  if (
    !!conversionDetails.amount &&
    !!conversionDetails.recipient_country_code &&
    !!conversionDetails.sender_currency
  ) {
    let allowAction = true;

    for (const item in conversionDetails) {
      if (!conversionDetails[item]) {
        allowAction = false;
      }
    }

    // console.log(allowAction, "allloading oAct");
    if (allowAction) {
      // console.log(conversionDetails, "convD");
      loading.value = true;
      UtilsService.getConversionRates(conversionDetails)
        .then(async (response) => {
          const data = response.data;
          // console.log(data, "rate fetch data");
          const result = data.default;
          const mp = data.marketplace;
          const converted_amount = result.converted_amount;
          marketPlace.value = mp;
          const market = [...mp];
          // console.log(market, "market");
          // updateMarketPlace(mp);
          Amount.value = converted_amount;
          const cash = converted_amount.cash;
          const bank = converted_amount.bank;
          const mobile = converted_amount.mobile;
          // console.log(cash,'cash');
          const details = {
            cash,
            mobile,
            bank,
            recipient_currency: result.recipient_currency,
            conversion_rate: result.conversion_rate,
          };
          bestValue.value = result.best_value;
          useAppStore().setRemittanceDetails(details);
          const newConved = { ...converted_amount };
          if (conversionDetails.conversion_type === "forward") {
            cashValue.value = `${cash?.converted}`;
            bankValue.value = `${bank?.converted}`;
            mobileValue.value = `${mobile?.converted}`;
            newConved.conversion_type = "forward";
            useAppStore().setConversionData({
              amount: conversionDetails.amount,
            });
            useAppStore().setPaymentSummary(newConved);
          }

          if (conversionDetails.conversion_type === "reverse") {
            cashValue.value = `${cash?.converted_forward}`;
            bankValue.value = `${bank?.converted_forward}`;
            mobileValue.value = `${mobile?.converted_forward}`;

            newConved.conversion_type = "reverse";
            // console.log(result.best_value, "rBv ah");
            const bvKey = Object.keys(result.best_value)[0];
            const bvData = result.best_value[bvKey];
            // console.log(bvData,'bvData')
            const money = formatStringToMoney(bvData.converted_reverse);
            // console.log(money,'moenyy')
            useAppStore().setConversionData({
              amount: money,
            });
            useAppStore().setPaymentSummary(newConved);
          }

          if (conversionDetails.conversion_type === "forward") {
            const details = Object.entries({ ...result.best_value })[0];
            // console.log(details , 'details')
            const [key, value] = details;
            // console.log(value,'val froward');
            const { converted } = value;

            // console.log(converted, "converted forward");

            changeDetails.reverseAmount = formatStringToMoney(converted);
         
          }

          if (conversionDetails.conversion_type === "reverse") {
            // assignConvertedAmount(reverseAmount);
            const details = Object.entries({ ...result.best_value })[0];
            // console.log(details , 'details')
            const [key, value] = details;
            // console.log(value,'val rev');
            const { converted } = value;
            changeDetails.forwardAmount = formatStringToMoney(converted);
          }
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
        });
    }
  }
};
onMounted(async () => {
  // if(!touched){
  await initialFetch();
  // }
});

onBeforeMount(async () => {
  const paymentSummary = JSON.parse(localStorage.getItem("payS"));

  const repeatAmount = paymentSummary?.result?.amount;
  if (repeatAmount) {
    // console.log(paymentSummary, "paySSS");
    // console.log(repeatAmount, "repAm");
    const from_currency = paymentSummary.result.from_currency;
    const to_currency = paymentSummary.result.to_currency;
    selectedSenderCountry.value = getDefaultSender(from_currency);
    selectedRecipientCountry.value = getDefaultRecipient(to_currency);
    changeDetails.forwardAmount = repeatAmount;
    localStorage.removeItem("payS");
  }
});

// onBeforeUnmount(() => {
//   amountInput.removeEventListener("blur", handleTypeBlur);
// });

watch(
  conversionDetails,
  async () => {
    initialFetch();
  },
  { debounce: 500, maxWait: 900 }
);

// watchDebounced(
//   changeDetails,
//   async () => {
//     initialFetch();
//   },
//   { debounce: 500, maxWait: 900 }
// );

// watch(conversionDetails, async () => {
//   await initialFetch();
// });

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
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
    // @apply px-2 py-1 rounded-sm;
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

#userInput,
#userInput2 {
  @apply border-secondary;
  border-style: solid !important;
  border-width: 1.45px !important;
}

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

.spinner {
  width: 30px;
  height: 30px;
  margin: 15px auto;
  // background-color: #333;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
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

.loading {
  position: relative;
  width: 4rem;
  height: 4rem;
  transform-style: preserve-3d;
  perspective: 800px;

  .arc {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-bottom: 3px solid #fec02f;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation: rotate#{$i} 1.15s linear infinite;
      }
    }

    &:nth-child(1) {
      animation-delay: -0.8s;
    }

    &:nth-child(2) {
      animation-delay: -0.4s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
}

@keyframes rotate1 {
  from {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(1turn);
  }
}

@keyframes rotate2 {
  from {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0);
  }

  to {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(1turn);
  }
}

@keyframes rotate3 {
  from {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(1turn);
  }
}
</style>
