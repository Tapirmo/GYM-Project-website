import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import login1 from "../components/img/login1.svg";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  //帳號
  let [email, setEmail] = useState("");
  //密碼
  let [password, setPassword] = useState("");
  //輸入帳密不正確時，所顯示的訊息
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //登入本地驗證
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功! 您將被導向個人頁面。");
       setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div className="p-3 mb-3 bg-info-subtle rounded-3">
        <div className="container-fluid py-4">
          <h4 className="display-5 fw-bold">
            <img
              src={login1}
              alt="good"
              style={{ height: "20%", width: "20%" }}
            ></img>
            登入HAPPY GYM
          </h4>
          <p className="col-md-8 fs-8">
            已經有學員/教練身分了嗎?
            <br />
            快點來登入，一起來上課吧。
          </p>
        </div>
      </div>
      <div className="col-md-12">
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          <div className="form-group">
            <label htmlFor="username">電子信箱：</label>
            <input
              onChange={handleEmail}
              type="text"
              className="form-control"
              name="email"
              placeholder="請輸入電子信箱"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">密碼：</label>
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              name="password"
              placeholder="密碼長度不得小於6字元"
            />
          </div>
          <br />
          <div className="form-group">
            <button onClick={handleLogin} className="btn btn-primary btn-block">
              <span>登入系統</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
