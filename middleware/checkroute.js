import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/auth/index";
import TokenService from "@/services/token.service";
import { checkNetwork } from "~~/utils";

export default defineNuxtRouteMiddleware((item) => {
  // console.log(item , 'item in recipient checkRoute');
  const route = useRoute();

  if (item.name === "recipient") {
    const progged = JSON.parse(localStorage.getItem("progged"));
    // console.log(progged,'progged');
    localStorage.removeItem("progged");
    if (progged !== true) {
      return navigateTo("/send-money");
    }
  }

  if (item.name === "add-card") {
    const progged = JSON.parse(localStorage.getItem("progged"));
    // console.log(progged,'progged');
    localStorage.removeItem("progged");
    if (progged !== true) {
      return navigateTo("/send-money");
    }
  }

  // if (item.name === "upload") {
  //   const progged = JSON.parse(localStorage.getItem("progged"));
  //   // console.log(progged,'progged');
  //   localStorage.removeItem("progged");

  //   if (progged !== true) {
  //     return navigateTo("/send-money");
  //   }
  // }

  if (item.name === "transaction-detail") {
    const progged = JSON.parse(localStorage.getItem("progged"));

    // console.log(progged,'progged');

    // localStorage.removeItem("progged");
    // const trustRefs = Object.keys(route.query);

    // console.log(trustRefs,'tRefs');

    if (progged !== true) {
      return navigateTo("/send-money");
    }
  }

  if (item.name === "payment-summary") {
    const progged = JSON.parse(localStorage.getItem("progged"));
    // console.log(progged,'progged');
    localStorage.removeItem("progged");
    
    if (progged !== true) {
      return navigateTo("/send-money");
    }
  }

  // if (!authenticated) {
  //   clearUserDetails();
  //   logout();
  //   return navigateTo("/login");
  // }
});
