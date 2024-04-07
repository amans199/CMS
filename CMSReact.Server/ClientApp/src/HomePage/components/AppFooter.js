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
                Mauris non nisi semper, lacinia neque in, dapibus leo. Curabitur sagittis libero
                tincidunt tempor finibus. Mauris at dignissim ligula, nec tristique orci.Quisque
                vitae metus.
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

                  <span className="span">Project</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Our Team</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Latest Blog</span>
                </a>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Our Services</p>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Root Canal</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Alignment Teeth</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Cosmetic Teeth</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Oral Hygiene</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Live Advisory</span>
                </a>
              </li>

              <li>
                <a href="#" className="footer-link">
                  <ion-icon name="add-outline"></ion-icon>

                  <span className="span">Cavity Inspection</span>
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
