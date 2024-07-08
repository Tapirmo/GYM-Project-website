import axios from "axios";
const API_URL = "http://localhost:8080/api/user"; //後端port

//連接後端auth routes
class AuthService {
  //登入
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  //登出
  logout() {
    localStorage.removeItem("user");
  }

  //註冊
  register(username, birthday, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      birthday,
      email,
      password,
      role,
    });
  }

  //現在登入的使用者(影響可瀏覽頁面)
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
