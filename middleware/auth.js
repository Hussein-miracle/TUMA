import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/auth/index";
import TokenService from "@/services/token.service";
import { checkNetwork } from "~~/utils";

export default defineNuxtRouteMiddleware((item) => {
  checkNetwork();

  const { authenticated, logout ,isUser} = useUserStore();

  if (!authenticated  || !isUser) {
    return logout();
  }

});
