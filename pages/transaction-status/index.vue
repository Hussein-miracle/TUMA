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
    <div class="transaction-success" v-if="status === 'cancelled'">
      <h2 class="text-red-800 text-3xl my-2 text-center">
        Transaction Not Successful
      </h2>

      <div
        class="my-10 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="244.861"
            viewBox="0 0 205 244.861"
          >
            <g
              id="checked"
              transform="translate(-111.304 -293.304)"
              opacity="0.1"
            >
              <circle
                id="Ellipse_358"
                data-name="Ellipse 358"
                cx="102.5"
                cy="102.5"
                r="102.5"
                transform="translate(111.304 293.304)"
                fill="#e2360a"
              />
            </g>
            <circle
              id="Ellipse_358-2"
              data-name="Ellipse 358"
              cx="77.5"
              cy="77.5"
              r="77.5"
              transform="translate(25.861 89.861)"
              fill="#e20a27"
            />
            <g
              id="checked-2"
              data-name="checked"
              transform="translate(-85 -267)"
            >
              <circle
                id="Ellipse_358-3"
                data-name="Ellipse 358"
                cx="64.5"
                cy="64.5"
                r="64.5"
                transform="translate(123 304)"
                fill="#e20a18"
              />
            </g>
          </svg>

          <icons-transaction-error class="absolute sm:scale-150 -800" />
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
      v-else-if="isLoading === false && status !== 'cancelled'"
    >
      <h2 class="text-secondary text-3xl my-2 text-center">
        {{ msg }}
      </h2>

      <div v-if="status === 'pending'" class="mx-auto max-w-lg">
        Transaction Pending,You check transaction logs for more details
      </div>

      <div
        class="my-6 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
        
        <img src="~/assets/images/checkmark-png.png" alt="checkmark success" />
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            width="205.442"
            height="208.304"
            viewBox="0 0 205.442 208.304"
          >
            <circle
              id="Ellipse_358"
              data-name="Ellipse 358"
              cx="102.5"
              cy="102.5"
              r="102.5"
              transform="translate(0.442 3.304)"
              fill="#0ae2c7"
            />
            <circle
              id="Ellipse_358-2"
              data-name="Ellipse 358"
              cx="77.5"
              cy="77.5"
              r="77.5"
              transform="translate(0 2.861)"
              fill="#0ae2c7"
            />
            <circle
              id="Ellipse_358-3"
              data-name="Ellipse 358"
              cx="64.5"
              cy="64.5"
              r="64.5"
              transform="translate(12.139 15)"
              fill="#0ae2c7"
            />
            <path
              id="checked"
              d="M.462,19.923a1.487,1.487,0,0,1,0-2.154l2.154-2.154a1.487,1.487,0,0,1,2.154,0l.154.154,8.462,9.077a.744.744,0,0,0,1.077,0L35.077,3.462h.154a1.487,1.487,0,0,1,2.154,0l2.154,2.154a1.487,1.487,0,0,1,0,2.154h0L14.923,33.308a1.487,1.487,0,0,1-2.154,0l-12-12.923-.308-.462Z"
              fill="#fff"
            />
          </svg> -->
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
  UtilsService.getTransaction(reference)
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

  // console.log(queryKeys, "qK");

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
