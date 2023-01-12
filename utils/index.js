import axiosInstance from "@/services/axios.instance";
import { createToast } from "mosha-vue-toastify";

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

  return response.data.accessToken;
};

export const assets = {
  tumablue: "#212746",
  tumayellow: "#fec02f",
  tumayellowdark: "#fec02f1a",
};

export const stringToHtmlEntity = (str) => {
  return str.replace(/[^a-z0-9\s]/gmu, (s) => "&#" + s.codePointAt(0) + ";");
};

export const geocodeResponseToCityState = (geocodeJSON) => {
  //will return and array of matching {city,state} objects
  const parsedLocalities = [];
  if (geocodeJSON.results.length) {
    for (let i = 0; i < geocodeJSON.results.length; i++) {
      let result = geocodeJSON.results[i];

      const locality = {};
      for (let j = 0; j < result.address_components.length; j++) {
        let types = result.address_components[j].types;
        for (let k = 0; k < types.length; k++) {
          if (types[k] == "locality") {
            locality.city = result.address_components[j].long_name;
          } else if (types[k] == "administrative_area_level_1") {
            locality.state = result.address_components[j].short_name;
          }
        }
      }
      parsedLocalities.push(locality);

      //check for additional cities within this zip code
      if (result.postcode_localities) {
        for (let l = 0; l < result.postcode_localities.length; l++) {
          parsedLocalities.push({
            city: result.postcode_localities[l],
            state: locality.state,
          });
        }
      }
    }
  } else {
    console.log("error: no address components found");
  }
  return parsedLocalities;
}
