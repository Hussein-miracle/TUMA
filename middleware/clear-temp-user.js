import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/auth/index";
// import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((item) => {
  const {clearTemp} = useUserStore();

  return clearTemp();
});
