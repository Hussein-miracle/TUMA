<template>
  <div class="edit-profile bg-white flex flex-col py-1">
    <h2 class="text-secondary text-center font-bold">Edit Account</h2>
    <VeeForm
      class="flex flex-col edit-profile__form gap-y-3 items-center mt-4 signup__form w-[85%] sm:w-[45%] self-center"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.first_name"
          name="first_name"
          id="first_name"
          placeholder="First Name"
        />
        <label for="first_name" class="mb-1 text-ash-1">First Name</label>
        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="first_name"
        />
      </div>
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.last_name"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
        />
        <label for="last_name" class="mb-1 text-ash-1">Last Name</label>
        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="last_name"
        />
      </div>
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.city"
          name="city"
          id="city"
          placeholder="City"
          readonly="true"
          hidden
        />
        <GMapAutocomplete
          @place_changed="setPlace"
          type="text"
          v-model="editForm.city"
          name="address"
          id="address"
          @input="handleCityInput"
          @click="handleCityInputClick"
          ref="addressRef"
          placeholder="Type and Select City from the Dropdown"
          :options="{
            types: ['(cities)'],
            libraries: 'places',
            componentRestrictions: {
              country: flags
                .find((item) => item.name === userCountry)
                .code.toLowerCase(),
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

      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.address"
          name="address"
          id="address"
          placeholder="Address"
          readonly="true"
          class="cursor-not-allowed"
        />

        <label for="address" class="mb-1 text-ash-1 cursor-not-allowed"
          >Address</label
        >

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="address"
        />
      </div>

      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.country"
          name="country"
          id="country"
          placeholder="Country"
          readonly="true"
          class="cursor-not-allowed"
        />

        <label for="country" class="mb-1 text-ash-1 cursor-not-allowed"
          >Country</label
        >

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="country"
        />
      </div>

      <div class="item-select flex flex-col-reverse my-1 w-full">
        <VeeField
          class="w-[75%]"
          type="text"
          v-model="editForm.phone_number"
          name="phone_number"
          id="phone_number"
          placeholder="814 359 9948"
          hidden
        />

        <vue-tel-input
          type="text"
          v-model="editForm.phone_number"
          name="phone_number2"
          id="phone_number2"
          :disabled="true"
          defaultCountry="US"
          mode="international"
          placeholder="'Phone Number'"
          class="pl-10 w-full"
          @focus="focusedPhone = true"
          @blur="focusedPhone = false"
        ></vue-tel-input>

        <label
          for="phone_number"
          class="mb-2 text-ash-1"
          :class="{
            '!text-primary': focusedPhone === true,
            '!text-ash-1': focusedPhone === false,
          }"
          >Phone Number</label
        >
        <!-- </div> -->

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="phone_number"
        />
      </div>

      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.email"
          name="email"
          id="email"
          placeholder="Email"
          readonly="true"
          class="cursor-not-allowed"
        />

        <label for="email" class="mb-2 text-ash-1 cursor-not-allowed"
          >Email</label
        >

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="email"
        />
      </div>

      <button-primary
        type="submit"
        :text="'Save'"
        :disabled="isLoading === true"
        :showLoader="isLoading === true"
        :class="{ 'opacity-75 cursor-not-allowed': isLoading === true }"
      />
    </VeeForm>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

import UtilsService from "@/services/utils.service";
import useToggle from "~/composables_/useToggle";
import { useAppStore } from "@/store/app/index";
import { useUserStore } from "@/store/auth/index";
import flags from "@/data/countries";
import userCountry from "@/data/timezone";

// console.log(userCountry,'uCountry')

const { show, toggleShow } = useToggle();

const addressRef = ref(null);
const isLoading = ref(false);
const isLoadingCity = ref(false);
const authstore = useUserStore();
const store = useAppStore();
const { user } = storeToRefs(authstore);
// console.log(user,'user');
const { getRestriction: restrict } = storeToRefs(store);

const focusedPhone = ref(false);
const editForm = reactive({
  first_name: "",
  last_name: "",
  city: "",
  phone_number: "",
  email: "",
  address: "",
  country: "",
});

const fetchProfile = async () => {
  isLoading.value = true;
  UtilsService.getProfile()
    .then((response) => {
      console.log(response, "ressponse profiel");
      const details = response;
      for (const item in details) {
        if (item in editForm) {
          editForm[item] = response[item];
        } else {
          if (item === "phone") {
            if (!response[item].startsWith("+")) {
              editForm.phone_number = `+${response[item]}`;
            } else {
              editForm.phone_number = `${response[item]}`;
            }
          } else if (item === "sname") {
            editForm.last_name = response[item];
          } else if (item === "fname") {
            editForm.first_name = response[item];
          } else if (item === "address") {
            // editForm.city = response[item];
          }
        }
      }
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err, "err");
      isLoading.value = false;
    });
};

const handleSubmit = async (values) => {
  isLoading.value = true;
  const data = {
    last_name: values.last_name,
    first_name: values.first_name,
  };

  // console.log(data,'ddddata');
  UtilsService.postProfile(data)
    .then((user) => {
      // console.log(user,'ress');
      useUserStore().setUser(user);

      // navigateTo("/send-money");

      window.location.reload();

      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err, "error updating");
    });
};

let address;
const handleCityInput = async (e) => {
  // console.log(e,'cityInput');
  isLoadingCity.value = true;
  setTimeout(() => {
    isLoadingCity.value = !true;
    // if (recipientForm.address === "") {
    //   // ref(cityRef).value.$el.value.clear();
    //   ref(addressRef).value.$el.value = "";
    // }
  }, 500);
  const value = e.target.value;

  editForm.city = value;
};

const handleCityInputClick = async (e) => {
  // console.log(e, "clci");
  // ref(cityRef).value.$el.value
};

const setPlace = (e) => {
  const add = e.formatted_address;
  editForm.city = add;
};

const onAddressBlur = async () => {
  isLoadingCity.value = true;

  setTimeout(() => {
    isLoadingCity.value = !true;
  }, 250);
};

onMounted(() => {});

onBeforeMount(async () => {
  await fetchProfile();
});
onUnmounted(() => {
  // address.removeEventListener("blur", onAddressBlur);
});

useHead({
  title: "Edit Account",
});

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
.edit-profile {
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
</style>
