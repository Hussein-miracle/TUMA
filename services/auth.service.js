import axiosInstance from "./axios.instance";

let instance = null;
class AuthService {
  constructor() {
    if (instance !== null) {
      return instance;
    }
  }
  async postLogin(details) {
    // console.log(details , 'details')
    return await axiosInstance.post("/login", details);
  }
  async postLogout() {
    return await axiosInstance.post("/logout");
  }
  async register(details) {
    // console.log(details,'details')
    // try {
    const res = await axiosInstance.post("auth/register", details);

    console.log(res , 'res');
    // const response = await axiosInstance.post("/signup",details);

    return res;
    // const data = response.data;

    // return data;
    // } catch (err){
    //   console.error(err);
    // }
  }

  async verifyOtp(details) {
    const response = await axiosInstance.post("/verify/code", details);


    // console.log('Refresh?',response);

    if (response.data.access_token) {
      TokenService.setToken(response.data.access_token);
    }
    return response;
  }

  async getRefreshToken(){
    const response = await axiosInstance.post("/refresh/token");
    
    console.log(response,'refreshRes');

    return response;
  }
}

const authService = new AuthService();

export default authService;
