import { Outlet } from "react-router-dom";
import Nav from "./nav-component";

//導覽列會區分已登入和未登入顯示的狀態
const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
