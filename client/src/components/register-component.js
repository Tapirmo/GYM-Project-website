import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import register1 from "./img/register1.svg";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [birthday, setBirthday] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  //註冊時所需的資料
  const handleRegister = () => {
    AuthService.register(username, birthday, email, password, role)
      .then(() => {
        window.alert("恭喜您，註冊成功。您現在將被導向登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
        <div className="container-fluid py-4">
          <h4 className="display-5 fw-bold">
            <img src={register1} alt="about gym" className="about-gym-icon" />
            加入HAPPY GYM
          </h4>
          <p className="col-md-8 fs-8">
            不論你是學員還是教練，都非常歡迎您加入我們。
            <br />
            一起來體驗健康運動的生活。
          </p>
        </div>
      </div>
      <div className="col-md-12">
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          <div>
            <label htmlFor="username">用戶名稱:</label>
            <input
              onChange={handleUsername}
              type="text"
              className="form-control"
              name="username"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">電子信箱：</label>
            <input
              onChange={handleEmail}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="birthday">生日：</label>
            <input
              onChange={handleBirthday}
              type="date"
              className="form-control"
              name="birthday"
              placeholder="1993/05/13"
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
              placeholder="長度至少超過6個英文或數字"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">身份：</label>
            <select onChange={handleRole} className="form-control" name="role">
              <option>請選擇身分別</option>
              <option>student</option>
              <option>instructor</option>
            </select>
          </div>
          <br />
          <button onClick={handleRegister} className="btn btn-primary">
            <span>註冊會員</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
