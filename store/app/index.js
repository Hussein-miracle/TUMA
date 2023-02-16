import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import TokenService from "@/services/token.service.js";
import AuthService from "@/services/auth.service";
import UtilsService from "@/services/utils.service";

export const useAppStore = defineStore("app", {
  state: () => ({
    upload_required: false,
    userImage: null,
    defaultDetails: null,

    remittanceMethod: useLocalStorage("remittanceMethod", ""),
    remittanceDetail: useLocalStorage("remittanceDetail", {
      cash: {
        converted: "",
      },
      bank: {
        converted: "",
      },
      mobile: {
        converted: "",
      },
      recipient_currency: "",
    }),
    user: null,
    countries: useLocalStorage("countries", []),
    transaction: {
      applicantEmail: "",
      applicantPhone: "",
    },
    senderCurrencyDetails: useLocalStorage("senderCurrencyDetails", {
      sender_currency: "",
      sender_country: "",
      sender_currency_symbol: "",
    }),
    recipientCurrencyDetails: useLocalStorage("recipientCurrencyDetails", {
      recipient_currency: "",
      recipient_country: "",
      recipient_currency_symbol: "",
    }),
    reason: "",
    reasons: [],
    conversionData: {
      amount: "",
    },
    restriction: {
      country: "",
      country_code: "",
    },
    transaction_ref: useLocalStorage("transaction_ref", ""),

    paymentSummary: useLocalStorage("paymentSummary", {
      cash: {
        initial_amount: "",
        commission: "",
        final_amount: "",
        converted: "",
      },
      bank: {
        initial_amount: "",
        commission: "",
        final_amount: "",
        converted: "",
      },
      mobile: {
        initial_amount: "",
        commission: "",
        final_amount: "",
        converted: "",
      },
    }),

    currentTransaction: {
      first_name: "",
      last_name: "",
      address: "",
      reason: "",
    },
    currentRecipientData: useLocalStorage("currentRecipientData",{
      result:null,
      reasonId:null,
    }),
  }),
  getters: {
    showTodo: (state) => {
      return state.showTodoList;
    },
    getTransactionRef: (state) => {
      return state.transaction_ref;
    },
    getRemittance: (state) => {
      return state.remittanceDetail;
    },
    getUserImage: (state) => {
      return state.user?.profile_picture || null;
    },
    getMethod: (state) => {
      return state.remittanceMethod;
    },
    getRestriction: (state) => {
      return state.restriction;
    },
    getCountriesFromStore: (state) => {
      // console.log(state,'logging state to check for countries');
      return [...state.countries];
    },
    getSenderCurrencyDetails: (state) => {
      // console.log(state,'logging state to check for countries');
      return state.senderCurrencyDetails;
    },

    getTransaction: (state) => {
      return state.transaction;
    },
    getCurrentTransaction: (state) => {
      return state.currentTransaction;
    },
    getRecipientCurrencyDetails: (state) => {
      // console.log(state,'logging state to check for countries');
      return state.recipientCurrencyDetails;
    },
    getDetails: (state) => {
      return state.remittanceDetail;
    },
    getReasons: (state) => {
      return state.reasons;
    },
    getUser: (state) => {
      return state.user;
    },
    getConversionData: (state) => {
      return state.conversionData;
    },
  },
  actions: {
    setShowTodo: (value) => {
      useAppStore().showTodoList = value;
    },
    setImage(value) {
      useAppStore().userImage = value;
    },
    setCurrentRecipientData(v){
      useAppStore().currentRecipientData = v;
    },
    setPaymentSummary: (value) => {
      const oldSummary = useAppStore().paymentSummary;
      useAppStore().paymentSummary = { ...oldSummary, ...value };
    },
    setRestriction(value) {
      const country = value;
      const country_code = useAppStore().getCountriesFromStore.find((c) => {
        // console.log(c.name,'c',country)
        if (c.name === country) {
          return c.code.toLowerCase();
        }
      });

      const restrictionDetails = {
        country,
        country_code,
      };

      // console.log(restrictionDetails,'restrict Detai;ls')
      useAppStore().restriction = {
        ...restrictionDetails,
      };
    },
    setRemittanceMethod(value) {
      // console.log(value,'remittance methid in store');
      useAppStore().remittanceMethod = value;
    },
    setCountries: async (value) => {
      const old = useAppStore().countries;
      useAppStore().countries = [...value];
    },
    fetchCountries: async () => {
      const response = await UtilsService.getCountries();
      const data = response.data;
      // console.log(data,'data after country fetch');
      useAppStore().setCountries(data);
    },
    fetchReasons: async () => {
      const response = await UtilsService.fetchSendMoneyReasons();

      const data = response.data;
      // console.log(data,'data after reasons fetch');
      useAppStore().setReasons(data);
    },

    setRecipientCurrencyDetails: (value) => {
      // console.log(value, "setting res");
      useAppStore().recipientCurrencyDetails = { ...value };
    },

    setSenderCurrencyDetails: (value) => {
      const stale = useAppStore().senderCurrencyDetails;
      useAppStore().senderCurrencyDetails = { ...stale, ...value };
    },
    setReasons: (value) => {
      useAppStore().reasons = value;
    },
    setUploadRequired: (value) => {
      useAppStore().upload_required = value;
    },
    setDefault: (daf) => {
      const old = { ...useAppStore().defaultDetails };
      useAppStore().defaultDetails = { ...old, ...daf };
    },
    fetchConversion: async (form) => {
      const response = await UtilsService.getConversionRates(form);

      const data = response.data;

      // console.log(data, "conversiondata");
      const oldData = useAppStore().conversionData;
      useAppStore().conversionData = { ...oldData, ...data };

      const newData = useAppStore().conversionData;

      return Promise.resolve(data);
    },
    fetchDefault: async (clientId = "") => {
      let data;
      if (clientId) {
        data = await UtilsService.getRate(clientId);
        console.log(data, "with Cid");
      } else {
        data = await UtilsService.getRate();
        console.log(data, "without Cid");
      }

      // const defKey = data.currency;

      // const details =
    },
    setAppUser: (values) => {
      const olduser = useAppStore().getUser;
      const userUpdates = { ...olduser, ...values };

      useAppStore().user = userUpdates;
    },

    setRemittanceDetails: (data) => {
      useAppStore().remittanceDetail = { ...data };
    },
    setConversionData: (data) => {
      useAppStore().conversionData = { ...data };
    },
    setTransactionData: (data) => {
      useAppStore().transaction = { ...data };
    },
    setCurrentTransaction: (data) => {
      useAppStore().currentTransaction = { ...data };
    },
    setTransactionRef: (data) => {
      // console.log(data, 'data for trans  ref')
      useAppStore().transaction_ref = data;
    },
  },
  persist: true,
  persistence: {
    enable: true,
    mode: "localStorage",
  },
});
