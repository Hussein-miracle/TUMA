<template>
  <div
    class="transaction-logs bg-[#F4F5F7] overflow-y-scroll"
    :class="{
      'flex items-center flex-col justify-center':
        fetching === true || transactions.length <= 0,
    }"
  >
    <!-- <div class="sk-circle" v-if="fetching">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div>
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </div> -->

    <div class="loading" v-if="fetching === true">
      <div class="arc"></div>
      <div class="arc"></div>
      <div class="arc"></div>
    </div>

    <template v-else-if="transactions.length > 0">
      <transaction-log
        v-for="transaction in transactions"
        :key="transaction.reference"
        :status="transaction.status"
        :amount="+transaction.amount"
        :from_currency="transaction.from_currency"
        :to_currency="transaction.to_currency"
        :first_name="transaction.to_user.first_name"
        :last_name="transaction.to_user.last_name"
        :address="transaction.to_user.address"
        @click="handleTransDetail(transaction)"
      />
      <spacer :y="true" :size="4" />
    </template>

    <p v-else class="text-secondary text-xl mx-6 sm:mx-8 sm:max-w-md">
      You haven't made any transaction yet.
    </p>
  </div>
</template>

<script setup>
import UtilsService from "@/services/utils.service";
import { useAppStore } from "@/store/app/index";
const { setCurrentTransaction } = useAppStore();
useHead({
  title: "Trasactions",
});
const fetching = ref(false);
const transactions = ref([]);

const handleTransDetail = (transaction) => {
  // console.log(transaction,'transaction selected');
  const others = transaction.to_user;
  const data = {
    ...transaction,
    // to_user:null,
    ...others,
  };
  // console.log(data,'data');
  setCurrentTransaction(data);
  localStorage.setItem("progged", JSON.stringify(true));
  navigateTo(`/transactions/${transaction.reference}`);
};

const fetchAllTransactions = async () => {
  fetching.value = true;
  UtilsService.getTransactions()
    .then((response) => {
      // console.log(response, "r");
      transactions.value = response;
      fetching.value = false;
    })
    .catch((err) => {
      fetching.value = false;
      console.log(err, "err");
    });
};

definePageMeta({
  layout: "default",
  middleware: ["auth", "checkroute"],
});

onBeforeMount(async () => {
  fetchAllTransactions();
});
</script>

<style lang="scss">
.transaction-logs {
  height: calc(100vh - 3rem);
  min-height: calc(100vh - 3rem);
}

.sk-circle {
  /* margin: 100px auto; */
  width: 20vw;
  height: 20vw;
  position: relative;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #fec02f;
  border-radius: 100%;
  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
.sk-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}
.sk-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sk-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}
.sk-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}
.sk-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.sk-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}
.sk-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}
.sk-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.sk-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}
.sk-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}
.sk-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.sk-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.sk-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.sk-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.sk-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.sk-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.sk-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.sk-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes sk-circleBounceDelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-circleBounceDelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.loading {
  position: relative;
  width: 20vw;
  height: 20vw;
  transform-style: preserve-3d;
  perspective: 800px;

  .arc {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-bottom: 3px solid #fec02f;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation: rotate#{$i} 1.15s linear infinite;
      }
    }

    &:nth-child(1) {
      animation-delay: -0.8s;
    }

    &:nth-child(2) {
      animation-delay: -0.4s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
}

@keyframes rotate1 {
  from {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(1turn);
  }
}

@keyframes rotate2 {
  from {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0);
  }

  to {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(1turn);
  }
}

@keyframes rotate3 {
  from {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0);
  }

  to {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(1turn);
  }
}
</style>
