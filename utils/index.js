import axiosInstance from "@/services/axios.instance";
import { createToast } from "mosha-vue-toastify";

//import { useNuxtApp } from "#app";


export const checkStatus = (status) => {
  // console.log(status,'status');
  return status !== "error";
};

export const checkStatusCode = (status) => {
  return status !== "error";
};

export const checkNetwork = () => {
  const online = navigator.onLine;
  if (!online) {
    createToast("Check Your Network Connection.", {
      showIcon: true,
      type: "info",
      transition: "bounce",
      position: "top-right",
    });
  }
};

// export const toast = (() => (useNuxtApp().$toast))();
export class ErrMessage extends Error {
  constructor(data) {
    super(data);
    this.message = data.message;
    this.status = data.status;
    this.code = data.code;
    this.data = data.data ?? [];
    this.name = "ErrMessage";
  }
}

export const refreshToken = async () => {
  const response = await axiosInstance.get("/refresh/token", {
    withCredentials: true,
  });
  // setAuth(prev => {
  //     console.log(JSON.stringify(prev));
  //     console.log(response.data.accessToken);
  //     return { ...prev, accessToken: response.data.accessToken }
  // });

  return response.data.api_token;
};

export const assets = {
  tumablue: "#212746",
  tumayellow: "#fec02f",
  tumayellowdark: "#fec02f1a",
};

export const stringToHtmlEntity = (str) => {
  return str.replace(/[^a-z0-9\s]/gmu, (s) => "&#" + s.codePointAt(0) + ";");
};

export const getRandomIndex = (max) => {
  const index = Math.floor(Math.random() * max);

  return index;
};

export const formatStringToMoney = (string) => {
  const main = parseFloat(string.replace(/,/g, ""));
  return main;
};

export const TRANSACTION_STATUSES = {
  SUCCESS: "completed",
  PENDING: "pending",
  CANCELLED: "cancelled",
  FAILED: "failed",
};

export const VERIFICATION_STATUSES = {
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
  UNDER_REVIEW: "under-review",
};

export const CONVERSION_TYPES = {
  FORWARD: "forward",
  BACKWARD: "backward",
};
