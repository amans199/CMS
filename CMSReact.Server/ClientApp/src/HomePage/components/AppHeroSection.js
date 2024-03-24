import * as React from "react";

import heroBanner from "assets/images/hero-banner.png";
import HeroBG from "assets/images/hero-bg.png";

function AppHeroSection(props) {
  return (
    <section
      className="section hero"
      id="home"
      style={{ backgroundImage: `url(${HeroBG})` }}
      aria-label="hero"
    >
      <div className="container">
        <div className="hero-content">
          <p className="section-subtitle">Welcome To Dentelo</p>

          <h1 className="h1 hero-title">We Are Best Dental Service</h1>

          <p className="hero-text">
            Donec vitae libero non enim placerat eleifend aliquam erat volutpat. Curabitur diam ex,
            dapibus purus sapien, cursus sed nisl tristique, commodo gravida lectus non.
          </p>

          <form action="" className="hero-form">
            <input
              type="email"
              name="email_address"
              aria-label="email"
              placeholder="Your Email Address..."
              required
              className="email-field"
            />

            <button type="submit" className="btn">
              Get Call Back
            </button>
          </form>
        </div>

        <figure className="hero-banner">
          <img src={heroBanner} width="587" height="839" alt="hero banner" className="w-100" />
        </figure>
      </div>
    </section>
  );
}

export default AppHeroSection;
