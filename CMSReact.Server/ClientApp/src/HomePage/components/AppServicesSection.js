import * as React from "react";

import serviceIconFirst from "assets/images/service-icon-1.png";
import serviceIconSecond from "assets/images/service-icon-2.png";
import serviceIconThird from "assets/images/service-icon-3.png";
import serviceIconFourth from "assets/images/service-icon-4.png";
import serviceIconFifth from "assets/images/service-icon-5.png";
import serviceIconSixth from "assets/images/service-icon-6.png";
import ServiceBanner from "assets/images/service-banner.png";

function AppServicesSection(props) {
  return (
    <section className="section service" id="service" aria-label="service">
      <div className="container">
        <p className="section-subtitle text-center">Our Services</p>

        <h2 className="h2 section-title text-center">What We Provide</h2>

        <ul className="service-list">
          <li>
            <div className="service-card">
              <div className="card-icon">
                <img
                  src={serviceIconFirst}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="service icon"
                  className="w-100"
                />
              </div>

              <div>
                <h3 className="h3 card-title">Root Canal</h3>

                <p className="card-text">
                  Aenean eleifend turpis tellus, nec laoreet metus elementum ac.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img
                  src={serviceIconSecond}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="service icon"
                  className="w-100"
                />
              </div>

              <div>
                <h3 className="h3 card-title">Alignment Teeth</h3>

                <p className="card-text">
                  Aenean eleifend turpis tellus, nec laoreet metus elementum ac.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img
                  src={serviceIconThird}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="service icon"
                  className="w-100"
                />
              </div>

              <div>
                <h3 className="h3 card-title">Cosmetic Teeth</h3>

                <p className="card-text">
                  Aenean eleifend turpis tellus, nec laoreet metus elementum ac.
                </p>
              </div>
            </div>
          </li>

          <li className="service-banner">
            <figure>
              <img
                src={ServiceBanner}
                width="409"
                height="467"
                loading="lazy"
                alt="service banner"
                className="w-100"
              />
            </figure>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img
                  src={serviceIconFourth}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="service icon"
                  className="w-100"
                />
              </div>

              <div>
                <h3 className="h3 card-title">Oral Hygiene</h3>

                <p className="card-text">
                  Aenean eleifend turpis tellus, nec laoreet metus elementum ac.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img
                  src={serviceIconFifth}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="service icon"
                  className="w-100"
                />
              </div>

              <div>
                <h3 className="h3 card-title">Live Advisory</h3>

                <p className="card-text">
                  Aenean eleifend turpis tellus, nec laoreet metus elementum ac.
                </p>
              </div>
            </div>
          </li>

          <li>
            <div className="service-card">
              <div className="card-icon">
                <img
                  src={serviceIconSixth}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="service icon"
                  className="w-100"
                />
              </div>

              <div>
                <h3 className="h3 card-title">Cavity Inspection</h3>

                <p className="card-text">
                  Aenean eleifend turpis tellus, nec laoreet metus elementum ac.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AppServicesSection;
