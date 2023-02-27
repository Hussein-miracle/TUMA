<template>
  <div class="flex flex-col items-center">
    <h2
      class="verification__main--title text-4xl font-bold text-secondary mb-4 mt-4"
    >
      OTP Verification
    </h2>

    <p class="mx-6 sm:mx-auto text-ash-1">
      Enter <span class="font-bold"> OTP </span> sent to

     your phone number  <span class="font-light text-md text-secondary">+{{ user.phone }} </span>
    </p>

    <VeeForm class="flex flex-col self-center my-4" @submit="handleSubmit">
      <div class="flex gap-x-2 verification__main--inputs">
        <input
          type="text"
          name=""
          id="1"
          v-model="otpInputs.digit1"
          ref="firstDigitRef"
          maxlength="1"
          minlength="1"
          required
        />
        <input
          type="text"
          name=""
          id="2"
          v-model="otpInputs.digit2"
          ref="secondDigitRef"
          maxlength="1"
          minlength="1"
          required
        />
        <input
          type="text"
          name=""
          id="3"
          v-model="otpInputs.digit3"
          ref="thirdDigitRef"
          maxlength="1"
          minlength="1"
          required
        />
        <input
          type="text"
          name=""
          id="4"
          v-model="otpInputs.digit4"
          ref="fourthDigitRef"
          maxlength="1"
          minlength="1"
          required
        />
        <input
          type="text"
          name=""
          id="5"
          v-model="otpInputs.digit5"
          ref="fifthDigitRef"
          maxlength="1"
          minlength="1"
          required
        />
        <input
          type="text"
          name=""
          id="6"
          v-model="otpInputs.digit6"
          ref="sixthDigitRef"
          maxlength="1"
          minlength="1"
          required
        />
      </div>

      <div class="self-center mt-2 text-center">
        <button-primary
          :text="'Verify'"
          :showIcon="false"
          :type="'submit'"
          :disabled="verifying"
          :class="{ 'opacity-80 cursor-not-allowed': verifying === true }"
        />

        <p class="font-bold mt-4 text-secondary cursor-pointer">
          Didn't receive the OTP ?
        </p>
        <p
          class="mb-4 cursor-pointer text-primary text-center"
          @click="clearInputs"
        >
          Resend it
        </p>
      </div>
    </VeeForm>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";
import AuthService from "~/services/auth.service";
import { useUserStore } from "@/store/auth/index";
import { useAppStore } from "@/store/app/index";
import { storeToRefs } from "pinia";

const appState = useAppStore();

const { getUser: user } = storeToRefs(appState);

// console.log(user.value, "gU");

const verifying = ref(false);

const code = ref("");
const firstDigitRef = ref(null);
const secondDigitRef = ref(null);
const thirdDigitRef = ref(null);
const fourthDigitRef = ref(null);
const fifthDigitRef = ref(null);
const sixthDigitRef = ref(null);

// const user = storeToRefs()

useHead({
  title: "Verification",
});

definePageMeta({
  layout: false,
});

const otpInputs = reactive({
  digit1: null,
  digit2: null,
  digit3: null,
  digit4: null,
  digit5: null,
  digit6: null,
});

const checkPasteData = (string) => {
  let count = 0;
  const otp = string.trim().toString().split("");

  if (otp.length === 6) {
    // console.log(otp,'otp');
    for (const item in otpInputs) {
      otpInputs[item] = otp[count];
      count++;
    }
  }
};
const handlePaste = async (e) => {
  // const clipText = await navigator.clipboard.readText();
  // console.log(clipText,'clipText');
  // alert(clipText);
  e.stopPropagation();
  e.preventDefault();
  // Get pasted data via clipboard API
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = clipboardData.getData("Text");
  // Do whatever with pasted data
  checkPasteData(pastedData);
};

const handleSubmit = async () => {
  const data = {
    verification_code: code.value,
    email: user.value.email,
  };

  // console.log(data, "code data");
  verifying.value = true;
  try {
    if (code.value.length === 6) {
      useUserStore()
        .verifyOtp(data)
        .then((res) => {
          // console.log(res, "data after verfity");
          const msg = res.message;
          createToast(`${msg}⚡⚡`, {
            type: "success",
            showIcon: true,
            position: "top-center",
          });
          verifying.value = !true;
          navigateTo("/login");
        })
        .catch((err) => {
          const msg = err?.response?.data.message;
          createToast(`${msg}`, {
            showIcon: true,
            type: "warning",
            transition: "bounce",
            // position:'top-center'
          });
          verifying.value = !true;
        });
    }
  } catch (err) {
    const msg = err?.response?.data.message;
    createToast(`${msg}`, {
      showIcon: true,
      type: "warning",
      transition: "bounce",
      // position:'top-center'
    });
    verifying.value = !true;
    // console.error(err);
  }
};

const initVerify = async () => {
  for (const item in otpInputs) {
    const value = otpInputs[item];
    code.value += value;
  }
};

const clearInputs = () => {
  for (const item in otpInputs) {
    otpInputs[item] = null;
  }
  verifying.value = false;
};

onBeforeMount(() => {});

onMounted(() => {
  firstDigitRef.value.focus();
  window.addEventListener("paste", handlePaste);
});

onBeforeUnmount(() => {
  window.removeEventListener("paste", handlePaste);
});

watch(otpInputs, async (update, stale) => {
  if (!!otpInputs.digit1) {
    secondDigitRef.value.focus();
  }
  if (!!otpInputs.digit2) {
    thirdDigitRef.value.focus();
  }
  if (!!otpInputs.digit3) {
    fourthDigitRef.value.focus();
  }
  if (!!otpInputs.digit4) {
    fifthDigitRef.value.focus();
  }
  if (!!otpInputs.digit5) {
    sixthDigitRef.value.focus();
  }
  if (!!otpInputs.digit6) {
    initVerify();
  }
});
</script>

<style lang="scss" scoped>
.verification {
  // @apply text-center;
  &__main--inputs {
    input {
      @apply bg-primary w-16 h-16 flex items-center justify-center p-6;

      border-radius: 50%;
    }
  }
}
</style>
