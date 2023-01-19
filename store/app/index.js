import { defineStore } from "pinia";
import TokenService from '@/services/token.service.js';
import AuthService from "@/services/auth.service";
import UtilsService from "@/services/utils.service";


export const useAppStore = defineStore("app", {
  state: () => ({
    showTodoList: false,
    // tabState:
    userImage:'',

    remittanceMethod:'',
    user:null,
    countries: [],
    senderCurrencyDetails: null,
    recipientCurrencyDetails: null,
    reason:'',
    reasons:[],
    conversionDetails:null,
  }),
  getters: {
    showTodo: (state) => {
      return state.showTodoList;
    },
    getUserImage:(state)=>{
      return state.user?.profile_picture  || null;
    },
    getMethod:(state) => {
      return state.remittanceMethod;
    },
    getCountriesFromStore:(state) => {
      // console.log(state,'logging state to check for countries');
      return state.countries;
    },
    getSenderCurrencyDetails:(state) => {
      // console.log(state,'logging state to check for countries');
      return state.senderCurrencyDetails;
    },
    getRecipientCurrencyDetails:(state) => {
      // console.log(state,'logging state to check for countries');
      return state.recipientCurrencyDetails;
    },

    getReasons:(state)=>{
      return state.reasons;
    },
    getUser:(state) =>{
      return state.user;
    }

  },
  actions: {
    setShowTodo: (value)=>{
      useAppStore().showTodoList = value;
    },
    setImage(value){
      useAppStore().userImage = value;
    },
    setRemittanceMethod(value){
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
      useAppStore().recipientCurrencyDetails = value;
    },

    setSenderCurrencyDetails: (value) => {
      useAppStore().senderCurrencyDetails = value;
    },
    setReasons: (value) => {
      useAppStore().reasons = value;
    },
    fetchConversion: async (form) => {
      const response = await UtilsService.getConversionRates();

      const data =  response.data;

      console.log(data , 'conversiondata');

      useAppStore().conversionDetails = data;
    },
    setAppUser:(values)=>{
      const olduser = useAppStore().getUser;
      const userUpdates = {...olduser,...values,verification_code:undefined};

      useAppStore().user = userUpdates;
    }
  },
  persist: true,
});
