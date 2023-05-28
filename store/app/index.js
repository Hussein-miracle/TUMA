import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import TokenService from "@/services/token.service.js";
import AuthService from "@/services/auth.service";
import UtilsService from "@/services/utils.service";

export const useAppStore = defineStore("app", {
  state: () => ({
    upload_required: false,
    userImage: null,
    defaultDetails: useLocalStorage("defaultDetails", {}),
    defaultSendingDetails: useLocalStorage("defaultSendingDetails", {}),
    defaultSet: {
      currency_code: "",
      default: "",
      flag: "",
      symbol: "",
    },
    defaultAmount: 0,
    remittanceMethod: useLocalStorage("remittanceMethod", "''"),
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
    currentRecipientData: useLocalStorage("currentRecipientData", {
      result: null,
      reasonId: null,
    }),
    defaultAvailableCurrencies: useLocalStorage(
      "defaultAvailableCurrencies",
      []
    ),
    cuid: "",
    defaultRecipientCountry: useLocalStorage("defaultRecipientCountry", "NGA"),
    bankDetails: {
      bank_account_name: "",
      bank_name: "",
      bank_account_number: "",
    },
    mobileMoney: {
      mobile_money_number: "",
    },
    repeatTransaction: {
      amount: "",
      currency: "",
    },
    recipient_dial_code:''
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
    dc:(state) => {
      return state.recipient_dial_code;
    }
  },
  actions: {
    setShowTodo: (value) => {
      useAppStore().showTodoList = value;
    },
    setImage(value) {
      useAppStore().userImage = value;
    },
    setCurrentRecipientData(v) {
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
    setDC:(dc) => {
      useAppStore().recipient_dial_code = dc;
    },
    setRemittanceMethod(value) {
      // console.log(value,'remittance methid in store');
      useAppStore().remittanceMethod = value;
    },
    setCountries: async (value) => {
      const old = useAppStore().countries;
      useAppStore().countries = [...value];
    },

    setRecipientCurrencyDetails: (value) => {
      // console.log(value, "RecipientCurrencyDetails");
      useAppStore().recipientCurrencyDetails = { ...value };
    },
    setDefaultRecipientCountry: (value) => {
      // console.log(value, "DefaultRecipientCountry");
      useAppStore().defaultRecipientCountry = value;
    },

    setSenderCurrencyDetails: (value) => {
      const sta = { ...useAppStore().senderCurrencyDetails, ...value };
      // console.log(sta, "new SenderCurrencyDetails");
      useAppStore().senderCurrencyDetails = { ...sta };
    },
    setReasons: (value) => {
      useAppStore().reasons = value;
    },
    setUploadRequired: (value) => {
      useAppStore().upload_required = value;
    },
    setDefault: (daf) => {
      const old = useAppStore().defaultSet;
      // console.log(old, "old defaults");
      // console.log(daf, "new sending defaults");
      useAppStore().defaultDetails = { ...old, ...daf };
    },
    setDefaultDetails: (daf) => {
      const old = useAppStore().defaultSendingDetails;
      // console.log(old, "old default");
      // useAppStore().defaultSendingDetails = [...daf];
    },
    setAppUser: (values) => {
      const olduser = useAppStore().getUser;
      const userUpdates = { ...olduser, ...values };

      useAppStore().user = userUpdates;
    },
    setCuid: (cVal) => {
      // console.log(cVal,'cVal')
      useAppStore().cuid = cVal;
    },
    setRemittanceDetails: (data) => {
      useAppStore().remittanceDetail = data;
    },

    setDefaultAvailableCurrencies: (val) => {
      useAppStore().defaultAvailableCurrencies = val;
    },
    setConversionData: (data) => {
      useAppStore().conversionData = data;
    },
    setTransactionData: (data) => {
      useAppStore().transaction = data;
    },
    setCurrentTransaction: (data) => {
      useAppStore().currentTransaction = data;
    },
    setTransactionRef: (data) => {
      // console.log(data, 'data for trans  ref')
      useAppStore().transaction_ref = data;
    },
    setBankDetails: (data) => {
      // console.log(data, 'data for trans  ref')
      useAppStore().bankDetails = data;
    },
    setMobileMoney: (data) => {
      // console.log(data, 'data for trans  ref')
      useAppStore().mobileMoney = data;
    },
    fetchReasons: async () => {
      const response = await UtilsService.fetchSendMoneyReasons();

      const data = response.data;
      // console.log(data,'data after reasons fetch');
      useAppStore().setReasons(data);
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
    fetchDefault: async (
      clientId = import.meta.env.VITE_APP_TUMA_CLIENT_ID
    ) => {
      try {
        const response = await UtilsService.getRate(clientId);
        const data = response.data;
        // console.log(data,'default data ');
        const { default: def, currency } = data;
        // console.log(def, "default");
        const recipient_country = def.recepient_country;
        useAppStore().defaultRecipientCountry = recipient_country;
        useAppStore().defaultAmount = def.amount_to_send;

        const currencyKeys = Object.keys(currency);

        const currencies = currencyKeys.map((curr) => {
          currency[curr].currency_code = curr;

          if (curr === def.currency) {
            currency[curr].default = true;
          } else {
            currency[curr].default = false;
          }

          return currency[curr];
        });

        const defaultSet = currencies.find((c) => c.default === true);
        // console.log(defaultSet, "defaultSet");
        useAppStore().setDefault(defaultSet);
        useAppStore().setDefaultAvailableCurrencies(currencies);
        // console.log(data, "with Cid");
        // console.log(currencies, "currencies");

        return Promise.resolve(currencies);
      } catch (err) {
        // console.log(err, "fetching defaults");
        const { fetchDefault } = useAppStore();
        if (err) {
          fetchDefault();
        }
        return Promise.reject(err);
      }

      // const defKey = data.currency;

      // const details =
    },
    fetchCountries: async () => {
      const response = await UtilsService.getCountries();
      const data = response.data;
      // console.log(data,'data after country fetch');
      useAppStore().setCountries(data);

      return Promise.resolve(data);
    },
    setRepeatTransaction: (value) => {},
  },
  // persist: true,
  persist: {
    // enable: true,
    storage: localStorage,
  },
});
