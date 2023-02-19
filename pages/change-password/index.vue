<template>
  <div class="change-password flex flex-col items-center">
    <h2
      class="verification__main--title text-xl sm:text-3xl font-bold text-secondary mb-4 mt-4"
    >
      Change Password
    </h2>
    <VeeForm
      class="flex flex-col gap-y-2 sm:gap-y-3 items-center mt-3 sm:mt-6 change-password__form w-[80%] sm:w-[60%] md:w-[40%] self-center"
      :validation-schema="changePasswordSchema"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="changePasswordForm.old_password"
          :type="show === true ? 'text' : 'password'"
          placeholder="Previous Password"
          id="old_password"
          name="old_password"
        />

        <label for="password" class="mb-2 text-ash-1">Previous Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleShow"
        >
          <icons-view-password v-if="show === true" />
          <icons-close-password v-if="show === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="old_password"
        />
      </div>
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="changePasswordForm.password"
          :type="see === true ? 'text' : 'password'"
          placeholder="New Password"
          id="password"
          name="password"
        />

        <label for="password" class="mb-2 text-ash-1">New Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleSee"
        >
          <icons-view-password v-if="see === true" />
          <icons-close-password v-if="see === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="password"
        />
      </div>
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="changePasswordForm.password_confirmation"
          :type="see === true ? 'text' : 'password'"
          placeholder="Confirm Password"
          id="password_confirmation"
          name="password_confirmation"
        />

        <label for="password_confirmation" class="mb-2 text-ash-1"
          >Confirm Password</label
        >
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleSee"
        >
          <icons-view-password v-if="see === true" />
          <icons-close-password v-if="see === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="password_confirmation"
        />
      </div>

      <button-primary
        type="submit"
        :text="'change password'"
        :disable="isLoading === true"
        class="rounded-3xl px-1 py-0.5 sm:py-1 sm:px-2 text-white"
        :class="{ 'opacity-70 cursor-not-allowed': isLoading === true }"
      />
    </VeeForm>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";
import AuthService from "@/services/auth.service";

useHead({
  title: "Change Password",
});

definePageMeta({
  layout: "default",
  middleware:['auth']
});

const { show, toggleShow } = useToggle();
const { show: see, toggleShow: toggleSee } = useToggle();

const isLoading = ref(false);

const changePasswordForm = reactive({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const changePasswordSchema = yup.object().shape({
  old_password: yup
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
    .required("")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .test(
      "isValid",
      "Password must contain at least one lowercase letter,one uppercase letter,one digit and a special character.",
      (value, context) => {
        return validatePassword(value);
      }
    ),
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
  // console.log(values);
  AuthService.changePassword(values)
    .then((response) => {
      isLoading.value = false;
      createToast(`Password changed successfully`, {
        showIcon: true,
        type: "success",
        transition: "bounce",
        // position:'top-center'
      });
      navigateTo("/login");
    })
    .catch((err) => {
      isLoading.value = false;
      const msg = err?.response?.data?.message;
      createToast(`${msg}`, {
        showIcon: true,
        type: "warning",
        transition: "bounce",
        // position:'top-center'
      });
      // console.log(err,'err');
    });
};
</script>

<style lang="scss" scoped>
.change-password {
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
