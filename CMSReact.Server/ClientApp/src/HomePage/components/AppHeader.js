import { useEffect, useState } from "react";
import { getUserData, removeCurrentUser } from "utils";
import { useNavigate } from "react-router-dom";

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
                {/* <MailOutline title="nothing" color={"#00000"} height="250px" width="250px" /> */}
                <a href="mailto:info@cms-eg.com" className="contact-link">
                  info@cms-eg.com
                </a>
              </li>

              <li className="contact-item">
                <ion-icon name="call-outline"></ion-icon>

                <a href="tel:+201001234567" className="contact-link">
                  (+20) 01001234567
                </a>
              </li>
            </ul>

            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-youtube"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-bottom" data-header>
          <div className="container">
            <a href="#" className="logo">
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
                  <a href="#" className="navbar-link" data-nav-link>
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
