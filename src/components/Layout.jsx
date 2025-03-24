import React from "react";
import LandingPage from "./LandingPage";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="App">
      <LandingPage />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Layout;