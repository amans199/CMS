import * as React from "react";

// import "assets/css/style.sass";
import "assets/css/style.scss";

// components
import AppHeader from "./components/AppHeader";
import AppHeroSection from "./components/AppHeroSection";
import AppServicesSection from "./components/AppServicesSection";
import AppAboutSection from "./components/AppAboutSection";
import AppCtaSection from "./components/AppCtaSection";
import AppFooter from "./components/AppFooter";

function Index() {
  return (
    <div className="homePage">
      <AppHeader />

      <main>
        <article>
          <AppHeroSection />

          <AppServicesSection />

          <AppAboutSection />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <AppCtaSection />
        </article>
      </main>

      <AppFooter />
    </div>
  );
}

export default Index;
