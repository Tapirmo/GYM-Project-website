import React from 'react'
import notFound1 from "./img/notFound1.svg";

//網址輸入錯誤的頁面
const NotFound = () => {
  return (
    <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
      <div className="container-fluid py-4">
        <h4 className="display-5 fw-bold">
          <img src={notFound1} alt="notFound" className="notFound" />
          Opps! 沒有這個頁面。
        </h4>
        <p className="col-md-8 fs-8">
          荒煙漫草...
          <br />
          並沒有這個頁面快點離開吧。
        </p>
      </div>
    </div>
  );
}

export default NotFound