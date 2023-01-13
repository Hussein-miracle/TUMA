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

}






const utilsService = new UtilsService();

export default utilsService;