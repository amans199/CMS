import * as React from "react";

import ctaBanner from "assets/images/cta-banner.png";

function AppCtaSection(props) {
  return (
    <section className="section cta" aria-label="cta">
      <div className="container">
        <figure className="cta-banner">
          <img
            src={ctaBanner}
            width="1056"
            height="1076"
            loading="lazy"
            alt="cta banner"
            className="w-100"
          />
        </figure>

        <div className="cta-content">
          <p className="section-subtitle">Book Dentail Appointment</p>

          <h2 className="h2 section-title">We Are open And Welcoming Patients</h2>

          <a href="#" className="btn">
            Book appointment
          </a>
        </div>
      </div>
    </section>
  );
}

export default AppCtaSection;
