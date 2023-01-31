<template>
  <div class="recipient flex flex-col items-center overflow-x-hidden">
    <h2
      class="text-secondary text-3xl my-2"
      v-if="formerRecipients.length <= 0"
    >
      Recipient
    </h2>

    <div
      class="former-recipients flex flex-col items-center gap-y-4 overflow-hidden whitespace-nowrap mt-4"
      v-if="formerRecipients.length > 0 && showOtherRecipient === true"
    >
      <h4 class="text-secondary text-left">Choose Recipient</h4>

      <div
        class="recipients w-[80vw] overflow-auto whitespace-nowrap px-2 py-2"
      >
        <recipient
          v-for="(item, index) in formerRecipients"
          :key="index"
          :firstname="item.first_name"
          :lastname="item.last_name"
          @click="handleSelectRecipient(item)"
          :selected="!!itemSelected && itemSelected.id === item.id"
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

          <GMapAutocomplete
            @place_changed="setPlace"
            type="text"
            v-model="recipientForm.city"
            name="city"
            id="city"
            @input="handleCityInput"
            @click="handleCityInputClick"
            ref="cityRef"
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

          <label for="city" class="mb-2 text-ash-1">City</label>

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="city"
          />
        </div>

        <div class="item flex flex-col-reverse my-1 w-full relative">
          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="phone"
          />

          <VeeField
            class="pl-10 w-full"
            type="text"
            v-model="recipientForm.phone"
            name="phone"
            id="phone"
            placeholder="Recipient Phone Number"
          />

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

          <label for="phone" class="mb-2 text-ash-1">Phone Number</label>
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
          :class="{ 'opacity-60': isLoading === true }"
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
import { storeToRefs } from "pinia";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import flags from "@/data/countries";
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";

const isLoading = ref(false);
const isLoadingCity = ref(false);
const cityRef = ref(null);
const isOpen = ref(false);

const itemSelected = ref(null);

const formerRecipients = ref([
  // {
  //   first_name: "Tade",
  //   last_name: "Bola",
  //   id: "1",
  //   city:'kano state'
  // },
  // {
  //   id: "2",
  //   first_name: "kavi",
  //   last_name: "dagdag",
  //   city:'lagos state'
  // },
  // {
  //   id: "3",
  //   first_name: "olubodun",
  //   last_name: "akinyele",
  //   city:'ile ife Nigeria'
  // },
]);

const reasonForRemittance = ref("");

const store = useAppStore();

const { getRestriction: restrict } = storeToRefs(store);

// console.log(restrict,'restrict');
definePageMeta({
  layout: false,
  middleware: ["auth", "checkroute"],
});

const {
  getRecipientCurrencyDetails: recipientCurrencyDetails,
  getMethod: remittanceMethod,
  reasons,
  countries,
} = storeToRefs(store);

// const restrictTo = countries.value.filter((country) => {
//   console.log(country, "cont", recipientCurrencyDetails.recipient_country);
//   if (country.name === recipientCurrencyDetails.recipient_country) {
//     return country.code;
//   }
// });

// console.log(restrictTo,'RES');
const showOtherRecipient = ref(true);

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
  city: "",
  country: "",
  phone: "",
  reason: "",
});

const handleSelectRecipient = (recipient) => {
  itemSelected.value = recipient;

  // console.log(recipient, "recipient selected");
  recipientForm.first_name = recipient.first_name;
  recipientForm.last_name = recipient.last_name;
  recipientForm.city = recipient.city;
};

const handleCityInput = async (e) => {
  // console.log(e,'cityInput');
  isLoadingCity.value = true;
  setTimeout(() => {
    isLoadingCity.value = !true;
    if (recipientForm.city === "") {
      // ref(cityRef).value.$el.value.clear();
      ref(cityRef).value.$el.value = "";
    }
  }, 500);
  const value = e.target.value;

  recipientForm.city = value;
};
const handleCityInputClick = async (e) => {
  // console.log(e, "clci");
  // ref(cityRef).value.$el.value
};

const setPlace = (e) => {
  const address = e.formatted_address;
  recipientForm.city = address;
};

const recipientSchema = yup.object().shape({
  // country: yup.string().required("Country is required!"),
  first_name: yup.string().required("First name is required!"),
  last_name: yup.string().required("Last name is required!"),
  phone: yup.string().required("Phone is required!"),
  // city: yup.string().required("City is Required"),
  reason: yup.string().required("Reason for payment is required"),
});

let city;

const handleSubmit = async (values) => {
  console.log(values, "v");

  isLoading.value = true;

  try {
    const recipientCreationData = {
      first_name: recipientForm.first_name,
      last_name: recipientForm.last_name,
      phone_number: recipientForm.phone,
      address: recipientForm.city,
    };

    // console.log(recipientCreationData, "RDDDDD!!!");

    const reasonSel = reasons.value.find(
      (r) => {
        if(r?.reason === recipientForm.reason){
          return r;
        }
      }
    );

    const reason_id = reasonSel.id || null;

    if (reason_id !== null) {
      UtilsService.createRecipient(recipientCreationData)
        .then((response) => {
          const result = response.data;
          console.log(result, "recipient creation result");
          const paymentSummary = {
            result: {
              ...result,
              address: recipientCreationData.address,
            },
            reasonId:reason_id,
          };

          localStorage.setItem("progged", JSON.stringify(true));

          // TODO Add this to pinia store;
          localStorage.setItem("payS", JSON.stringify(paymentSummary));

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

const onCityBlur = async () => {
  isLoadingCity.value = true;

  setTimeout(() => {
    isLoadingCity.value = !true;
  }, 250);
};
onMounted(() => {
  city = document.querySelector("#city");
  const phone = document.querySelector("#phone");
  // TODO : customise intlTelInput to design
  intlTelInput(phone, {
    // any initialisation options go here
  });
  city.addEventListener("blur", onCityBlur);
});

onBeforeMount(async () => {
  await useAppStore().fetchReasons();
});
onUnmounted(() => {
  city.removeEventListener("blur", onCityBlur);
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
</style>
