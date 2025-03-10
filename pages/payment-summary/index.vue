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
            <span v-if="conversion_type === 'reverse'">
              {{
                recipientCurrencyDetails.recipient_currency_symbol ||
                recipientCurrencyDetails.recipient_currency
              }}
              {{ summary.converted_forward }}
            </span>
            <span v-if="conversion_type === 'forward'">
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
          <p>Delivery Channel</p>
          <div class="uppercase">{{ remittanceMethod }}</div>
        </div>

        <div class="flex justify-between items-center">
          <p>Sent via</p>
          <div class="">Tuma</div>
        </div>

        <div class="flex justify-between items-center">
          <p>Exchange rate</p>
          <div class="flex items-center gap-x-1">
            {{ recipientCurrencyDetails.recipient_currency }}
            <span>{{ remittanceDetail.conversion_rate }}</span>
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
          <span>{{ senderCurrencyDetails.sender_currency }}</span>
          <span v-money v-if="conversion_type === 'reverse'">{{
            summary.converted
          }}</span>
          <span v-money v-if="conversion_type === 'forward'">{{
            summary.initial_amount
          }}</span>
        </div>
      </div>
    </div>

    <button-primary
      :type="'button'"
      :text="'Confirm'"
      class="uppercase !text-secondary font-semibold text-xl mt-12"
      :disabled="isLoading === true"
      :showLoader="isLoading === true"
      :class="{ 'opacity-75 cursor-not-allowed': isLoading === true }"
      @click="handleCreateTransaction"
    />

    <button-primary class="w-12 h-10" type='button' @click="handleBackward">back</button-primary>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app/index";
import UtilsService from "@/services/utils.service";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const toast = useNuxtApp().$toast;
const {
  remittanceMethod,
  paymentSummary,
  senderCurrencyDetails,
  remittanceDetail,
  recipientCurrencyDetails,
  currentRecipientData,
  bankDetails,
  mobileMoney,
} = storeToRefs(appStore);

const { conversion_type } = paymentSummary.value;
// console.log(paymentSummary.value, "summaryData");
//console.log(remittanceMethod.value, "rem met value");
// console.log(senderCurrencyDetails.value, "SDSD");
// console.log(recipientCurrencyDetails.value, "RDRD");

const summary = ref(paymentSummary.value[remittanceMethod.value]);

// console.log(summary.value, "summary deails");

const isLoading = ref(false);

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});


const summaryDetails = reactive({
  first_name: "",
  phone_number: "",
  last_name: "",
  address: "",
});

const fetchRes = () => {
  const result = currentRecipientData.value.result;
  // console.log(result, "from store Paystore");

  for (const item in result) {
    if (item in summaryDetails) {
      summaryDetails[item] = result[item];
    }
  }
};

const handleBackward = () => {
  window.history.go(-1);
}

const handleCreateTransaction = async () => {
  const {
    recipientCurrencyDetails,
    senderCurrencyDetails,
    conversionData,
    currentRecipientData,
    bankDetails,
    mobileMoney,
  } = useAppStore();
  const transactionData = ref(null);
  isLoading.value = true;
  // console.log(recipientCurrencyDetails, "recDetttt!!");

  const response = currentRecipientData?.result;
  const reason_id = currentRecipientData?.reasonId;
  // console.log(response, "recDetttt!!");
  if (remittanceMethod.value.toLowerCase() === "bank") {
    transactionData.value = {
      from_currency: senderCurrencyDetails.sender_currency,
      amount: conversionData.amount,
      to_country_code: recipientCurrencyDetails.recipient_country_code,
      to_user: response.ruid,
      reason_id: +reason_id,
      trans_method: remittanceMethod.value,
      bank_account_name: bankDetails.bank_account_name,
      bank_name: bankDetails.bank_name,
      bank_account_number: bankDetails.bank_account_number,
    };
  } else if (remittanceMethod.value.toLowerCase() === "mobile") {
    transactionData.value = {
      from_currency: senderCurrencyDetails.sender_currency,
      amount: conversionData.amount,
      to_country_code: recipientCurrencyDetails.recipient_country_code,
      to_user: response.ruid,
      reason_id: +reason_id,
      trans_method: remittanceMethod.value,
      mobile_money_number: mobileMoney.mobile_money_number,
    };
  } else {
    transactionData.value = {
      from_currency: senderCurrencyDetails.sender_currency,
      amount: conversionData.amount,
      to_country_code: recipientCurrencyDetails.recipient_country_code,
      to_user: response.ruid,
      reason_id: +reason_id,
      trans_method: remittanceMethod.value,
    };
  }
  // console.log(transactionData, "trans Data");

  if (!!reason_id) {
    UtilsService.createTransaction(transactionData.value)
      .then((result) => {
        // console.log(result, "trans creation data");
        const data = result.data;
        const upload_required = data?.upload_required;
        const has_a_card = data?.has_a_card;
        useAppStore().setUploadRequired(upload_required);
        useAppStore().setTransactionRef(data.reference);

        isLoading.value = false;

        // console.log(data, "transa data");
        if (has_a_card) {
          navigateTo("/select-card");
        } else {
          navigateTo("/add-card");
        }
      })
      .catch((err) => {
        isLoading.value = false;
        // console.log(err, "err");
        toast.error('Error confirming transaction details.')
      });
  }
};

onMounted(async () => {
  fetchRes();
});
</script>

<style lang="scss" scoped></style>
