<template>
  <div class="payment-summary px-2">
    <h2 class="text-secondary text-2xl font-bold text-center">
      Payment Summary
    </h2>

    <div class="px-4 mb-8">
      <h4 class="text-secondary text-medium font-semibold uppercase">
        Recipient
      </h4>

      <div class="my-1 flex flex-col gap-y-1 text-left text-gray-4">
        <p>{{ summaryDetails.first_name }} {{ summaryDetails.last_name }}</p>
        <p>{{ summaryDetails.phone_number }}</p>
        <p>{{ summaryDetails.address }}</p>
      </div>
    </div>

    <div class="px-4">
      <h4 class="text-secondary text-medium font-semibold uppercase">
        Transfer Details
      </h4>

      <div class="my-1 flex flex-col gap-y-1 text-left text-gray-4">
        <div class="flex justify-between items-center">
          <p>They will receive</p>
          <div class="flex items-center gap-x-1">
            <span>
              {{
                recipientCurrencyDetails.recipient_currency_symbol ||
                recipientCurrencyDetails.recipient_currency
              }}
              {{ summary.converted }}
            </span>
            <span>{{ remittanceMethod }}</span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <p>Sent via</p>
          <div class="">Tuma</div>
        </div>

        <div class="flex justify-between items-center">
          <p>Exchange rate</p>
          <div class="flex items-center gap-x-1">
            {{  recipientCurrencyDetails.recipient_currency}} <span>{{remittanceDetail.conversion_rate}}</span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <p>Commission</p>
          <div class="flex items-center gap-x-1">
            {{ senderCurrencyDetails.sender_currency_symbol }}
            {{ summary.commission }}
          </div>
        </div>
      </div>
    </div>

    <div class="border-t-[1px] px-4 my-4 border-gray-3 py-2">
      <h4 class="text-secondary text-xl font-semibold uppercase">Total</h4>

      <div
        class="my-1 flex gap-y-1 text-left text-gray-4 items-center justify-between"
      >
        <p>Inc.Charges</p>
        <div class="font-bold text-lg text-black flex gap-x-1">
          <span>{{ senderCurrencyDetails.sender_currency_symbol }}</span>
          <span>{{ summary.final_amount }}</span>
        </div>
      </div>
    </div>

    <button-primary
      :type="'button'"
      :text="'Confirm'"
      class="uppercase !text-secondary font-semibold text-xl mt-12"
      @click="handleCreateTransaction"
    />
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";
import { storeToRefs } from "pinia";

const appStore = useAppStore();

const {
  remittanceMethod,
  paymentSummary,
  senderCurrencyDetails,
  remittanceDetail,
  recipientCurrencyDetails,
} = storeToRefs(appStore);
console.log(paymentSummary, "summaryData");
console.log(remittanceMethod, "rem met");

const summary = paymentSummary.value[remittanceMethod.value];

console.log(summary, "summary deails");

const isLoading = ref(false);

definePageMeta({
  layout: false,
  middleware: ["auth", "checkroute"],
});

const summaryDetails = reactive({
  first_name: "",
  phone_number: "",
  last_name: "",
  address: "",
});

const fetchRes = () => {
  const data = JSON.parse(localStorage.getItem("payS"));
  console.log(data, "from store Pays");
  const result = data.result;

  console.log(result, "res");
  for (const item in result) {
    if (item in summaryDetails) {
      summaryDetails[item] = result[item];
    }
  }
};

const handleCreateTransaction = async () => {
  isLoading.value = true;
  const { recipientCurrencyDetails, senderCurrencyDetails, conversionData } =
    useAppStore();
  // console.log(conversionData, "convData");
  const data = JSON.parse(localStorage.getItem("payS"));
  // console.log(data, "from store Pays");
  const response = data?.result;
  const reason_id = data?.reasonId;

  localStorage.removeItem("payS");

  if (reason_id !== null) {
    const transactionData = {
      from_currency: senderCurrencyDetails.sender_currency,
      amount: conversionData.amount,
      to_currency: recipientCurrencyDetails.recipient_currency,
      to_user: response.ruid,
      reason_id: +reason_id,
    };

    UtilsService.createTransaction(transactionData)
      .then((result) => {
        console.log(result, "trans creation data");
        const data = result.data;

        useAppStore().setTransactionRef(data.reference);

        isLoading.value = false;

        navigateTo("/add-card");
      })
      .catch((err) => {
        isLoading.value = false;
        console.log(err, "err");
      });
  }
};

onMounted(async () => {
  fetchRes();
});
</script>

<style lang="scss" scoped></style>
