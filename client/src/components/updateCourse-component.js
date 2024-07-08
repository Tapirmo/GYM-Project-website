import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../services/course.service";
import update1 from "./img/update1.svg";

const UpdateCourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  //取得課程id
  const { courseId } = useParams();
  console.log("正在更新課程，courseId:", courseId); //terminal上確認

  //修改的課程內容
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [courseDate, setCourseDate] = useState("");
  let [courseTime, setCourseTime] = useState("");
  let [message, setMessage] = useState("");

  //找到要修改的課程
  useEffect(() => {
    if (courseId) {
        console.log("Fetching course with ID:", courseId);
      CourseService.get(courseId).then(
        (response) => {
          const course = response.data;
          setTitle(course.title);
          setDescription(course.description);
          setPrice(course.price);
          setCourseDate(course.courseDate);
          setCourseTime(course.courseTime);
        },
        (error) => {
          setMessage("找不到課程。");
        }
      );
    }
  }, [courseId]);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
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

//修改課程
   const handleUpdateCourse = () => {
    console.log("Updating course with ID:", courseId);
     CourseService.courseUpdate(
       courseId,
       title,
       description,
       price,
       courseDate,
       courseTime
     )
       .then(() => {
         window.alert("新課程已修改成功");
         navigate("/course");
       })
       .catch((error) => {
         console.error("Update course error:", error);
         setMessage(
           error.response.data.message || JSON.stringify(error.response.data)
         );
       });
   };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>只有教練才可以訪問這個頁面，進行課程修改。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser &&
        currentUser.user.role == "instructor" && (
          <div className="form-group">
            <div className="p-3 mb-3 bg-info-subtle rounded-3">
              <div className="container-fluid py-4">
                <h3 className="display-5 fw-bold">
                  <img
                    src={update1}
                    alt="good"
                    style={{ height: "15%", width: "15%" }}
                  ></img>
                  修改課程
                </h3>
                <p className="col-md-8 fs-8">
                  教練您好，您可以在這個頁面進行課程修改。
                  <br />
                  修改後按下送出，會重新發佈課程。
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
            <button className="btn btn-primary" onClick={handleUpdateCourse}>
              交出表單
            </button>
            <br />
            <br />
            {message && (
              <div className="alert alert-warning" role="alert">
                {typeof message === "string"
                  ? message
                  : JSON.stringify(message)}
              </div>
            )}
          </div>
          
        )}
    </div>
  );
};

export default UpdateCourseComponent;
