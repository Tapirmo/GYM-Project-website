import React from "react";
import aboutGym1 from "./img/aboutGym1.svg";
import fontend1 from "./img/fontend1.svg";
import backend1 from "./img/backend1.svg";
import "./style/AboutGymComponent.css"; 

const AboutGymComponent = () => {
  return (
    <div className="about-gym-container">
      <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
        <div className="container-fluid py-4">
          <h4 className="display-5 fw-bold">
            <img src={aboutGym1} alt="about gym" className="about-gym-icon" />
            關於HAPPY GYM
          </h4>
          <p className="col-md-8 fs-8">
            這是我撰寫的Side project，為一個健身房網頁。
            <br />
            使用者可以註冊為學員或是教練，並在其上註冊或是發表課程。
          </p>
        </div>
      </div>
      <div className="about-gym-content">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={fontend1}
                className="img-fluid rounded-start"
                alt="前端網站"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Front-end/前端網頁</h5>
                <ul className="card-text">
                  <li>我的前端網頁建立框架為React</li>
                  <li>圖片來源為unDraw(免費授權圖片網站)</li>
                  <li>使用axios來fetch後端router的data</li>
                </ul>
                <p className="card-text">
                  <small className="text-body-secondary">
                    覺得有哪些需要改進的部分?歡迎來信給我 uuya153@gmail.com
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={backend1}
                className="img-fluid rounded-start"
                alt="後端服務"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Back-end/後端服務</h5>
                <ul className="card-text">
                  <li>後端使用 Node.js 和 Express 框架</li>
                  <li>資料庫使用 MongoDB</li>
                  <li>實現了 RESTful API 設計</li>
                </ul>
                <p className="card-text">
                  <small className="text-body-secondary">
                    有任何建議或問題嗎？歡迎聯繫我 uuya153@gmail.com
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGymComponent;