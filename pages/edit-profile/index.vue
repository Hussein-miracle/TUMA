<template>
  <div class="edit-profile bg-white flex flex-col py-1 ">

    <h2 class='text-secondary text-center font-bold'>Edit Account</h2>
    <VeeForm
      class="flex flex-col edit-profile__form gap-y-3 items-center mt-4 signup__form w-[40%] self-center"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.full_name"
          name="full_name"
          id="full_name"
          placeholder="Full Name"
        />

        <label for="full_name" class="mb-2 text-ash-1">Full Name</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="full_name"
        />
      </div>
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="editForm.city"
          name="city"
          id="city"
          placeholder="City"
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
              },
            }"
          >
                <!-- country: restrict.country_code.code.toLowerCase(), -->
          </GMapAutocomplete>
        <label for="city" class="mb-2 text-ash-1">City</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="city"
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
        />

        <label for="email" class="mb-2 text-ash-1">Email</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="email"
        />
      </div>

      <button-primary
        type="submit"
        :text="'Save'"
        :disable="isLoading === true"
      />
    </VeeForm>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";


import useToggle from "~/composables_/useToggle";
import { useAppStore } from "@/store/app/index";
// import flags from "@/data/countries";
const { show, toggleShow } = useToggle();


const addressRef= ref(null);
const isLoading = ref(false);
const isLoadingCity = ref(false);
const store = useAppStore();
const { getRestriction: restrict } = storeToRefs(store);


const focusedPhone = ref(false);
const editForm = reactive({
  full_name: "",
  email: "",
  city:'',
  phone_number:'',
  // client_uuid:TUMA_CLIENT_ID,
});

const handleSubmit = async (values) => {

}

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


onMounted(() => {
  //  address  = document.querySelector("#adress");
  // console.log(add,'a')
  // address.addEventListener("blur", onAddressBlur);
});
onUnmounted(() => {
  // address.removeEventListener("blur", onAddressBlur);
});
useHead({
  title: "Edit Account",
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
