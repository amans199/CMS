import * as React from "react";

import blogFirst from "assets/images/blog-1.jpg";
import blogSecond from "assets/images/blog-2.jpg";
import blogThird from "assets/images/blog-3.jpg";

function AppBlogSection(props) {
  return (
    <section className="section blog" id="blog" aria-label="blog">
      <div className="container">
        <p className="section-subtitle text-center">Our Blog</p>

        <h2 className="h2 section-title text-center">Latest Blog & News</h2>

        <ul className="blog-list">
          <li>
            <div className="blog-card">
              <figure
                className="card-banner img-holder"
                //   style="--width: 1180; --height: 800;"
              >
                <img
                  src={blogFirst}
                  width="1180"
                  height="800"
                  loading="lazy"
                  alt="Cras accumsan nulla nec lacus ultricies placerat."
                  className="img-cover"
                />

                <div className="card-badge">
                  <ion-icon name="calendar-outline"></ion-icon>

                  <time className="time" dateTime="2022-03-24">
                    24th March 2022
                  </time>
                </div>
              </figure>

              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Cras accumsan nulla nec lacus ultricies placerat.
                  </a>
                </h3>

                <p className="card-text">
                  Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula,
                  nec tristique orci.
                </p>

                <a href="#" className="card-link">
                  Read More
                </a>
              </div>
            </div>
          </li>

          <li>
            <div className="blog-card">
              <figure
                className="card-banner img-holder"
                //   style="--width: 1180; --height: 800;"
              >
                <img
                  src={blogSecond}
                  width="1180"
                  height="800"
                  loading="lazy"
                  alt="Dras accumsan nulla nec lacus ultricies placerat."
                  className="img-cover"
                />

                <div className="card-badge">
                  <ion-icon name="calendar-outline"></ion-icon>

                  <time className="time" dateTime="2022-03-24">
                    24th March 2022
                  </time>
                </div>
              </figure>

              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Dras accumsan nulla nec lacus ultricies placerat.
                  </a>
                </h3>

                <p className="card-text">
                  Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula,
                  nec tristique orci.
                </p>

                <a href="#" className="card-link">
                  Read More
                </a>
              </div>
            </div>
          </li>

          <li>
            <div className="blog-card">
              <figure
                className="card-banner img-holder"
                //   style="--width: 1180; --height: 800;"
              >
                <img
                  src={blogThird}
                  width="1180"
                  height="800"
                  loading="lazy"
                  alt="Seas accumsan nulla nec lacus ultricies placerat."
                  className="img-cover"
                />

                <div className="card-badge">
                  <ion-icon name="calendar-outline"></ion-icon>

                  <time className="time" dateTime="2022-03-24">
                    24th March 2022
                  </time>
                </div>
              </figure>

              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Seas accumsan nulla nec lacus ultricies placerat.
                  </a>
                </h3>

                <p className="card-text">
                  Curabitur sagittis libero tincidunt tempor finibus. Mauris at dignissim ligula,
                  nec tristique orci.
                </p>

                <a href="#" className="card-link">
                  Read More
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AppBlogSection;
