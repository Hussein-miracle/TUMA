import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";


import axiosInstance from "@/services/axios.instance";
import TokenService from "@/services/token.service";
import AuthService from "@/services/auth.service";

import { checkStatus, ErrMessage } from "~/utils";
import useToast from "@/composables_/useToast";
import { initLogout } from "~~/store/auth";

const setupInterceptor = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token} `;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      
      const msg = response.data.message;

      if (checkStatus(response.data.status)) {
        // console.log(response, "interception ");
        return response;
      }else{
        createToast(msg, {
          showIcon: true,
          type: "warning",
          transition: "bounce",
          // position:'top-center'
        });
        // console.clear();
        throw new ErrMessage(response.data);
      }
    },
    async (err) => {
      const status = err.response?.status;
      const originalConfig = err.config;
      // console.log(err, "err");
      // console.log(originalConfig, "cg");

      if (originalConfig?.url !== "/login" && status === 401) {
        createToast('Session Expired,Please log in again.', {
          showIcon: true,
          type: "warning",
          transition: "bounce",
          // position:'top-center'
        });

        setTimeout(() => {
          initLogout();
        },250)

        return;
      }

      // if()
      if (err.code === "ERR_NETWORK") {
        // openNotification('Check Network Connection',TOAST_TYPES.error)
        createToast("Check Your Network Connection,Refresh And Try Again.", {
          showIcon: true,
          type: "warning",
        });

        return Promise.reject(err);
        // console.log(err.message, "err");
      }

      if (status && status === 500 && process.env.NODE_ENV === "development") {
        createToast("Backend Error 👀👀.", {
          showIcon: true,
          type: "info",
        });
      }


      return Promise.reject(err);
    }
  );
};

export default setupInterceptor;
