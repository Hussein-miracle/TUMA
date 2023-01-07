import axiosInstance from "./axios.instance";

let instance = null;

class SettingsService{
  constructor(){
    if(instance !== null){
      return instance;
    }
  }



  async changePassword(details){
    const response =  await axiosInstance.get(`url`,details);

    const data = response.data;

    return data;
  }

}






const overService = new OverviewService();

export default overService;