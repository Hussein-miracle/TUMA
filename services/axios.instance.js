import axios from "axios";
// https://api.staging.useapace.com/v2




const instance = axios.create({
  baseURL: '',
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json, multipart/form-data",
  },
});

export default instance;
