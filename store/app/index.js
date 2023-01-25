import { defineStore } from "pinia";
import TokenService from "@/services/token.service.js";
import AuthService from "@/services/auth.service";
import UtilsService from "@/services/utils.service";
import data from "~~/data/onboarding";

export const useAppStore = defineStore("app", {
  state: () => ({
    showTodoList: false,
    // tabState:
    userImage: "",

    remittanceMethod: "",
    remittanceDetail: {
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
    },
    user: null,
    countries: [],

    senderCurrencyDetails: {
      sender_currency: "",
      sender_country: "",
      sender_currency_symbol: "",
    },
    recipientCurrencyDetails: {
      recipient_currency: "",
      recipient_country: "",
      recipient_currency_symbol: "",
    },
    reason: "",
    reasons: [],
    conversionData: {
      amount:''
    },
    restriction: {
      country: "",
      country_code: "",
    },
  }),
  getters: {
    showTodo: (state) => {
      return state.showTodoList;
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
      return state.countries;
    },
    getSenderCurrencyDetails: (state) => {
      // console.log(state,'logging state to check for countries');
      return state.senderCurrencyDetails;
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
    getConversionData:(state)=>{
      return state.conversionData;
    }
  },
  actions: {
    setShowTodo: (value) => {
      useAppStore().showTodoList = value;
    },
    setImage(value) {
      useAppStore().userImage = value;
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
       ...restrictionDetails
      };
    },
    setRemittanceMethod(value) {
      // console.log(value,'remittance methid in store');
      useAppStore().remittanceMethod = value;
    },
    setCountries: async (value) => {
      useAppStore().countries = value;
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
      useAppStore().senderCurrencyDetails = { ...value };
    },
    setReasons: (value) => {
      useAppStore().reasons = value;
    },
    fetchConversion: async (form) => {
      const response = await UtilsService.getConversionRates(form);

      const data = response.data;

      console.log(data, "conversiondata");
      const oldData = useAppStore().conversionData;
      useAppStore().conversionData = { ...oldData, ...data };

      const newData = useAppStore().conversionData;

      return Promise.resolve(data);
    },
    setAppUser: (values) => {
      const olduser = useAppStore().getUser;
      const userUpdates = { ...olduser, ...values };

      useAppStore().user = userUpdates;
    },

    setRemittanceDetails: (data) => {
      useAppStore().remittanceDetail = { ...data };
    },
    setConversionData:(data) => {
      useAppStore().conversionData = {...data};
    }
  },
  persist: true,
});
