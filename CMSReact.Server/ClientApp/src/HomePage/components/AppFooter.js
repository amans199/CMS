import * as React from "react";

function AppFooter(props) {
  return (
    <>
      <footer className="footer">
        <div className="footer-top section">
          <div className="container">
            <div className="footer-brand">
              <a href="#" className="logo">
                CMS.
              </a>

              <p className="footer-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer
              </p>

              <div className="schedule">
                <div className="schedule-icon">
                  <ion-icon name="time-outline"></ion-icon>
                </div>

                <span className="span">
                  Monday - Saturday:
                  <br />
                  9:00am - 10:00Pm
                </span>
              </div>
            </div>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Other Links</p>
              </li>

              <li>
                <a href="#home" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Home</span>
                </a>
              </li>

              <li>
                <a href="#about" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">About Us</span>
                </a>
              </li>

              <li>
                <a href="#service" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Services</span>
                </a>
              </li>
              {/* 
              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Project</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Our Team</span>
                </a>
              </li> */}

              {/* <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Latest Blog</span>
                </a>
              </li> */}
            </ul>

            <ul className="footer-list ml-auto">
              <li>
                <p className="footer-list-title">Contact Us</p>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="location-outline"></ion-icon>
                </div>

                <address className="item-text">
                  1247/Plot No. 39, 15th Phase, LHB Colony, Kanpur
                </address>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="call-outline"></ion-icon>
                </div>

                <a href="tel:+917052101786" className="footer-link">
                  +91-7052-101-786
                </a>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="mail-outline"></ion-icon>
                </div>

                <a href="mailto:help@example.com" className="footer-link">
                  help@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p className="copyright">&copy; 2022 All Rights Reserved by codewithsadee.</p>

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
            </ul>
          </div>
        </div>
      </footer>

      <a href="#top" className="back-top-btn" aria-label="back to top" data-back-top-btn>
        <ion-icon name="caret-up" aria-hidden="true"></ion-icon>
      </a>
    </>
  );
}

export default AppFooter;
