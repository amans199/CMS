import { useEffect, useState } from "react";
import { getUserData, removeCurrentUser } from "utils";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.gif";

function AppHeader(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = getUserData();

    if (user) {
      setUserData(user);
    }
  }, []);

  const handleLogOut = () => {
    removeCurrentUser();
    // navigate("/sign-in");
    window.location.replace("/sign-in");
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <ul className="contact-list">
              <li className="contact-item">
                <a href="mailto:info@cms.com.eg" className="contact-link">
                  info@cms.com.eg
                </a>
              </li>

              <li className="contact-item">
                <ion-icon name="call-outline"></ion-icon>
                <a href="tel:+201001234567" className="contact-link">
                  (+20)1001234567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-bottom" data-header>
          <div className="container">
            <a href="#" className="logo">
              <img className="logo" src={logo} width="40" height="40" alt="" />
              CMS
            </a>

            <nav className="navbar container" data-navbar>
              <ul className="navbar-list">
                <li>
                  <a href="#home" className="navbar-link" data-nav-link>
                    Home
                  </a>
                </li>

                <li>
                  <a href="#service" className="navbar-link" data-nav-link>
                    Services
                  </a>
                </li>

                <li>
                  <a href="#about" className="navbar-link" data-nav-link>
                    About Us
                  </a>
                </li>

                <li>
                  <a href="#contact" className="navbar-link" data-nav-link>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <a href="#cta" className="btn">
              Book
            </a>
            {userData?.username ? (
              <>
                <a href="/dashboard" className="btn">
                  Dashboard
                </a>
                <a href="#" className="btn btn-danger bg-danger" onClick={handleLogOut}>
                  Logout
                </a>
              </>
            ) : (
              <a href="/sign-in" className="btn">
                Sign in
              </a>
            )}

            <button className="nav-toggle-btn" aria-label="Toggle menu" data-nav-toggler>
              <ion-icon name="menu-sharp" aria-hidden="true" className="menu-icon"></ion-icon>
              <ion-icon name="close-sharp" aria-hidden="true" className="close-icon"></ion-icon>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
