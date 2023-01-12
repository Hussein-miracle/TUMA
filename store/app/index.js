import { defineStore } from "pinia";
import TokenService from '@/services/token.service.js';
import AuthService from "@/services/auth.service"

export const useAppStore = defineStore("app", {
  state: () => ({
    showTodoList: false,
    // tabState:
    userImage:'',

    remittanceMethod:'',
  }),
  getters: {
    showTodo: (state) => {
      return state.showTodoList;
    },
    getUserImage:(state)=>{
      return state.userImage;
    },
    getMethod:(state) => {
      return state.remittanceMethod;
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
      console.log(value,'remittance methid in store');
      useAppStore().remittanceMethod = value;
    }
  },
  persist: true,
});
