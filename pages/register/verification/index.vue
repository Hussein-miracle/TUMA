<template>
  <div class="flex flex-col items-center">
    <h2
      class="verification__main--title text-lg  sm:text-4xl font-bold text-secondary sm:mb-4 sm:mt-4"
    >
      OTP Verification
    </h2>

    <!-- <p class="mx-6 sm:mx-auto text-ash-1">
      Enter <span class="font-bold"> OTP </span> sent to your email
      <span class="font-light text-md text-secondary" v-if="user.email"
        >{{ user.email }}
      </span>
    </p>
     -->
  <p class="mx-auto text-ash-1 px-3 sm:text-base text-sm self-center max-w-md" v-show="get_verify_email === false">
    The OTP code <span> has been </span>

    <!-- <span v-else>will be</span> -->
    sent to <span v-if="user.email">this</span
    ><span v-else>your</span> email address
    <span class="font-bold  text-md text-secondary" v-if="user.email">{{
      user.email
    }}</span
    >, you will need to enter the verification code (OTP) to complete your
    registration process.
  </p>

    <VeeForm
      v-if="get_verify_email === true"
      class="flex flex-col w-full items-center my-1 sm:my-4"
    >
      <VeeErrorMsg
        class="text-red-600 py-1 px-1 mb-4 bg-red-300 rounded-md"
        name="email"
      />
      <label class="input-label mt-2 max-w-[80%]" for="email">
        <VeeField
          type="text"
          name="email"
          id="email"
          v-model.lazy="form.email"
          placeholder="Email address"
        />
        <span
          class="label-vis !-top-4 sm:!-top-3 py-0.5 px-1 text-xs sm:text-sm"
          >Email Address</span
        >
      </label>
      <p class="subtle text-sm sm:text-md">
        A verification code will be sent to this email address
      </p>

      <button
        class="flex gap-x-1 items-center mt-4 cursor-pointer max-w-xs hover:border-primary border-solid rounded-lg hover:border-2 p-1 text-primary hover:text-black transition-all duration-200"
        type="click"
        @click="handleGetEmail"
      >
        Submit
      </button>
    </VeeForm>
    <VeeForm
      class="flex flex-col self-center my-4"
      @submit="handleSubmit"
      v-else
    >
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
          class=""
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

      <div class="self-center mt-2 text-center flex flex-col items-center justify-between">
        <button-primary
          :text="'Verify'"
          :showIcon="false"
          :type="'submit'"
          :disabled="verifying"
          :class="{ 'opacity-80 cursor-not-allowed': verifying === true }"
        />

         <p class="flex gap-x-1 items-center mt-4 max-w-xs mx-auto" v-if="countdown > 0">
        Resend code in
        <span class="text-primary">{{ formatSecTime(countdown) }}</span>
      </p>



        <p class="font-bold mt-2 text-secondary" v-else>
        <span>   Didn't receive the OTP ? </span>

                <button
        class="flex gap-x-1 items-center cursor-pointer max-w-xs hover:border-primary border-solid rounded-lg hover:border-2 p-1 text-primary hover:text-black transition-all duration-200 mx-auto"
        @click="handleResendCode"
      >
        Resend code
      </button>
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
const {tempUser} = useUserStore();


// console.log(user.value, "gU");
// console.log(tempUser, "tempU");


const verifying = ref(false);

const code = ref("");
const timer = ref(null);
const firstDigitRef = ref(null);
const secondDigitRef = ref(null);
const thirdDigitRef = ref(null);
const fourthDigitRef = ref(null);
const fifthDigitRef = ref(null);
const sixthDigitRef = ref(null);
const get_verify_email = ref(false);
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
const countdown = ref(120);

const form = reactive({
  email: "",
});

const formatSecTime = (seconds) => {
  // console.log(seconds,'seconds');
  const minsV = Math.floor(seconds / 60);
  const secsV = (seconds % 60);
  // console.log(secsV,'secvsw');
  const secs = +secsV < 10 ?  `0${secsV}` : secsV;
  const mins = +minsV < 10 ? `0${minsV}` : minsV;
  return `${mins}:${secs}`;
}

const handleResendCode = async () => {
  countdown.value = 120;
  AuthService.getVerificationCode(form)
    .then((response) => {
      createToast(`Check your email a verification code has been sent`, {
        showIcon: true,
        type: "success",
        transition: "bounce",
        // position:'top-center'
      });
    })
    .catch((err) => {
      createToast(
        `An error occured our engineers have been notified...please refresh and try again after awhile.`,
        {
          showIcon: true,
          type: "warning",
          transition: "bounce",
          // position:'top-center'
        }
      );
    });
};

const handleGetEmail = async () => {
  get_verify_email.value = false;
  handleResendCode();
};
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
  const getVerifyEmail = JSON.parse(localStorage.getItem("getVerifyEmail"));
  if (getVerifyEmail === true) {
    get_verify_email.value = true;
    localStorage.removeItem("getVerifyEmail");
    window.removeEventListener("paste", handlePaste);
  } else {
    timer.value =
      countdown.value > 0 &&
      setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          clearInterval(timer.value);
        }
      }, 1000);

    window.addEventListener("paste", handlePaste);
    
  }
});

onBeforeUnmount(() => {
    clearInterval(timer.value);
  if (get_verify_email.value === false) {
    window.removeEventListener("paste", handlePaste);
  }
});

watch(get_verify_email, () => {
  if (get_verify_email.value === true) {
    window.addEventListener("paste", handlePaste);
  }
});

watch(countdown, () => {
  if (countdown.value === 120) {
    timer.value =
      countdown.value > 0 &&
      setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          clearInterval(timer.value);
        }
      }, 1000);
  }
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
      @apply bg-primary w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center p-3 sm:p-6;

      border-radius: 50%;
    }
  }
}
</style>
