<template>
  <div class="signup bg-white flex flex-col py-1">
    <h2 class="text-secondary font-bold text-center text-4xl">
      Join the revolution
    </h2>
    <VeeForm
      class="flex flex-col gap-y-3 items-center mt-4 signup__form w-[85%] sm:w-[50%] self-center"
      :validation-schema="signupSchema"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="signupForm.first_name"
          name="first_name"
          id="first_name"
          placeholder="First Name"
        />

        <label for="first_name" class="mb-2 text-ash-1">First Name</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="first_name"
        />
      </div>
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="signupForm.full_name"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
        />

        <label for="last_name" class="mb-2 text-ash-1">Last Name</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="last_name"
        />
      </div>
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="signupForm.client_uuid"
          name="client_uuid"
          id="client_uuid"
          hidden
        />
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

      <div class="item flex flex-col-reverse my-1 w-full">
        <!-- <div class="flex w-full "> -->
        <!-- <VeeErrorMsg
            class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="country"
          />
          <vee-field
            as="select"
            name="country"
            id="country"
            placeholder="+234"
            class="w-[30%] p-1"
            v-model="signupForm.country"
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
          </vee-field> -->

        <VeeField
          type="text"
          v-model="signupForm.phone"
          name="phone"
          id="phone"
          placeholder="0704 259 9732"
        />

        <label for="phone" class="mb-2 text-ash-1">Phone Number</label>
        <!-- </div> -->


        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="phone"
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
      <div class="item flex flex-col-reverse my-1 w-full relative">
        <VeeField
          v-model.lazy="signupForm.password_confirmation"
          :type="show === true ? 'text' : 'password'"
          placeholder="Password Confirm"
          id="password_confirmation"
          name="password_confirmation"
        />

        <label for="password_confirmation" class="mb-2 text-ash-1"
          >Password Confirmation</label
        >
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleShow"
        >
          <icons-view-password v-if="show === true" />
          <icons-close-password v-if="show === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 max-w-md rounded-md bg-red-300 capitalize"
          name="password_confirmation"
        />
      </div>

      <div class="flex gap-x-1 items-center">
        <icons-check
          class="cursor-pointer"
          v-if="tac === true"
          @click="tac = !tac"
        />
        <span
          v-else
          class="box w-[1.2rem] h-[1.2rem] mr-1 cursor-pointer"
          @click="tac = !tac"
        ></span>
        <span class="text-ash-1 text-[12px] max-w-xs"
          >I have read and agree to the
          <a href="https://www.dagdag.co/terms" class="text-blue-500">
            Terms & Conditions</a
          >
          and
          <a href="https://www.dagdag.co/privacy" class="text-blue-500">
            Privacy Policy</a
          >
        </span>
      </div>

      <button-primary
        :type="'submit'"
        :text="'Sign Up'"
        :disabled="isLoading === true || tac === false"
        :class="{ 'opacity-60': tac === false || isLoading === true }"
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
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";
import flags from "@/data/countries";
import AuthService from "@/services/auth.service";
import { useAppStore } from "@/store/app/index";

const {
  public: { TUMA_CLIENT_ID },
} = useRuntimeConfig();

const { show, toggleShow } = useToggle();
//
// console.log(flags, "fgs");
const isLoading = ref(false);

const dial_code = ref("");

const tac = ref(false);

const signupForm = reactive({
  client_uuid: TUMA_CLIENT_ID,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
  country: "",
});

const signupSchema = yup.object().shape({
  client_uuid: yup.string().required(),
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
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .test(
      "isValid",
      "Password must contain at least one lowercase letter,one uppercase letter,one digit and a special character.",
      (value, context) => {
        return validatePassword(value);
      }
    ),
  country: yup.string().required("Country is required!"),
  first_name: yup.string().required("First name is required!"),
  last_name: yup.string().required("Last name is required!"),
  phone: yup.string().required("Phone is required!"),
});

const handleSubmit = async (values) => {
  isLoading.value = true;
  // console.log(values);

  try {
    AuthService.register(values)
      .then((result) => {
        // console.log(result,'res reg');
        const data = result.data.data;
        // console.log(data,'after reg');
        const user = data.user;
        console.log(user, "user after reg");
        useAppStore().setAppUser(user);
        isLoading.value = false;
        navigateTo("register/verification");
      })
      .catch((err) => {
        isLoading.value = false;
        console.log(err, "err");
      });
  } catch (err) {
    isLoading.value = false;
  }
};

useHead({
  title: "Register",
});
definePageMeta({
  layout: false,
});

onMounted(() => {
  const phone = document.querySelector("#phone");
  // TODO : customise intlTelInput to design
  intlTelInput(phone, {
    initialCountry: "auto",
    // any initialisation options go here
  });
});

// watch(signupForm, () => {
//   console.log(signupForm,'sF');
// });
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
