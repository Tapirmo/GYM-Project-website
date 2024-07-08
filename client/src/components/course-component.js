import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import course1 from "./img/course1.svg";
import course2 from "./img/course2.svg";
import courseService from "../services/course.service";
import authService from "../services/auth.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  //導向修改課程畫面(教練操作)
  const handleUpdateCourse = (courseId) => {
    navigate(`/updateCourse/${courseId}`);
  };
//教練可以刪除課程
  const handleDeleteCourse = (e) => {
    const courseId = e.target.id;
    if (window.confirm("您確定要刪除這個課程嗎？按下確定後即刪除課程!")) {
      console.log("正在刪除課程");
      courseService
        .deleteCourse(courseId)
        .then(() => {
          window.alert("課程刪除成功!");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          window.alert("刪除課程時發生錯誤。");
        });
    }
  };
  //導向添加課程畫面
  const handleAddCourse = () => {
    navigate("/allCourse");
  };
  //退出註冊的課程(學生操作)
  const handleQuit = (e) => {
    courseService
      .quit(e.target.id)
      .then(() => {
        window.alert("課程退出成功!!重新導向選課頁面。");
        setCurrentUser(authService.getCurrentUser());
        navigate("/allCourse");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [courseData, setCourseData] = useState(null);
  
  //使用者是教練可以查看已發佈的課程，學員可以註冊課程
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        courseService
          .get(_id)
          .then((data) => {
            console.log(data.data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        courseService
          .getEnrolledCourses(_id)
          .then((data) => {
            console.log(data.data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <div className="p-3 mb-3 bg-info-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-4 fw-bold">
                <img
                  src={course1}
                  alt="good"
                  style={{ height: "10%", width: "10%" }}
                ></img>
                教練的課程頁面。
              </h4>
              <p>
                教練您好，這是您目前在HAPPY GYM所開設的課程。
                <br />
                您可以作課程修改或是刪除課程，也可以確認現在學生人數。
              </p>
            </div>
          </div>
        </div>
      )}
      {currentUser.user.role == "instructor" &&
        currentUser &&
        courseData &&
        courseData.length != 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course) => {
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
                  <button
                    style={{ margin: "0.5rem 0rem" }}
                    className="btn btn-outline-secondary"
                    onClick={() => handleUpdateCourse(course._id)}
                  >
                    修改課程內容
                  </button>
                  <br />
                  <button
                    id={course._id}
                    className="btn btn-outline-danger"
                    onClick={handleDeleteCourse}
                  >
                    刪除課程
                  </button>
                </div>
              );
            })}
          </div>
        )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <div className="p-3 mb-3 bg-warning-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-4 fw-bold">
                <img
                  src={course2}
                  alt="good"
                  style={{ height: "13%", width: "13%" }}
                ></img>
                學員的課程頁面。
              </h4>
              <p>
                同學您好，以下是您目前已經註冊的課程。
                <br />
                想查閱更多課程並註冊，請點選Add Course按鈕。
              </p>
              <button
                className="btn btn-outline-secondary"
                onClick={handleAddCourse}
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
      {currentUser.user.role == "student" &&
        currentUser &&
        courseData &&
        courseData.length != 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courseData.map((course) => {
              return (
                <div
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
                  </div>
                  <button
                    id={course._id}
                    className="btn btn-secondary btn-lg"
                    onClick={handleQuit}
                  >
                    退出課程
                  </button>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
};

export default CourseComponent;
