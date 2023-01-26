<template>
  <div class="add-card flex flex-col items-center w-full">
    <h2 class="text-secondary text-2xl font-bold">Card Details</h2>

    <div
      class="add-card__input flex flex-col items-center w-full"
      :class="{ 'flex items-center justify-center': isLoading === true }"
    >
      <!-- <VeeForm
        class="flex flex-col gap-y-3 items-center mt-6 w-[90%] add-card__form sm:w-[70%] md:w-[50%] self-center"
        @submit="handleSubmit"

        
      >
        <div class="item flex flex-col-reverse my-2 w-full relative">
          <div class="absolute card_logo top-3/4 right-1 -translate-y-1/2">
            🛡️🛡️🛡️
          </div>

          <VeeField
            type="text"
            v-model="cardDetails.card_number"
            name="card_number"
            id="card_number"
            ref="card_number"
            placeholder="Card Number"
          />

          <label for="card_number" class="mb-2 text-ash-1">Card Number</label>

          <VeeErrorMsg
            class="text-red-600 text-xs py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="card_number"
          />
        </div>
        <div class="item flex flex-col-reverse my-2 w-full">
          <VeeField
            type="text"
            v-model="cardDetails.card_name"
            name="card_name"
            id="card_name"
            ref="card_name"
            placeholder="Name on Card"
          />

          <label for="card_number" class="mb-2 text-ash-1">Name on Card</label>

          <VeeErrorMsg
            class="text-red-600 text-xs py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
            name="card_name"
          />
        </div>

        <div class="flex w-full justify-between items-center">
          <div class="item flex flex-col-reverse my-2 w-[60%]">
            <VeeField
              type="text"
              v-model="cardDetails.card_expiry_date"
              name="card_expiry_date"
              id="card_expiry_date"
              placeholder="MM/YY"
            />

            <label for="card_number" class="mb-2 text-ash-1">Expiry date</label>

            <VeeErrorMsg
              class="text-red-600 text-xs py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
              name="card_expiry_date"
            />
          </div>
          <div class="item flex flex-col-reverse my-2 w-[35%]">
            <VeeField
              type="text"
              v-model="cardDetails.cvv"
              name="cvv"
              min="3"
              max="3"
              id="cvv"
              placeholder="CVV"
            />

            <label for="card_number" class="mb-2 text-ash-1">CVV</label>

            <VeeErrorMsg
              class="text-red-600 text-xs py-1 my-1 max-w-md px-1 rounded-md bg-red-300 capitalize"
              name="cvv"
            />
          </div>
        </div>

        <div class="flex gap-x-2 items-center justify-start mr-auto">
          <icons-check-rounded
            class="cursor-pointer"
            v-if="cardDetails.save_card === true"
            @click="cardDetails.save_card = !cardDetails.save_card"
          />
          <span
            v-else
            class="circle w-[1.2rem] h-[1.2rem] mr-1 cursor-pointer"
            @click="cardDetails.save_card = !cardDetails.save_card"
          ></span>
          <p class="text-secondary font-light">
            Save card detail for next time
          </p>
        </div>

        <button-primary
          :type="'submit'"
          :text="'Proceed'"
          class="text-secondary font-semibold"
          :disabled="isLoading === true"
        />
      </VeeForm> -->

      <div class="spinner" v-if="isLoading === true">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>

      <div id="st-notification-frame" v-if="isLoading === false"></div>

      <form id="st-form" action="" v-if="isLoading === false">
        <div id="st-card-number" class="st-card-number"></div>
        <div id="st-expiration-date" class="st-expiration-date"></div>
        <div id="st-security-code" class="st-security-code"></div>
        <button type="submit" id="st-form__submit" class="st-form__submit">
          Pay securely
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";

const isLoading = ref(false);

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
  const data = {
    transaction_ref: reference,
  };
  // console.log(data, 'for you too')
  const response = await UtilsService.postToTrustPayment(data);

  // console.log(response, "res for trust");

  const jwtToken = response.data["jwt-token"];
  const st = response.data.st;
  const res = {
    jwtToken,
    st,
  };
  console.log(res, "trust res");
  isLoading.value = false;
  return res;
};

const initTrustPayment = async (token) => {
  const st = SecureTrading({
    jwt: token,
  });
  return st.Components();
};

const handleSubmit = async (values) => {
  isLoading.value = true;
  console.log(values, "card details val");

  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};

onBeforeMount(async () => {
  getTrustToken()
    .then(async (res) => {
      const token = res.jwtToken;
      const result = await initTrustPayment(token);
      console.log(result, "trustPayment result");
    })
    .catch((err) => {
      console.log(err, "err");
    });
});

watch(cardDetails, () => {
  if (!!cardDetails.card_number) {
    const len = cardDetails.card_number.length;

    if (len === 5) {
      cardDetails.card_number = `${cardDetails.card_number} `;
    }

    if (len === 10) {
      cardDetails.card_number = `${cardDetails.card_number} `;
    }
  }
});
</script>

<style lang="scss" scoped>
.add-card {
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
