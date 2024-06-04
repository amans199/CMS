import * as React from "react";

import serviceIconFirst from "assets/images/service-icon-1.png";
import serviceIconSecond from "assets/images/service-icon-2.png";
import serviceIconThird from "assets/images/service-icon-3.png";
import serviceIconFourth from "assets/images/service-icon-4.png";
import ServiceBanner from "assets/images/service-banner.png";

function AppServicesSection(props) {
  return (
    <section className="section service" id="service" aria-label="service">
      <div className="container">
        <p className="section-subtitle text-center" style={{color: '#3380CC'}}>Our Services</p>

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
                <h3 className="h3 card-title">Appointment Scheduling</h3>

                <p className="card-text">
                Enables the creation and cancellation of patient appointments.
                This feature facilitates the organization of clinic schedules, ensuring efficient time management for both patients and healthcare providers.
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
                <h3 className="h3 card-title">Patient Management</h3>

                <p className="card-text">
                Manages all aspects of patient information, including registration and appointments records.
                It ensures that patient data is accurate and easily accessible to authorized users.
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
                <h3 className="h3 card-title">Prescription Management</h3>

                <p className="card-text">
                Allows doctors to create and update prescriptions electronically.
                This feature integrates with patient appointments for accurate and efficient drug dispensation.
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
                <h3 className="h3 card-title">Invoice Management</h3>

                <p className="card-text">
                Handles the financial transactions within the clinic, including generating invoices for finished appointments.
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
