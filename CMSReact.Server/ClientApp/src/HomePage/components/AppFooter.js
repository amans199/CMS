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
                Our CMS streamlines clinic operations by integrating scheduling, patient management, prescriptions, 
                and billing into one platform. This reduces errors and administrative tasks, allowing healthcare providers 
                to focus on delivering high-quality patient care.
              </p>

              <div className="schedule">
                <div className="schedule-icon">
                  <ion-icon name="time-outline"></ion-icon>
                </div>

                <span className="span">
                  Saturday - Thursday:
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
            </ul>

            <ul className="footer-list" id="contact">
              <li>
                <p className="footer-list-title">Contact Us</p>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="location-outline"></ion-icon>
                </div>

                <address className="item-text">
                  Cairo, Egypt
                </address>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="call-outline"></ion-icon>
                </div>

                <a href="tel:+201001234567" className="contact-link">
                  (+20)1001234567
                </a>
              </li>

              <li className="footer-item">
                <div className="item-icon">
                  <ion-icon name="mail-outline"></ion-icon>
                </div>

                <a href="mailto:info@cms.com.eg" className="contact-link">
                  info@cms.com.eg
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p className="copyright">&copy; 2024 All Rights Reserved.</p>
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
