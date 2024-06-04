import * as React from "react";

import doctorFirst from "assets/images/doctor-1.png";
import doctorSecond from "assets/images/doctor-2.png";
import doctorThird from "assets/images/doctor-3.png";
import doctorFourth from "assets/images/doctor-4.png";

function AppDoctorSection(props) {
  return (
    <section className="section doctor" aria-label="doctor">
      <div className="container">
        <p className="section-subtitle text-center">Our Doctor</p>

        <h2 className="h2 section-title text-center">Best Expert Doctor</h2>

        <ul className="has-scrollbar">
          <li className="scrollbar-item">
            <div className="doctor-card">
              <div
                className="card-banner img-holder"
                //   style="--width: 460; --height: 500;"
              >
                <img
                  src={doctorFirst}
                  width="460"
                  height="500"
                  loading="lazy"
                  alt="Howard Holmes"
                  className="img-cover"
                />
              </div>

              <h3 className="h3">
                <a href="#" className="card-title">
                  Howard Holmes
                </a>
              </h3>

              <p className="card-subtitle">Doctor</p>

              <ul className="card-social-list">
                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="doctor-card">
              <div
                className="card-banner img-holder"
                //   style="--width: 460; --height: 500;"
              >
                <img
                  src={doctorSecond}
                  width="460"
                  height="500"
                  loading="lazy"
                  alt="Ella Thompson"
                  className="img-cover"
                />
              </div>

              <h3 className="h3">
                <a href="#" className="card-title">
                  Ella Thompson
                </a>
              </h3>

              <p className="card-subtitle">Doctor</p>

              <ul className="card-social-list">
                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="doctor-card">
              <div
                className="card-banner img-holder"
                //   style="--width: 460; --height: 500;"
              >
                <img
                  src={doctorThird}
                  width="460"
                  height="500"
                  loading="lazy"
                  alt="Vincent Cooper"
                  className="img-cover"
                />
              </div>

              <h3 className="h3">
                <a href="#" className="card-title">
                  Vincent Cooper
                </a>
              </h3>

              <p className="card-subtitle">Doctor</p>

              <ul className="card-social-list">
                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="doctor-card">
              <div
                className="card-banner img-holder"
                //   style="--width: 460; --height: 500;"
              >
                <img
                  src={doctorFourth}
                  width="460"
                  height="500"
                  loading="lazy"
                  alt="Danielle Bryant"
                  className="img-cover"
                />
              </div>

              <h3 className="h3">
                <a href="#" className="card-title">
                  Danielle Bryant
                </a>
              </h3>

              <p className="card-subtitle">Doctor</p>

              <ul className="card-social-list">
                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li>
                  <a href="#" className="card-social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AppDoctorSection;
