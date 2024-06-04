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
          <p className="section-subtitle" style={{ color: "#3380CC" }}>
            About Us
          </p>

          <h2 className="h2 section-title">We Care For Your Health</h2>

          <p className="section-text section-text-1">
            Welcome to CMS, where we prioritize your health and well-being. Our dedicated team of
            healthcare professionals are committed to providing high-quality medical care in a
            compassionate and patient-centered environment. We offer a wide range of services,
            including preventative care, diagnosis, treatment, and ongoing management of your health
            needs.
          </p>

          <p className="section-text">
            we believe in using the latest medical technology and evidence-based practices to ensure
            you receive the best possible care. Our mission is to enhance your health and improve
            your quality of life through personalized and comprehensive medical services.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AppAboutSection;
