<template>
  <div class="add-card flex flex-col items-center w-full">
    <h2 class="text-secondary text-2xl font-bold">Card Details</h2>

    <div class="add-card__input flex flex-col items-center w-full">
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

      <div id="st-notification-frame"></div>

      <form id="st-form">
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
const isLoading = ref(false);

const cardDetails = reactive({
  card_number: "",
  card_name: "",
  cvv: "",
  card_expiry_date: "",
  save_card: false,
});

definePageMeta({
  layout: false,
});

const initTrustPayment = async () => {
  const st = SecureTrading({
    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFjY291bnR0eXBlZGVzY3JpcHRpb24iOiJFQ09NIiwiYmFzZWFtb3VudCI6IjEwNTAiLCJjdXJyZW5jeWlzbzNhIjoiR0JQIiwib3JkZXJyZWZlcmVuY2UiOiI0NjU1NzY4NjQ1NjRhYmNkZWgiLCJzaXRlcmVmZXJlbmNlIjoidGVzdF9kYWdkYWdsdGQxMTI1NjgiLCJyZXF1ZXN0dHlwZWRlc2NyaXB0aW9ucyI6WyJUSFJFRURRVUVSWSIsIkFVVEgiXX0sImlhdCI6MTY3MzkwODY1MiwiaXNzIjoiand0QGRhZ2RhZ2x0ZC5jb20ifQ.3Udtai0igiRg0RQFLwlKRtQv60f0_4nLBpX_iZ7cjnY",
  });

  st.Components();
};

const handleSubmit = async (values) => {
  isLoading.value = true;
  console.log(values, "card details val");

  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};

onMounted (async () => {
  const trustSource = "https://cdn.eu.trustpayments.com/js/latest/st.js";

  const trustScript = document.createElement("script");

  trustScript.src = trustSource;

  if (!document.querySelector(`[src="${trustSource}"]`)) {
    document.body.appendChild(trustScript);
  }

  await initTrustPayment();



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
</style>
