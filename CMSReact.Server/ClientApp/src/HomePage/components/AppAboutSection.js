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

          <h2 className="h2 section-title">We Care For Your Dental Health</h2>

          <p className="section-text section-text-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
          </p>

          <p className="section-text">
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>

          <a href="#" className="btn">
            Read more
          </a>
        </div>
      </div>
    </section>
  );
}

export default AppAboutSection;
