<template>
  <div class="transaction-detail">
    <div class="t my-4 gap-y-2 flex flex-col items-center justify-center" v-if="isLoading === true">
      <h2 class="text-skeleton text-secondary text-3xl my-2 text-center !w-28"></h2>

      
      <p class="text-center mt-2 font-semibold max-w-md mx-auto text-skeleton !w-[60vw]">
      </p>


      <div class="flex    items-center justify-center  my-2 sm:my-4">
      <div class="loader">

      </div>
      </div>

      <button class="text-skeleton !w-20 !h-12">

      </button>


    </div>
    <div
      class="transaction-success"
      v-if="showSuccess === false && isLoading === false"
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
          <svg
            class="absolute sm:scale-125 !fill-red-300"
            xmlns="http://www.w3.org/2000/svg"
            width="205"
            height="205"
            viewBox="0 0 205 205"
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
                fill="#fca5a5"
              />
            </g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="155"
            height="155"
            viewBox="0 0 155 155"
            class="absolute sm:scale-110"
          >
            <g
              id="checked"
              transform="translate(-110.861 -292.861)"
              opacity="0.25"
            >
              <circle
                id="Ellipse_358"
                data-name="Ellipse 358"
                cx="77.5"
                cy="77.5"
                r="77.5"
                transform="translate(110.861 292.861)"
                fill="#f87171"
              />
            </g>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="129"
            height="129"
            viewBox="0 0 129 129"
            class="absolute sm:scale-105 !stroke-red-400"
          >
            <g id="checked" transform="translate(-123 -305)">
              <circle
                id="Ellipse_358"
                data-name="Ellipse 358"
                cx="64.5"
                cy="64.5"
                r="64.5"
                transform="translate(123 305)"
                fill="#ef4444 "
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
      v-if="showSuccess === true && isLoading === false"
    >
      <h2 class="text-secondary text-3xl my-2 text-center">
        Transaction Successful
      </h2>

      <div
        class="my-10 flex items-center justify-center relative w-72 h-72 mx-auto"
      >
        <div
          class="relative w-full h-full flex items-center justify-center my-4"
        >
          <icons-transaction-success class="absolute sm:scale-150" />
          <icons-transact-check-first class="absolute sm:scale-125" />
          <icons-transact-check-second class="absolute sm:scale-110" />
          <icons-transact-check-third class="absolute sm:scale-105" />
          <icons-check-mark class="absolute sm:scale-105" />
        </div>
      </div>

      <p class="text-center mt-2 font-semibold max-w-md mx-auto">
        One more step,click the button below to upload your details.
      </p>

      <button-primary
        :type="'button'"
        :text="'Upload'"
        class="uppercase !text-secondary font-semibold text-xl my-1"
        @click="handleUpload"
      />

    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const showSuccess = ref(false);
const isLoading = ref(false);

const handleRetry = () => {
  navigateTo("/send-money");
};

const handleUpload = async () => {

  localStorage.setItem("progged", JSON.stringify(true));

  navigateTo("/upload");
};

const fetchTrustPaymentDetail = async () => {
  isLoading.value = !false;
  setTimeout(() => {
    isLoading.value = false;
    showSuccess.value=!true;
  },5300);
  
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
</script>

<style lang="scss" scoped>
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
  content: '';  
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
  height:5vw;
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
