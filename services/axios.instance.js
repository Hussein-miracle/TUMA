import axios from "axios";


const instance = axios.create({
  baseURL: '',
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json, multipart/form-data",
  },
});

export default instance;
