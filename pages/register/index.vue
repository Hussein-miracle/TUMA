<template>
  <div class="signup bg-white flex flex-col py-1">
    <h2 class="text-secondary font-bold text-center text-4xl">
      Join the revolution
    </h2>
    <VeeForm
      class="flex flex-col gap-y-3 items-center mt-4 signup__form w-[40%] self-center"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="signupForm.full_name"
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
          v-model="signupForm.email"
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

      <div class="item-select flex flex-col-reverse my-1 w-full">
        <div class="flex w-full bg-secondary">
          <vee-field
            as="select"
            name="country"
            id="country"
            placeholder="+234"
            class="w-[25%] p-1"
          >
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
            v-model="signupForm.phone_number"
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

      <div class="item flex flex-col-reverse my-1 w-full relative">
        <VeeField
          v-model.lazy="signupForm.password"
          :type="show === true ? 'text' : 'password'"
          placeholder="Password"
          id="password"
          name="password"
        />

        <label for="password" class="mb-2 text-ash-1">Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleShow"
        >
          <icons-view-password v-if="show === true" />
          <icons-close-password v-if="show === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 max-w-md rounded-md bg-red-300 capitalize"
          name="password"
        />
      </div>

      <div class="flex gap-x-1 items-center">
        <icons-check
          class="cursor-pointer"
          v-if="signupForm.tac === true"
          @click="signupForm.tac = !signupForm.tac"
        />
        <span
          v-else
          class="box w-[1.2rem] h-[1.2rem] mr-1 cursor-pointer"
          @click="signupForm.tac = !signupForm.tac"
        ></span>
        <span class="text-ash-1 text-[12px] max-w-xs"
          >I have read and agree to the Terms & Conditions and Privacy Policy
        </span>
      </div>

      <button-primary
        type="submit"
        :text="'Sign Up'"
        :disable="isLoading === true"
      />
    </VeeForm>

    <p class="text-ash-1 text-center">
      Not a member ?
      <span class="text-primary cursor-pointer" @click="navigateTo('/login')"
        >Sign in</span
      >
    </p>
  </div>
</template>

<script setup>
import * as yup from "yup";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";
import flags from "@/data/countries";

const { public:{ TUMA_CLIENT_ID} } = useRuntimeConfig();


const { show, toggleShow } = useToggle();
// 
// console.log(flags, "fgs");
const isLoading = ref(false);

const signupForm = reactive({
  full_name: "",
  email: "",
  password: "",
  phone_number: "",
  tac: false,
  client_uuid:TUMA_CLIENT_ID,
});

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please input a valid email address")
    .email("Please input a valid email address"),
  password: yup
    .string()
    .required("")
    .test(
      "isValid",
      "Password must contain at least one lowercase letter,one uppercase letter,one digit and a special character.",
      (value, context) => {
        return validatePassword(value);
      }
    ),
});

const handleSubmit = async (values) => {
  isLoading.value = true;
  console.log(values);
};

useHead({
  title: "Register",
});
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>


.signup {
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

.box {
  border: 1.5px solid #212746;
  border-radius: 2px;
}
</style>
