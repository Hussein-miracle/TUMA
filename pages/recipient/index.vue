<template>
  <div class="recipient flex flex-col items-center overflow-x-hidden">
    <h2
      class="text-secondary text-3xl my-2"
      v-if="formerRecipients.length <= 0"
    >
      Recipient
    </h2>
     <!-- <div class="sk-fading-circle" v-if='fetching === true'>
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div> -->


      <div class="loading" v-if=' fetching === true'>
        <div class="arc"></div>
        <div class="arc"></div>
        <div class="arc"></div>
      </div>


    <div
      class="former-recipients flex flex-col items-center gap-y-4 overflow-hidden whitespace-nowrap mt-4"
      v-else-if="formerRecipients.length > 0 && fetching === false"
    >
      <h4 class="text-secondary text-2xl text-left">Choose Recipient</h4>

      <div
        class="recipients w-[80vw] overflow-auto whitespace-nowrap px-2 py-2"
      >
        <recipient
          v-for="(item, index) in formerRecipients"
          :key="index"
          :firstname="item.first_name"
          :lastname="item.last_name"
          @click="handleSelectRecipient(item)"
          :selected="!!itemSelected && itemSelected.ruid === item.ruid"
        />
      </div>

      <div
        class="bg-primary w-12 h-12 rounded-full flex items-center justify-center font-bold"
      >
        OR
      </div>
      <h4 class="mx-auto text-center">Enter New Recipient Details</h4>
    </div>

    <div class="recipient__content w-full flex flex-col items-center">
      <VeeForm
        class="flex flex-col gap-y-3 items-center mt-4 recipient__form sm:w-[60%] self-center w-[90%]"
        :validation-schema="recipientSchema"
        @submit="handleSubmit"
      >
        <div class="item flex flex-col-reverse my-1 w-full">
          <VeeField
            type="text"
            v-model="recipientForm.first_name"
            name="first_name"
            id="first_name"
            placeholder="Recipient First Name"
          />

          <label for="first_name" class="mb-2 text-ash-1"
            >Recipient First Name</label
          >

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="first_name"
          />
        </div>

        <div class="item flex flex-col-reverse my-1 w-full">
          <VeeField
            type="text"
            v-model="recipientForm.last_name"
            name="last_name"
            id="last_name"
            placeholder="Recipient Last Name"
          />

          <label for="last_name" class="mb-2 text-ash-1"
            >Recipient Last Name</label
          >

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="last_name"
          />
        </div>

        <div class="item flex flex-col-reverse my-1 w-full relative">
          <span
            :class="{
              '!block absolute top-[50%] -translate-y-1/2 right-2':
                isLoadingCity === true,
            }"
            class="hidden loader h-[50%] w-[50%]"
          ></span>

          <VeeField
            class="pl-10 w-full"
            type="text"
            v-model="recipientForm.address"
            name="address"
            @click="handleCityClick"
            @input="handleCityClick"
            id="address"
            v-show="showWithMap === false ? true : false"
            placeholder="Type and Select City from Google Dropdown List"
          />
          <GMapAutocomplete
            @place_changed="setPlace"
            type="text"
            v-model="recipientForm.address"
            name="address2"
            v-if="showWithMap === true ? true : false"
            id="address2"
            @input="handleCityInput"
            @click="handleCityClick"
            ref="addressRef"
            placeholder="Type and Select City from Google Dropdown List"
            :options="{
              types: ['(cities)'],
              libraries: 'places',
              componentRestrictions: {
                country: restrict.country_code.code.toLowerCase(),
              },
            }"
          >
          </GMapAutocomplete>

          <label for="address" class="mb-2 text-ash-1">City</label>

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="address"
          />
        </div>

        <div class="item flex flex-col-reverse my-1 w-full relative">
          <VeeField
            class="pl-10 w-full"
            type="text"
            v-model="recipientForm.phone"
            name="phone"
            id="phone"
            hidden
            placeholder="Recipient Phone Number"
          />

          <vue-tel-input
            type="text"
            v-model="recipientForm.phone"
            name="phone2"
            id="phone2"
            defaultCountry="US"
            mode="international"
            :inputOptions="{
              placeholder: 'Recipient Phone Number e.g +1 234 567633',
            }"
            class="pl-10 w-full"
            @focus="focusedPhone = true"
            @blur="focusedPhone = false"
          ></vue-tel-input>
          <!-- @close='focusedPhone = false' -->

          <!-- <div class="flex w-full"> -->
          <!-- <vee-field
              as="select"
              name="country"
              id="country"
              placeholder="+234"
              class="w-[30%] p-1"
              v-model="recipientForm.country"
            >
              <option value="" disabled>Dial Code</option>
              <option
                v-for="country in flags"
                class="text-secondary"
                :value="country.code"
                :key="country.dial_code"
                :selected="
                  restrict.country_code.code.toLowerCase() ===
                  country.code.toLowerCase()
                "
                :disabled="
                  restrict.country_code.code.toLowerCase() !==
                  country.code.toLowerCase()
                "
                :class="{
                  'opacity-90 text-whitelike cursor-not-allowed !bg-slate-600':
                    restrict.country_code.code.toLowerCase() !==
                    country.code.toLowerCase(),
                  '!bg-primary !cursor-pointer':
                    restrict.country_code.code.toLowerCase() ===
                    country.code.toLowerCase(),
                }"
              >
                {{ `${country.flag} ${country.dial_code}` }}
              </option>
            </vee-field> -->

          <!-- </div> -->

          <label
            for="phone"
            class="mb-2 text-ash-1"
            :class="{
              '!text-primary': focusedPhone === true,
              '!text-ash-1': focusedPhone === false,
            }"
            >Phone Number</label
          >
          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="phone"
          />
        </div>

        <div
          class="item flex flex-col-reverse my-1 w-full"
          v-show="remittanceMethod.toLowerCase() === 'mobile'"
        >
          <VeeField
            type="text"
            v-model="recipientForm.mobile_money_number"
            name="mobile_money_number"
            id="mobile_money_number"
            hidden
            placeholder="Recipient Mobile Money Number"
          />

          <vue-tel-input
            type="text"
            v-model="recipientForm.mobile_money_number"
            name="phone2"
            id="phone2"
            defaultCountry="US"
            mode="international"
            :inputOptions="{
              placeholder: 'Recipient Mobile Money Number e.g +1 234 567633',
            }"
            class="pl-10 w-full"
            @focus="focusedMobile = true"
            @blur="focusedMobile = false"
          ></vue-tel-input>

          <label
            for="mobile_money_number"
            class="mb-2 text-ash-1"
            :class="{
              '!text-primary': focusedMobile === true,
              '!text-ash-1': focusedMobile === false,
            }"
            >Recipient Mobile Money Number</label
          >

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="mobile_money_number"
          />
        </div>

        <div
          v-show="remittanceMethod.toLowerCase() === 'bank'"
          class="w-full flex flex-col"
        >
          <div class="item flex flex-col-reverse my-1 w-full">
            <VeeField
              type="text"
              v-model="recipientForm.bank_account_number"
              name="bank_account_number"
              id="bank_account_number"
              placeholder="Recipient Account Number"
            />

            <label for="bank_account_number" class="mb-2 text-ash-1"
              >Recipient Account Number</label
            >

            <VeeErrorMsg
              class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
              name="bank_account_number"
            />
          </div>
          <div class="item flex flex-col-reverse my-1 w-full">
            <VeeField
              type="text"
              v-model="recipientForm.bank_account_name"
              name="bank_account_name"
              id="bank_account_name"
              placeholder="Recipient Account Name"
            />

            <label for="bank_account_name" class="mb-2 text-ash-1"
              >Recipient Account Name</label
            >

            <VeeErrorMsg
              class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
              name="bank_account_name"
            />
          </div>
          <div class="item flex flex-col-reverse my-1 w-full">
            <VeeField
              type="text"
              v-model="recipientForm.bank_name"
              name="bank_name"
              id="bank_name"
              placeholder="Recipient Bank Name"
            />

            <label for="bank_name" class="mb-2 text-ash-1"
              >Recipient Bank Name</label
            >

            <VeeErrorMsg
              class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
              name="bank_name"
            />
          </div>
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="reason"
        />
        <VeeField
          as="select"
          class="rem_sel focus:outline-primary bg-whitelike rounded-sm px-1 py-1 m-2 sm:w-72 text-primary focus:text-secondary"
          v-model.lazy="recipientForm.reason"
          id="reason"
          name="reason"
        >
          <option value="" disabled>Select Reason for Remittance</option>

          <option
            class="option"
            :value="item.reason"
            v-for="item in reasons"
            :key="item.reason"
          >
            {{ item.reason }}
          </option>
        </VeeField>

        <div class="deliver w-full flex flex-col items-center">
          <h2 class="text-black text-left font-semibold text-xl self-start">
            Deliver as
          </h2>

          <div
            class="remittance__method bg-whitelike w-full my-2 h-32 rounded-md flex px-4 py-6 items-center justify-between"
          >
            <div class="flex">
              <div class="icon"></div>

              <div class="details flex flex-col items-start">
                <h3 class="text-secondary capitalize text-xl font-medium mb-2">
                  {{ remittanceMethod }}
                </h3>

                <p class="text-secondary my-2">
                  You selected this as a receive method
                </p>
              </div>
            </div>

            <div
              class="text-ash-3 cursor-pointer hover:text-ash-2 transition-all duration-75"
              @click="toggleModal"
            >
              Change
            </div>
          </div>
        </div>

        <button-primary
          :type="'submit'"
          :text="'CONTINUE'"
          class="uppercase !text-secondary font-semibold text-xl"
          :disabled="isLoading === true"
          :class="{ 'opacity-75 cursor-not-allowed': isLoading === true }"
        />
      </VeeForm>

      <remittance-method-modal :opened="isOpen" :closeModal="closeModal" />

      <spacer :y="true" :size="4" />
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { watchDebounced } from "@vueuse/core";
import { storeToRefs,mapStores } from "pinia";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";

const isLoading = ref(false);
const isLoadingCity = ref(false);

const fetching = ref(false);

const addressRef = ref(null);
const isOpen = ref(false);
const focusedPhone = ref(false);
const focusedMobile = ref(false);
const itemSelected = ref(null);
const showWithMap = ref(true);
const formerRecipients = ref([]);

const reasonForRemittance = ref("");

const store = useAppStore();

const { getRestriction: restrict } = storeToRefs(store);

// console.log(restrict,'restrict');
// bank_account_name:'',
// bank_name:'',
// bank_account_number:'',

definePageMeta({
  layout: "default",
  middleware: ["auth", "checkroute"],
});

const {
  getRecipientCurrencyDetails: recipientCurrencyDetails,
  getMethod: remittanceMethod,
  reasons,
  countries,
} = storeToRefs(store);

// console.log(remittanceMethod.value, "upda");

const fetchRecipients = async () => {
  fetching.value = true;
  UtilsService.getRecipients()
    .then((response) => {
      const data = response.data;
      // console.log(data , ' data for get recipients');
      formerRecipients.value = data;
      fetching.value = false;
    })
    .catch((err) => {
      fetching.value = false;
      console.log(err, "err");
    });
};

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
function toggleModal() {
  isOpen.value = !isOpen.value;
}

const recipientForm = reactive({
  first_name: "",
  last_name: "",
  address: "",
  phone: "",
  reason: "",
  mobile_money_number: "",
  bank_account_number: "",
  bank_account_name: "",
  bank_name: "",
});

const saveAccountDetails = () => {
  const accountDetails = {
    bank_account_name: recipientForm.bank_account_name,
    bank_account_number: recipientForm.bank_account_number,
    bank_name: recipientForm.bank_name,
  };

  useAppStore().setBankDetails(accountDetails);

  // const keys = Object.keys(accountDetails);
  // console.log(keys, "keys");

  // for (const item of keys) {
  //   console.log(item, "it");
  //   if (!accountDetails[item]) {
  //     console.log("none", item, accountDetails[item]);
  //   }
  // }
};
const saveMobileDetails = () => {
  const accountDetails = {
    mobile_money_number: recipientForm.mobile_money_number,
  };

  useAppStore().setMobileMoney(accountDetails);

  // const keys = Object.keys(accountDetails);
  // console.log(keys, "keys");

  // for (const item of keys) {
  //   console.log(item, "it");
  //   if (!accountDetails[item]) {
  //     console.log("none", item, accountDetails[item]);
  //   }
  // }
};
const handleSelectRecipient = (recipient) => {
  itemSelected.value = recipient;
  // const reasonSel = reasons.value.find((r) => {
  //   if (r?.reason === recipientForm.reason) {
  //     return r;
  //   }
  // });
  // console.log(recipient, "recipient selected");

  recipientForm.first_name = recipient.first_name;
  recipientForm.last_name = recipient.last_name;
  recipientForm.address = recipient.address;
  recipientForm.phone = recipient.phone_number;
  showWithMap.value = !showWithMap.value;
};

const handleCityInput = async (e) => {
  //console.log(e, "cityInput");
  isLoadingCity.value = true;
  setTimeout(() => {
    isLoadingCity.value = false;
    const value = e.target.value;
    recipientForm.address = value;
  }, 500);
};
const handleCityClick = async (e) => {
  // console.log(e, "cityInputClick");
  // showWithMap.value = false;
};

const setPlace = (e) => {
  const address = e.formatted_address;
  recipientForm.address = address;
};

const createRecipientSchema = (method) => {
  method = method.toLowerCase();

  if (method === "cash") {
    return yup.object().shape({
      first_name: yup.string().required("First name is required!"),
      last_name: yup.string().required("Last name is required!"),
      phone: yup.string().required("Phone is required!"),
      address: yup.string().required("City is Required"),
      reason: yup.string().required("Reason for payment is required"),
    });
  }

  if (method === "bank") {
    return yup.object().shape({
      first_name: yup.string().required("First name is required!"),
      last_name: yup.string().required("Last name is required!"),
      phone: yup.string().required("Phone is required!"),
      address: yup.string().required("City is Required"),
      reason: yup.string().required("Reason for payment is required"),
      bank_account_number: yup
        .string()
        .required("Bank account number required."),
      bank_account_name: yup.string().required("Account name required."),
      bank_name: yup.string().required("Bank name required."),
    });
  }

  if (method === "mobile") {
    return yup.object().shape({
      first_name: yup.string().required("First name is required!"),
      last_name: yup.string().required("Last name is required!"),
      phone: yup.string().required("Phone is required!"),
      address: yup.string().required("City is Required"),
      reason: yup.string().required("Reason for payment is required"),
      mobile_money_number: yup
        .string()
        .required("Mobile money number required."),
    });
  }
};


let recipientSchema = createRecipientSchema(remittanceMethod.value.toLowerCase());
watch(remittanceMethod,() => {
  // console.log(remittanceMethod,'remWatch')
  recipientSchema = createRecipientSchema(remittanceMethod.value.toLowerCase());
})

let address;

const handleSubmit = async (values) => {
  // console.log(values, "v");

  isLoading.value = true;
  // if (remittanceMethod.toLowerCase() === "bank") {
  //   saveAccountDetails();
  // }
  // if (remittanceMethod.toLowerCase() === "mobile") {
  //   saveMobileDetails();
  // }
  if (remittanceMethod.value.toLowerCase() === "bank") {
    saveAccountDetails();
  }
  if (remittanceMethod.value.toLowerCase() === "mobile") {
    saveMobileDetails();
  }

  try {
    const recipientCreationData = {
      first_name: recipientForm.first_name,
      last_name: recipientForm.last_name,
      phone_number: recipientForm.phone,
      address: recipientForm.address,
    };

    // console.log(recipientCreationData, "RDDDDD!!!");

    const reasonSel = reasons.value.find((r) => {
      if (r?.reason === recipientForm.reason) {
        return r;
      }
    });

    const reason_id = reasonSel.id;

    // console.log(reason_id,'reason');

    if (!!reason_id) {
      UtilsService.createRecipient(recipientCreationData)
        .then((response) => {
          const result = response.data;
          // console.log(result, "recipient creation result");
          const recipientData = {
            result: {
              ...result,
              address: recipientCreationData.address,
            },
            reasonId: reason_id,
          };
          useAppStore().setCurrentRecipientData(recipientData);
          localStorage.setItem("progged", JSON.stringify(true));
          // TODO Add this to pinia store;
          // const initialPayS = JSON.parse(localStorage.getItem('payS'))
          // if(!!initialPayS){
          //   localStorage.removeItem('payS');
          // }
          // localStorage.setItem("payS", JSON.stringify(paymentSummary));
          isLoading.value = false;
          navigateTo("/payment-summary");
        })
        .catch((err) => {
          isLoading.value = false;
          console.log(err, "err");
        });
    }
  } catch (err) {
    isLoading.value = false;
    console.log(err, "err");
  }
};

const onAddressBlur = async () => {
  isLoadingCity.value = true;

  setTimeout(() => {
    isLoadingCity.value = !true;
  }, 250);
};
onMounted(() => {
  address = document.querySelector("#address2");
  address.addEventListener("blur", onAddressBlur);
});

onBeforeMount(async () => {
  await fetchRecipients();
  await useAppStore().fetchReasons();
});
onUnmounted(() => {
  address.removeEventListener("blur", onAddressBlur);
});
watchDebounced(
  recipientForm,
  async () => {
    // console.log(recipientForm, "form recipient");
  },
  {
    debounce: 250,
    maxWait: 500,
  }
);
</script>

<style lang="scss" scoped>
.recipient {
  &__form {
    .item {
      input {
        border: none;
        border-bottom-width: 1.5px;
        border-bottom-style: solid;
        @apply border-b-ash-1 p-2;
      }
      input:focus {
        @apply border-b-primary p-2;
        outline: none;
      }
      input:focus + label {
        @apply text-primary;
      }
    }
  }
}

.iti__flag {
  background-image: url("path/to/flags.png");
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .iti__flag {
    background-image: url("path/to/flags@2x.png");
  }
}

.loader {
  width: 28px;
  height: 28px;
  border: 5px solid #fff;
  border-bottom-color: #212121;
  border-radius: 50%;
  // display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.r {
  --shadow-color: 0deg 0% 57%;
  --shadow-elevation-medium: 0.3px 0.5px 0.8px hsl(var(--shadow-color) / 0.24),
    1.1px 2.1px 3.1px -0.5px hsl(var(--shadow-color) / 0.33),
    2.4px 4.8px 6.9px -0.9px hsl(var(--shadow-color) / 0.42),
    5.4px 10.8px 15.6px -1.4px hsl(var(--shadow-color) / 0.51);

  box-shadow: var(--shadow-elevation-medium);
}

.sk-fading-circle {
  margin-inline:auto;
  width: 9rem;
  height: 9rem;
  position: relative;
}

.sk-fading-circle .sk-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.sk-fading-circle .sk-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #fec02f;
  border-radius: 100%;
  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
          transform: rotate(30deg);
}
.sk-fading-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
          transform: rotate(60deg);
}
.sk-fading-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
          transform: rotate(90deg);
}
.sk-fading-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
          transform: rotate(120deg);
}
.sk-fading-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
          transform: rotate(150deg);
}
.sk-fading-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
}
.sk-fading-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
          transform: rotate(210deg);
}
.sk-fading-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
          transform: rotate(240deg);
}
.sk-fading-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
          transform: rotate(270deg);
}
.sk-fading-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
          transform: rotate(300deg); 
}
.sk-fading-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
          transform: rotate(330deg); 
}
.sk-fading-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s; 
}
.sk-fading-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s; 
}
.sk-fading-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s; 
}
.sk-fading-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s; 
}
.sk-fading-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s; 
}
.sk-fading-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s; 
}
.sk-fading-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s; 
}
.sk-fading-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s;
}

@-webkit-keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

@keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; } 
}

.loading {
  position: relative;
  width: 9rem;
  height: 9rem;
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
