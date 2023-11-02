import { Outlet, useNavigate } from "react-router-dom";
import '../App.css'
const Layout = () => {
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    <>
    <nav className="navBar">
      <section onClick={() => changePage('/')}>
        Logo
      </section>
      <section className="NavButtons">
        <div onClick={() => changePage('passwords')}>
          Passwords
        </div>
        <div onClick={() => changePage('profile')}>
          Profile
        </div>
        <div onClick={() => changePage('about')}>
          About
        </div>
      </section>
      <section className="DarkModeProfile">
        <div>
          Dark
        </div>
        <div>
          Sign Out/In
        </div>
      </section>
      {/* remove and add link to div */}
    </nav>
      <Outlet />
    </>
  )
};

export default Layout;  