import * as React from "react";

// import "assets/css/style.sass";
import "assets/css/style.scss";

// components
import AppHeader from "./components/AppHeader";
import AppHeroSection from "./components/AppHeroSection";
import AppServicesSection from "./components/AppServicesSection";
import AppAboutSection from "./components/AppAboutSection";
import AppDoctorSection from "./components/AppDoctorSection";
import AppCtaSection from "./components/AppCtaSection";
import AppBlogSection from "./components/AppBlogSection";
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

          <AppDoctorSection />

          <AppCtaSection />

          {/* <AppBlogSection /> */}
        </article>
      </main>

      <AppFooter />
    </div>
  );
}

export default Index;
