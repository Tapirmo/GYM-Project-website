import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import search1 from "./img/search1.svg";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

//搜尋課程
  const handleSearch = () => {
    console.log("正在處理搜尋");
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

//註冊課程
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert("課程註冊成功!! 重新導向到課程頁面。");
        navigate("/course");
      })
      .catch((e) => {
        window.alert("您已經註冊過此課程，無法重複註冊。");
        console.log(e);
      });
  };

//搜尋課程的頁面只有學生可以查看並搜尋
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能開始註冊課程。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生才能註冊課程</h1>
        </div>
      )}

      {currentUser && currentUser.user.role == "student" && (
        <div>
          <div className="p-3 mb-3 bg-warning-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-4 fw-bold">
                <img
                  src={search1}
                  alt="good"
                  style={{ height: "13%", width: "13%" }}
                ></img>
                搜尋課程
              </h4>
              <p>
                同學您好，還在找尋課程嗎?
                <br />
                可以在下列搜尋列輸入課程名稱(全名)，來找查課程。
              </p>
            </div>
          </div>
          <div className="search input-group mb-3">
            <input
              type="text"
              className="form-control"
              onChange={handleChangeInput}
              placeholder="需輸入課程全名才能搜尋"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              搜尋課程
            </button>
          </div>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>這是我們從API返回的數據:</p>
          {searchResult.map((course) => {
            return (
              <div key={course._id} class="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {course.price}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程講師: {course.instructor.username}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    上課日期: {course.courseDate}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    上課時間: {course.courseTime}
                  </p>
                  <a
                    href="#"
                    id={course._id}
                    className="card-text btn btn-primary"
                    onClick={handleEnroll}
                  >
                    註冊課程
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
