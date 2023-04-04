import axiosInstance from "./axios.instance";

let instance = null;

class ProfileService{
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


  async uploadUserImage(details){
    const response =  await axiosInstance.post(`/auth/profile/photo`,details);

    const data = response.data;

    return data;
  }
}






const profileService = new ProfileService();

export default profileService;