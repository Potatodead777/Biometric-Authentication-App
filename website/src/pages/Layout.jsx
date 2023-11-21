import { Outlet, useNavigate } from "react-router-dom";
import '../App.css'
import logo from '../images/logo.png'
const Layout = () => {
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    <>
      <nav className="navBar">
        <section onClick={() => changePage('/')}>
          <img src={logo} height={80} className="clickable nonselect"/>
        </section>
        <section className="NavButtons">
          <div onClick={() => changePage('passwords')} className="clickable button">
            Passwords
          </div>
          <div onClick={() => changePage('profile')} className="clickable button">
            Profile
          </div>
          <div onClick={() => changePage('about')} className="clickable button">
            About
          </div>
        </section>
        <section className="DarkModeProfile">
          <div className="dark-mode-button clickable material-symbols-outlined">
            dark_mode
          </div>
          <div onClick={() => changePage('signin')} className="clickable sign-in-button">
            Sign Out/In
          </div>
        </section>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;  