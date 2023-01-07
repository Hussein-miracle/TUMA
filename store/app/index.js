import { defineStore } from "pinia";
import TokenService from '@/services/token.service.js';
import AuthService from "@/services/auth.service"

export const useAppStore = defineStore("app", {
  state: () => ({
    showTodoList: false,
    // tabState:
    userImage:'',
  }),
  getters: {
    showTodo: (state) => {
      return state.showTodoList;
    },
    getUserImage:(state)=>{
      return state.userImage;
    }
  },
  actions: {
    setShowTodo: (value)=>{
      useAppStore().showTodoList = value;
    },
    setImage(value){
      useAppStore().userImage = value;
    }
  },
  persist: true,
});
