<template>
  <div class="recipient flex flex-col items-center">
    <h2 class="text-secondary text-3xl my-2">Recipient</h2>

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
            ref="cityRef"
            placeholder="Type and Select City from Google Dropdown List"
            :options="{
              types: ['(cities)'],
              componentRestrictions: {
                country: restrict.country_code.code.toLowerCase(),
              },
            }"
          >
          </GMapAutocomplete>

          <label for="city" class="mb-2 text-ash-1">City</label>

          <!-- <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="city"
          /> -->
        </div>

        <div class="item-select flex flex-col-reverse my-1 w-full">
          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="country"
          />

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="phone"
          />

          <div class="flex w-full bg-secondary">
            <vee-field
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
            </vee-field>

            <VeeField
              class="w-[70%]"
              type="text"
              v-model="recipientForm.phone"
              name="phone"
              id="phone"
              placeholder="0704 259 9732"
            />
          </div>

          <label for="phone_number" class="mb-2 text-ash-1">Phone Number</label>
        </div>

        <!-- <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="reason"
          /> -->
        <select
          class="rem_sel focus:outline-primary bg-whitelike rounded-sm px-1 py-1 m-2 sm:w-72 text-primary focus:text-secondary"
          v-model="recipientForm.reason"
          id="reason"
          name="reason"
        >
          <option value="" disabled>Select Reason for Remittance</option>

          <option
            class="option"
            :value="item.reason"
            v-for="item in reasons"
            :key="item.id"
          >
            {{ item.reason }}
          </option>
        </select>

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
import flags from "@/data/countries";
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";

const isLoading = ref(false);
const isLoadingCity = ref(false);
const cityRef = ref(null);
const isOpen = ref(false);
const reasonForRemittance = ref("");

const store = useAppStore();

const { getRestriction: restrict } = storeToRefs(store);

// console.log(restrict,'restrict');
definePageMeta({
  layout: false,
  middleware: ["auth"],
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

const setPlace = (e) => {
  const address = e.formatted_address;
  recipientForm.city = address;
};

const recipientSchema = yup.object().shape({
  country: yup.string().required("Country is required!"),
  first_name: yup.string().required("First name is required!"),
  last_name: yup.string().required("Last name is required!"),
  phone: yup.string().required("Phone is required!"),
  // city: yup.string().required("City is Required"),
  // reason: yup.string().required("Reason is required"),
});

let city;

const handleSubmit = async (values) => {
  // console.log(values, "v");

  isLoading.value = true;

  const recipientCreationData = {
    first_name: recipientForm.first_name,
    last_name: recipientForm.last_name,
    phone_number: recipientForm.phone,
    address: recipientForm.city,
  };

  console.log(recipientCreationData, "RDDDDD!!!");

  const reason_id = reasons.value.find(
    (r) => r.reason === recipientForm.reason
  ).id;

  UtilsService.createRecipient(recipientCreationData)
    .then((response) => {
      const result = response.data;
      console.log(result, "recipient Daata");
      return result;
    })
    .then((res) => {
      const {
        recipientCurrencyDetails,
        senderCurrencyDetails,
        conversionData,
      } = useAppStore();
      // console.log(conversionData, "convData");
      const transactionData = {
        from_currency: senderCurrencyDetails.sender_currency,
        amount: conversionData.amount,
        to_currency: recipientCurrencyDetails.recipient_currency,
        // to_user: res.ruid,
        reason_id,
      };

      console.log(transactionData, "creating Trans");

      // UtilsService.createTransaction(transactionData)
      //   .then((result) => {
      //     isLoading.value = false;
      // navigateTo("/upload");
      // })
      //   .catch((err) => {
      //     isLoading.value = false;
      //     console.log(err, "err");
      //   });
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err, "err");
    });
};
const onCityBlur = async () => {
  isLoadingCity.value = true;

  setTimeout(() => {
    isLoadingCity.value = !true;
  }, 250);
};
onMounted(() => {
  city = document.querySelector("#city");
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
    console.log(recipientForm, "form recipient");
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
</style>
