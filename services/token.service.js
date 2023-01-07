class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user).refreshToken;
    }
  }

  getLocalAccessToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  updateLocalAccessToken(token) {
    if (typeof token === "string") {
      localStorage.setItem("token", token);
    } 
  }



  getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  setExpiration(date){
    // console.log('date',date);
    localStorage.setItem('expirationDate',date);
  }

  getExpirationDate(){
    const date = localStorage.getItem('expirationDate');

    return date;
  }


  removeExpirationDate(){
    localStorage.removeItem("expirationDate");
  }

  removeToken() {
    localStorage.removeItem("token");
    this.removeExpirationDate();
  }
}


const tokenService =  new TokenService();
export default tokenService;
