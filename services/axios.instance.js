import axios from "axios";

// const url = 'https://vtsp35pseg.us-east-1.awsapprunner.com/api';
const baseURL = 'https://app.dagdag.fun/api';


const instance = axios.create({
  
  baseURL: baseUrl,

  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json, multipart/form-data",
  },
});


export default instance;
