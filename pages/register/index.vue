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
          v-model="signupForm.last_name"
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
        <VeeField
          type="text"
          v-model="signupForm.phone"
          name="phone"
          id="phone"
          placeholder="0704 259 9732"
        />
        <label for="phone" class="mb-2 text-ash-1">Phone Number</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="phone"
        />
      </div>

      <div class="item flex flex-col-reverse my-1 w-full">
        <template v-if="countries.length > 0">
          <div
            class="inset-0 flex items-center justify-center border-solid border-2 rounded-md border-ash-2 cursor-pointer text-primary"
            :class="{'!border-primary': selectedCountry && selectedCountry?.name}"
            @click="setSeeSelectTrue"
          >
            <div
              class="mx-auto flex gap-x-1 items-center cursor-pointer"
              v-if="selectedCountry && selectedCountry?.name"
            >
              <img
                v-if="selectedCountry && !!selectedCountry.flag"
                :src="selectedCountry?.flag"
                class="object-contain w-4 h-4"
              />
              <span>{{ selectedCountry?.name }}</span>
            </div>

            <span v-else class="text-ash-1 mx-auto">Select Country</span>
          </div>
          <TransitionRoot appear :show="seeSelect" as="template">
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
                      class=" max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-[50vw] h-[70vh] flex flex-col items-center"
                    >
                      <DialogTitle
                        as="h3"
                        class="text-lg text-center font-medium leading-6 text-secondary flex gap-x-2 items-center"
                      >
                        <img
                          v-if="selectedCountry && !!selectedCountry?.flag"
                          :src="selectedCountry?.flag"
                          class="object-contain w-4 h-4"
                        />
                        <span v-if="selectedCountry?.name">{{
                          selectedCountry?.name
                        }}</span>
                        <span v-else> Select Country</span>
                      </DialogTitle>
                      <div class="mt-2 overflow-y-scroll custom-scroll px-2">
                        <template v-if="countries.length > 0">
                          <div
                            class="options flex gap-x-2 items-center cursor-pointer hover:bg-ash-1 px-2 py-1 rounded-sm"
                            @click="handleSelectCountry(country)"
                            v-for="country in countries"
                            :class="{
                              '!bg-ash-1':
                                country &&
                                selectedCountry?.name ===
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
                          <div class="loader w-36 h-36"></div>
                        </template>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
        </template>
        <template v-else>
          <div class="loader w-36 h-36"></div>
        </template>
        <VeeField
          type="text"
          v-model="signupForm.country"
          name="country"
          id="country"
          hidden
        />
        <label for="country" class="mb-2 text-ash-1" :class="{'!text-primary': selectedCountry && selectedCountry?.name}">Country</label>
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
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";
import flags from "@/data/countries";
import AuthService from "@/services/auth.service";
import { useAppStore } from "@/store/app/index";

// const {
//   public: { TUMA_CLIENT_ID },
// } = useRuntimeConfig();

const { show, toggleShow } = useToggle();
const { show: seeSelect, toggleShow: toggleSelect, setShowTrue:setSeeSelectTrue,setShowFalse:setSeeSelectFalse } = useToggle();
//
// console.log(flags, "fgs");
const appStore = useAppStore();
const isLoading = ref(false);
const countries = computed(() => appStore.getCountriesFromStore);
const dial_code = ref("");
const selectedCountry = ref("");

const tac = ref(false);

const signupForm = reactive({
  client_uuid: import.meta.env.VITE_APP_TUMA_CLIENT_ID,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
  country: "",
});

const handleSelectCountry = (country) => {
  // console.log(country,'country');
  selectedCountry.value = country;
  signupForm.country = country.code;
  setSeeSelectFalse();
  // console.log(selectedCountry.value,'Sv');
};
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
  console.log(values, "reg values");

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
    // initialCountry: "auto",
    // any initialisation options go here
  });
});

onBeforeMount(async () => {
  useAppStore().fetchCountries();
});
watch(signupForm, () => {
  console.log(signupForm,'sF');
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
