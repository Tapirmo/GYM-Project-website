import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

//導覽列可執行登出功能
const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功，您會被導向首頁");
    setCurrentUser(null);
  };


  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    <i class="fa-solid fa-house"></i> Hompe page
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/aboutGym">
                    <i class="fa-solid fa-people-roof"></i> About gym
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/allCourse">
                    <i class="fa-solid fa-book-open"></i> All course
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i class="fa-solid fa-pen"></i> Register
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i class="fa-solid fa-door-open"></i> Login
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/">
                      <i class="fa-solid fa-right-from-bracket"></i> Logout
                    </Link>
                  </li>
                )}
                
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i class="fa-regular fa-address-card"></i> Profile
                    </Link>
                  </li>
                
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      <i class="fa-solid fa-dumbbell"></i> Course
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "instructor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postCourse">
                      <i class="fa-solid fa-book-open-reader"></i> Post course
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "student" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/enroll">
                      <i class="fa-solid fa-book-atlas"></i> Search course
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
