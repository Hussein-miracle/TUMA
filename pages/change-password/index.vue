<template>
  <div class="change-password flex flex-col items-center">
    <h2
      class="verification__main--title text-3xl font-bold text-secondary mb-4 mt-4"
    >
      Change Password
    </h2>
    <VeeForm
      class="flex flex-col gap-y-3 items-center mt-6 change-password__form sm:w-[60%] md:w-[40%] self-center"
      :validation-schema="changePasswordSchema"
      @submit="handleSubmit"
    >
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="changePasswordForm.previous_password"
          :type="s === true ? 'text' : 'password'"
          placeholder="Previous Password"
          id="previous_password"
          name="previous_password"
        />

        <label for="password" class="mb-2 text-ash-1">Previous Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleS"
        >
          <icons-view-password v-if="s === true" />
          <icons-close-password v-if="s === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="previous_password"
        />
      </div>
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="changePasswordForm.new_password"
          :type="show === true ? 'text' : 'password'"
          placeholder="New Password"
          id="new_password"
          name="new_password"
        />

        <label for="new_password" class="mb-2 text-ash-1">New Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleShow"
        >
          <icons-view-password v-if="show === true" />
          <icons-close-password v-if="show === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="new_password"
        />
      </div>
      <div class="item flex flex-col-reverse my-2 w-full relative">
        <VeeField
          v-model.lazy="changePasswordForm.confirm_password"
          :type="see === true ? 'text' : 'password'"
          placeholder="Confirm Password"
          id="confirm_password"
          name="confirm_password"
        />

        <label for="confirm_password" class="mb-2 text-ash-1">Confirm Password</label>
        <div
          class="absolute flex flex-col items-center justify-center bottom-[5%] right-1 cursor-pointer"
          @click="toggleSee"
        >
          <icons-view-password v-if="see === true" />
          <icons-close-password v-if="see === false" />
        </div>

        <VeeErrorMsg
          class="text-red-600 py-1 px-1 my-1 text-xs max-w-md rounded-md bg-red-300 capitalize"
          name="confirm_password"
        />
      </div>

      <button-primary
        type="submit"
        :text="'change password'"
        :disable="isLoading === true"
        class="rounded-3xl py-1 px-2 text-white"
        :class="{'opacity-70 cursor-not-allowed': isLoading === true }"
      />
    </VeeForm>
    
  </div>
</template>

<script setup>
import * as yup from "yup";
import validatePassword from "@/composables_/validatePassword";
import useToggle from "~/composables_/useToggle";



useHead({
  title:'Change Password'
})

const { show, toggleShow } = useToggle();
const { show:see, toggleShow:toggleSee } = useToggle();

const { show:s, toggleShow:toggleS } = useToggle();

const isLoading = ref(false);


const changePasswordForm = reactive({
  previous_password: "",
  new_password: "",
  comfirm_password: "",
});

const changePasswordSchema = yup.object().shape({
  previous_password: yup
    .string()
    .required("")
    .test(
      "isValid",
      "Password must contain at least one lowercase letter,one uppercase letter,one digit and a special character.",
      (value, context) => {
        return validatePassword(value);
      }
    ),
  confirm_password: yup
    .string()
    .required("")
    .test(
      "isValid",
      "Password must contain at least one lowercase letter,one uppercase letter,one digit and a special character.",
      (value, context) => {
        return validatePassword(value);
      }
    ),
  new_password: yup
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
