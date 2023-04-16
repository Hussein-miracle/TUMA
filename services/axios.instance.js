import axios from "axios";



const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json, multipart/form-data",
    
  },
});


export default instance;
