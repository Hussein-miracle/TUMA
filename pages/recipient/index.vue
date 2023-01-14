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
          <VeeField
            type="text"
            v-model="recipientForm.city"
            name="city"
            id="city"
            ref="cityRef"
            placeholder="City"
          />

          <label for="city" class="mb-2 text-ash-1">City</label>

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="city"
          />
        </div>

        <div class="item-select flex flex-col-reverse my-1 w-full">
          <div class="flex w-full bg-secondary">
            <VeeErrorMsg
              class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
              name="country"
            />
            <vee-field
              as="select"
              name="country"
              id="country"
              placeholder="+234"
              class="w-[30%] p-1"
              v-model="recipientForm.country"
            >
              <option
                v-for="country in flags"
                class="text-secondary"
                :value="country.code"
                :selected="country.code == 'NG'"
                :key="country.dial_code"
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

          <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="phone"
          />
        </div>

        <select
          class="rem_sel focus:outline-primary bg-whitelike rounded-sm px-1 py-1 m-2 sm:w-72 text-primary focus:text-secondary"
          v-model="reasonForRemittance"
        >
          <option value="" disabled>Select Reason for Remittance</option>

          <option class="option" :value="item.reason" v-for="item in reasons" :key="item.reason">{{item.reason}}</option>

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

            <div class="text-ash-3 cursor-pointer hover:text-ash-2 transition-all duration-75" @click="toggleModal" >
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
import { storeToRefs } from "pinia";
import flags from "@/data/countries";
import { useAppStore } from "@/store/app/index";
import { geocodeResponseToCityState } from "@/utils/index";



const isLoading = ref(false);
const isLoadingCity = ref(false);
const cityRef = ref(null);
const isOpen = ref(false);
const store = useAppStore();
const reasonForRemittance = ref('');

const { getMethod: remittanceMethod  , reasons } = storeToRefs(store);

// console.log(state , 'state');

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
});

const recipientSchema = yup.object().shape({
  country: yup.string().required("Country is required!"),
  first_name: yup.string().required("First name is required!"),
  last_name: yup.string().required("Last name is required!"),
  phone: yup.string().required("Phone is required!"),
  city: yup.string().required(""),
});

let city;
const handleSubmit = async (values) => {
  console.log(values);

  // navigateTo('/upload');
};

const onCityBlur = async () => {
  const api_key = "AIzaSyCiC_PwVKq0LjEIKD3blen35rwOEWe-U34";

  if (recipientForm.city.length) {
    //make a request to the google geocode api with the zipcode as the address parameter and your api key
    isLoadingCity.value = true;
    fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?address=${recipientForm.city}&key=${api_key}`
    )
      .then(async (response) => {
        // isLoadingCity.value = !true;
        const data = await response.json();
        console.log(data, "city fetch res");
        setTimeout(() => {
          isLoadingCity.value = false;
        }, 500);
        //parse the response for a list of matching city/state
        // const possibleLocalities = geocodeResponseToCityState(response);
        // fillCityAndStateFields(possibleLocalities);
      })
      .catch((err) => {
        console.log(err, "error fetching city");
      });
  }
};

function fillCityAndStateFields(localities) {
  var locality = localities[0];

  //use the first city/state object

  recipientForm.city = `${locality.city} ${locality.state}`;
}

onMounted( () => {
  city = document.querySelector("#city");
  city.addEventListener("blur", onCityBlur);
});

onBeforeMount( async () => {
  useAppStore().fetchReasons();

})
onUnmounted(() => {
  city.removeEventListener("blur", onCityBlur);
});
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
