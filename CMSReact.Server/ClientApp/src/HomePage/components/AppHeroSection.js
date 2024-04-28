import { useEffect, useState } from "react";

import heroBanner from "assets/images/hero-banner.png";
import HeroBG from "assets/images/hero-bg.png";
import { getUserData } from "utils";

function AppHeroSection(props) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = getUserData();

    if (user) {
      setUserData(user);
    }
  }, []);

  return (
    <section
      className="section hero"
      id="home"
      style={{ backgroundImage: `url(${HeroBG})` }}
      aria-label="hero"
    >
      <div className="container">
        <div className="hero-content">
          <p className="section-subtitle">
            {userData?.username && (
              <p className="d-flex gap-2">
                <span>Hi</span> <span className="text-dark">{`${userData.username},`}</span>
              </p>
            )}
            Welcome To CMS (Clinic Managment System)
          </p>

          <h1 className="h1 hero-title">We Are Best CMS Service</h1>

          <p className="hero-text">
          The CMS will serve as a centralized system that consolidates and organizes important clinic-related information.
          It will enhance the overall efficiency, accuracy, and productivity of clinic operations, leading to improved patient care and satisfaction.
          </p>
            

          
        </div>

        <figure className="hero-banner">
          <img src={heroBanner} width="587" height="839" alt="hero banner" className="w-100" />
        </figure>
      </div>
    </section>
  );
}

export default AppHeroSection;
