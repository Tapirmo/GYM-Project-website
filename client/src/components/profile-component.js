import { useNavigate } from "react-router-dom";
import profile1 from "./img/profile1.svg";
import profile2 from "./img/profile2.svg";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
const navigate = useNavigate();
const handleLogin = () => {
  navigate("/login");
};

//格式化生日日期
const formatDate = (dateString) => {
  if (!dateString) return "未提供";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//顯示教練或學員註冊時的個人資料
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <div className="p-3 mb-3 bg-info-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-5 fw-bold">
                <img
                  src={profile2}
                  alt="good"
                  style={{ height: "15%", width: "15%" }}
                ></img>
                HAPPY GYM的個人頁面
              </h4>
              <p>親愛的會員，您尚未登入HAPPY GYM的會員系統。</p>
            </div>
          </div>
          <div>在獲取您的個人資料之前，您必須先登錄。
            <br/>
            如果您已經登入，請重新整理此頁面。
          </div>
          <button
            style={{ margin: "0.5rem 0rem" }}
            className="btn btn-outline-secondary"
            onClick={handleLogin}
          >
            登入會員
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <div className="p-3 mb-3 bg-info-subtle rounded-3">
            <div className="container-fluid py-4">
              <h4 className="display-5 fw-bold">
                <img
                  src={profile1}
                  alt="good"
                  style={{ height: "15%", width: "15%" }}
                ></img>
                HAPPY GYM的個人頁面
              </h4>
              <p>親愛的會員，以下是您在HAPPY GYM所註冊的個人資料。</p>
            </div>
          </div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>生日：{formatDate(currentUser.user.birthday)}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

 
   
 

export default ProfileComponent;