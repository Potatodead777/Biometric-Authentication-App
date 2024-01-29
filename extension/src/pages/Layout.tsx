import { Outlet, Link } from "react-router-dom";
import Logo from "../images/logo.png";

import "../App.css";
const Layout = () => {
  return (
    <>
      <nav>
        <img src={Logo} alt="Logo" />
      </nav>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
