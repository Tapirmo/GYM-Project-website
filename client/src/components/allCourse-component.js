import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";
import addCourse1 from "./img/addCourse1.svg";
import addCourse2 from "./img/addCourse2.svg";
import addCourse3 from "./img/addCourse3.svg";

const AllCourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  //導向登入頁面
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  //學生無法重複註冊
  const handleEnroll = (e) => {
    courseService
      .enroll(e.target.id)
      .then(() => {
        window.alert("課程註冊成功!! 重新導向到課程頁面。");
        navigate("/course");
      })
      .catch((e) => {
        window.alert("您已經註冊過此課程，無法重複註冊。");
        console.log(e);
      });
  };

  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    if (currentUser) {
      courseService
        .getAllCourse()
        .then((data) => {
          console.log(data.data);
          setCourseData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    //使用未登入會被要求登入
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-5 fw-bold">
                <img
                  src={addCourse1}
                  alt="about gym"
                  className="about-gym-icon"
                />
                課程頁面
              </h4>
              <p className="col-md-8 fs-8">
                歡迎來到課程頁面，目前您尚未登入，需登入才能看到目前所有的課程。
                <br />
                學員可以註冊課程，而教練可以看到目前有哪些課程已上線。
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
      {currentUser &&
        currentUser.user.role == "student" &&
        courseData &&
        courseData.length != 0 && (
          //登入者為學生會看到的畫面
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
              <div className="container-fluid py-4">
                <h4 className="display-5 fw-bold">
                  <img
                    src={addCourse2}
                    alt="about gym"
                    className="about-gym-icon"
                  />
                  學員的課程頁面
                </h4>
                <p className="col-md-8 fs-8">
                  學員您好，這是HAPPY GYM的課程頁面。
                  <br />
                  您可以在此瀏覽所有HAPPY GYM的課程，並選擇有興趣的課程註冊。
                </p>
              </div>
            </div>
            {courseData.map((course) => {
              return (
                <div>
                  <div
                    key={course._id}
                    className="card"
                    style={{
                      width: "19.7rem",
                      flexWrap: "wrap",
                      padding: "0.5rem",
                      margin: "0.6rem",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">課程名稱: {course.title}</h5>
                      <p
                        style={{ margin: "0.5rem 0rem" }}
                        className="card-text"
                      >
                        {course.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        學生人數: {course.students.length}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程價格: {course.price}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程日期: {course.courseDate}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        課程時間: {course.courseTime}
                      </p>
                    </div>
                    <button
                      id={course._id}
                      className="btn btn-secondary btn-lg"
                      onClick={handleEnroll}
                    >
                      註冊課程
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      {currentUser &&
        currentUser.user.role == "instructor" &&
        courseData &&
        courseData.length != 0 && (
          //登入者為教練會看到的畫面
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="about-gym-header p-3 mb-3 bg-success-subtle rounded-3">
              <div className="container-fluid py-4">
                <h4 className="display-5 fw-bold">
                  <img
                    src={addCourse3}
                    alt="about gym"
                    className="about-gym-icon"
                  />
                  教練的課程頁面
                </h4>
                <p className="col-md-8 fs-8">
                  教練您好，這是HAPPY GYM的課程頁面。
                  <br />
                  您可以在此瀏覽所有HAPPY GYM的課程(包含其他教練)。
                </p>
              </div>
            </div>
            {courseData.map((course, instructor) => {
              return (
                <div
                  key={course._id}
                  className="card"
                  style={{
                    width: "19.7rem",
                    flexWrap: "wrap",
                    padding: "0.5rem",
                    margin: "0.6rem",
                  }}
                >
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
                      課程日期: {course.courseDate}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      課程時間: {course.courseTime}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      課程教練: {course.instructor.username}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
};

export default AllCourseComponent;
