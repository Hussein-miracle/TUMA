<template>
  <div class="login pt-4 bg-white flex flex-col">
    <div
      class="logo bg-transparent max-w-md text-center relative sm:left-[50%] sm:-translate-x-[50%]"
    >
      <h1 class="logo-text text-secondary font-extrabold text-6xl sm:text-9xl">
        tuma
      </h1>
      <span
        class="logo-trademark text-primary bg-secondary rounded-full px-2 py-1 relative sm:left-[25%] sm:-translate-x-[50%] text-sm sm:text-md left-[15%]"
        >by Bisco Express</span
      >
    </div>

    <VeeForm
      class="flex flex-col gap-y-3 items-center mt-6 login__form w-[85%] sm:w-[60%] md:w-[40%] self-center"
      :validation-schema="loginSchema"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-2 w-full">
        <VeeField
          type="text"
          v-model="loginForm.email"
          name="email"
          id="email"
          ref="emailRef"
          placeholder="Email address"
        />

        <label for="email" class="mb-2 text-ash-1">Email</label>

        <VeeErrorMsg
          class="text-red-600 text-xs py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="email"
        />
      </div>
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="loginForm.password"
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
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="password"
        />
      </div>

      <div class="flex items-center justify-between w-full text-xs sm:text-sm">
        <div class="flex gap-x-1 items-center">
          <icons-check
            class="cursor-pointer"
            v-if="form.remember === true"
            @click="form.remember = !form.remember"
          />
          <span
            v-else
            class="box sm:w-[1.2rem] sm:h-[1.2rem] w-[1rem] h-[1rem] mr-1 cursor-pointer"
            @click="form.remember = !form.remember"
          ></span>
          <span
            class="text-ash-1 cursor-pointer hover:text-primary duration-100 transition-colors"
            @click="form.remember = !form.remember"
            >Remember me</span
          >
        </div>

        <p
          class="text-ash-1 cursor-pointer hover:text-primary duration-100 transition-colors"
          @click="navigateTo('/forgot-password')"
        >
          Forgot password?
        </p>
      </div>

      <button-primary
        type="submit"
        :text="'login'"
        :disabled="isLoading === true"
        :showLoader='isLoading === true'
        :class="{ 'opacity-80 cursor-not-allowed': isLoading === true }"
      />
    </VeeForm>

    <p class="text-ash-1 text-center">
      Not a member ?
      <span
        class="text-primary cursor-pointer"
        @click="navigateTo('/register')"
      >
        Join now</span
      >
    </p>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import { useUserStore } from "@/store/auth/index";
import { useAppStore } from "@/store/app/index";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";

const { login } = useUserStore();
const { fetchDefault } = useAppStore();
const { show, toggleShow } = useToggle();

const isLoading = ref(false);
const emailRef = ref(null);

const loginForm = reactive({
  email: "",
  password: "",
});

const form = reactive({
  remember: false,
});

const loginSchema = yup.object().shape({
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
  try {
    login(loginForm)
      .then((result) => {
        if (form.remember === true) {
          localStorage.setItem("rememberMe", true);
        }
        // console.log(result,'res');
        return useAppStore().fetchCountries();
      })
      .then((result) => {
        // console.log(result,'res');
        return useAppStore().fetchDefault();
      })
      .then((currs) => {
        // console.log(currs,'currs');
        isLoading.value = false;
        navigateTo("/send-money");
      })
      .catch((err) => {
        // console.log(err,'err login err')
        isLoading.value = false;

        const errResponse = err?.response;
        if (errResponse.status === 400) {
          createToast(`Invalid Email or Password.`, {
            showIcon: true,
            type: "warning",
            transition: "bounce",
            position: "top-right",
          });
        }
      });
  } catch (err) {
    isLoading.value = !true;
    console.error(err);
  }
};

useHead({
  title: "LOGIN",
});
definePageMeta({
  layout: false,
});

onMounted(() => {
  // ref(emailRef).value.focus();
});
onBeforeMount(() => {
  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  form.remember = rememberMe;
});



watch(form,() => {
  localStorage.setItem('rememberMe',form.remember);
})
</script>

<style lang="scss" scoped>
.login {
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
