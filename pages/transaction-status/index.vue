<template>
  <div class="transaction-detail">
    <div
      class="t my-4 gap-y-2 flex flex-col items-center justify-center"
      v-if="isLoading === true"
    >
      <h2
        class="text-skeleton text-secondary text-3xl my-2 text-center !w-28"
      ></h2>

      <p
        class="text-center mt-2 font-semibold max-w-md mx-auto text-skeleton !w-[60vw]"
      ></p>

      <div class="flex items-center justify-center my-2 sm:my-4">
        <div class="loader"></div>
      </div>

      <button class="text-skeleton !w-20 !h-12"></button>
    </div>

    <div
      class="transaction-success"
      v-else-if="isLoading === false && status === TRANSACTION_STATUSES.FAILED"
    >
      <h2 class="text-red-800 text-3xl my-2 text-center">
        Transaction Not Successful
      </h2>

      <div
        class="my-10 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
          <img
            src="~/assets/images/failed-logo.png"
            alt="failed statos"
          />
        </div>
      </div>

      <p class="text-center mt-2 font-semibold max-w-md mx-auto">
        One more step,click the button below to try again.
      </p>

      <button-primary
        :type="'button'"
        :text="'Try Again'"
        class="uppercase !text-white font-semibold text-xl"
        @click="handleRetry"
      />
    </div>

    <div
      class="transaction-success"
      v-else-if="
        isLoading === false && status === TRANSACTION_STATUSES.CANCELLED
      "
    >
      <h2 class="text-red-800 text-3xl my-2 text-center">
        Transaction Cancelled
      </h2>

      <div
        class="my-10 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
          <img
            src="~/assets/images/failed-logo.png"
            alt="cancelled logo"
          />
        </div>
      </div>

      <p class="text-center mt-2 font-semibold max-w-md mx-auto">
        One more step,click the button below to try again.
      </p>

      <button-primary
        :type="'button'"
        :text="'Try Again'"
        class="uppercase !text-white font-semibold text-xl"
        @click="handleRetry"
      />
    </div>

    <div
      class="transaction-success"
      v-else-if="isLoading === false && status === TRANSACTION_STATUSES.SUCCESS"
    >
      <h2 class="text-secondary text-3xl my-2 text-center">
        {{ msg }}
      </h2>

      <div
        class="my-6 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
          <img
            src="~/assets/images/checkmark-png.png"
            alt="checkmark success"
          />
        </div>
      </div>

      <p
        class="text-center mt-2 font-semibold max-w-md mx-auto"
        v-if="upload_required"
      >
        One more step,click the button below to upload your details.
      </p>

      <button-primary
        v-if="upload_required"
        :type="'button'"
        :text="'Upload'"
        class="uppercase !text-secondary font-semibold text-xl my-1"
        @click="handleUpload"
      />
      <button-primary
        v-else
        :type="'button'"
        :text="'View Transactions'"
        class="uppercase !text-secondary font-semibold text-xl my-1"
        @click="handleHome"
      />
    </div>

    <div
      class="transaction-success"
      v-else-if="isLoading === false && status === TRANSACTION_STATUSES.PENDING"
    >
      <h2 class="text-secondary text-3xl my-2 text-center">
        {{ msg }}
      </h2>

      <div class="mx-auto max-w-lg">
        Transaction Pending,You check transaction logs for more details
      </div>

      <div
        class="my-6 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
          <img src="~/assets/images/pending-logo.png" alt="pending icon" />
        </div>
      </div>

      <p
        class="text-center mt-2 font-semibold max-w-md mx-auto"
        v-show="upload_required"
      >
        One more step,click the button below to upload your details.
      </p>

      <button-primary
        v-if="upload_required"
        :type="'button'"
        :text="'Upload'"
        class="uppercase !text-secondary font-semibold text-xl my-1"
        @click="handleUpload"
      />
      <button-primary
        v-else
        :type="'button'"
        :text="'View Transactions'"
        class="uppercase !text-secondary font-semibold text-xl my-1"
        @click="handleHome"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";
import { TRANSACTION_STATUSES } from "@/utils/index";

const route = useRoute();
const appStore = useAppStore();
const { upload_required } = storeToRefs(appStore);
const showSuccess = ref(!false);
const showCancel = ref(false);
const showPending = ref(false);
const isLoading = ref(false);

const msg = ref("");
const status = ref("");

const handleRetry = () => {
  navigateTo("/send-money");
};

const handleHome = () => {
  navigateTo("/transactions");
};

const handleUpload = async () => {
  localStorage.setItem("progged", JSON.stringify(true));

  navigateTo("/upload");
};

const fetchTrustPaymentDetail = async () => {
  isLoading.value = true;
  const reference = useAppStore().getTransactionRef;
  // UtilsService.getTransaction(reference)
  UtilsService.getTransaction("a2b2a0f5-46b2-4a60-a8e3-47691fba6c77")
    .then((response) => {
      console.log(response, "r");
      msg.value = response.message;
      status.value = response.status;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err, "err");
    });
};
onMounted(() => {
  fetchTrustPaymentDetail();

  const query = route.query;

  const queryKeys = Object.keys(query);
  if (queryKeys.length >= 1) {
    const origin = window.location.origin;

    window.history.replaceState(null, "", `${origin}/transaction-detail`);
  }
});

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
svg {
  width: 15rem;
  height: 15rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  // path {
  //   width: 6rem;
  //   height: 6rem;
  //   position: relative;
  //   z-index: 5;

  //   margin-top: 4rem;
  //   margin-left: 4rem;
  // }
}

.text-skeleton:empty {
  width: 6rem;
  height: 22px;
  display: inline-block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

.loader {
  width: 20vw;
  height: 20vw;
  border: 3px dotted #2121;
  border-style: solid solid #2121 dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px dotted #fec02f;
  border-style: solid solid dotted;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  animation: rotationBack 1s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes shine {
  to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
</style>
