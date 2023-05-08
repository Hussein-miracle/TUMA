<template>
  <div class="add-card flex flex-col items-center w-full pt-4">
    <h2 class="text-secondary text-2xl font-bold">Card Details</h2>

    <div
      class="add-card__input flex flex-col items-center w-full"
      :class="{ 'flex items-center justify-center': isLoading === true }"
    >
      <h4 class="text-secondary text-lg font-semibold">Pay securely</h4>

      <div class="spinner" v-if="isLoading === true">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>

      <div id="st-notification-frame" v-if="isLoading === false"></div>

      <form id="st-form" :action="`${location}`" v-if="isLoading === false">
        <div id="st-card-number" class="st-card-number"></div>
        <div id="st-expiration-date" class="st-expiration-date"></div>
        <div id="st-security-code" class="st-security-code"></div>
        <button
          type="submit"
          id="st-form__submit"
          class="st-form__submit btn bg-primary text-secondary rounded-md my-1 md:my-2 mx-auto md:w-80 max-w-md"
        >
          Pay
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const location = ref(`${window.location.origin}/transaction-status`);

// console.log(location.value , 'location to redirect to');/

import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";

const isLoading = ref(false);
const toast = useNuxtApp().$toast;
const cardDetails = reactive({
  card_number: "",
  card_name: "",
  cvv: "",
  card_expiry_date: "",
  save_card: false,
});

const det = reactive({
  token: "",
});

definePageMeta({
  layout: false,
});

const getTrustToken = async () => {
  isLoading.value = true;
   const reference = useAppStore().getTransactionRef;
  const cuid = useAppStore().cuid;

  const data = {
    transaction_ref: reference,
    cuid,
  };
  // console.log(data, 'for you too')
  const response = await UtilsService.postToTrustPayment(data);

  const jwtToken = response.data["jwt_token"];
  const st = response.data.st;
  const res = {
    jwtToken,
    st,
  };
  // console.log(res, "trust res");
  isLoading.value = false;
  return res;
};

const initTrustPayment = async (token) => {
  const st = SecureTrading({
    jwt: token,
    formId: "st-form",
    fieldsToSubmit: ["securitycode"],
  });
  return st.Components();
};

// const handleSubmit = async (values) => {
//   isLoading.value = true;
//   console.log(values, "card details val");

//   setTimeout(() => {
//     isLoading.value = false;
//   }, 500);
// };

onBeforeMount(async () => {
  getTrustToken()
    .then(async (res) => {
      // console.log(res ,'response before passing jwt to trust');
      const token = res.jwtToken;
      const result = await initTrustPayment(token);
      // console.log(result, "trustPayment result");
    })
    .catch((err) => {
      console.log(err, "err");
      toast.error('An Error occured please contact support.')
    });
});

// watch(cardDetails, () => {
//   if (!!cardDetails.card_number) {
//     const len = cardDetails.card_number.length;

//     if (len === 5) {
//       cardDetails.card_number = `${cardDetails.card_number} `;
//     }

//     if (len === 10) {
//       cardDetails.card_number = `${cardDetails.card_number} `;
//     }
//   }
// });

definePageMeta({
  layout: "default",
  middleware:['auth']
});
</script>

<style lang="scss" scoped>
@use "sass:math";
@function pxToRem($px) {
  @return math.div($px, 16) + rem;
}

.add-card {
  &__form {
    .item {
      input,
      #st-security-code-input {
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

#st-security-code-input,
#expiration-date__input,
#st-card-number-input {
  border: none;
  border-bottom-width: 1.5px;
  border-bottom-style: solid;
  @apply border-b-ash-1 p-2;

  &:focus {
    @apply border-b-primary p-2;
    outline: none;
  }

  &:focus + label {
    @apply text-primary;
  }
}

.btn {
  max-width: pxToRem(375);
  padding: 6px 10px;
  height: 3rem;
  text-transform: uppercase;
  // background-color: transparent;
  outline: none;
  border: none;
  display: block;

  &:focus {
    outline: none;
    border: none;
  }
}

.circle {
  border: 1.5px solid #212746;
  border-radius: 50%;
}

.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1,
.cube2 {
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
