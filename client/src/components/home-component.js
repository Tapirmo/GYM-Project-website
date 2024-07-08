import React from "react";
import { useNavigate } from "react-router-dom";
import train1 from "./img/train1.svg";
import train2 from "./img/train2.svg";
import homepage2 from "./img/homepage2.svg";
import homepage3 from "./img/homepage3.svg";
import homepage4 from "./img/homepage4.svg";
import homepage5 from "./img/homepage5.svg";

const HomeComponent = () => {
  const navigate = useNavigate();

//導向所有課程
  const handleAddCourse = () => {
    window.alert("一起來看看有哪些課程吧!");
    navigate("/allCourse");
  };

//導向張貼課程
  const handlePost = () => {
    window.alert("開始來上架新課程吧!");
    navigate("/postCourse");
  };

//這是首頁
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-body-secondary rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">
              <img
                src={train1}
                alt="good"
                style={{ height: "20%", width: "20%" }}
              ></img>
              <img
                src={homepage4}
                alt="good"
                style={{ height: "18%", width: "18%" }}
              ></img>
              HAPPY GYM
              <img
                src={train2}
                alt="good"
                style={{ height: "15%", width: "13%" }}
              ></img>
              <img
                src={homepage5}
                alt="good"
                style={{ height: "22%", width: "20%" }}
              ></img>
            </h1>

            <p className="col-md-8 fs-4">
              歡迎來到HAPPY
              GYM。本網站是由後端node.js及express.js框架，及前端框架React所撰寫的Side
              project。
              <br />
              使用者可以依照自己身分別，登入學員或教練。
              <br />
              學員可以登記運動課程。
              <br />
              教練可以新增、修改或刪除課程。
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="bg-success p-5 text-dark bg-opacity-10 border rounded-3">
              <h2>
                <img
                  src={homepage2}
                  alt="good"
                  style={{ height: "35%", width: "35%" }}
                ></img>
                我是學員
              </h2>
              <p>
                想要享受暢快淋漓運動的感覺嗎?
                <br />
                歡迎你挑選有興趣的課程。
                <br />
              </p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddCourse}
              >
                立即來選課
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-warning-subtle bg-opacity-10 border rounded-3">
              <h2>
                <img
                  src={homepage3}
                  alt="good"
                  style={{ height: "45%", width: "45%" }}
                ></img>
                我是教練
              </h2>
              <p>
                您可以在這裡發揮專業，上架課程。。
                <br />
                推廣課程給更多人知道。
              </p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handlePost}
              >
                今天開始開設課程
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2024 Ming-Yuan Chao Side Project
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
