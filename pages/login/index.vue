<template>
  <div class="login pt-4 bg-white flex flex-col ">
    <div
      class="logo bg-transparent max-w-md text-center relative left-[50%] -translate-x-[50%]"
    >
      <h1 class="logo-text text-secondary font-extrabold text-9xl">tuma</h1>
      <span
        class="logo-trademark text-primary bg-secondary rounded-full px-2 py-1 relative left-[25%] -translate-x-[50%]"
        >by Bisco Express</span
      >
    </div>

    <VeeForm
      class="flex flex-col gap-y-3 items-center mt-6 login__form w-[40%] self-center"
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
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
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
        <div class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer" @click="toggleShow">
          <icons-view-password v-if="show === true"/>
          <icons-close-password v-if="show === false"/>
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 max-w-md rounded-md bg-red-300 capitalize"
          name="password"
        />



      </div>

      <div class="flex items-center justify-between w-full"> 

        <div class='flex gap-x-1 items-center '>
          <icons-check class='cursor-pointer'  v-if='loginForm.remember === true'  @click="loginForm.remember = !loginForm.remember"/>
          <span
            v-else
            class="box w-[1.2rem] h-[1.2rem] mr-1 cursor-pointer"
            @click="loginForm.remember = !loginForm.remember"
          ></span>
          <span class='text-ash-1'>Remember me</span>
        </div> 


        
        <p class="text-ash-1 cursor-pointer " @click="navigateTo('/forgot-password')">Forgot  my password?</p>
      </div>

      <button-primary type='submit' :text="'login'" :disable='isLoading === true' />
    </VeeForm>



    <p class="text-ash-1 text-center">Not a member ? <span class="text-primary cursor-pointer" @click="navigateTo('/signup')"> Join now</span></p>
  </div>
</template>

<script setup>
import * as yup from "yup";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";


const { show, toggleShow } = useToggle();

const isLoading = ref(false);
const emailRef = ref(null);

const loginForm = reactive({
  email: "",
  password: "",
  remember:'',
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
  console.log(values);
};

useHead({
  title: "LOGIN",
});
definePageMeta({
  layout: false,
});

onMounted(() => {
  // if(!!emailRef.value){
  //   emailRef.value.focus();
  // }
});
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
