import * as React from "react";

function AppFooter(props) {
  return (
    <>
      <footer className="footer">
        <div className="footer-top section">
          <div className="container">
            <div className="footer-brand">
              <a href="#" className="logo">
                CMS
              </a>

              <p className="footer-text">
                For any questions or technical support regarding our Clinic Management System (CMS),
                our dedicated team is available to assist you you can always email us at info@cms-eg.com
              </p>

              <div className="schedule">
                <div className="schedule-icon">
                  <ion-icon name="time-outline"></ion-icon>
                </div>

                <span className="span">
                  Sunday - Thursday
                  <br />
                  9:00am - 5:00Pm
                </span>
              </div>
            </div>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Other Links</p>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Home</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">About Us</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Services</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Our Team</span>
                </a>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Contact Us</p>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="location-outline"></ion-icon>
                </div>

                <address className="item-text">
                  Cairo University, Egypt
                </address>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="call-outline"></ion-icon>
                </div>

                <a href="tel:+917052101786" className="footer-link">
                  (+20) 01001234567
                </a>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="mail-outline"></ion-icon>
                </div>

                <a href="mailto:info@cms-eg.com" className="footer-link">
                  info@cms-eg.com
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
