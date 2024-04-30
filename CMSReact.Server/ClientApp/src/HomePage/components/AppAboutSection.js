import * as React from "react";

import AboutBanner from "assets/images/about-banner.png";

function AppAboutSection(props) {
  return (
    <section className="section about" id="about" aria-label="about">
      <div className="container">
        <figure className="about-banner">
          <img
            src={AboutBanner}
            width="470"
            height="538"
            loading="lazy"
            alt="about banner"
            className="w-100"
          />
        </figure>

        <div className="about-content">
          <p className="section-subtitle">About Us</p>

          <h2 className="h2 section-title">We Care For Your Health</h2>

          <p className="section-text section-text-1">
            Our Clinic Management System is designed to streamline operations and enhance the quality of patient care.
            By integrating all essential functions into a single platform, our system simplifies appointment scheduling,
            patient record management, billing processes, and prescription handling. This holistic approach ensures that 
            healthcare providers can focus on delivering superior care without the hassle of managing multiple disjointed systems.
            Our web application is user-friendly and accessible from any device, making it an indispensable tool for medical practitioners
            aiming to optimize their workflow and improve patient interactions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AppAboutSection;
