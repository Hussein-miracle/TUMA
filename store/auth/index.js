import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useAppStore } from "../app";
import TokenService from "@/services/token.service.js";
import AuthService from "@/services/auth.service";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useLocalStorage('user',{}),
    token: null,
    tempUser: null,
    oldPassword:'',
  }),
  getters: {
    // TODO: Plan to refactor
    authenticated: (state) => {
      return state.token !== null;
    },
    isUser: (state) => {
      return state.user !== null;
    },
    getTempUser: (state) => {
      return state.tempUser;
    },
    getAuthUser: (state) => {
      return state.user;
    },
  },
  actions: {
    // TODO: chang auth storage from localstorage to cookies
    login: async (form) => {
      // console.log(form ,'form in store');

      return await AuthService.postLogin(form).then(
        (response) => {
          // console.log(response,'response')

          const userData = response.data.data.user;

          //console.log(userData,'userData')
          useUserStore().setUser(userData);

          useUserStore().setUserDetails(response);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    setUser: (user) => {
      const oldDet = useUserStore().user;
      // console.log(oldDet,'oldD')
      useUserStore().user = { ...oldDet, ...user };
      // console.log(useUserStore().user , 'user');
    },
    createAccount: (form) => {
      return AuthService.signUp(form).then(
        (response) => {
          useUserStore().setUserDetails(response);
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    verifyOtp: (form) => {
      return AuthService.verifyOtp(form).then(
        (response) => {
          // console.log(response,'verifi res');
          // useUserStore().setUserDetails(response.data.data)
          navigateTo("/login");
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    setUserDetails: (response) => {
      const data = response.data.data;

      // const expired = data.expires_in;

      // const expirationDate = new Date(new Date().getTime() + expired * 1000);

      // console.log(data,'login data in store');
      if (data.access_token) {
        useUserStore().token = data.access_token;
        useUserStore().user = data.user;
        // console.log(useUserStore().getAuthUser,'authUser');
        // TokenService
        TokenService.setToken(data.access_token);
      }

      // if(expired){
      //   TokenService.setExpiration(expirationDate);
      // }
    },setOldPassword:(p) => {
      useUserStore().oldPassword = p;
    },
    setTemp: (details) => {
      const state = useUserStore();
      state.tempUser = details;
    },
    clearUserDetails: () => {
      const state = useUserStore();
      state.user = null;
      state.token = null;
      TokenService.removeToken();
    },
    logout: () => {
      TokenService.removeToken();
      const state = useUserStore();
      state.user = null;
      state.token = null;
      navigateTo("/login");
      // setTimeout(() => {
      //   console.clear();
      //   setTimeout(() => {
      //     console.clear();
      //   }, 1000);
      // }, 500);
    },
    clearTemp: () => {
      const state = useUserStore();
      state.tempUser = null;
    },
  },
  persist: true,
  persistence: {
    enable: true,
    mode: "localStorage",
  },
});

export const initLogout = async () => {
  const { logout } = useUserStore();
  logout();
};
