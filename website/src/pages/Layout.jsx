import { Outlet, useNavigate } from "react-router-dom";
import '../App.css'
import logo from '../images/logo.png'
import { useCookies } from "react-cookie";
const Layout = () => {
  const [cookies, removeCookie] = useCookies(['uid']);
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  const changePage2 = (page) => {
    if (cookies.uid == null || cookies.uid == 'undefined'){
    navigate('signin');
    }else{
      navigate(page);

    }
  }


  const signinout = (e) => {
    if (cookies.uid != null && cookies.uid != 'undefined'){
      removeCookie("uid")
      changePage('/')
    }else(
      changePage('signin')
    )
  }



  return (
    <>
      <nav className="navBar">
        <section onClick={() => changePage('/')}>
          <img src={logo} height={80} className="clickable nonselect" data-testid="layout-image"/>
        </section>
        <section className="NavButtons">
          <div onClick={() => changePage2('passwords')} className="clickable button" data-testid="layout-password">
            Passwords
          </div>
          <div onClick={() => changePage2('profile')} className="clickable button" data-testid="layout-profile">
            Profile
          </div>
          <div onClick={() => changePage('about')} className="clickable button" data-testid="layout-about">
            About
          </div>
        </section>
        <section className="DarkModeProfile">
          <div className="dark-mode-button clickable material-symbols-outlined" data-testid="layout-question">
            question_mark
          </div>
          <div onClick={() => signinout('signin')} className="clickable sign-in-button" data-testid="layout-signin">
            {cookies.uid != null ? ('Sign Out') : ('Sign In')}
          </div>
        </section>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;  