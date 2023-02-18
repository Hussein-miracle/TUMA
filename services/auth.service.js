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
    return await axiosInstance.post("auth/login", details);
  }
  async postLogout() {
    return await axiosInstance.post("/logout");
  }
  async register(details) {
    // console.log(details,'details')
    // try {
    const res = await axiosInstance.post("/auth/register", details);

    // console.log(res , 'res');
    // const response = await axiosInstance.post("/signup",details);

    return res;
    // const data = response.data;

    // return data;
    // } catch (err){
    //   console.error(err);
    // }
  }

  async verifyOtp(details) {
    const response = await axiosInstance.post("auth/register/verify", details);

    // console.log('verify res',response);

    if (response.data.api_token) {
      TokenService.setToken(response.data.api_token);
    }
    return response;
  }

  async getRefreshToken() {
    const response = await axiosInstance.post("/refresh/token");

    console.log(response, "refreshRes");

    return response;
  }

  async changePassword(details) {
    const res = await axiosInstance.post("/auth/password/change", details);

    const data = res.data;
    return data;
  }

  async forgotPassword(details) {
    const res = await axiosInstance.post("/auth/password/forgot", details);

    const data = res.data;

    return data;
  }

  async deleteAccount(details){
    const res = await axiosInstance.post(`/auth/delete`, details);
    const data = res.data;
    return data;
  }
}

const authService = new AuthService();

export default authService;
