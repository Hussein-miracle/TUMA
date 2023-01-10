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
        />

        <label for="full_name" class="mb-2 text-ash-1">City</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="city"
        />
      </div>



      <div class="item-select flex flex-col-reverse my-1 w-full">
        <div class="flex w-full bg-secondary">
          <vee-field
            as="select"
            name="country"
            id="country"
            placeholder="+234"
            class="w-[25%] p-1"
          >
          <option value='' disabled>Dial Code</option>
            <option
              v-for="country in flags"
              class="text-secondary"
              :value="country.name"
              :selected="country.code == 'NG'"
              :key="country.dial_code"
            >
              {{ ` ${country.flag} ${country.dial_code}` }}
            </option>
          </vee-field>

          <VeeField
            class="w-[75%]"
            type="text"
            v-model="editForm.phone_number"
            name="phone_number"
            id="phone_number"
            placeholder="814 359 9948"
          />
        </div>

        <label for="phone_number" class="mb-2 text-ash-1">Phone Number</label>

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
import useToggle from "~/composables_/useToggle";
import flags from "@/data/countries";

const { show, toggleShow } = useToggle();

const isLoading = ref(false);




const editForm = reactive({
  full_name: "",
  email: "",
  city:'',
  phone_number:'',
  // client_uuid:TUMA_CLIENT_ID,
});

const handleSubmit = async () => {

}

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
