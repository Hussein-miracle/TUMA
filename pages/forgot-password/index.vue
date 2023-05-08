<template>
  <div class="forgot-password flex flex-col items-center">
    <h2 class="text-secondary mt-2.5 text-lg sm:text-2xl font-bold mx-auto">
      Forgot password
    </h2>

    <VeeForm
      class="flex flex-col edit-profile__form gap-y-3 items-center mt-10 signup__form w-[85%] sm:w-[45%] self-center"
      @submit="handleSubmit"
      :validation-schema='forgotPasswordSchema'
    >
      <div class="item flex flex-col-reverse my-1 w-full">
        <VeeField
          type="text"
          v-model="form.email"
          name="email"
          id="email"
          placeholder="Input the account email here"
        />

        <label for="email" class="mb-2 text-ash-1">Email</label>

        <VeeErrorMsg
          class="text-red-600 py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
          name="email"
        />
      </div>

      <button-primary
        type="submit"
        :text="'Submit'"
        :disabled="isLoading === true"
        :class="{ 'opacity-75 cursor-not-allowed': isLoading === true }"
      />
    </VeeForm>
  </div>
</template>

<script setup>
import * as yup from "yup";
import AuthService from "@/services/auth.service";

useHead({
  title: "Forgot Password",
});

definePageMeta({
  layout: false,
});

const isLoading = ref(false);

const form = reactive({
  email: "",
});

const toast = useNuxtApp().$toast;

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please input a valid email address")
    .email("Please input a valid email address"),
});

const handleSubmit = async (values) => {

  isLoading.value = true;
  AuthService.forgotPassword(values).then((response) => {
    // console.log(response,'rr')
    navigateTo('register/verification')
    isLoading.value = false;
  }).catch((err) => {
    isLoading.value = false;
    // console.log(err,'errr');/
    toast.error('Error resetting password...please try again.')
  })
};
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
