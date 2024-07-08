import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import post1 from "./img/post1.svg";

//僅有教練可以操作的張貼課程
const PostCourse = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [courseDate, setCourseDate] = useState("");
  let [courseTime, setCourseTime] = useState("");
  let [message, setMessage] = useState("");

  const navigate = useNavigate();

//未登入狀態會先被要求登入
  const handleTakeToLogin = () => {
    navigate("/login");
  };

//張貼課程時需要的資料
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeDate = (e) => {
    setCourseDate(e.target.value);
  };
  const handleChangeTime = (e) => {
    setCourseTime(e.target.value);
  };

  const postCourse = () => {
    console.log("正在創建課程");
    CourseService.post(title, description, price, courseDate, courseTime)
      .then(() => {
        window.alert("新課程已創建成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-5 fw-bold">
                <img src={post1} alt="about gym" className="about-gym-icon" />
                發佈新課程
              </h4>
              <p className="col-md-8 fs-8">
                歡迎來到發佈新課程頁面，目前您尚未登入，需登入才能上架新課程。
                <br />
                只有教練登入後才能訪問此頁面。
              </p>
            </div>
          </div>
          <button
            className="btn btn-secondary btn-lg"
            onClick={handleTakeToLogin}
          >
            立即登入HAPPY GYM
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-5 fw-bold">
                <img src={post1} alt="about gym" className="about-gym-icon" />
                發佈新課程
              </h4>
              <p className="col-md-8 fs-8">
                不好意思，發佈課程功能僅供教練訪問
                <br />
                只有教練登入後才能訪問此頁面。
              </p>
            </div>
          </div>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <div className="p-3 mb-3 bg-info-subtle rounded-3">
            <div className="container-fluid py-4">
              <h3 className="display-5 fw-bold">
                <img
                  src={post1}
                  alt="good"
                  style={{ height: "15%", width: "15%" }}
                ></img>
                發佈新課程
              </h3>
              <p className="col-md-8 fs-8">
                教練您好，歡迎來到課程發佈頁面。
                <br />
                將您的課程放在HAPPY GYM上面~
              </p>
            </div>
          </div>
          <label for="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
            placeholder="請描述課程名稱。"
          />
          <br />
          <label for="exampleforContent">課程內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
            placeholder="請描述課程內容，須超過20個字。"
          />
          <br />
          <label for="exampleforPrice">課程價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
            placeholder="請描述課程價格。"
          />
          <br />
          <label for="exampleforDate">上課日期：</label>
          <input
            name="date"
            type="date"
            className="form-control"
            id="exampleforDate"
            onChange={handleChangeDate}
          />
          <br />
          <label for="exampleforTime">上課時間：</label>
          <input
            name="time"
            type="string"
            className="form-control"
            id="exampleforDate"
            onChange={handleChangeTime}
            placeholder="Ex.14:30"
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            交出表單
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourse;
