import axiosInstance from "./axios.instance";

let instance = null;

class UtilsService{
  constructor(){
    if(instance !== null){
      return instance;
    }
  }



  async fetchSendMoneyReasons(){
    const response =  await axiosInstance.get(`/sendmoney/reasons`);

    const data = response.data;
    // console.log(data , 'reasons data');

    return data;
  }

  async getCountries(){
    const response =  await axiosInstance.get(`/utils/countries`);

    const data = response.data;

    return data;
  }
  
  
  async getConversionRates(details){
    const response =  await axiosInstance.post(`/sendmoney/get-rate`,details);
  
    const data = response.data;
  
    return data;
    
  }


  async createRecipient(details){
    const response =  await axiosInstance.post(`/recipient/create`,details);
  
    const data = response.data;
    return data;
  }
  async getRecipients(){
    const response =  await axiosInstance.get(`/recipients`);
  
    const data = response.data;
    return data;
  }


  async createTransaction(details){
    const response =  await axiosInstance.post(`/transaction/create`,details);
  
    const data = response.data;
  
    return data;
  }

  async getSumSubToken(){
    const response =  await axiosInstance.get(`/sumsub`);
  
    const data = response.data.data;
  
    return data;
  }
  async postToTrustPayment(details){
    const response =  await axiosInstance.post(`/trustpayment`,details);
    
    const data = response.data;
  
    return data;
  }


  async getTransactions(){
    const response =  await axiosInstance.get(`/transactions`);
  
    const data = response.data.data;
  
    return data;
  }
  async getTransaction(reference){
    const response =  await axiosInstance.get(`/transaction/reference/${reference}`);
  
    const data = response.data.data;
  
    return data;
  }

}






const utilsService = new UtilsService();

export default utilsService;